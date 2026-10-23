"use client";

import NavHeader from "@/components/Navbar/nav-header";
import { UserButton } from "@/components/auth/user/user-button";
import { ListMusic, User } from "lucide-react";


export default function Navbar() {
  return (
    <header className="z-50 flex h-14 w-full items-center justify-between border-b px-4">
      <NavHeader className="max-w-1/2 h-full"/>
      <UserButton size="icon" links={[
        {
          label: "My Shows",
          href: "/my-shows",
          icon: <ListMusic className="text-muted-foreground"/>,
          visibility: "authenticated"
        },
        {
          label: "Profile",
          href: "/profile",
          icon: <User className="text-muted-foreground"/>,
          visibility: "authenticated"
        }
      ]}/>
    </header>
  );
}