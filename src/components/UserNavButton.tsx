import { DropdownMenu } from "radix-ui";
import { Image } from "next/dist/client/image-component";
import Link from "next/dist/client/link";

type User = {
  username?: string | null | undefined;
  image?: string | null | undefined;
}

export default function UserNavButton({user, handleSignOut}: {user: User, handleSignOut: () => void}) {
  const {username, image} = user;
  const avatarUrl = image ?? "/default_avatar.png"

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="relative aspect-square h-full cursor-pointer overflow-hidden rounded-full bg-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none">
          <Image
            src={avatarUrl}
            alt="Your profile photo"
            fill
            sizes="33vw"
            style={{ objectFit: "cover" }}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="border text-xl">
          <DropdownMenu.Item asChild className="hover:outline-0">
            <Link
              href={"/myshows"}
              className="bg-background3 hover:bg-background2 block p-2"
            >
              My Shows
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="hover:outline-0">
            <Link
              href={`/profile/${encodeURIComponent(username ?? "")}`}
              className="bg-background3 hover:bg-background2 block p-2"
            >
              Profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="hover:outline-0">
            <Link
              href="/settings"
              className="bg-background3 hover:bg-background2 block p-2"
            >
              Settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="hover:outline-0">
            <button
              className="bg-background3 hover:bg-background2 p-2 w-full text-left"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-current" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}