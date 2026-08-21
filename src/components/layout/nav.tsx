"use client";

import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Science", href: "/science" },
] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-card/95 backdrop-blur-md">
      <nav aria-label="Main navigation">
        <div className="mx-auto flex h-[4.75rem] w-full max-w-[90rem] items-center gap-8 px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Mornfreak home">
            <Image
              src="/logo/logo-2.png"
              alt="Mornfreak"
              width={1800}
              height={600}
              style={{ height: "3rem", width: "10rem" }}
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-5 md:flex">
            <Link
              href="/login"
              aria-label="Account login"
              className="transition-colors hover:text-primary"
            >
              <UserRound aria-hidden size={19} />
            </Link>
            <Link
              href="/products"
              aria-label="Shop products"
              className="transition-colors hover:text-primary"
            >
              <ShoppingBag aria-hidden size={19} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="ml-auto flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-foreground/10 bg-card md:hidden">
            <div className="flex flex-col px-4 py-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-foreground/10 px-2 py-4 font-sans text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-2 py-4 font-sans text-sm font-bold uppercase tracking-[0.16em] text-primary"
              >
                Account
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
