import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { getShowsByUser } from "@/data/shows/queries";

export default async function UserShowList({ userId }: { userId: string }) {
  const shows = await getShowsByUser(userId);

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
          This user has not published any shows.
        </p>
      )}
    </ul>
  );
}
