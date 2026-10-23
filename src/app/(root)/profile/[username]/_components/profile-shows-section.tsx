import { listPublishedShowsByUserId } from "@/data/shows/queries";
import ShowList from "@/components/show-list";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function ProfileShowsSection({ userId, className }: { userId: string, className?: string }) {
  const shows = await listPublishedShowsByUserId(userId);

  return (
    <ScrollArea className="">
      <ShowList shows={shows} className="flex-row mb-4"/>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  );
}
