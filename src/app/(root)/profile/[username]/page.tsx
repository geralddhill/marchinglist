import { findUserByUsername } from "@/data/users/queries";
import { notFound } from "next/dist/client/components/not-found";

export const instant = false;

export default async function Page({params}: {params: Promise<{username: string}>}) {
  const {username} = await params;

  const user = await findUserByUsername(username);
  if (!user) notFound();

  const {name} = user;

  return (
    <main>
      <h1>{name}</h1>

      <h2>Popular Shows</h2>
    </main>
  );
}