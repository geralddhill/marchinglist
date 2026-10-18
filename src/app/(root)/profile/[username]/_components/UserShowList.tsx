import ShowCard from "@/app/(root)/shows/_components/ShowCard";
import { getShowsByUser } from "@/data/shows/queries";

export default async function UserShowList({ userId }: { userId: string }) {
  const shows = await getShowsByUser(userId);

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-12 sm:grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {shows.length > 0 ? (
        shows.map((show) => (
          <li key={show.slug}>
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
