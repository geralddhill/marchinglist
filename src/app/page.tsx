import { Image } from "next/dist/client/image-component";
import { formatDuration } from "@/lib/utils";

export default function Page() {
  const shows = Array.from({ length: 10 }).map((_) => ({
    title: `This Curated  Mind`,
    price: 1200,
    duration: 320,
    thumbnail_url: "/test_show.jpg"
  }));

  return (
    <main className="flex w-full flex-col items-center justify-center space-y-12 p-12 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 md:px-24 xl:px-36 2xl:grid-cols-4 2xl:px-64">
      {shows.map((show, index) => (
        <article
          key={index}
          className="flex w-full flex-col items-center justify-center space-y-2 rounded-2xl bg-gray-900 p-4"
        >
          <div className="w-full aspect-5/4 relative">
            <Image
              src={show.thumbnail_url}
              alt={`Thumbnail for ${show.title}`}
              fill={true}
            />
          </div>
          <h3 className="w-full text-lg font-semibold xl:text-xl">
            {show.title}
          </h3>
          <p className="inline-flex w-full justify-between space-x-2 md:text-sm xl:text-lg">
            <span className="text-nowrap">Price: ${show.price}</span>
            <span className="text-nowrap">
              Duration: {formatDuration(show.duration)}
            </span>
          </p>
        </article>
      ))}
    </main>
  );
}
