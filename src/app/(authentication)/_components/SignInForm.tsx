"use client"
import { SubmitEvent, useState } from "react";
import Link from "next/dist/client/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/dist/client/components/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setPending(false);
    if (error) return setError(error.message ?? "Sign in failed due to unknown error.");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="bg-light2 dark:bg-light text-dark flex flex-col items-center space-y-16 rounded-4xl p-24 text-xl">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl font-bold">Welcome to MarchingList!</h1>
        <p>Please sign in!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center space-y-12"
      >
        <div className="flex w-full flex-col-reverse">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            required
            className="peer border-dark focus-visible:border-primary w-full rounded-2xl border-2 p-4 focus-visible:outline-none"
          />
          <label
            htmlFor="email"
            className="peer-focus-visible:text-primary ml-4"
          >
            Email
          </label>
        </div>

        <div className="flex w-full flex-col-reverse">
          <input
            id="password"
            name="password"
            type="password"
            required
            className="peer border-dark focus-visible:border-primary w-full rounded-2xl border-2 p-4 focus-visible:outline-none"
          />
          <label
            htmlFor="password"
            className="peer-focus-visible:text-primary ml-4"
          >
            Password
          </label>
        </div>

        {error && <p role="alert" className="text-red-500 dark:text-red-600">{error}</p>}

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