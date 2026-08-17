import {
  Check,
  Clock,
  Droplet,
  Dumbbell,
  Leaf,
  ShieldCheck,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { ProductId } from "@/types/product";

import type { ProductProofPoint, ProductProofPointIcon } from "./types";

const PROOF_POINT_ICONS: Record<ProductProofPointIcon, LucideIcon> = {
  zap: Zap,
  leaf: Leaf,
  droplet: Droplet,
  check: Check,
  clock: Clock,
  wheat: Wheat,
  shield: ShieldCheck,
  dumbbell: Dumbbell,
};

type ProductProofPointsSectionProps = {
  productId: ProductId;
  points: ProductProofPoint[];
};

export function ProductProofPointsSection({
  productId,
  points,
}: ProductProofPointsSectionProps) {
  if (points.length === 0) return null;

  return (
    <Section data-product={productId} className="bg-background">
      <Container>
        <div className="rounded-3xl bg-oat-cream px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <Heading
            variant="h2"
            as="h2"
            className="text-center leading-[0.95] text-ink"
          >
            Everything You Want. Nothing You Don&apos;t.
          </Heading>

          <ul className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            {points.map((point) => {
              const Icon = PROOF_POINT_ICONS[point.icon];
              return (
                <li
                  key={point.label}
                  className="flex w-full max-w-[9.5rem] flex-col items-center text-center max-sm:last:col-span-2"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                    <Icon aria-hidden size={22} strokeWidth={1.75} />
                  </span>
                  <p className="mt-3 max-w-[9.5rem] font-sans text-sm font-semibold leading-snug text-ink">
                    {point.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
