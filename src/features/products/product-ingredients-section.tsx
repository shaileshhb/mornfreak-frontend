import Image from "next/image";
import Link from "next/link";

import { ProductSection } from "@/components/common/product-section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import type { ProductId } from "@/types/product";

import type { ProductIngredient } from "./types";

type ProductIngredientCardProps = {
  ingredient: ProductIngredient;
};

export function ProductIngredientCard({ ingredient }: ProductIngredientCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Image
          src={ingredient.image}
          alt={ingredient.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      <h3 className="mt-5 font-sans text-base font-bold uppercase tracking-[0.08em] text-product-foreground sm:text-lg">
        {ingredient.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-product-foreground/65">
        {ingredient.description}
      </p>
      {ingredient.keyFeatures.length > 0 && (
        <div className="mt-4 rounded-md bg-background/70 px-4 py-4 sm:px-5">
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
      )}
    </article>
  );
}

type ProductIngredientsSectionProps = {
  productId: ProductId;
  productLabel: string;
  ingredients: ProductIngredient[];
};

export function ProductIngredientsSection({
  productId,
  productLabel,
  ingredients,
}: ProductIngredientsSectionProps) {
  if (ingredients.length === 0) {
    return (
      <ProductSection product={productId}>
        <Container className="max-w-[82rem]">
          <p className="font-sans text-sm text-product-foreground/60">
            Ingredient details for this product are coming soon.
          </p>
        </Container>
      </ProductSection>
    );
  }

  return (
    <ProductSection product={productId}>
      <Container className="max-w-[82rem]">
        <header className="max-w-2xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-product-primary">
            {productLabel}
          </p>
          <Heading
            variant="display"
            as="h2"
            className="mt-4 leading-[0.92] text-product-foreground"
          >
            Meet the ingredients.
          </Heading>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-product-foreground/60 sm:text-base">
            Every ingredient earns its place.
          </p>
        </header>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {ingredients.map((ingredient) => (
            <ProductIngredientCard
              key={ingredient.name}
              ingredient={ingredient}
            />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/ingredients"
            className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-product-foreground underline decoration-product-primary/50 underline-offset-4 transition-colors hover:text-product-primary"
          >
            See all ingredients we trust
          </Link>
        </div>
      </Container>
    </ProductSection>
  );
}
