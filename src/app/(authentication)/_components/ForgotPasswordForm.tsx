"use client"

import { useRouter } from "next/dist/client/components/navigation";
import { SubmitEvent, useState } from "react";
import Input from "@/components/Input";
import { emailSchema } from "@/lib/zod-schemas";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";

type emailErrors = {
  formErrors: string[];
  fieldErrors: string | undefined;
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<emailErrors | null>(null);
  const [pending, setPending] = useState(false);

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

    const { error } = await authClient.requestPasswordReset({
      email: parsed.data,
      redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN!}/reset-password`
    });

    setPending(false);
    if (error)
      return setError({
        formErrors: [
          error.message ?? "Failed due to unknown error.",
        ],
        fieldErrors: "",
      });

    router.refresh();
  }

  return (
    <form className="flex flex-col items-center gap-12 p-12" onSubmit={handleSubmit}>
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Forgot Password
      </h1>

      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        aria-required="true"
        formNoValidate={true}
        error={error?.fieldErrors ? error.fieldErrors : undefined}
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