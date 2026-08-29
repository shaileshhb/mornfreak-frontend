"use client";

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

import type { ProductHowToUseMedia, ProductHowToUseStep } from "./types";

const SHAPE_CLASS = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

type ProductHowToUseSectionProps = {
  productId: ProductId;
  steps: ProductHowToUseStep[];
  media?: ProductHowToUseMedia;
};

export function ProductHowToUseSection({
  productId,
  steps,
  media,
}: ProductHowToUseSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  if (steps.length === 0) return null;

  return (
    <Section ref={ref} data-product={productId} className="bg-background">
      <Container>
        <div className="rounded-3xl bg-oat-cream px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div
            className={cn(
              "grid items-start gap-10 lg:gap-16",
              media && "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
            )}
          >
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-ink/55">
                How to Use
              </p>
              <Heading
                variant="h2"
                as="h2"
                className="mt-4 leading-[0.95] text-ink"
              >
                Ready in Seconds.
              </Heading>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
                No blender. No stove. No cleanup.
              </p>

              <ol className="mt-10">
                {steps.map((step, index) => (
                  <li
                    key={step.text}
                    className={cn(
                      "relative flex gap-4 pb-8 last:pb-0",
                      "before:absolute before:bottom-0 before:left-5 before:top-12 before:w-px before:bg-ink/15 last:before:hidden",
                      "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
                      inView
                        ? "motion-safe:translate-y-0 motion-safe:opacity-100"
                        : "motion-safe:translate-y-4 motion-safe:opacity-0",
                    )}
                    style={{
                      transitionDelay: inView ? `${index * 80}ms` : "0ms",
                    }}
                  >
                    <span
                      aria-hidden
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-sans text-sm font-semibold tabular-nums text-paper"
                    >
                      {index + 1}
                    </span>
                    <p className="pt-2 font-sans text-base leading-relaxed text-ink sm:text-lg">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {media ? (
              <figure
                className={cn(
                  "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
                  inView
                    ? "motion-safe:translate-y-0 motion-safe:opacity-100"
                    : "motion-safe:translate-y-4 motion-safe:opacity-0",
                )}
                style={{
                  transitionDelay: inView ? `${steps.length * 80}ms` : "0ms",
                }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[1.75rem] bg-white",
                    SHAPE_CLASS[media.shape],
                  )}
                >
                  <Image
                    src={media.url}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                {media.caption ? (
                  <figcaption className="mt-4 text-center font-sans text-sm text-ink/55">
                    {media.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
