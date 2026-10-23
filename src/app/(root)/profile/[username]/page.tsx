import { findUserByUsername } from "@/data/users/queries";
import { notFound } from "next/dist/client/components/not-found";
import ProfileShowsSection from "@/app/(root)/profile/[username]/_components/profile-shows-section";
import { Suspense } from "react";
import { usernameSelectSchema } from "@/lib/zod-schemas";
import { UserAvatar } from "@/components/auth/user/user-avatar";
import type { User } from "better-auth";

export const instant = false;

export default async function Page({params}: {params: Promise<{username: string}>}) {
  const {username} = await params;
  const parsedUsername = usernameSelectSchema.safeParse(username);

  if (!parsedUsername.success) return notFound();

  const user = await findUserByUsername(parsedUsername.data);
  if (!user) notFound();

  const {id, name} = user;

  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <header className="mb-8 flex w-full items-center gap-4 border-b-2 pb-4 text-4xl sm:text-6xl xl:text-7xl">
        <div className="aspect-square size-[calc(1lh+1rem)]">
          <UserAvatar className="size-full" user={user as User} />
        </div>
        <h1 className="block flex-1 font-semibold wrap-break-word">{name}</h1>
      </header>

      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Shows
      </h2>
      <Suspense fallback={null}>
        <ProfileShowsSection userId={id} />
      </Suspense>
    </main>
  );
}