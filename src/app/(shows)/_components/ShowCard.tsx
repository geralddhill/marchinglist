import { Image } from "next/dist/client/image-component";
import { formatDuration, formatPrice, secondsToISO } from "@/lib/utils";
import Link from "next/dist/client/link";

type Show = {
  title: string;
  price: number;
  duration: number;
  thumbnail_url: string;
};

export default function ShowCard({ show }: { show: Show }) {
  const {title, price, duration, thumbnail_url} = show;
  return (
    <article className="relative flex w-full h-full flex-col items-center justify-center space-y-2 rounded-2xl bg-gray-900 p-4">
      <div className="relative aspect-5/4 w-full">
        <Image src={thumbnail_url} alt={`Thumbnail for ${title}`} fill={true} />
      </div>

      {/*TODO: Reevaluate header level once page is fully developed*/}
      <h3 className="w-full truncate text-lg font-semibold xl:text-xl">
        <Link href="/" className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>

      <dl className="inline-flex w-full justify-between space-x-2 md:text-sm xl:text-lg">
        <div className="inline-flex max-w-1/2 space-x-1 truncate">
          <dt>Price:</dt>
          <dd>
            <data value={price}>{formatPrice(price)}</data>
          </dd>
        </div>

        <div className="inline-flex max-w-1/2 space-x-1 truncate">
          <dt>Duration:</dt>
          <dd>
            <time dateTime={secondsToISO(duration)}>
              {formatDuration(duration)}
            </time>
          </dd>
        </div>
      </dl>
    </article>
  );
}
