"use client";

import { ChevronDown, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-[#fff9ef]/95 backdrop-blur-md">
      <nav aria-label="Main navigation">
        <div className="mx-auto grid h-[4.75rem] w-full max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
          <div className="hidden items-center gap-8 md:flex">
            <div className="group relative">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-[0.16em] hover:text-primary"
              >
                Shop <ChevronDown aria-hidden size={14} />
              </Link>
              <div className="invisible absolute left-0 top-full w-56 translate-y-2 border border-foreground/10 bg-[#fff9ef] p-4 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link className="block py-2 text-sm hover:text-primary" href="/products">
                  Protein Oats
                </Link>
                <Link className="block py-2 text-sm hover:text-primary" href="/products">
                  Peanut Butter Powder
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-[0.16em] hover:text-primary"
            >
              Learn
            </Link>
          </div>

          <Link
            href="/"
            className="col-start-2 text-center text-foreground transition-colors hover:text-primary"
            aria-label="Mornfreak home"
          >
            <span className="block font-display text-3xl uppercase leading-none tracking-[0.08em]">
              Mornfreak
            </span>
            <span className="mt-1 block font-sans text-[0.55rem] font-bold uppercase tracking-[0.28em]">
              Fuel your start!
            </span>
          </Link>

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
            className="col-start-1 row-start-1 flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-foreground/10 bg-[#fff9ef] md:hidden">
            <div className="flex flex-col px-4 py-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
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
