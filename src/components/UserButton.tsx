import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import { cn } from "@/lib/utils";

type User = {
  name: string;
  username: string | null;
  avatarUrl: string;
}

export default function UserButton({user, className}: {user: User, className?: string}) {
  const {name, username, avatarUrl} = user;

  return (
    <Link
      href={`/profile/${encodeURIComponent(username ?? "")}`}
      className={cn(
        "z-10 flex items-center gap-2 self-start rounded-full p-1 pr-1 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      <div className="relative aspect-square size-[calc(1lh+0.5rem)] overflow-hidden rounded-full">
        <Image
          src={avatarUrl}
          alt={`${name}'s avatar`}
          fill
          className="object-cover"
        />
      </div>
      <span className="pr-2">{name}</span>
    </Link>
  );
}