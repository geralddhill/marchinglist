import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { getShows } from "@/data/shows/queries";

export default async function ShowList() {
  const shows = await getShows();

  return (
    <ul className="flex w-full flex-col items-center justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-12 2xl:grid-cols-4">
      {shows.length > 0 ? (
        shows.map((show) => (
          <li key={show.id}>
            <ShowCard show={show} />
          </li>
        ))
      ) : (
        <p>
          There are no shows available at this time. Please try again later.
        </p>
      )}
    </ul>
  );
}