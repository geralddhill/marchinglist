import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ShowList from "@/features/shows/components/show-list";
import { listPublishedShowsByUserId } from "@/features/shows/queries";

export default async function ProfileShowsSection({ userId, className }: { userId: string, className?: string }) {
  const shows = await listPublishedShowsByUserId(userId);

  return (
    <ScrollArea className="">
      <ShowList shows={shows} className="flex-row mb-4" noShowsDesc={"This user has not created any shows yet.\nPlease come back later."}/>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  );
}
