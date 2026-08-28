import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { FaqAccordionItem } from "@/features/faq/faq-accordion-item";
import { getFaqItemsForProduct } from "@/features/faq/faq-data";
import type { ProductId } from "@/types/product";

type ProductFaqSectionProps = {
  productId: ProductId;
};

export function ProductFaqSection({ productId }: ProductFaqSectionProps) {
  const items = getFaqItemsForProduct(productId);

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <Heading variant="h2" as="h2">
          Frequently asked questions
        </Heading>
        <div className="mt-8 border-b border-border">
          {items.map((item) => (
            <FaqAccordionItem key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
