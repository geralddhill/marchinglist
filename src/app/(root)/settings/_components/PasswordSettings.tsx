"use client"

import SettingsSkeleton from "@/app/(root)/settings/_components/SettingsSkeleton";
import PasswordInput from "@/components/Input/PasswordInput";
import { useRouter } from "next/dist/client/components/navigation";
import { SubmitEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/Input/Input";
import { notFound } from "next/dist/client/components/not-found";
import * as z from "zod";
import { passwordSchema } from "@/lib/zod-schemas";

const passwordChangeSchema = z.object({
  current_password: passwordSchema,
  new_password: passwordSchema,
})

type passwordErrors = {
  formErrors: string[];
  fieldErrors: {
    current_password?: string[] | undefined;
    new_password?: string[] | undefined;
  };
};

export default function PasswordSettings() {
  const router = useRouter();
  const [error, setError] = useState<passwordErrors | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const { data: session, isPending } = authClient.useSession();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(null);
    const form = new FormData(e.currentTarget);

    const parsed = passwordChangeSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      setError(z.flattenError(parsed.error));
      setPending(false);
      return;
    }

    const { error } = await authClient.changePassword({
      newPassword: parsed.data.new_password,
      currentPassword: parsed.data.current_password,
      revokeOtherSessions: true
    })

    setPending(false);
    if (error)
      return setError({
        formErrors: [error.message ?? "Password change failed due to unknown error."],
        fieldErrors: {},
      });

    setSuccess("Password updated successfully!");

    router.refresh();
  }

  if (isPending)
    return (
      <SettingsSkeleton
        title={"Change Password"}
        handleSubmit={() => {}}
        pending={false}
        success={success}
      >
        <div className="flex w-full flex-col gap-8 sm:px-12">
          <Input label="Current Password" />
          <Input label="New Password" />
        </div>
      </SettingsSkeleton>
    );
  if (!session) notFound();

  return (
    <SettingsSkeleton
      title="Change Password"
      handleSubmit={handleSubmit}
      pending={pending}
      success={success}
    >
      <div className="flex w-full flex-col gap-8 sm:px-12">
        <PasswordInput
          label="Current Password"
          id="current_password"
          name="current_password"
          autoComplete="current-password"
          aria-required="true"
          formNoValidate={true}
          error={
            error?.fieldErrors?.current_password &&
            error.fieldErrors.current_password.length > 0
              ? error.fieldErrors.current_password[0]
              : undefined
          }
        />

        <PasswordInput
          label="New Password"
          id="new_password"
          name="new_password"
          autoComplete="new-password"
          aria-required="true"
          formNoValidate={true}
          error={
            error?.fieldErrors?.new_password &&
            error.fieldErrors.new_password.length > 0
              ? error.fieldErrors.new_password[0]
              : undefined
          }
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