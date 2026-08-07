import { ProductSection } from "@/components/common/product-section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

import { IngredientAccordion } from "./ingredient-accordion";
import { PROTEIN_OATS_INGREDIENTS } from "./ingredients-data";

export function ProteinOatsIngredients() {
  return (
    <ProductSection product="proteinOats">
      <Container className="max-w-[82rem]">
        <header className="max-w-2xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-product-primary">
            Protein Oats
          </p>
          <Heading
            variant="display"
            as="h2"
            className="mt-4 leading-[0.92] text-product-foreground"
          >
            Meet the ingredients.
          </Heading>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-product-foreground/60 sm:text-base">
            Zero added sugar. Every ingredient earns its place.
          </p>
        </header>

        <div className="mt-12">
          <IngredientAccordion ingredients={PROTEIN_OATS_INGREDIENTS} />
        </div>
      </Container>
    </ProductSection>
  );
}
