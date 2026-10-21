import { listPublishedShowsByUserId } from "@/data/shows/queries";
import ShowList from "@/components/ShowList";

export default async function ProfileShowsSection({ userId, className }: { userId: string, className?: string }) {
  const shows = await listPublishedShowsByUserId(userId);

  return <ShowList shows={shows} className={className} />;
}
