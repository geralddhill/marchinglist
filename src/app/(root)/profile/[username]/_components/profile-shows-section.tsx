import { listPublishedShowsByUserId } from "@/data/shows/queries";
import ShowList from "@/components/show-list";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function ProfileShowsSection({ userId, className }: { userId: string, className?: string }) {
  const shows = await listPublishedShowsByUserId(userId);

  return (
    <ScrollArea className="">
      <ShowList shows={shows} className="flex-row mb-4" noShowsDesc={"This user has not created any shows yet.\nPlease come back later."}/>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  );
}
