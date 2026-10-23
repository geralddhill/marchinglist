import { Image } from "next/dist/client/image-component";
import { formatDuration, formatPrice, secondsToISO } from "@/features/shows/utils";
import Link from "next/dist/client/link";
import UserProfileLink from "@/features/users/components/user-profile-link";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function ShowCard({show, toEdit = false}: {show: ShowData, toEdit?: boolean}) {
  const {
    title,
    slug,
    price,
    duration,
    thumbnailUrl,
    difficulty,
    owner,
    published,
  } = show;

  return (
    <article>
      <Card className="[&:hover:not(:has(.user-profile-button:hover))]:bg-muted relative w-full max-w-sm min-w-64 pt-0 transition-all active:not-aria-[haspopup]:translate-y-px">
        <div className="bg-muted relative aspect-5/4 w-full">
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

        <CardHeader>
          <CardTitle className="truncate">
            <h3>
              <Link
                href={`/${toEdit ? "my-shows" : "shows"}/${encodeURIComponent(slug)}`}
                className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                {title}
              </Link>
            </h3>
          </CardTitle>
          {published !== undefined && (
            <CardAction>
              <Badge variant={published ? "green" : "destructive"}>
                {published ? "Published" : "Unpublished"}
              </Badge>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-1">
          <Badge className="capitalize">{difficulty}</Badge>
          <dl className="inline-flex w-full justify-between divide-x px-1 py-2">
            <div className="inline-flex max-w-1/2 flex-1 gap-1 truncate">
              <dt>Price:</dt>
              <dd>
                <data value={price}>{formatPrice(price)}</data>
              </dd>
            </div>

            <div className="inline-flex max-w-1/2 flex-1 justify-end gap-1 truncate">
              <dt>Duration:</dt>
              <dd>
                <time dateTime={secondsToISO(duration)}>
                  {formatDuration(duration)}
                </time>
              </dd>
            </div>
          </dl>
          {owner && <UserProfileLink user={owner} className="self-start user-profile-button" />}
        </CardContent>
      </Card>
    </article>
  );
}