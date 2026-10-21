import { listPublishedShows } from "@/data/shows/queries";
import ShowList from "@/components/ShowList";

export default async function ShowsSection({className}: {className?: string}) {
  const shows = await listPublishedShows();

  return <ShowList shows={shows} className={className} />
}