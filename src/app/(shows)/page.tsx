import ShowCard from "@/app/(shows)/_components/ShowCard";

const shows = Array.from({ length: 10 }).map((_) => ({
  title: `This Curated  Mind`,
  price: 1200,
  duration: 320,
  thumbnail_url: "/test_show.jpg",
}));

export default function Page() {
  return (
    <main>
      <ul className="flex w-full flex-col items-center justify-center space-y-12 p-12 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 md:px-24 xl:px-36 2xl:grid-cols-4 2xl:px-64">
        {shows.map((show, index) => (
          <li key={index}>
            <ShowCard
              title={show.title}
              price={show.price}
              duration={show.duration}
              thumbnail_url={show.thumbnail_url}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
