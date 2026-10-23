import Link from "next/dist/client/link";
import Logo from "@/components/logo";
import { usePathname } from "next/dist/client/components/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

function Header({className}: {className?: string}) {
  const pathname = usePathname();
  const Wrapper = pathname === "/" ? "h1" : "span";

  return (
    <div className={cn("flex items-center", className)}>
      <Link
        aria-current={pathname === "/" ? "page" : undefined}
        aria-label="MarchingList home"
        href="/"
        className="block w-full p-1 shrink"
      >
        <Logo className="w-full" />
        <Wrapper className="sr-only">MarchingList home</Wrapper>
      </Link>
    </div>
  );
}

export default function NavHeader({className}: {className?: string}) {
  return (
    <Suspense
      fallback={
        <div className={cn("flex items-center", className)}>
          <Link
            aria-label="MarchingList home"
            href="/public"
            className="block w-full p-1 shrink"
          >
            <Logo className="w-full" />
            <span className="sr-only">MarchingList home</span>
          </Link>
        </div>
      }
    >
      <Header className={className} />
    </Suspense>
  );
}