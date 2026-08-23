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
import { Heading } from "@/components/ui/heading";
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
        title: "High Protein 26g",
        icon: Dumbbell,
        values: [true, true, false] as const,
      },
      {
        title: "Sweetened with Dates & Monkfruit",
        icon: Leaf,
        values: [true, false, false] as const,
      },
      {
        title: "Prebiotics for Gut Health",
        icon: HeartPulse,
        values: [true, false, false] as const,
      },
      {
        title: "Super Seeds & Almonds",
        icon: Sprout,
        values: [true, true, false] as const,
      },
      {
        title: "No Artificial Flavours, No Preservatives",
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
      "Regular Peanut Butter",
    ] as const,
    rows: [
      {
        title: "High Protein",
        icon: Dumbbell,
        values: [true, true] as const,
      },
      {
        title: "87% Less Calories*",
        icon: Ban,
        values: [true, false] as const,
      },
      {
        title: "1/3 Less Fat*",
        icon: Droplet,
        values: [true,  false] as const,
      },
      {
        title: "No Added Sugar",
        icon: Ban,
        values: [true,  false] as const,
      },
      {
        title: "No Added Salt",
        icon: Leaf,
        values: [true,  false] as const,
      },
    ],
  },
} as const;

export function HowWeStackUp() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("proteinOats");
  const product = PRODUCT_COMPARISONS[activeProduct];

  return (
    <section className="bg-card py-10 sm:py-10">
      <Container className="max-w-[90rem]">
        <header className="flex items-center justify-center gap-3 text-center sm:gap-4">
          <Zap
            aria-hidden
            className="hidden shrink-0 text-primary sm:block"
            size={25}
            fill="currentColor"
          />
          <Heading variant="display" as="h2" className="min-w-0 leading-none">
            How we stack up
          </Heading>
          <Zap
            aria-hidden
            className="hidden shrink-0 scale-x-[-1] text-primary sm:block"
            size={25}
            fill="currentColor"
          />
        </header>

        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-muted-foreground">
          Real ingredients. Real benefits. No compromises.
        </p>

        <div
          className="mx-auto mt-9 flex w-fit max-w-full rounded-full bg-muted/70 p-1"
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
                "min-w-0 flex-1 rounded-full px-3 py-2.5 text-center font-sans text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.10em] transition-colors sm:flex-none sm:px-5 sm:text-[0.7rem] sm:tracking-[0.08em] md:px-8",
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
            <table
              className={cn(
                "border-collapse text-left",
                activeProduct === "peanutButter"
                  ? "mx-auto w-full min-w-[28rem] max-w-3xl"
                  : "w-full min-w-[42rem]",
              )}
            >
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
                        "border-b p-4 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.1em] sm:p-5 sm:text-xs sm:tracking-[0.12em]",
                        activeProduct === "peanutButter" && "w-[10rem] sm:w-[12rem]",
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
                {product.rows.map(({ title, icon: Icon, values }, rowIndex) => (
                  <tr key={title + rowIndex}>
                    <th
                      scope="row"
                      className="border-b border-foreground/15 p-4 text-left sm:p-5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon aria-hidden size={18} strokeWidth={1.7} />
                        </span>
                        <span>
                          <span className="block text-base font-semibold">{title}</span>
                        </span>
                      </span>
                    </th>
                    {values.map((hasFeature, index) => (
                      <td
                        key={`${title}-${product.columns[index]}`}
                        className={cn(
                          "border-b p-4 text-center sm:p-5",
                          activeProduct === "peanutButter" && "w-[10rem] sm:w-[12rem]",
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
