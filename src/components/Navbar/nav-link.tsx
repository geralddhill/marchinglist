"use client"
import { ReactNode, Suspense } from "react";
import Link from "next/dist/client/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/dist/client/components/navigation";

type Props = {
  href: string;
  onClick?: () => void;
  children: ReactNode;
}

function ActiveLink({ href, onClick, children }: Props) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href + '/');

  return (
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
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function NavLink({ href, onClick, children }: Props) {
  return (
    <Suspense
      fallback={
        <Link
          href={href}
          className="hover:bg-background3 border-b-background3 background-2 flex h-24 w-full items-center border-b text-2xl font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 lg:h-full lg:justify-center lg:border-b-0 xl:text-3xl"
          onClick={onClick}
        >
          {children}
        </Link>
      }
    >
      <ActiveLink href={href} onClick={onClick}>
        {children}
      </ActiveLink>
    </Suspense>
  );
}