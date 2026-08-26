"use client";

import {
  ArrowRight,
  Ban,
  Droplet,
  Dumbbell,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/cn";

type ProductKey = "proteinOats" | "peanutButter";

type CalloutSide = "top" | "bottom" | "left" | "right";

type Feature = {
  title: string;
  icon: LucideIcon;
};

/** Clockwise from top — matches HexagonFrame SVG vertices. */
const CALLOUT_POSITIONS: { className: string; side: CalloutSide }[] = [
  { className: "left-1/2 top-[3%]", side: "top" },
  { className: "left-[90.7%] top-[26.5%]", side: "right" },
  { className: "left-[90.7%] top-[73.5%]", side: "right" },
  { className: "left-1/2 top-[97%]", side: "bottom" },
  { className: "left-[9.3%] top-[73.5%]", side: "left" },
  { className: "left-[9.3%] top-[26.5%]", side: "left" },
];

const PRODUCT_FEATURES = {
  proteinOats: {
    label: "Protein Oats",
    image: "/images/raising-the-bar/protein_oats.png",
    imageAlt: "Mornfreak Protein Oats pouch",
    features: [
      {
        title: "High Protein 26g",
        icon: Dumbbell,
      },
      {
        title: "Naturally Sweetened",
        icon: Leaf,
      },
      {
        title: "Super Seeds & Almonds",
        icon: Sprout,
      },
      {
        title: "Clean & Honest Ingredients",
        icon: ShieldCheck,
      },
      {
        title: "Gut-Friendly Prebiotics",
        icon: HeartPulse,
      },
      {
        title: "Sustained Energy",
        icon: Wheat,
      },
    ],
  },
  peanutButter: {
    label: "Peanut Butter Powder",
    image: "/images/raising-the-bar/peanut_butter_powder.avif",
    imageAlt: "Mornfreak Peanut Butter Powder jar",
    features: [
      {
        title: "High Protein",
        icon: Dumbbell,
      },
      {
        title: "No Added Sugar",
        icon: Ban,
      },
      {
        title: "No Added Salt",
        icon: Leaf,
      },
      {
        title: "Easy To Mix",
        icon: ShieldCheck,
      },
      {
        title: "1/3 Less Fat*",
        icon: Droplet,
      },
      {
        title: "87% Less Calories*",
        icon: Ban,
      },
    ],
  },
} as const;

export function RaisingTheBar() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("proteinOats");
  const product = PRODUCT_FEATURES[activeProduct];

  return (
    <section className="overflow-hidden bg-background py-8 sm:py-10">
      <Container className="max-w-[90rem]">
        <header className="mx-auto max-w-5xl text-center">
          <p className="font-sans text-s font-semibold uppercase tracking-[0.15em] text-primary">
            How we're raising the bar
          </p>
          <Heading
            variant="display"
            as="h2"
            className="mt-4 px-3 text-center sm:px-0"
            style={{
              fontSize: "clamp(1.35rem, 7.2vw, 4.5rem)",
              lineHeight: 0.94,
            }}
          >
            <span className="block whitespace-nowrap">Better ingredients.</span>
            <span className="block whitespace-nowrap">Higher standards.</span>
          </Heading>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Premium nutrition and a promise of purity—because your mornings deserve nothing less.
          </p>
        </header>


        <div
          className="mx-auto mt-9 flex w-fit max-w-full rounded-full bg-muted/70 p-1 mb-3 sm:mb-0"
          role="tablist"
          aria-label="Choose a product"
        >
          {(Object.keys(PRODUCT_FEATURES) as ProductKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeProduct === key}
              onClick={() => setActiveProduct(key)}
              className={cn(
                "min-w-0 flex-1 rounded-full px-3 py-2.5 text-center font-sans text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.10em] transition-colors sm:flex-none sm:px-5 sm:text-[0.7rem] sm:tracking-[0.08em] md:px-8",
                activeProduct === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground hover:bg-foreground/5",
              )}
            >
              {PRODUCT_FEATURES[key].label}
            </button>
          ))}
        </div>

        {/* Unified responsive stage: hexagon + product + corner callouts */}
        <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[28rem] md:max-w-[36rem] lg:max-w-[48rem] xl:max-w-[56rem]">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-visible sm:w-[78%] lg:w-[74%]">
            <HexagonFrame />
            <div
              className="pointer-events-none absolute inset-[22%] rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="absolute inset-[14%] z-10 animate-float sm:inset-[16%] lg:inset-[18%]">
              <div className="relative h-full w-full rotate-5">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 14rem, (max-width: 1024px) 20rem, 30rem"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {product.features.map((feature, index) => {
              const position = CALLOUT_POSITIONS[index];

              return (
                <div
                  key={feature.title}
                  className={cn(
                    "absolute z-20 -translate-x-1/2 -translate-y-1/2",
                    position.className,
                  )}
                >
                  <FeatureCallout {...feature} side={position.side} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-4 sm:mt-0">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 bg-foreground px-8 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            href="/products">
            Shop now <ArrowRight aria-hidden size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function HexagonFrame() {
  return (
    <svg
      className="absolute inset-0 text-foreground/40"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <polygon
        points="50,3 90.7,26.5 90.7,73.5 50,97 9.3,73.5 9.3,26.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="0.01 2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureCallout({
  title,
  icon: Icon,
  side,
}: Feature & {
  side: CalloutSide;
}) {
  return (
    <div className="relative">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-sm sm:h-10 sm:w-10 lg:h-11 lg:w-11">
        <Icon aria-hidden className="size-3.5 sm:size-[18px] lg:size-5" strokeWidth={1.7} />
      </span>
      <div
        className={cn(
          "absolute",
          side === "top" &&
          "bottom-full left-1/2 mb-2 w-[9rem] -translate-x-1/2 text-center sm:mb-3 sm:w-[11rem] md:w-[13rem] lg:w-[15rem]",
          side === "bottom" &&
          "left-1/2 top-full mt-2 w-[9rem] -translate-x-1/2 text-center sm:mt-3 sm:w-[11rem] md:w-[13rem] lg:w-[15rem]",
          side === "left" &&
          "right-full top-1/2 mr-1 w-[4.5rem] -translate-y-1/2 text-right sm:mr-3 sm:w-[8.5rem] md:w-[10.5rem] lg:w-[12.5rem] xl:w-[14rem]",
          side === "right" &&
          "left-full top-1/2 ml-1 w-[4.5rem] -translate-y-1/2 text-left sm:ml-3 sm:w-[8.5rem] md:w-[10.5rem] lg:w-[12.5rem] xl:w-[14rem]",
        )}
      >
        <h3 className="font-sans text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.06em] text-primary sm:text-[0.7rem] sm:tracking-[0.12em] lg:text-xs">
          {title}
        </h3>
      </div>
    </div>
  );
}
