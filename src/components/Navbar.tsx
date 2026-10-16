"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/dist/client/components/navigation";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import UserButton from "@/components/UserButton";

const navLinks: {
  href: string;
  label: string;
}[] = [
  { href: "/", label: "Home" },
  { href: "/page1", label: "Option 1" },
  { href: "/page2", label: "Option 2" },
  { href: "/page3", label: "Option 3" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const Wrapper = pathname === "/" ? "h1" : "span";

  const session_full = authClient.useSession();
  const session = session_full.data;
  console.log(session_full);

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div className="bg-background2 relative h-24 w-full sm:px-12 lg:flex xl:h-32 xl:px-20">
      <div className="flex h-full min-w-full items-center justify-between space-x-4 px-4 lg:min-w-0 lg:space-x-0 2xl:px-8">
        {/* Logo Header */}
        <header className="w-38 sm:w-3xs lg:w-lg 2xl:w-4xl">
          <Link
            aria-current={pathname === "/" ? "page" : undefined}
            aria-label="MarchingList home"
            href="/"
            className="block w-full p-1"
          >
            <Logo className="w-full" />
            <Wrapper className="sr-only">MarchingList home</Wrapper>
          </Link>
        </header>

        <div className="flex h-full items-center justify-end space-x-4 sm:space-x-8 py-6 lg:hidden">
          {/* Sign Up Button (Mobile) */}
          {session ? (
            <UserButton avatarUrl={session.user?.image ?? undefined} handleSignOut={handleSignOut} />
          ) : (
            <Link
              href="/signup"
              className="btn-primary px-4 text-base sm:text-xl"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Sign Up
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-expanded={showMenu}
            aria-label="mobile menu"
            aria-controls="menu"
            className="cursor-pointer p-1"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <Menu strokeWidth={3} className="h-10 w-10 sm:h-12 sm:w-12" />
          </button>
        </div>
      </div>

      {/* Nav Button List */}
      <nav
        className={cn(
          "bg-background2 absolute top-full z-10 w-full lg:static lg:h-full",
          {
            "lg:py=0 py-5": showMenu,
          },
        )}
      >
        <ul
          id="menu"
          className={cn("w-full flex-col lg:h-full lg:flex-row", {
            flex: showMenu,
            "hidden lg:flex": !showMenu,
          })}
        >
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "hover:bg-background3 border-b-background3 flex h-24 w-full items-center border-b text-2xl font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 lg:h-full lg:justify-center lg:border-b-0 xl:text-3xl",
                    {
                      "bg-background3": isActive,
                      "bg-background2": !isActive,
                    },
                  )}
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  <div className="ml-12 lg:ml-0">{label}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign In/Up Buttons */}
      <div className="hidden p-4 lg:flex lg:w-lg xl:p-6 2xl:w-4xl">
        {session ? (
          <div className="flex h-full w-full items-center justify-end">
            <UserButton avatarUrl={session.user?.image || undefined} handleSignOut={handleSignOut} />
          </div>
        ) : (
          <div className="flex h-full w-full flex-auto items-center space-x-4">
            <Link
              href="/signin"
              className="btn-primary hidden w-full py-4 2xl:flex"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="btn-primary w-full py-4"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
