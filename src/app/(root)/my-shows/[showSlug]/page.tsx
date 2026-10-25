import { notFound } from "next/dist/client/components/not-found";
import {
  findCurrentUserShowBySlug,
} from "@/features/shows/queries";
import { slugSchema } from "@/features/shows/slug";
import UpdateShowForm from "@/features/shows/components/update-show-form";


export const instant = false;

export default async function Page({ params }: { params: Promise<{ showSlug: string }> }) {
  const {showSlug} = await params;
  const parsedSlug = slugSchema.safeParse(showSlug);
  if (!parsedSlug.success) return notFound()

  const show = await findCurrentUserShowBySlug(parsedSlug.data);
  if (!show) notFound();

  return (
    <main className="flex items-center justify-center flex-1 p-8">
      <UpdateShowForm show={show}/>
    </main>
  )
}