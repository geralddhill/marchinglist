import ShowCard from "@/app/(shows)/_components/ShowCard";
import { getShows } from "@/data/shows/queries";

export default async function ShowList() {
  const response = await getShows();

  return (
    <ul className="flex w-full flex-col items-center justify-center space-y-12 p-12 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 md:px-24 xl:px-36 2xl:grid-cols-4 2xl:px-64">
      {response.length > 0 ? response.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      )) : <p>There are no shows available at this time. Please try again later.</p>}
    </ul>
  );
}