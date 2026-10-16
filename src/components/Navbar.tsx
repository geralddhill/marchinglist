"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import UserButton from "@/components/UserButton";
import NavLink from "@/components/NavLink";
import NavHeader from "@/components/NavHeader";

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

  const {data: session, isPending} = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div className="bg-background2 relative h-24 w-full sm:px-12 lg:flex xl:h-32 xl:px-20">
      <div className="flex h-full min-w-full items-center justify-between space-x-4 px-4 lg:min-w-0 lg:space-x-0 2xl:px-8">
        {/* Logo Header */}
        <NavHeader />

        <div className="flex h-full items-center justify-end space-x-4 py-6 sm:space-x-8 lg:hidden">
          {/* Sign Up Button (Mobile) */}
          {!isPending &&
            (session ? (
              <UserButton user={session.user} handleSignOut={handleSignOut} />
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
            ))}

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
          "bg-background2 absolute top-full z-50 w-full lg:static lg:h-full",
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
            return (
              <li key={href} className="flex-1">
                <NavLink href={href}>
                  <div className="ml-12 lg:ml-0">{label}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign In/Up Buttons */}
      <div className="hidden p-4 lg:flex lg:w-lg xl:p-6 2xl:w-4xl">
        {!isPending &&
          (session ? (
            <div className="flex h-full w-full items-center justify-end">
              <UserButton user={session.user} handleSignOut={handleSignOut} />
            </div>
          ) : (
            <div className="flex h-full w-full flex-auto items-center space-x-4">
              <Link
                href="/signin"
                className="btn-secondary hidden w-full py-4 2xl:flex"
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
          ))}
      </div>
    </div>
  );
}
