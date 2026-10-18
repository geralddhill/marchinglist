"use client";
import { SubmitEvent, useState } from "react";
import Link from "next/dist/client/link";
import { authClient } from "@/lib/auth-client";
import {
  useRouter,
  useSearchParams,
} from "next/dist/client/components/navigation";
import Input from "@/components/Input";
import PasswordInput from "@/app/(authentication)/_components/PasswordInput";
import * as z from "zod";
import { useDebouncedCallback } from "use-debounce";
import { Check, X } from "lucide-react";
import { safeRedirectPath } from "@/lib/utils";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  usernameUpsertSchema,
} from "@/lib/zod-schemas";

const signUpSchema = z.object({
  name: nameSchema,
  username: usernameUpsertSchema,
  email: emailSchema,
  password: passwordSchema,
});

type signUpErrors = {
  formErrors: string[];
  fieldErrors: {
    name?: string[] | undefined;
    username?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<signUpErrors | null>(null);
  const [pending, setPending] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const parsed = signUpSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      setError(z.flattenError(parsed.error));
      setPending(false);
      return;
    }

    const { error } = await authClient.signUp.email({
      name: parsed.data.name,
      username: parsed.data.username,
      email: parsed.data.email,
      password: parsed.data.password,
      image: "/default_avatar.png"
    });

    setPending(false);
    if (error)
      return setError({
        formErrors: [error.message ?? "Sign up failed due to unknown error."],
        fieldErrors: {},
      });

    const from = searchParams.get("from");
    router.push(safeRedirectPath(from ?? ""));
    router.refresh();
  }

  const handleChange = useDebouncedCallback(async (username) => {
    setUsernameAvailable(null);
    if (!username) {
      return;
    }
    const {data: response} = await authClient.isUsernameAvailable({
      username
    });
    if (response?.available) {
      setUsernameAvailable(true);
    } else {
      setUsernameAvailable(false);
    }
  }, 300)

  return (
    <div className="md:bg-light2 md:dark:bg-light md:text-dark flex flex-col items-center gap-16 p-4 text-xl md:rounded-4xl md:p-0 md:p-24">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-4xl font-bold">
          Welcome to MarchingList!
        </h1>
        <p>Sign up for a free account!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-12"
      >
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
          forAuth
        />
        <Input
          label="Username"
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          aria-required="true"
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
                <X className= "text-red-500" />
              )
            ) : undefined
          }
          forAuth
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          formNoValidate={true}
          error={
            error?.fieldErrors?.email && error.fieldErrors.email.length > 0
              ? error.fieldErrors.email[0]
              : undefined
          }
          forAuth
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          autoComplete="new-password"
          aria-required="true"
          formNoValidate={true}
          error={
            error?.fieldErrors?.password &&
            error.fieldErrors.password.length > 0
              ? error.fieldErrors.password[0]
              : undefined
          }
          forAuth
        />

        {error && error.formErrors.length > 0 && (
          <p role="alert" className="text-red-500 dark:text-red-600">
            {error.formErrors[0]}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={pending}>
          Sign Up
        </button>
      </form>
      <Link href={`/signin?${searchParams.toString()}`} className="text-sm">
        Already have an account? Sign in!
      </Link>
    </div>
  );
}
