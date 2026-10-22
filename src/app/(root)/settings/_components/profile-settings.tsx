"use client"
import Input from "@/components/Input/input";
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/dist/client/components/not-found";
import { SubmitEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Check, X } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import * as z from "zod";
import { refreshUserCache } from "@/lib/cache";
import { nameSchema, usernameUpsertSchema } from "@/lib/zod-schemas";
import SettingsSkeleton from "@/app/(root)/settings/_components/settings-skeleton";

const profileSchema = z.object({
  name: nameSchema,
  username: usernameUpsertSchema
});

type profileErrors = {
  formErrors: string[];
  fieldErrors: {
    name?: string[] | undefined;
    username?: string[] | undefined;
  };
};

export default function ProfileSettings() {
  const router = useRouter();
  const [error, setError] = useState<profileErrors | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );
  const { data: session, isPending } = authClient.useSession();

  const handleChange = useDebouncedCallback(async (username) => {
    setUsernameAvailable(null);
    if (!username) {
      return;
    }
    const { data: response } = await authClient.isUsernameAvailable({
      username,
    });
    if (username === session?.user.username) return;
      if (response?.available) {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
  }, 300);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(null);
    const form = new FormData(e.currentTarget);

    const parsed = profileSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      setError(z.flattenError(parsed.error));
      setPending(false);
      return;
    }

    const { error } = await authClient.updateUser({
      name: parsed.data.name,
      username: parsed.data.username,
    });

    setPending(false);
    if (error)
      return setError({
        formErrors: [error.message ?? "Profile update failed due to unknown error."],
        fieldErrors: {},
      });

    setSuccess("Profile successfully updated!");

    await refreshUserCache();

    router.refresh();
  }

  if (isPending) return (
    <SettingsSkeleton
      title={"Profile Settings"}
      handleSubmit={() => {}}
      pending={false}
      success={success}
    >
      <div className="flex w-full flex-col gap-8 sm:px-12">
        <Input label="Name" />
        <Input label="Username" />
      </div>
    </SettingsSkeleton>
  );
  if (!session) notFound();

  const { name, username } = session.user;

  return (
    <SettingsSkeleton
      title={"Profile Settings"}
      handleSubmit={handleSubmit}
      pending={pending}
      success={success}
    >
      <div className="flex w-full flex-col gap-8 sm:px-12">
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          formNoValidate={true}
          error={
            error?.fieldErrors?.name && error.fieldErrors.name.length > 0
              ? error.fieldErrors.name[0]
              : undefined
          }
          defaultValue={name}
        />

        <Input
          label="Username"
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          aria-required="true"
          defaultValue={username ?? ""}
          formNoValidate={true}
          error={
            error?.fieldErrors?.username &&
            error.fieldErrors.username.length > 0
              ? error.fieldErrors.username[0]
              : undefined
          }
          onChange={(e) => handleChange(e.target.value)}
          endAdornment={
            usernameAvailable !== null ? (
              usernameAvailable ? (
                <Check className="text-green-500" />
              ) : (
                <X className="text-red-500" />
              )
            ) : undefined
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

