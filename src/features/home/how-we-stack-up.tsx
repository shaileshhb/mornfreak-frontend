"use client";

import {
  Ban,
  Check,
  CircleX,
  Droplet,
  Dumbbell,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sprout,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type ProductKey = "proteinOats" | "peanutButter";

const PRODUCT_COMPARISONS = {
  proteinOats: {
    label: "Protein Oats",
    image: "/images/oats_1.jpeg",
    imageAlt: "Mornfreak Protein Oats pouch",
    columns: [
      "MORNFREAK PROTEIN OATS",
      "Other Oats",
      "Regular Chocolate Oats",
    ] as const,
    rows: [
      {
        title: "High Protein 30g+",
        detail: "Complete protein from Whey + Soy",
        icon: Dumbbell,
        values: [true, true, false] as const,
      },
      {
        title: "Sweetened with Dates & Monkfruit",
        detail: "No refined sugar",
        icon: Leaf,
        values: [true, false, false] as const,
      },
      {
        title: "Prebiotics for Gut Health",
        detail: "Supports digestion and gut balance",
        icon: HeartPulse,
        values: [true, false, false] as const,
      },
      {
        title: "Super Seeds & Almonds",
        detail: "Pumpkin, Sunflower, Chia, Flax Seeds + Almonds",
        icon: Sprout,
        values: [true, true, false] as const,
      },
      {
        title: "No Artificial Flavours, No Preservatives",
        detail: "Clean & honest ingredients",
        icon: ShieldCheck,
        values: [true, false, false] as const,
      },
    ],
  },
  peanutButter: {
    label: "Peanut Butter Powder",
    image: "/images/peanut_butter_powder_1.jpeg",
    imageAlt: "Mornfreak Peanut Butter Powder jar",
    columns: [
      "MORNFREAK PEANUT BUTTER POWDER",
      "Other Peanut Powders",
      "Regular Peanut Butter",
    ] as const,
    rows: [
      {
        title: "High Protein",
        detail: "Up to 50% protein",
        icon: Dumbbell,
        values: [true, true, true] as const,
      },
      {
        title: "87% Less Calories*",
        detail: "Than regular peanut butter",
        icon: Ban,
        values: [true, true, false] as const,
      },
      {
        title: "1/3 Less Fat*",
        detail: "Defatted peanut powder",
        icon: Droplet,
        values: [true, true, false] as const,
      },
      {
        title: "No Added Sugar",
        detail: "100% clean label",
        icon: Ban,
        values: [true, true, false] as const,
      },
      {
        title: "No Added Salt",
        detail: "Just pure roasted peanuts",
        icon: Leaf,
        values: [true, true, false] as const,
      },
    ],
  },
} as const;

export function HowWeStackUp() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("proteinOats");
  const product = PRODUCT_COMPARISONS[activeProduct];

  return (
    <section className="bg-card py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <header className="flex items-center justify-center gap-4 text-center">
          <Zap aria-hidden className="text-primary" size={25} fill="currentColor" />
          <h2 className="font-display text-6xl uppercase leading-none tracking-wide sm:text-7xl">
            How we stack up
          </h2>
          <Zap aria-hidden className="scale-x-[-1] text-primary" size={25} fill="currentColor" />
        </header>

        <p className="mx-auto mt-5 max-w-xl text-center leading-relaxed text-muted-foreground">
          Real ingredients. Real benefits. No compromises.
        </p>

        <div
          className="mx-auto mt-9 flex w-fit rounded-full bg-muted/70 p-1"
          role="tablist"
          aria-label="Choose a product"
        >
          {(Object.keys(PRODUCT_COMPARISONS) as ProductKey[]).map((key) => (
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
              {PRODUCT_COMPARISONS[key].label}
            </button>
          ))}
        </div>

        <div className="mt-14 overflow-x-auto">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[38%] border-b border-foreground/15 p-4 sm:p-5" scope="col">
                    <span className="sr-only">Benefit</span>
                  </th>
                  {product.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        "border-b p-4 text-center font-sans text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:p-5 sm:text-xs sm:tracking-[0.12em]",
                        index === 0
                          ? "rounded-t-lg border-primary bg-primary text-primary-foreground"
                          : "border-foreground/15 text-foreground/65",
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.rows.map(({ title, detail, icon: Icon, values }, rowIndex) => (
                  <tr key={title}>
                    <th
                      scope="row"
                      className="border-b border-foreground/15 p-4 text-left sm:p-5"
                    >
                      <span className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon aria-hidden size={18} strokeWidth={1.7} />
                        </span>
                        <span>
                          <span className="block font-sans text-sm font-bold">{title}</span>
                          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                            {detail}
                          </span>
                        </span>
                      </span>
                    </th>
                    {values.map((hasFeature, index) => (
                      <td
                        key={`${title}-${product.columns[index]}`}
                        className={cn(
                          "border-b p-4 text-center sm:p-5",
                          index === 0
                            ? cn(
                                "border-primary bg-primary text-primary-foreground",
                                rowIndex === product.rows.length - 1 && "rounded-b-lg",
                              )
                            : "border-foreground/15 text-foreground/30",
                        )}
                      >
                        {hasFeature ? (
                          <Check
                            aria-label="Included"
                            className="mx-auto"
                            size={24}
                            strokeWidth={2.2}
                          />
                        ) : (
                          <CircleX
                            aria-label="Not included"
                            className="mx-auto"
                            size={22}
                            strokeWidth={1.5}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
