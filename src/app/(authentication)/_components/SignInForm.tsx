"use client"
import { SubmitEvent, useState } from "react";
import Link from "next/dist/client/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import { safeRedirectPath } from "@/lib/utils";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const identifier = String(form.get("identifier")).trim();
    const password = String(form.get("password"));

    const { error } = identifier.includes("@")
      ? await authClient.signIn.email({ email: identifier, password })
      : await authClient.signIn.username({ username: identifier, password });

    setPending(false);
    if (error) return setError(error.message ?? "Sign in failed due to unknown error.");

    const from = searchParams.get("from");
    router.push(safeRedirectPath(from ?? ""));
    router.refresh();
  }

  return (
    <div className="md:bg-light2 md:dark:bg-light md:text-dark flex flex-col items-center gap-16 p-4 text-xl md:rounded-4xl md:p-0 md:p-24">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-4xl font-bold">
          Welcome to MarchingList!
        </h1>
        <p>Please sign in!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-12"
      >
        <Input
          label="Email or Username"
          id="identifier"
          name="identifier"
          type="text"
          required
          autoComplete="username"
          forAuth
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          forAuth
        />

        <Link href={`/forgot-password`} className="text-sm">
          Forgot Password?
        </Link>

        {error && (
          <p role="alert" className="text-red-500 dark:text-red-600">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={pending}>
          Sign In
        </button>
      </form>
      <Link href={`/sign-up?${searchParams.toString()}`} className="text-sm">
        Don't have an account? Sign up!
      </Link>
    </div>
  );
}