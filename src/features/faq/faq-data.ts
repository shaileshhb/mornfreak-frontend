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
        id: "how-to-use-pb-powder",
        question: "How can I use Peanut Butter Powder?",
        answer:
          "Mix it with water or milk to make peanut butter, or add it directly to **oats, smoothies, yogurt, pancakes, and desserts**.",
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

export function plainFaqAnswer(answer: string) {
  return answer.replace(/\*\*/g, "");
}
