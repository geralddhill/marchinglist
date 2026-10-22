"use client";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import UserNavButton from "@/components/Navbar/user-nav-button";
import NavLink from "@/components/Navbar/nav-link";
import NavHeader from "@/components/Navbar/nav-header";
import { SignInButton, SignUpButton } from "@/components/Navbar/buttons";
import AddButton from "@/components/Navbar/add-button";

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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Mobile menu scroll lock
  useEffect(() => {
    if (!showMenu) return;

    // 1. Lock body scroll (compensate for the vanishing scrollbar to avoid layout shift)
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;

    // 2. Make everything behind the menu inert
    const behind = document.querySelectorAll<HTMLElement>(
      ".data-inert-when-menu-open",
    );
    behind.forEach((el) => (el.inert = true));

    // 3. Move focus into the menu
    menuRef.current?.querySelector<HTMLElement>("nav > a, nav > button")?.focus();

    // 4. Close on Escape
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMenu(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // Close if the viewport grows past the mobile breakpoint
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setShowMenu(false);
    mq.addEventListener("change", onMq);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onMq);
      behind.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;

      // 5. Return focus to the toggle (after inert is removed)
      toggleRef.current?.focus();
    };
  }, [showMenu]);

  const {data: session, isPending} = authClient.useSession();


  // Passed to UserNavButton
  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div className="bg-background2 relative h-24 w-full md:px-12 lg:flex xl:h-32 xl:px-20">
      <div className="flex h-full min-w-full items-center justify-between gap-4 px-4 lg:min-w-0 lg:gap-0 2xl:px-8">

        {/* Logo Header */}
        <NavHeader />

        {/* Sign Up Button or User Nav Button (MOBILE ONLY) */}
        <div className="flex h-full items-center justify-end gap-4 py-6 sm:gap-8 lg:hidden">
          {!isPending &&
            (session ? (
              <UserNavButton user={session.user} handleSignOut={handleSignOut} />
            ) : (
              <SignUpButton setShowMenu={setShowMenu} />
            ))}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-expanded={showMenu}
            aria-label="mobile navigation menu"
            aria-controls="nav-menu"
            className="cursor-pointer p-1"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            ref={toggleRef}
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
        ref={menuRef}
        aria-label="Main"
      >
        <ul
          id="nav-menu"
          className={cn("w-full flex-col lg:h-full lg:flex-row first:border-t first:border-t-background3", {
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

      {/* Sign In/Up Buttons (NON-MOBILE) */}
      <div className="hidden p-4 lg:flex lg:w-lg xl:p-6 2xl:w-4xl">
        {!isPending &&
          (session ? (
            <div className="flex h-full w-full items-center justify-end gap-8">
              <AddButton/>
              <UserNavButton user={session.user} handleSignOut={handleSignOut} />
            </div>
          ) : (
            <div className="flex h-full w-full flex-auto items-center gap-4">
              <SignInButton setShowMenu={setShowMenu}/>
              <SignUpButton setShowMenu={setShowMenu}/>
            </div>
          ))}
      </div>
    </div>
  );
}
