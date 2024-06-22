"use client";
import Link from "next/link";
import { ModeToggle } from "../theme-dropdown";
import { Button } from "../ui/button";
import { ExternalNavLink } from "./external-navlink";
import { NavLink } from "./navlink";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { getClientSession } from "@/lib/auth/client";
import { NavLogo } from "./navlogo";
import { usePathname } from "next/navigation";
import { Logout } from "@/components/logout-form";
import { useUser } from "@/hooks/user-user";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0 && !scrolled) {
      setScrolled(true);
    } else if (latest == 0) {
      setScrolled(false);
    }
  });

  const { loggedIn } = useUser();

  return (
    <nav
      className={cn(
        "sticky top-0 px-4 sm:px-28 py-3 flex justify-between items-center border-transparent",
        {
          "backdrop-blur-sm z-10 border-b-[0.3px] border-gray-800": scrolled,
        }
      )}
    >
      <NavLogo />

      <div className="flex justify-center items-center gap-6">
        <NavLink name="dictionary" href="/dictionary" />
        <NavLink name="jokes" href="/jokes" />

        {/* TODO : update the href to the posted blog's href */}
        <ExternalNavLink name="blog" href="/" />
        {loggedIn ? (
          pathname === "/" ? (
            <Link href={"/feedback"}>
              <Button variant={"secondary"}>Dashboard</Button>
            </Link>
          ) : (
            <Logout />
          )
        ) : (
          <Link href={"/login"}>
            <Button variant={"secondary"}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
