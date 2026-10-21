import { findUserByUsername } from "@/data/users/queries";
import { notFound } from "next/dist/client/components/not-found";
import ProfileShowsSection from "@/app/(root)/profile/[username]/_components/ProfileShowsSection";
import { Suspense } from "react";
import { Image } from "next/dist/client/image-component";
import { usernameSelectSchema } from "@/lib/zod-schemas";

export const instant = false;

export default async function Page({params}: {params: Promise<{username: string}>}) {
  const {username} = await params;
  const parsedUsername = usernameSelectSchema.safeParse(username);

  if (!parsedUsername.success) return notFound();

  const user = await findUserByUsername(parsedUsername.data);
  if (!user) notFound();

  const {id, name, image} = user;
  const avatarUrl = image ?? "/default_avatar.png";

  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <header className="mb-8 flex w-full items-center gap-4 border-b-2 pb-4 text-4xl sm:text-6xl xl:text-7xl">
        <div className="relative aspect-square size-[calc(1lh+1rem)] overflow-hidden rounded-full bg-black">
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            sizes="33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="block flex-1 font-semibold wrap-break-word">{name}</h1>
      </header>

      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Shows
      </h2>
      <Suspense fallback={null}>
        <ProfileShowsSection userId={id} className="flex-row flex-nowrap overflow-x-auto" />
      </Suspense>
    </main>
  );
}