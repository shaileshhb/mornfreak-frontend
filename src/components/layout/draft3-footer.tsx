"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { DRAFT3_BASE, draft3Path } from "@/lib/draft3";

const NAV_LINKS = [
  { label: "Products", href: draft3Path("/products") },
  { label: "About", href: draft3Path("/about") },
  { label: "Contact", href: draft3Path("/contact") },
] as const;

export function Draft3Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href={DRAFT3_BASE}
              className="font-display text-3xl uppercase tracking-[0.04em] text-orange"
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
              className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-primary-foreground/60 transition-colors hover:text-orange"
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

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Explore
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

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              Stay in the loop
            </p>
            <p className="mt-4 font-sans text-sm text-primary-foreground/60">
              Be first to know when we launch new products and drops.
            </p>
            {submitted ? (
              <p className="mt-4 font-sans text-sm font-medium text-orange">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-2"
                id="draft3-newsletter"
              >
                <label htmlFor="draft3-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="draft3-newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border border-primary-foreground/20 bg-primary-foreground/10 px-3 font-sans text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full bg-orange text-orange-foreground hover:bg-orange/90"
                >
                  Notify Me
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 py-6">
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Mornfreak. Draft preview — not indexed.
          </p>
        </div>
      </div>
    </footer>
  );
}
