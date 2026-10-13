"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const navLinks: {
    href: string;
    label: string;
  }[] = [
    { href: "/", label: "Option 1" },
    { href: "/", label: "Option 2" },
    { href: "/", label: "Option 3" },
  ];

  return (
    <nav className="relative flex w-full flex-col bg-gray-900 md:static md:flex-row md:px-24 xl:px-36 2xl:px-64">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="p-8 text-3xl font-bold xl:text-5xl">MarchingList</h1>
        </Link>
        <button
          className="cursor-pointer p-8 md:hidden"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Menu size={36} strokeWidth={3} />
        </button>
      </div>
      <ul
        className={cn(
          "absolute top-full h-full w-full flex-col items-center text-nowrap md:static md:flex-row md:justify-end",
          {
            flex: showMenu,
            "hidden md:flex": !showMenu,
          },
        )}
      >
        {navLinks.map((navLink) => (
          <Link
            key={navLink.label}
            href={navLink.href}
            className="h-full w-full bg-gray-900 hover:bg-gray-800"
          >
            <li className="h-full w-full p-8 md:p-10 text-xl font-semibold md:text-center xl:text-2xl">
              {navLink.label}
            </li>
          </Link>
        ))}
        <Link
          href="/login"
          className="md:bg-foreground md:hover:bg-foreground w-full bg-gray-900 hover:bg-gray-800 md:m-8 md:rounded-4xl md:text-gray-900"
        >
          <li className="w-full p-8 md:p-10 text-xl font-semibold md:px-8 md:py-2 md:text-center xl:text-2xl">
            Log In
          </li>
        </Link>
      </ul>
    </nav>
  );
}
