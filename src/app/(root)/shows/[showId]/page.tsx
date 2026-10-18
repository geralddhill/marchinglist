import { notFound } from "next/dist/client/components/not-found";
import { findShowById } from "@/data/shows/queries";
import { Image } from "next/dist/client/image-component";
import { cn, formatDuration, formatPrice, secondsToISO } from "@/lib/utils";

export const instant = false;

export default async function Page({ params }: { params: Promise<{ showId: string }> }) {
  const {showId} = await params;

  const parsedId = parseInt(showId);
  if (Number.isNaN(parsedId)) notFound();

  const show = await findShowById(parsedId);
  if (!show) notFound();

  const {title, price, duration, thumbnailUrl, description, difficulty} = show;

  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <header className="flex w-full flex-col justify-between gap-4 text-4xl sm:text-6xl md:flex-row md:items-start md:gap-6 xl:text-7xl">
        <div className="md:w-1/2">
          <h1 className="mb-8 block border-b-2 pb-4 font-semibold wrap-break-word md:my-0 md:w-full">
            {title}
          </h1>
          <BasicInfo
            price={price}
            duration={duration}
            difficulty={difficulty}
            className="hidden md:mt-0 md:flex md:border-t-0"
          />
        </div>
        {thumbnailUrl && (
          <div className="flex-1 px-4 md:px-0">
            <div className="relative aspect-5/4 h-auto w-full">
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}
        <BasicInfo
          price={price}
          duration={duration}
          difficulty={difficulty}
          className="md:hidden"
        />
      </header>

      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Description
      </h2>
      <p className="whitespace-pre-wrap sm:text-lg">{description}</p>
    </main>
  );
}


function BasicInfo({price, duration, difficulty, className}: {price: number | null, duration: number, difficulty: "beginning" | "intermediate" | "advanced", className?: string}) {
  return (
    <div
      className={cn(
        "my-8 flex w-full flex-col gap-2 border-t-2 text-xl sm:text-2xl",
        className,
      )}
    >
      <dl className="inline-flex w-full justify-between gap-2 border-b-2 p-4">
        <div className="inline-flex max-w-1/2 gap-1 truncate">
          <dt>Price:</dt>
          <dd>
            {price ? (
              <data value={price}>{formatPrice(price)}</data>
            ) : (
              <span>N/A</span>
            )}
          </dd>
        </div>

        <div className="inline-flex max-w-1/2 gap-1 truncate">
          <dt>Duration:</dt>
          <dd>
            <time dateTime={secondsToISO(duration)}>
              {formatDuration(duration)}
            </time>
          </dd>
        </div>
      </dl>
      <dl className="inline-flex w-full gap-1 truncate border-b-2 p-4">
        <dt>Difficulty:</dt>
        <dd className="capitalize">{difficulty}</dd>
      </dl>
    </div>
  );
}