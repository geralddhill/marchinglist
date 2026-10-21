import ShowCard, { ShowData } from "@/components/ShowCard";
import { cn } from "@/lib/utils";

export default function ShowList({ shows, className }: { shows: ShowData[], className?: string }) {
  if (shows.length === 0) {
    return (
      <p className="w-full text-center">
        There are no shows available at this time. Please try again later.
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "flex w-full flex-col items-center justify-center gap-12",
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