import { listPublishedShows } from "@/data/shows/queries";
import ShowList from "@/components/show-list";

export default async function ShowsSection({className}: {className?: string}) {
  const shows = await listPublishedShows();

  return <ShowList shows={shows} className={className} noShowsDesc={"There are no shows available at this time.\nPlease try again later."} />
}