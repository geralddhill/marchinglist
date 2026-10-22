import Link from "next/dist/client/link";
import Logo from "@/components/logo";
import { usePathname } from "next/dist/client/components/navigation";
import { Suspense } from "react";

function Header() {
  const pathname = usePathname();
  const Wrapper = pathname === "/" ? "h1" : "span";

  return (
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
  );
}

export default function NavHeader() {
  return (
    <Suspense
      fallback={
        <header className="w-38 sm:w-3xs lg:w-lg 2xl:w-4xl">
          <Link
            aria-label="MarchingList home"
            href="/public"
            className="block w-full p-1"
          >
            <Logo className="w-full" />
            <span className="sr-only">MarchingList home</span>
          </Link>
        </header>
      }
    >
      <Header />
    </Suspense>
  );
}