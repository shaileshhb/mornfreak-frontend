import type { ProductId } from "@/types/product";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "the-range",
    title: "The range",
    items: [
      {
        id: "what-products",
        question: "What products does Mornfreak offer?",
        answer:
          "Mornfreak offers **Peanut Butter Powder 227g, Protein Oats 425g, and Protein Oats 77g single serving**.",
      },
    ],
  },
  {
    id: "protein-oats",
    title: "Protein Oats",
    items: [
      {
        id: "what-is-protein-oats",
        question: "What is Mornfreak Protein Oats?",
        answer:
          "A convenient, protein-rich oat blend made with oats, protein, seeds, nuts, dates, and prebiotic fiber.",
      },
      {
        id: "how-much-protein",
        question: "How much protein is in the Protein Oats?",
        answer:
          "The **425g Protein Oats provides 26g protein per 100g**, while the **77g single serving provides 20g protein**.",
      },
      {
        id: "added-sugar",
        question: "Does Mornfreak Protein Oats contain added sugar?",
        answer:
          "No. The Protein Oats contain **0g added sugar** and are naturally sweetened with dates.",
      },
      {
        id: "pack-sizes",
        question: "What is the difference between the 425g and 77g Protein Oats?",
        answer:
          "The **425g pack** is designed for regular home use, while the **77g pack** is a convenient single-serving option for busy mornings, travel, or on-the-go use.",
      },
      {
        id: "prebiotics",
        question: "Does Mornfreak Protein Oats contain prebiotics?",
        answer: "Yes, the Protein Oats contain **prebiotic fiber**.",
      },
      {
        id: "how-to-prepare",
        question: "How do I prepare the Protein Oats?",
        answer:
          "Add the desired serving to milk or water, mix well, and enjoy. You can also prepare it as **overnight oats or add it to smoothies**.",
      },
      {
        id: "preservatives",
        question: "Does Mornfreak use preservatives or artificial flavours?",
        answer:
          "Mornfreak Protein Oats are made **without preservatives or artificial flavours**.",
      },
    ],
  },
  {
    id: "peanut-butter-powder",
    title: "Peanut Butter Powder",
    items: [
      {
        id: "what-is-pb-powder",
        question: "What is Peanut Butter Powder?",
        answer:
          "It is a convenient powdered form of peanut butter that can be mixed into smoothies, oats, yogurt, shakes, or used in recipes.",
      },
      {
        id: "how-much-protein",
        question: "How much protein is in Peanut Butter Powder?",
        answer:
          "Each **16g serving provides approximately 9g of protein**, making it a convenient way to add plant-based protein to your meals and snacks.",
      },
      {
        id: "added-sugar",
        question: "Does Peanut Butter Powder contain added sugar?",
        answer:
          "No. Mornfreak Pure Peanut Butter Powder contains **no added sugar or salt**. It is also unsweetened, allowing you to enjoy the natural flavor of roasted peanuts.",
      },
      {
        id: "how-to-use-pb-powder",
        question: "How can I use Peanut Butter Powder?",
        answer:
          "There are endless ways to enjoy it. Mix it with water to create a peanut butter spread, or add it to **smoothies, oats, yogurt, pancakes, toast, desserts and baked recipes**.",
      },
    ],
  },
  {
    id: "using-and-storing",
    title: "Using & storing",
    items: [
      {
        id: "best-time",
        question: "When is the best time to have Mornfreak products?",
        answer:
          "They can be enjoyed at **breakfast, as a snack, before/after a workout, or whenever you need a convenient nutritious option**.",
      },
      {
        id: "storage",
        question: "How should I store Mornfreak products?",
        answer:
          "Store in a **cool, dry place away from direct sunlight** and reseal the pack properly after opening.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_CATEGORIES.flatMap((category) => category.items);

const PRODUCT_FAQ_CATEGORY_ID: Record<ProductId, string> = {
  peanutButter: "peanut-butter-powder",
  peanutButterPackOf2: "peanut-butter-powder",
  proteinOats425g: "protein-oats",
  proteinOats425gPackOf2: "protein-oats",
  proteinOats77g: "protein-oats",
  proteinOats77gPackOf6: "protein-oats",
};

export function getFaqItemsForProduct(productId: ProductId): FaqItem[] {
  const categoryId = PRODUCT_FAQ_CATEGORY_ID[productId];
  return FAQ_CATEGORIES.find((category) => category.id === categoryId)?.items ?? [];
}

export function plainFaqAnswer(answer: string) {
  return answer.replace(/\*\*/g, "");
}
