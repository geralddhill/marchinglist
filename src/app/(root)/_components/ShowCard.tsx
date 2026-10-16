import { Image } from "next/dist/client/image-component";
import { formatDuration, formatPrice, secondsToISO } from "@/lib/utils";
import Link from "next/dist/client/link";

type Show = {
  title: string;
  price: number | null;
  duration: number;
  thumbnailUrl: string | null;
  owner: {
    name: string;
    username: string | null;
    image: string | null;
  } | undefined
}

export default function ShowCard({ show }: { show: Show }) {
  const {title, price, duration, thumbnailUrl, owner} = show;
  const {name, username, image} = owner ?? {};
  const avatarUrl = image ?? "/default_avatar.png";
  return (
    <article className="bg-background2 relative flex h-full w-full flex-col items-center justify-center space-y-2 rounded-2xl p-4">
      <div className="bg-background3 relative aspect-5/4 w-full rounded-2xl">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill={true}
          />
        )}
      </div>

      {/*TODO: Reevaluate header level once page is fully developed*/}
      <h3 className="w-full truncate text-lg font-semibold xl:text-xl">
        <Link href="/" className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>

      <dl className="inline-flex w-full justify-between space-x-2 xl:text-lg">
        <div className="inline-flex max-w-1/2 space-x-1 truncate">
          <dt>Price:</dt>
          <dd>
            {price ? (
              <data value={price}>{formatPrice(price)}</data>
            ) : (
              <span>N/A</span>
            )}
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

      {/* Show Owner */}
      {owner && (
        <Link
          href={`/profile/${encodeURIComponent(username ?? "")}`}
          className="z-10 flex items-center gap-2 self-start pr-1 xl:text-lg"
        >
          <div className="relative aspect-square size-[calc(1lh+0.5rem)] overflow-hidden rounded-full">
            <Image
              src={avatarUrl}
              alt={`${name}'s avatar`}
              fill
              className="object-contain"
            />
          </div>
          <span>{name}</span>
        </Link>
      )}
    </article>
  );
}
