"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/dist/client/components/navigation";
import Logo from "@/components/Logo";

const navLinks: {
  href: string;
  label: string;
}[] = [
  {href: "/", label: "Home" },
  { href: "/page1", label: "Option 1" },
  { href: "/page2", label: "Option 2" },
  { href: "/page3", label: "Option 3" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const Wrapper = pathname === "/" ? "h1" : "span"

  return (
    <div className="relative flex w-full flex-col bg-gray-900 md:static md:flex-row md:px-24 xl:px-36 2xl:px-64">
      <header className="flex w-full items-center justify-between">
        <Link
          aria-current={pathname === "/" ? "page" : undefined}
          aria-label="MarchingList home"
          href="/public"
          className="flex items-center h-full w-full p-6 2xl:px-12 2xl:py-0 focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <Logo className="h-auto w-full"/>
          <Wrapper className="sr-only">MarchingList home</Wrapper>
        </Link>
        <button
          type="button"
          aria-expanded={showMenu}
          aria-label="mobile menu"
          aria-controls="menu"
          className="cursor-pointer p-8 focus-visible:outline-2 focus-visible:-outline-offset-2 md:hidden"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Menu size={36} strokeWidth={3} />
        </button>
      </header>
      <nav className="absolute top-full z-10 w-full md:relative">
        <ul
          id="menu"
          className={cn(
            "w-full flex-col items-center text-nowrap md:flex-row md:justify-end",
            {
              "flex": showMenu,
              "hidden md:flex": !showMenu,
            },
          )}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href} className="relative z-10 min-w-full md:min-w-1/5">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block w-full p-8 text-xl font-semibold hover:bg-gray-800 focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-6 md:py-10 md:text-center xl:text-2xl",
                    {
                      "bg-gray-800": isActive,
                      "bg-gray-900": !isActive,
                    },
                  )}
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="w-full md:w-1/5">
            <Link
              href="/login"
              className="md:bg-foreground md:hover:bg-foreground block w-full bg-gray-900 p-8 text-xl font-semibold hover:bg-gray-800 focus-visible:outline-2 focus-visible:-outline-offset-2 md:m-8 md:rounded-4xl md:p-10 md:px-4 md:py-2 md:text-center md:text-gray-900 xl:text-2xl"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
