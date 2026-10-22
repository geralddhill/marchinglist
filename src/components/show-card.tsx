import { Image } from "next/dist/client/image-component";
import { cn, formatDuration, formatPrice, secondsToISO } from "@/lib/utils";
import Link from "next/dist/client/link";
import UserButton from "@/components/user-button";

export type ShowData = {
  title: string;
  slug: string;
  price: number;
  duration: number;
  thumbnailUrl: string | null;
  difficulty: "beginning" | "intermediate" | "advanced";
  published?: boolean | undefined;
  owner?:
    | {
        name: string;
        username: string | null;
        image: string | null;
      }
    | undefined;
};

export default function ShowCard({ show, toEdit = false }: { show: ShowData, toEdit?: boolean }) {
  const {title, slug, price, duration, thumbnailUrl, difficulty, owner, published} = show;
  const {name, username, image} = owner ?? {name: "", username: null};
  const avatarUrl = image ?? "/default_avatar.png";
  return (
    <article className="bg-background2 relative flex h-full w-64 flex-col items-center justify-center gap-2 rounded-2xl p-4">
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

      <h3 className="w-full truncate text-lg font-semibold xl:text-xl">
        <Link
          href={`/${toEdit ? "my-shows" : "shows"}/${encodeURIComponent(slug)}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          {title}
        </Link>
      </h3>

      <dl className="inline-flex w-full justify-between gap-2 xl:text-lg">
        <div className="inline-flex max-w-1/2 gap-1 truncate">
          <dt>Price:</dt>
          <dd>
            <data value={price}>{formatPrice(price)}</data>
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
          className="bg-background3 w-full xl:text-lg"
        />
      )}

      {published !== undefined && (
        <p
          className={cn("w-full truncate xl:text-lg", {
            "text-green-500": published,
            "text-red-500": !published,
          })}
        >
          {published ? "Published" : "Unpublished"}
        </p>
      )}
    </article>
  );
}
