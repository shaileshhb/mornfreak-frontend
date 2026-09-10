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
    <section
      id="faq"
      className="scroll-mt-24 bg-background pt-0 pb-16 sm:pt-0 sm:pb-20 lg:pt-0 lg:pb-24"
    >
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
