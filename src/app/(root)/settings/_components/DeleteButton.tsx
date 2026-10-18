"use client"

import {MouseEvent} from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { useState } from "react";
import { notFound } from "next/dist/client/components/not-found";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/dist/client/components/navigation";

export default function DeleteButton() {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const { data: session, isPending } = authClient.useSession();

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    await authClient.deleteUser({
      callbackURL: "/"
    })

    router.push("/");
    router.refresh();
  }

  if (isPending)
    return <button className="btn-error">Delete Account</button>;
  if (!session) notFound();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-error">Delete Account</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />
        <Dialog.Content className="bg-background fixed top-1/2 left-1/2 w-3/4 sm:w-1/2 -translate-1/2 p-8 flex flex-col items-center rounded-2xl">
          <Dialog.Title className="text-xl md:text-2xl font-semibold self-start">
            Delete Account
          </Dialog.Title>
          <Dialog.Description className="self-start">
            Enter <b>DELETE</b> to delete account
          </Dialog.Description>
          <input
            className="focus-visible:border-error my-4 w-full rounded-2xl border-2 p-2 focus-visible:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Dialog.Close>
            <button className="btn-primary py-1 px-6 text-lg" disabled={input !== 'DELETE'} onClick={handleClick}>
              Submit
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="btn bg-background2 hover:bg-background3 absolute top-2 right-2 rounded-full p-2">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}