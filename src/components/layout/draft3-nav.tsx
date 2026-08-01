"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DRAFT3_BASE, draft3Path } from "@/lib/draft3";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Products", href: draft3Path("/products") },
  { label: "About", href: draft3Path("/about") },
  { label: "Contact", href: draft3Path("/contact") },
] as const;

export function Draft3Nav() {
  const pathname = usePathname();
  const isHome = pathname === DRAFT3_BASE || pathname === `${DRAFT3_BASE}/`;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = !isHome || scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "transition-colors duration-300",
          solid
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-transparent text-primary-foreground",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={DRAFT3_BASE}
            className="font-display text-2xl uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
            aria-label="Mornfreak home"
          >
            MORNFREAK
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm font-semibold uppercase tracking-wide transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster: reserved Login slot + shop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Future: <Link href={draft3Path("/login")}>Log in</Link> */}
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="cursor-not-allowed border border-primary-foreground/30 bg-transparent text-primary-foreground opacity-90 hover:bg-primary-foreground/10"
            >
              Shop — Coming Soon
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center text-primary-foreground transition-colors hover:bg-primary-foreground/10 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-primary-foreground/20 bg-primary md:hidden">
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-primary-foreground/20 pt-3">
                {/* Future: Log in link */}
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="w-full cursor-not-allowed border border-primary-foreground/30 bg-transparent text-primary-foreground opacity-90"
                >
                  Shop — Coming Soon
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
