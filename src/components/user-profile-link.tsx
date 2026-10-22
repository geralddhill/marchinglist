import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";
import { UserView } from "@/components/auth/user/user-view";
import { Button } from "@/components/ui/button";


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
export default function UserProfileLink({user, className}: UserButtonProps) {
  const { username } = user;

  return (
    <Button asChild variant="ghost" className={cn("py-6 max-w-full", className)}>
      <Link href={`/profile/${encodeURIComponent(username ?? "")}`} className="flex items-center justify-start z-20">
        <UserView hideSubtitle user={user}/>
      </Link>
    </Button>
  );
}