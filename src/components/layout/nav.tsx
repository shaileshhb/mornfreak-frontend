"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { Button } from "../ui/button";

const NAV_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-300",
        scrolled ? "shadow-md" : "shadow-none",
      )}
    >
      <nav className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl tracking-wide text-primary-foreground uppercase hover:opacity-90 transition-opacity"
            aria-label="Mornfreak — home"
          >
            MORNFREAK
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="cursor-not-allowed opacity-80"
            >
              Coming Soon
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md text-primary-foreground transition-colors hover:bg-primary-foreground/10 md:hidden"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-primary-foreground/20 bg-primary md:hidden">
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2.5 font-sans text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-primary-foreground/20 pt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="w-full cursor-not-allowed opacity-80"
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
