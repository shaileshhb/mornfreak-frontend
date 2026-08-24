import { Container } from "@/components/ui/container";

import { ProductBuyBox } from "./product-buy-box";
import { ProductImageCarousel } from "./product-image-carousel";
import { ProductIngredientsSection } from "./product-ingredients-section";
import { ProductProofPointsSection } from "./product-proof-points-section";
import { ProductReviewsSection } from "./product-reviews-section";
import { StickyMobileCartBar } from "./sticky-mobile-cart-bar";
import type { ProductDetail } from "./types";

type ProductDetailPageProps = {
  product: ProductDetail;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const productLabel = product.label ?? product.name;

  return (
    <>
      <section
        data-product={product.id}
        className="bg-background pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10"
      >
        <Container className="max-w-[90rem]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10">
            <ProductImageCarousel
              key={product.slug}
              images={product.images}
              productName={product.name}
              overlayBadge={product.overlayBadge}
              galleryCallouts={product.galleryCallouts}
            />
            <div className="lg:sticky lg:top-24">
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

      <ProductProofPointsSection
        productId={product.id}
        points={product.proofPoints}
      />

      <ProductReviewsSection
        reviews={product.reviews}
        productName={product.name}
      />

      <StickyMobileCartBar product={product} />
    </>
  );
}
