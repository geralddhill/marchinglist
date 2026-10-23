import ShowCard, { ShowData } from "@/components/show-card";
import { cn } from "@/lib/utils";
import NoShows from "@/components/no-shows";

export default function ShowList({ shows, className, noShowsDesc, noShowsWithButton = false }: { shows: ShowData[], className?: string, noShowsDesc: string, noShowsWithButton?: boolean }) {
  if (shows.length === 0) {
    return (
      <NoShows description={noShowsDesc} withButton={noShowsWithButton} />
    );
  }

  return (
    <ul
      className={cn(
        "flex w-full flex-col px-8 justify-center gap-12 ",
        className,
      )}
    >
      {shows.map((show) => (
        <li key={show.slug}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  );
}