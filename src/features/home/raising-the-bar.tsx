"use client";

import { ArrowRight, Ban, Dumbbell, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type ProductKey = "proteinOats" | "peanutButter";

const PRODUCT_FEATURES = {
  proteinOats: {
    label: "Protein Oats",
    placeholder: "Protein Oats pouch",
    features: [
      { title: "High protein", detail: "26g protein per 100g", icon: Dumbbell },
      { title: "Super seeds & nuts", detail: "Whole-food goodness", icon: Leaf },
      { title: "Sugar free", detail: "No added sugar", icon: Ban },
      { title: "Pure and clean", detail: "No preservatives", icon: ShieldCheck },
    ],
  },
  peanutButter: {
    label: "Peanut Butter Powder",
    placeholder: "Peanut Butter Powder jar",
    features: [
      { title: "Plant protein", detail: "9g protein per serving", icon: Dumbbell },
      { title: "100% peanuts", detail: "Nothing unnecessary", icon: Leaf },
      { title: "No added sugar", detail: "No added salt either", icon: Ban },
      { title: "A lighter choice", detail: "87% less fat", icon: ShieldCheck },
    ],
  },
} as const;

export function RaisingTheBar() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("proteinOats");
  const product = PRODUCT_FEATURES[activeProduct];

  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-primary">
            How we&apos;re raising the bar
          </p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-wide sm:text-7xl">
            Better ingredients. Higher standards.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Premium nutrition and a promise of purity—because your mornings deserve nothing less.
          </p>
        </header>

        <div className="mt-9 flex justify-center" role="tablist" aria-label="Choose a product">
          {(Object.keys(PRODUCT_FEATURES) as ProductKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeProduct === key}
              onClick={() => setActiveProduct(key)}
              className={cn(
                "border border-foreground px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors sm:px-8",
                activeProduct === key
                  ? "bg-foreground text-white"
                  : "bg-transparent text-foreground hover:bg-foreground/10",
              )}
            >
              {PRODUCT_FEATURES[key].label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-9 lg:grid-cols-[1fr_1.1fr_1fr]">
          <div className="space-y-10">
            {product.features.slice(0, 2).map((feature) => (
              <FeatureCallout key={feature.title} {...feature} align="right" />
            ))}
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[31rem] items-center justify-center">
            <div className="absolute inset-[12%] rotate-45 border border-dashed border-primary/45" aria-hidden />
            <div className="relative z-10 flex h-[72%] w-[53%] items-center justify-center bg-[#fff9ef] px-5 text-center shadow-[0_24px_70px_rgba(36,21,16,0.12)]">
              <div>
                <p className="font-display text-4xl uppercase leading-none text-primary">
                  {product.placeholder}
                </p>
                <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Replace with transparent product image
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {product.features.slice(2).map((feature) => (
              <FeatureCallout key={feature.title} {...feature} align="left" />
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 bg-foreground px-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
          >
            Shop now <ArrowRight aria-hidden size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function FeatureCallout({
  title,
  detail,
  icon: Icon,
  align,
}: {
  title: string;
  detail: string;
  icon: typeof Dumbbell;
  align: "left" | "right";
}) {
  return (
    <div className={cn("flex gap-4", align === "right" && "lg:flex-row-reverse lg:text-right")}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/35 text-primary">
        <Icon aria-hidden size={22} strokeWidth={1.7} />
      </span>
      <div>
        <h3 className="font-sans text-sm font-bold uppercase tracking-[0.11em]">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
