import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { getShows } from "@/data/shows/queries";

export default async function ShowList() {
  const shows = await getShows();

  return (
    <ul className="flex w-full flex-col items-center justify-center space-y-12 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 2xl:grid-cols-4">
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