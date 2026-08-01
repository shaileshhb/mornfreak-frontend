"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

const GRID_TILES = [
  { src: "/images/oats_1.jpeg", alt: "Mornfreak Protein Oats pack", span: "col-span-1 row-span-2" },
  { src: "/images/oats_2.jpeg", alt: "Protein Oats serving suggestion" },
  { src: "/images/peanut_butter_powder_1.jpeg", alt: "Mornfreak Peanut Butter Powder" },
  { src: "/images/peanut_butter_powder_2.jpeg", alt: "Peanut Butter Powder in use" },
  { src: null, alt: "Mornfreak on Instagram — placeholder", gradient: "from-orange to-primary" },
  { src: null, alt: "Mornfreak on Instagram — placeholder", gradient: "from-primary to-orange" },
];

export function InstagramTeaser() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <Section>
      <Container>
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center gap-10 transition-all duration-700",
            inView ? "animate-rise opacity-100" : "opacity-0",
          )}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Follow the journey
            </span>
            <Heading variant="h2">@mornfreak</Heading>
            <Text variant="lead">
              Real mornings. Real food. Real results.
            </Text>
          </div>

          {/* Grid */}
          <div className="grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {GRID_TILES.map((tile, i) => (
              <a
                key={i}
                href="https://www.instagram.com/mornfreak"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block overflow-hidden rounded-lg bg-secondary",
                  tile.span ?? "aspect-square",
                  !tile.span && "aspect-square",
                )}
                aria-label={tile.alt}
              >
                {tile.src ? (
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      tile.gradient,
                      "opacity-90 transition-opacity group-hover:opacity-100",
                    )}
                  >
                    <div className="flex h-full items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                  </div>
                )}
                {/* Hover overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10"
                />
              </a>
            ))}
          </div>

          <a
            href="https://www.instagram.com/mornfreak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="md">
              Follow @mornfreak
            </Button>
          </a>
        </div>
      </Container>
    </Section>
  );
}
