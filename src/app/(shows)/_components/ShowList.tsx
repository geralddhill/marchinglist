import { db } from "@/db/drizzle";
import { showsTable } from "@/db/schema";
import ShowCard from "@/app/(shows)/_components/ShowCard";

export default async function ShowList() {
  const shows = await db.select().from(showsTable);

  return (
    <ul className="flex w-full flex-col items-center justify-center space-y-12 p-12 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 md:px-24 xl:px-36 2xl:grid-cols-4 2xl:px-64">
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  );
}