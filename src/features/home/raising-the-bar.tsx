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
import { cn } from "@/lib/cn";

type ProductKey = "proteinOats" | "peanutButter";

type CalloutSide = "top" | "bottom" | "left" | "right";

type Feature = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

/** Clockwise from top: top, upper-right, lower-right, bottom, lower-left, upper-left. */
const CALLOUT_POSITIONS: { className: string; side: CalloutSide }[] = [
  { className: "left-1/2 top-0 -translate-x-1/2", side: "top" },
  { className: "right-0 top-[22%]", side: "right" },
  { className: "right-0 bottom-[22%]", side: "right" },
  { className: "bottom-0 left-1/2 -translate-x-1/2", side: "bottom" },
  { className: "bottom-[22%] left-0", side: "left" },
  { className: "left-0 top-[22%]", side: "left" },
];

const PRODUCT_FEATURES = {
  proteinOats: {
    label: "Protein Oats",
    image: "/images/raising-the-bar/protein_oats.png",
    imageAlt: "Mornfreak Protein Oats pouch",
    features: [
      {
        title: "High Protein 30G+",
        detail:
          "Whey + Soy protein blend supports muscle recovery, keeps you full and energised.",
        icon: Dumbbell,
      },
      {
        title: "Naturally Sweetened",
        detail:
          "Made with Dates & Monkfruit – 100% natural sweetness, no refined sugar.",
        icon: Leaf,
      },
      {
        title: "Super Seeds & Almonds",
        detail:
          "Pumpkin, Sunflower, Chia, Flax Seeds + Almonds for healthy fats & micronutrients.",
        icon: Sprout,
      },
      {
        title: "Clean & Honest Ingredients",
        detail:
          "No preservatives. No artificial flavours. Only real ingredients your body understands.",
        icon: ShieldCheck,
      },
      {
        title: "Gut-Friendly Prebiotics",
        detail:
          "Prebiotic fibre nourishes good gut bacteria and supports digestion.",
        icon: HeartPulse,
      },
      {
        title: "Slow & Sustained Energy",
        detail:
          "Rolled oats provide complex carbs and fibre for steady energy all morning.",
        icon: Wheat,
      },
    ],
  },
  peanutButter: {
    label: "Peanut Butter Powder",
    image: "/images/raising-the-bar/peanut_butter_powder.png",
    imageAlt: "Mornfreak Peanut Butter Powder jar",
    features: [
      {
        title: "High Protein",
        detail:
          "Up to 50% protein helps support muscle health and your daily nutrition.",
        icon: Dumbbell,
      },
      {
        title: "No Added Sugar",
        detail: "100% clean label. Only roasted peanuts, nothing else.",
        icon: Ban,
      },
      {
        title: "No Added Salt",
        detail: "No salt, no additives. Just pure peanut goodness.",
        icon: Leaf,
      },
      {
        title: "Easy To Mix",
        detail: "Perfect for smoothies, oats, shakes, baking and more.",
        icon: ShieldCheck,
      },
      {
        title: "1/3 Less Fat*",
        detail:
          "Defatted peanut powder delivers great taste with significantly less fat.",
        icon: Droplet,
      },
      {
        title: "87% Less Calories*",
        detail:
          "Enjoy the taste of peanuts with 87% less calories than regular peanut butter.",
        icon: Ban,
      },
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

        <div
          className="mx-auto mt-9 flex w-fit rounded-full bg-muted/70 p-1"
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
                "rounded-full px-5 py-2.5 font-sans text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors sm:px-8",
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
        <div className="relative mx-auto mt-14 aspect-square w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[36rem] lg:max-w-[48rem] xl:max-w-[56rem]">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 sm:w-[58%] lg:w-[54%]">
            <HexagonFrame />
            <div
              className="pointer-events-none absolute inset-[22%] rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="absolute inset-[14%] z-10 animate-float sm:inset-[16%] lg:inset-[18%]">
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
            const isVertical = position.side === "top" || position.side === "bottom";

            return (
              <div
                key={feature.title}
                className={cn(
                  "absolute z-20",
                  isVertical
                    ? "w-[9rem] sm:w-[11rem] md:w-[13rem] lg:w-[15rem]"
                    : "w-[6.5rem] sm:w-[8.5rem] md:w-[10.5rem] lg:w-[12.5rem] xl:w-[14rem]",
                  position.className,
                )}
              >
                <FeatureCallout {...feature} side={position.side} />
              </div>
            );
          })}
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
  detail,
  icon: Icon,
  side,
}: Feature & {
  side: CalloutSide;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 sm:gap-3",
        side === "top" && "flex-col-reverse items-center text-center",
        side === "bottom" && "flex-col items-center text-center",
        side === "left" && "flex-row-reverse items-center text-right",
        side === "right" && "flex-row items-center text-left",
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-sm sm:h-10 sm:w-10 lg:h-11 lg:w-11">
        <Icon aria-hidden className="size-3.5 sm:size-[18px] lg:size-5" strokeWidth={1.7} />
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-[0.55rem] font-bold uppercase leading-tight tracking-[0.1em] text-primary sm:text-[0.7rem] sm:tracking-[0.12em] lg:text-xs">
          {title}
        </h3>
        <p className="mt-0.5 text-[0.65rem] leading-snug text-muted-foreground sm:mt-1 sm:text-sm">
          {detail}
        </p>
      </div>
    </div>
  );
}
