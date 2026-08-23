import { ProductSection } from "@/components/common/product-section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

import { IngredientAccordion } from "./ingredient-accordion";
import { PEANUT_BUTTER_INGREDIENTS } from "./ingredients-data";

export function PeanutButterIngredients() {
  return (
    <ProductSection product="peanutButter">
      <Container className="max-w-[82rem]">
        <header className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-product-primary">
            Peanut Butter Powder
          </p>
          <Heading
            variant="display"
            as="h2"
            className="mt-4 leading-[0.92] text-product-foreground"
          >
            One ingredient. Pure peanuts.
          </Heading>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-product-foreground/60 sm:text-base">
            No fillers. No additives. Just clean fuel.
          </p>
        </header>

        <div className="mt-12">
          <IngredientAccordion ingredients={PEANUT_BUTTER_INGREDIENTS} />
        </div>
      </Container>
    </ProductSection>
  );
}
