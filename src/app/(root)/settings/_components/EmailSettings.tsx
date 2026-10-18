"use client"
import SettingsSkeleton from "@/app/(root)/settings/_components/SettingsSkeleton";
import { useRouter } from "next/dist/client/components/navigation";
import { SubmitEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { emailSchema } from "@/lib/zod-schemas";
import Input from "@/components/Input";
import { notFound } from "next/dist/client/components/not-found";

type emailErrors = {
  formErrors: string[];
  fieldErrors: string | undefined;
};

export default function EmailSettings() {
  const router = useRouter();
  const [error, setError] = useState<emailErrors | null>(null);
  const [pending, setPending] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const parsed = emailSchema.safeParse(form.get("email"));
    if (!parsed.success) {
      setError(z.flattenError(parsed.error));
      setPending(false);
      return;
    }

    const { error } = await authClient.changeEmail({
      newEmail: parsed.data
    })

    setPending(false);
    if (error)
      return setError({
        formErrors: [error.message ?? "Email change failed due to unknown error."],
        fieldErrors: "",
      });

    router.refresh();
  }

  if (isPending)
    return (
      <SettingsSkeleton
        title={"Change Email"}
        handleSubmit={() => {}}
        pending={false}
      >
        <div className="w-full sm:px-12">
          <Input label="New Email" />
        </div>
      </SettingsSkeleton>
    );
  if (!session) notFound();

  const {email} = session.user;

  return (
    <SettingsSkeleton
      title="Change Email"
      handleSubmit={handleSubmit}
      pending={pending}
    >
      <div className="w-full sm:px-12">
        <Input
          label="New Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          formNoValidate={true}
          error={error?.fieldErrors ? error.fieldErrors : undefined}
          defaultValue={email}
        />

        {error && error.formErrors.length > 0 && (
          <p role="alert" className="text-red-500 dark:text-red-600">
            {error.formErrors[0]}
          </p>
        )}
      </div>
    </SettingsSkeleton>
  );
}