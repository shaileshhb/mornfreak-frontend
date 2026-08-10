import { Container } from "@/components/ui/container";

import { ProductBuyBox } from "./product-buy-box";
import { ProductImageCarousel } from "./product-image-carousel";
import { ProductIngredientsSection } from "./product-ingredients-section";
import { ProductReviewsSection } from "./product-reviews-section";
import { StickyMobileCartBar } from "./sticky-mobile-cart-bar";
import type { ProductDetail } from "./types";

type ProductDetailPageProps = {
  product: ProductDetail;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const productLabel =
    product.id === "proteinOats" ? "Protein Oats" : "Peanut Butter Powder";

  return (
    <>
      <section
        data-product={product.id}
        className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
            <ProductImageCarousel
              key={product.slug}
              images={product.images}
              productName={product.name}
            />
            <div>
              <ProductBuyBox product={product} />
              <div id="buy-box-sentinel" className="h-px w-full" aria-hidden />
            </div>
          </div>
        </Container>
      </section>

      <ProductIngredientsSection
        productId={product.id}
        productLabel={productLabel}
        ingredients={product.ingredients}
      />

      <ProductReviewsSection
        reviews={product.reviews}
        productName={product.name}
      />

      <StickyMobileCartBar product={product} />
    </>
  );
}
