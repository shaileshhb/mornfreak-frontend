import type { ProductId } from "@/design/tokens/products";

export type ProductStat = {
  value: string;
  label: string;
};

export type ProductContent = {
  id: ProductId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
  heroImage: string;
  serveImage: string;
  stats: ProductStat[];
  badges: string[];
  benefits: { title: string; body: string }[];
  weight: string;
};

export const PRODUCT_CONTENT: Record<ProductId, ProductContent> = {
  proteinOats: {
    id: "proteinOats",
    slug: "protein-oats",
    name: "Mornfreak Protein Oats",
    tagline: "Rich Chocolate. Real Gains.",
    description:
      "26g of protein per 100g, sweetened naturally with dates, loaded with super seeds and nuts. The breakfast that works as hard as you do.",
    images: ["/images/oats_1.jpeg", "/images/oats_2.jpeg"],
    heroImage: "/images/oats_1.jpeg",
    serveImage: "/images/oats_2.jpeg",
    stats: [
      { value: "26g", label: "Protein / 100g" },
      { value: "10%", label: "Fibre" },
      { value: "0%", label: "Added Sugar" },
      { value: "0%", label: "Preservatives" },
    ],
    badges: ["Non-GMO", "High Fiber", "No Preservatives", "Naturally Sweetened"],
    benefits: [
      {
        title: "Sustained Energy",
        body: "Complex carbs and fibre keep you fuelled through the morning, no crash.",
      },
      {
        title: "Easy to Digest",
        body: "Gentle on the gut with added prebiotics for a clean, comfortable start.",
      },
      {
        title: "Zero Nasties",
        body: "No preservatives, no added sugar, no artificial anything. Just real food.",
      },
      {
        title: "Protein-Forward",
        body: "26g of protein per 100g serving from clean, whole-food sources.",
      },
    ],
    weight: "425g resealable pouch · 70g single-serve cup (20g protein/cup)",
  },
  peanutButter: {
    id: "peanutButter",
    slug: "peanut-butter-powder",
    name: "Mornfreak Pure Peanut Butter Powder",
    tagline: "Clean Fuel. Real Results.",
    description:
      "100% peanuts. 9g protein per serving, 87% less fat than traditional peanut butter. The clean, versatile protein boost your mornings have been missing.",
    images: [
      "/images/peanut_butter_powder_1.jpeg",
      "/images/peanut_butter_powder_2.jpeg",
    ],
    heroImage: "/images/peanut_butter_powder_1.jpeg",
    serveImage: "/images/peanut_butter_powder_2.jpeg",
    stats: [
      { value: "9g", label: "Protein / Serving" },
      { value: "87%", label: "Less Fat" },
      { value: "0%", label: "Added Sugar" },
      { value: "0g", label: "Trans Fat" },
    ],
    badges: ["Gluten-Free", "Plant-Based", "No Added Sugar", "No Added Salt"],
    benefits: [
      {
        title: "100% Peanuts",
        body: "Nothing else. No fillers, no additives. Just the pure, clean taste of peanuts.",
      },
      {
        title: "Plant-Based Protein",
        body: "9g of natural plant protein per serving to fuel muscle recovery and satiety.",
      },
      {
        title: "Versatile",
        body: "Mix into oats, shakes, or baking. The lightest way to add peanut flavour.",
      },
      {
        title: "Lighter Choice",
        body: "87% less fat and 1/3 fewer calories than traditional peanut butter.",
      },
    ],
    weight: "230g jar",
  },
};

export function getProductContent(id: ProductId): ProductContent {
  return PRODUCT_CONTENT[id];
}

export const ALL_PRODUCTS = Object.values(PRODUCT_CONTENT);
