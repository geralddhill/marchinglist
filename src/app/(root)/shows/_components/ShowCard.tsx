import { Image } from "next/dist/client/image-component";
import { formatDuration, formatPrice, secondsToISO } from "@/lib/utils";
import Link from "next/dist/client/link";
import UserButton from "@/components/UserButton";

type Show = {
  title: string;
  slug: string;
  price: number | null;
  duration: number;
  thumbnailUrl: string | null;
  difficulty: "beginning" | "intermediate" | "advanced";
  owner?:
    | {
        name: string;
        username: string | null;
        image: string | null;
      }
    | undefined;
};

export default function ShowCard({ show }: { show: Show }) {
  const {title, slug, price, duration, thumbnailUrl, difficulty, owner} = show;
  const {name, username, image} = owner ?? {name: "", username: null};
  const avatarUrl = image ?? "/default_avatar.png";
  return (
    <article className="bg-background2 relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl p-4">
      <div className="bg-background3 relative aspect-5/4 w-full overflow-hidden rounded-2xl">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1536px) 33vw, 25vw"
            loading="eager"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      {/*TODO: Reevaluate header level once page is fully developed*/}
      <h3 className="w-full truncate text-lg font-semibold xl:text-xl">
        <Link
          href={`/shows/${encodeURIComponent(slug)}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          {title}
        </Link>
      </h3>

      <dl className="inline-flex w-full justify-between gap-2 xl:text-lg">
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
      <dl className="inline-flex w-full gap-1 truncate xl:text-lg">
        <dt>Difficulty:</dt>
        <dd className="capitalize">{difficulty}</dd>
      </dl>

      {/* Show Owner */}
      {owner && (
        <UserButton
          user={{ name, username, avatarUrl }}
          className="bg-background3 xl:text-lg"
        />
      )}
    </article>
  );
}
