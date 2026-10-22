"use client"
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { SubmitEvent, useState } from "react";
import { passwordSchema } from "@/lib/zod-schemas";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { notFound } from "next/dist/client/components/not-found";
import PasswordInput from "@/components/Input/password-input";

type passwordErrors = {
  formErrors: string[];
  fieldErrors: string | undefined;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<passwordErrors | null>(null);
  const [pending, setPending] = useState(false);

  if (!token) notFound();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) return;

    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const parsed = passwordSchema.safeParse(form.get("password"));
    if (!parsed.success) {
      setError(z.flattenError(parsed.error));
      setPending(false);
      return;
    }

    const { error } = await authClient.resetPassword({
      token,
      newPassword: parsed.data
    })

    setPending(false);
    if (error)
      return setError({
        formErrors: [error.message ?? "Failed due to unknown error."],
        fieldErrors: "",
      });

    router.push("/");
    router.refresh();
  }

  return (
    <form
      className="flex flex-col items-center gap-12 p-12"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Reset Password
      </h1>

      <PasswordInput
        label="New Password"
        id="password"
        name="password"
        autoComplete="new-password"
        aria-required="true"
        formNoValidate={true}
        error={
          error?.fieldErrors
            ? error.fieldErrors
            : undefined
        }
      />

      {error && error.formErrors.length > 0 && (
        <p role="alert" className="text-red-500 dark:text-red-600">
          {error.formErrors[0]}
        </p>
      )}

      <button type="submit" className="btn-primary" disabled={pending}>
        Submit
      </button>
    </form>
  );
}