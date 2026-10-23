import { listCurrentUserShows } from "@/data/shows/queries";
import { notFound } from "next/dist/client/components/not-found";
import ShowList from "@/components/show-list";

export default async function MyShowsSection({className}: {className?: string}) {
  let shows;
  try {
    shows = await listCurrentUserShows();
  } catch {
    notFound();
  }

  return (
    <ShowList shows={shows} className={className} noShowsDesc={"You have not created any shows yet.\nGet started by creating your first show."} noShowsWithButton/>
  );
}