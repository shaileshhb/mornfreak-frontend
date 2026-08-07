"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";

import type { Ingredient } from "./ingredients-data";

type IngredientAccordionProps = {
  ingredients: Ingredient[];
  className?: string;
};

export function IngredientAccordion({
  ingredients,
  className,
}: IngredientAccordionProps) {
  const [activeId, setActiveId] = useState(ingredients[0]?.id ?? "");
  const showToggle = ingredients.length > 1;
  const activeIngredient =
    ingredients.find((ingredient) => ingredient.id === activeId) ??
    ingredients[0];

  if (!activeIngredient) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14",
        className,
      )}
    >
      <div className="divide-y divide-product-foreground/15">
        {ingredients.map((ingredient) => {
          const isOpen = ingredient.id === activeId;

          return (
            <article key={ingredient.id} className="py-5 first:pt-0 last:pb-0">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setActiveId(ingredient.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div className="min-w-0">
                  <h3 className="font-sans text-base font-bold uppercase tracking-[0.08em] text-product-foreground sm:text-lg">
                    {ingredient.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-product-foreground/65 sm:text-base">
                    {ingredient.description}
                  </p>
                </div>
                {showToggle && (
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-product-foreground"
                  >
                    {isOpen ? (
                      <Minus size={18} strokeWidth={1.8} />
                    ) : (
                      <Plus size={18} strokeWidth={1.8} />
                    )}
                  </span>
                )}
              </button>

              <div
                className={cn(
                  "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "mt-4 rounded-md bg-background/70 px-4 py-4 sm:px-5 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
                      isOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                    )}
                    {...(!isOpen ? { inert: true as const } : {})}
                  >
                    <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-product-primary">
                      Key Features:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {ingredient.keyFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 text-sm leading-relaxed text-product-foreground/80"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-product-primary"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        {ingredients.map((ingredient) => {
          const isActive = ingredient.id === activeId;

          return (
            <Image
              key={ingredient.id}
              src={ingredient.image}
              alt={ingredient.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              aria-hidden={!isActive}
              className={cn(
                "object-cover object-center motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out",
                isActive ? "z-10 opacity-100" : "z-0 opacity-0",
              )}
              priority={ingredient.id === ingredients[0]?.id}
            />
          );
        })}
      </div>
    </div>
  );
}
