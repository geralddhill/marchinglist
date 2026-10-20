import { notFound } from "next/dist/client/components/not-found";
import { findPublishedShowBySlug } from "@/data/shows/queries";
import { Image } from "next/dist/client/image-component";
import { cn, formatDuration, formatPrice, secondsToISO } from "@/lib/utils";
import UserButton from "@/components/UserButton";
import { slugSchema } from "@/lib/slug";


export const instant = false;

export default async function Page({ params }: { params: Promise<{ showSlug: string }> }) {
  const {showSlug} = await params;
  const parsedSlug = slugSchema.safeParse(showSlug);
  if (!parsedSlug.success) return notFound()

  const show = await findPublishedShowBySlug(parsedSlug.data);
  if (!show) notFound();

  const {title, price, duration, thumbnailUrl, description, difficulty, owner} = show;
  const { name, username, image } = owner;
  const avatarUrl = image ?? "/default_avatar.png";

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
            user={{ name, username, avatarUrl }}
          />
        </div>
        {thumbnailUrl && (
          <div className="flex-1 px-4 md:px-0">
            <div className="relative aspect-5/4 h-auto w-full">
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                sizes="50vw"
                loading="eager"
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
          user={{ name, username, avatarUrl }}
        />
      </header>

      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        Description
      </h2>
      <p className="whitespace-pre-wrap sm:text-lg">{description}</p>
    </main>
  );
}

type BasicInfoProps = {
  price: number;
  duration: number;
  difficulty: "beginning" | "intermediate" | "advanced";
  user: {
    name: string;
    username: string | null;
    avatarUrl: string;
  }
  className?: string;
};

function BasicInfo({price, duration, difficulty, user, className}: BasicInfoProps) {
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
      <dl className="inline-flex w-full gap-1 truncate border-b-2 p-4">
        <dt>Difficulty:</dt>
        <dd className="capitalize">{difficulty}</dd>
      </dl>
      <UserButton
        user={user}
        className="bg-background2 m-2 text-xl sm:text-2xl"
      />
    </div>
  );
}