import Link from "next/dist/client/link";
import type { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

export function SignUpButton({
  setShowMenu,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname()

  return (
    <Link
      href={`/sign-up?from=${encodeURIComponent(pathname)}`}
      className="btn-primary w-full px-4 text-base sm:text-xl lg:text-2xl"
      onClick={() => {
        setShowMenu(false);
      }}
    >
      Sign Up
    </Link>
  );
}

export function SignInButton({
  setShowMenu,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={`/sign-in?from=${encodeURIComponent(pathname)}`}
      className="btn-secondary hidden w-full px-4 2xl:flex"
      onClick={() => {
        setShowMenu(false);
      }}
    >
      Sign In
    </Link>
  );
}
