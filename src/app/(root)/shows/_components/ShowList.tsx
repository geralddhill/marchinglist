import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { listPublishedShows } from "@/data/shows/queries";

export default async function ShowList() {
  const shows = await listPublishedShows();

  if (shows.length === 0) {
    return (
      <p className="text-center w-full">
        There are no shows available at this time. Please try again later.
      </p>
    )
  }

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-12 sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {shows.map((show) => (
        <li key={show.slug}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  );
}