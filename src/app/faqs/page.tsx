import type { Metadata } from "next";

import { FAQ_ITEMS, plainFaqAnswer } from "@/features/faq/faq-data";
import { FaqPage } from "@/features/faq";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about Mornfreak Protein Oats and Peanut Butter Powder — protein, ingredients, prep, storage, and how to use each pack.",
  alternates: {
    canonical: "/faqs",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: plainFaqAnswer(item.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqPage />
    </>
  );
}
