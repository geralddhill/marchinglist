import { notFound } from "next/dist/client/components/not-found";
import {
  findCurrentUserShowBySlug,
} from "@/features/shows/queries";
import { slugSchema } from "@/features/shows/slug";
import UpdateShowForm from "@/features/shows/components/update-show-form";
import ThumbnailEditor from "@/features/shows/components/thumbnail-editor";


export const instant = false;

export default async function Page({ params }: { params: Promise<{ showSlug: string }> }) {
  const {showSlug} = await params;
  const parsedSlug = slugSchema.safeParse(showSlug);
  if (!parsedSlug.success) return notFound()

  const show = await findCurrentUserShowBySlug(parsedSlug.data);
  if (!show) notFound();

  return (
    <main className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-3 gap-8 items-center justify-items-center flex-1 p-8">
      <UpdateShowForm show={show}/>
      <ThumbnailEditor id={show.id} title={show.title} thumbnailKey={show.thumbnailKey}/>
    </main>
  )
}