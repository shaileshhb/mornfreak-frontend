"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ProductSection } from "@/components/common/product-section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

import type { ProductIngredient } from "./types";

type ProductIngredientsSectionProps = {
  productId: ProductId;
  productLabel: string;
  ingredients: ProductIngredient[];
};

function IngredientCard({ ingredient }: { ingredient: ProductIngredient }) {
  return (
    <article className="flex w-[78%] shrink-0 snap-start flex-col sm:w-[46%] md:w-[32%] lg:w-[21%]">
      <div className="relative aspect-[3/4.4] overflow-hidden rounded-full bg-muted">
        <Image
          src={ingredient.image}
          alt={ingredient.imageAlt || ingredient.name}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 768px) 46vw, (max-width: 1024px) 32vw, 21vw"
          className="object-cover object-center"
        />
      </div>
      <h3 className="mt-5 font-sans text-base font-bold text-product-foreground">
        {ingredient.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-product-foreground/65">
        {ingredient.description}
      </p>
    </article>
  );
}

export function ProductIngredientsSection({
  productId,
  productLabel,
  ingredients,
}: ProductIngredientsSectionProps) {
  const labelId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.children) as HTMLElement[];
    if (cards.length === 0) return;

    const { scrollLeft, clientWidth, scrollWidth } = scroller;
    const midpoint = scrollLeft + clientWidth / 2;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - midpoint);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, ingredients.length]);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () =>
    scrollToIndex(Math.min(ingredients.length - 1, activeIndex + 1));

  if (ingredients.length === 0) {
    return (
      <ProductSection product={productId}>
        <Container className="max-w-[82rem]">
          <p className="font-sans text-sm text-product-foreground/60">
            Ingredient details for this product are coming soon.
          </p>
        </Container>
      </ProductSection>
    );
  }

  return (
    <ProductSection product={productId}>
      <Container className="max-w-[82rem]">
        <header className="max-w-2xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-product-primary">
            {productLabel}
          </p>
          <Heading
            variant="display"
            as="h2"
            className="mt-4 leading-[0.92] text-product-foreground"
          >
            Meet the Ingredients
          </Heading>
          <p className="mt-4 text-sm leading-relaxed text-product-foreground/65 sm:text-base">
            Every ingredient earns its place — whole foods, chosen for flavour,
            texture, and a breakfast that actually holds you.
          </p>
        </header>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          className="mt-12"
        >
          <p id={labelId} className="sr-only">
            {productLabel} ingredients
          </p>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          >
            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.name}
                ingredient={ingredient}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-label="Ingredient slides">
              {ingredients.map((ingredient, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={ingredient.name}
                    type="button"
                    aria-label={`Show ${ingredient.name}`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => scrollToIndex(index)}
                    className={cn(
                      "h-2 rounded-full bg-product-foreground/25 motion-safe:transition-all motion-safe:duration-200",
                      active ? "w-7 bg-product-foreground" : "w-2 hover:bg-product-foreground/40",
                    )}
                  />
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous ingredients"
                disabled={!canScrollPrev}
                onClick={goPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-product-foreground/30 text-product-foreground transition-colors hover:border-product-foreground disabled:cursor-not-allowed disabled:border-product-foreground/15 disabled:text-product-foreground/30"
              >
                <ChevronLeft aria-hidden size={18} />
              </button>
              <button
                type="button"
                aria-label="Next ingredients"
                disabled={!canScrollNext}
                onClick={goNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-product-foreground/30 text-product-foreground transition-colors hover:border-product-foreground disabled:cursor-not-allowed disabled:border-product-foreground/15 disabled:text-product-foreground/30"
              >
                <ChevronRight aria-hidden size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/ingredients"
            className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-product-foreground underline decoration-product-primary/50 underline-offset-4 transition-colors hover:text-product-primary"
          >
            See all ingredients we trust
          </Link>
        </div>
      </Container>
    </ProductSection>
  );
}
