"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "../ui/button";

const PRODUCT_LINKS = [
  { label: "Protein Oats", href: "/products/protein-oats" },
  { label: "Peanut Butter Powder", href: "/products/peanut-butter-powder" },
] as const;

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-3xl tracking-wide uppercase text-primary"
              aria-label="Mornfreak"
            >
              MORNFREAK
            </Link>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-primary-foreground/60">
              Protein-forward breakfast for people who train, work, and move
              fast in the morning.
            </p>
            <a
              href="https://www.instagram.com/mornfreak"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-primary-foreground/60 transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @mornfreak
            </a>
          </div>

          {/* Products */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Products
            </p>
            <ul className="mt-4 space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Stay in the loop
            </p>
            <p className="mt-4 font-sans text-sm text-primary-foreground/60">
              Be first to know when we launch new products and drops.
            </p>
            {submitted ? (
              <p className="mt-4 font-sans text-sm font-medium text-primary">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2" id="newsletter">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 font-sans text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <Button type="submit" variant="primary" size="sm" className="w-full">
                  Notify Me
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Mornfreak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
