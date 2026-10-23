import ShowCard, { ShowData } from "@/features/shows/components/show-card";
import { cn } from "@/lib/utils";
import NoShows from "@/features/shows/components/no-shows";

export default function ShowList({
  shows,
  className,
  noShowsDesc,
  noShowsWithButton = false,
  toEdit = false,
}: {
  shows: ShowData[];
  className?: string;
  noShowsDesc: string;
  noShowsWithButton?: boolean;
  toEdit?: boolean;
}) {
  if (shows.length === 0) {
    return <NoShows description={noShowsDesc} withButton={noShowsWithButton} />;
  }

  return (
    <ul
      className={cn(
        "flex w-full flex-col justify-center gap-12 px-8",
        className,
      )}
    >
      {shows.map((show) => (
        <li key={show.slug}>
          <ShowCard show={show} toEdit={toEdit} />
        </li>
      ))}
    </ul>
  );
}
