"use client"
import { SubmitEvent, useState } from "react";
import Link from "next/dist/client/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/dist/client/components/navigation";
import Input from "@/app/(authentication)/_components/Input";

export default function SignInForm() {
  const router = useRouter();
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
    router.push("/");
    router.refresh();
  }

  return (
    <div className="md:bg-light2 md:dark:bg-light md:text-dark flex flex-col items-center space-y-16 p-4 text-xl md:rounded-4xl md:p-0 md:p-24">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-center text-4xl font-bold">
          Welcome to MarchingList!
        </h1>
        <p>Please sign in!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center space-y-12"
      >
        <Input
          label="Email or Username"
          id="identifier"
          name="identifier"
          type="text"
          required
          autoComplete="username"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />

        {error && (
          <p role="alert" className="text-red-500 dark:text-red-600">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={pending}>
          Sign In
        </button>
      </form>
      <Link href="/signup" className="text-sm">
        Don't have an account? Sign up!
      </Link>
    </div>
  );
}