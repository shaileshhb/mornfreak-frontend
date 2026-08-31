"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const NAV = [
  { href: "/account/orders", label: "Orders", exact: false },
  { href: "/account", label: "Profile", exact: true },
] as const;

export function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
      <nav
        aria-label="Account"
        className="flex shrink-0 gap-6 md:w-36 md:flex-col md:gap-3"
      >
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-base transition-colors",
                active
                  ? "font-bold text-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
