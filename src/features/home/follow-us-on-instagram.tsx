import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { INSTAGRAM_POSTS, INSTAGRAM_PROFILE_URL } from "./instagram-posts";

function InstagramGlyph({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FollowUsOnInstagram() {
  return (
    <section className="bg-background py-10 sm:py-12">
      <Container className="max-w-[90rem]">
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Heading
            variant="display"
            as="h2"
            className="min-w-0 text-[clamp(1.65rem,3.6vw,2.85rem)] leading-none"
          >
            Follow us on Instagram
          </Heading>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cocoa-espresso px-5 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Follow us
            <InstagramGlyph size={16} />
          </a>
        </header>

        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <li key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 767px) calc(50vw - 1.5rem), calc(25vw - 2rem)"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-cocoa-espresso/0 transition-colors duration-200 group-hover:bg-cocoa-espresso/45 group-focus-visible:bg-cocoa-espresso/45"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center text-oat-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <InstagramGlyph />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
