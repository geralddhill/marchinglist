"use client";

import NavHeader from "@/components/Navbar/nav-header";
import { UserButton } from "@/components/auth/user/user-button";
import { ListMusic, User } from "lucide-react";
import AddButton from "@/components/Navbar/add-button";


export default function Navbar() {
  return (
    <header className="z-50 flex h-14 w-full items-center justify-between border-b px-4">
      <NavHeader className="h-full max-w-1/2" />
      <div className="flex items-center gap-4 max-w-1/2">
        <AddButton/>
        <UserButton
          size="icon"
          links={[
            {
              label: "My Shows",
              href: "/my-shows",
              icon: <ListMusic className="text-muted-foreground" />,
              visibility: "authenticated",
            },
            {
              label: "Profile",
              href: "/profile",
              icon: <User className="text-muted-foreground" />,
              visibility: "authenticated",
            },
          ]}
        />
      </div>
    </header>
  );
}