"use client"
import Input from "@/components/Input";
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/dist/client/components/not-found";
import { ReactNode, SubmitEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Check, X } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import * as z from "zod";
import { refreshUserCache } from "@/data/users/mutations";

const profileSchema = z.object({
  name: z.string().trim().nonempty("Required"),
  username: z
    .string()
    .trim()
    .min(3, "Minimum 3 characters long")
    .max(30, "Maximum 30 characters long")
    .regex(/^[a-zA-Z0-9_.]+$/, "Letters, numbers, underscores, dots only"),
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
        formErrors: [error.message ?? "Sign up failed due to unknown error."],
        fieldErrors: {},
      });

    await refreshUserCache();

    router.push(`/profile/${encodeURIComponent(session?.user.username ?? "")}`);
    router.refresh();
  }

  if (isPending) return <FormSkeleton handleSubmit={() => {}} pending={false}>
    <div className="flex w-full flex-col gap-8 sm:px-12">
      <Input label="Name"/>
      <Input label="Username"/>
    </div>
  </FormSkeleton>;
  if (!session) notFound();

  const { name, username } = session.user;

  return (
    <FormSkeleton handleSubmit={handleSubmit} pending={pending}>
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
      </div>
    </FormSkeleton>
  );
}

function FormSkeleton({handleSubmit, pending, children}: {handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void, pending: boolean, children?: ReactNode}) {
  return (
    <form className="flex flex-col items-center gap-12" onSubmit={handleSubmit}>
      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Profile Settings
      </h2>
      {children}
      <button type="submit" className="btn-primary" disabled={pending}>Submit</button>
    </form>
  )
}