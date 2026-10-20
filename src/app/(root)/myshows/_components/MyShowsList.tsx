import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { listCurrentUserShows } from "@/data/shows/queries";
import { notFound } from "next/dist/client/components/not-found";

export default async function MyShowsList() {
  let shows;
  try {
    shows = await listCurrentUserShows();
  } catch {
    notFound();
  }

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-12 sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {shows.length > 0 ? (
        shows.map((show) => (
          <li key={show.slug}>
            <ShowCard show={show} toEdit/>
          </li>
        ))
      ) : (
        <p>This user has not published any shows.</p>
      )}
    </ul>
  );
}