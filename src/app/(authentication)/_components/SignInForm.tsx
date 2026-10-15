"use client"
import { SubmitEvent } from "react";
import Link from "next/dist/client/link";

export default function SignInForm() {
  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="bg-foreground text-background flex flex-col items-center space-y-16 p-24 text-xl rounded-4xl">
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
            className="peer border-background focus-visible:border-primary w-full rounded-2xl border border-2 p-4 focus-visible:outline-none"
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
            className="peer border-background focus-visible:border-primary w-full rounded-2xl border border-2 p-4 focus-visible:outline-none"
          />
          <label
            htmlFor="password"
            className="peer-focus-visible:text-primary ml-4"
          >
            Password
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Sign In
        </button>
      </form>
      <Link href="/signup" className="text-sm">
        Don't have an account? Sign up!
      </Link>
    </div>
  );
}