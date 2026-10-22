import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import { cn } from "@/lib/utils";


type UserButtonProps = {
  user: {
    name: string;
    username: string | null;
    avatarUrl: string;
  };
  className?: string;
};

/**
 * Display user's name and avatar and links to their profile page
 */
export default function UserButton({user, className}: UserButtonProps) {
  const {name, username, avatarUrl} = user;

  return (
    <Link
      href={`/profile/${encodeURIComponent(username ?? "")}`}
      className={cn(
        "max-w-full z-10 flex items-center gap-2 self-start rounded-full p-1 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <div className="relative aspect-square size-[calc(1lh+0.5rem)] overflow-hidden rounded-full">
        <Image
          src={avatarUrl}
          alt={`${name}'s avatar`}
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>
      <span className="pr-2 truncate">{name}</span>
    </Link>
  );
}