import { Image } from "next/dist/client/image-component";
import { formatDuration } from "@/lib/utils";
import Link from "next/dist/client/link";

type ShowCardProps = {
  title: string;
  price: number;
  duration: number;
  thumbnail_url: string;
};

export default function ShowCard({
  title,
  price,
  duration,
  thumbnail_url,
}: ShowCardProps) {
  return (
    <article className="relative flex w-full flex-col items-center justify-center space-y-2 rounded-2xl bg-gray-900 p-4">
      <div className="relative aspect-5/4 w-full">
        <Image src={thumbnail_url} alt={`Thumbnail for ${title}`} fill={true} />
      </div>
      {/*TODO: Reevaluate header level once page is fully developed*/}
      <h3 className="w-full text-lg font-semibold xl:text-xl">
        <Link href="/" className="after:absolute after:inset-0">{title}</Link>
      </h3>
      <p className="inline-flex w-full justify-between space-x-2 md:text-sm xl:text-lg">
        <span className="text-nowrap">Price: ${price}</span>
        <span className="text-nowrap">
          Duration: {formatDuration(duration)}
        </span>
      </p>
    </article>
  );
}
