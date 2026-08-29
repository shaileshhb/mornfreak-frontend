"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import type { ProductDetail } from "./types";

type PanelId = "description" | "ingredients" | "nutrition";

type ProductBuyBoxAccordionsProps = {
  product: ProductDetail;
};

function AccordionPanel({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-t border-border">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 py-4 text-left"
        >
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.12em]">
            {title}
          </span>
          <ChevronDown
            aria-hidden
            size={18}
            className={cn(
              "shrink-0 motion-safe:transition-transform motion-safe:duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className="pb-5"
            {...(!open ? { inert: true as const } : {})}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function IngredientsContent({
  statement,
}: {
  statement: string;
}) {
  if (!statement) {
    return (
      <p className="font-sans text-sm text-foreground/70">
        Ingredient details coming soon.
      </p>
    );
  }

  return (
    <p className="font-sans text-sm leading-relaxed text-foreground/80">
      {statement}
    </p>
  );
}

function NutritionContent({
  nutrition,
  caption,
}: {
  nutrition: ProductDetail["nutrition"];
  caption: string;
}) {
  return (
    <div>
      <p className="font-sans text-xs text-foreground/50">{caption}</p>
      <table className="mt-3 w-full text-sm">
        <caption className="sr-only">Nutrition facts per serving</caption>
        <tbody>
          {nutrition.map((row) => (
            <tr
              key={row.label}
              className="border-b border-border/70 last:border-b-0"
            >
              <th
                scope="row"
                className="py-2.5 pr-4 text-left font-sans font-medium text-foreground/70"
              >
                {row.label}
              </th>
              <td className="py-2.5 text-right font-sans tabular-nums text-foreground">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductBuyBoxAccordions({ product }: ProductBuyBoxAccordionsProps) {
  const baseId = useId();
  const [openPanel, setOpenPanel] = useState<PanelId | null>("description");

  const toggle = (panel: PanelId) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <div className="border-b border-border">
      <AccordionPanel
        id={`${baseId}-description`}
        title="Description"
        open={openPanel === "description"}
        onToggle={() => toggle("description")}
      >
        <p className="font-sans text-sm leading-relaxed text-foreground/80">
          {product.description}
        </p>
      </AccordionPanel>

      <AccordionPanel
        id={`${baseId}-ingredients`}
        title="Ingredients"
        open={openPanel === "ingredients"}
        onToggle={() => toggle("ingredients")}
      >
        <IngredientsContent statement={product.ingredientStatement} />
      </AccordionPanel>

      {product.nutrition.length > 0 && (
        <AccordionPanel
          id={`${baseId}-nutrition`}
          title="Nutrition"
          open={openPanel === "nutrition"}
          onToggle={() => toggle("nutrition")}
        >
          <NutritionContent
            nutrition={product.nutrition}
            caption={product.nutritionCaption}
          />
        </AccordionPanel>
      )}
    </div>
  );
}
