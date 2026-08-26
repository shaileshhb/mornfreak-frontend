import type { ProductId } from "@/design/tokens/products";

export type ProductStat = {
  value: string;
  label: string;
};

export type ProductContent = {
  id: ProductId;
  slug: string;
  label: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
  heroImage: string;
  hoverImage: string;
  serveImage: string;
  stats: ProductStat[];
  badges: string[];
  benefits: { title: string; body: string }[];
  weight: string;
};

export const PRODUCT_CONTENT: Record<ProductId, ProductContent> = {
  peanutButter: {
    id: "peanutButter",
    slug: "peanut-butter-powder",
    label: "Peanut Butter Powder",
    name: "Peanut Butter Powder",
    tagline: "Clean Fuel. Real Results.",
    description:
      "100% peanuts. 9g protein per serving, 87% less fat than traditional peanut butter. The clean, versatile protein boost your mornings have been missing.",
    images: [
      "/images/products/peanut-butter/peanut-powder.jpeg",
      "/images/products/peanut-butter/peanut-butter-pour.jpeg",
    ],
    heroImage: "/images/products/peanut-butter/peanut-powder.jpeg",
    hoverImage: "/images/products/peanut-butter/peanut-butter-pour.jpeg",
    serveImage: "/images/products/peanut-butter/peanut-powder.jpeg",
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
  peanutButterPackOf2: {
    id: "peanutButterPackOf2",
    slug: "peanut-butter-powder-pack-of-2",
    label: "Peanut Butter Powder",
    name: "Peanut Butter Powder (Pack of 2)",
    tagline: "Clean Fuel. Real Results.",
    description:
      "100% peanuts. 9g protein per serving, 87% less fat than traditional peanut butter. The clean, versatile protein boost your mornings have been missing.",
    images: [
      "/images/products/peanut-butter/peanut-powder.jpeg",
      "/images/products/peanut-butter/peanut-butter-pour.jpeg",
    ],
    heroImage: "/images/products/peanut-butter/peanut-powder.jpeg",
    hoverImage: "/images/products/peanut-butter/peanut-butter-pour.jpeg",
    serveImage: "/images/products/peanut-butter/peanut-powder.jpeg",
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
  proteinOats425g: {
    id: "proteinOats425g",
    slug: "protein-oats-425g",
    label: "Protein Oats 425g",
    name: "Protein Oats 425g",
    tagline: "Rich Chocolate. Real Gains.",
    description:
      "26g of protein per 100g, sweetened naturally with dates, loaded with super seeds and nuts. The breakfast that works as hard as you do.",
    images: ["/images/products/oats/oats-425g-2.jpeg", "/images/products/oats/oats-425g-pour.avif"],
    heroImage: "/images/products/oats/oats-425g-2.jpeg",
    hoverImage: "/images/products/oats/oats-425g-pour.avif",
    serveImage: "/images/products/oats/oats-425g-2.jpeg",
    weight: "425g resealable pouch · 70g single-serve cup (20g protein/cup)",
    stats: [
      { value: "26g", label: "Protein / 100g" },
      { value: "10%", label: "Fibre" },
      { value: "0%", label: "Added Sugar" },
      { value: "0%", label: "Preservatives" },
    ],
    badges: ["Non-GMO", "High Fiber", "No Preservatives"],
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
  },
  proteinOats425gPackOf2: {
    id: "proteinOats425gPackOf2",
    slug: "protein-oats-425g-pack-of-2",
    label: "Protein Oats 425g Pack of 2",
    name: "Protein Oats 425g (Pack of 2)",
    tagline: "Rich Chocolate. Real Gains.",
    description:
      "26g of protein per 100g, sweetened naturally with dates, loaded with super seeds and nuts. The breakfast that works as hard as you do.",
    images: ["/images/products/oats/oats-425g-2.jpeg", "/images/products/oats/oats-425g-pour.avif"],
    heroImage: "/images/products/oats/oats-425g-2.jpeg",
    hoverImage: "/images/products/oats/oats-425g-pour.avif",
    serveImage: "/images/products/oats/oats-425g-2.jpeg",
    weight: "425g resealable pouch · 70g single-serve cup (20g protein/cup)",
    stats: [
      { value: "26g", label: "Protein / 100g" },
      { value: "10%", label: "Fibre" },
      { value: "0%", label: "Added Sugar" },
      { value: "0%", label: "Preservatives" },
    ],
    badges: ["Non-GMO", "High Fiber", "No Preservatives"],
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
  },
  proteinOats77g: {
    id: "proteinOats77g",
    slug: "protein-oats-77g",
    label: "Protein Oats 77g",
    name: "Mornfreak Protein Oats 77g",
    tagline: "Rich Chocolate. Real Gains.",
    description:
      "26g of protein per 100g, sweetened naturally with dates, loaded with super seeds and nuts. The breakfast that works as hard as you do.",
    images: ["/images/products/oats/oats-77g-1.jpeg", "/images/products/oats/oats-77g-pour.jpeg"],
    heroImage: "/images/products/oats/oats-77g-1.jpeg",
    hoverImage: "/images/products/oats/oats-77g-pour.jpeg",
    serveImage: "/images/products/oats/oats-77g-1.jpeg",
    weight: "77g single-serve cup (20g protein/cup)",
    stats: [
      { value: "26g", label: "Protein / 100g" },
      { value: "10%", label: "Fibre" },
      { value: "0%", label: "Added Sugar" },
      { value: "0%", label: "Preservatives" },
    ],
    badges: ["No Preservatives", "Prebiotics Added", "Sustainable Energy", "No Refined Sugar"],
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
  },
  proteinOats77gPackOf6: {
    id: "proteinOats77gPackOf6",
    slug: "protein-oats-77g-pack-of-6",
    label: "Protein Oats 77g Pack of 6",
    name: "Protein Oats 77g (Pack of 6)",
    tagline: "Rich Chocolate. Real Gains.",
    description:
      "26g of protein per 100g, sweetened naturally with dates, loaded with super seeds and nuts. The breakfast that works as hard as you do.",
    images: ["/images/products/oats/oats-77g-1.jpeg", "/images/products/oats/oats-77g-pour.jpeg"],
    heroImage: "/images/products/oats/oats-77g-1.jpeg",
    hoverImage: "/images/products/oats/oats-77g-pour.jpeg",
    serveImage: "/images/products/oats/oats-77g-1.jpeg",
    weight: "77g single-serve cup (20g protein/cup)",
    stats: [
      { value: "26g", label: "Protein / 100g" },
      { value: "10%", label: "Fibre" },
      { value: "0%", label: "Added Sugar" },
      { value: "0%", label: "Preservatives" },
    ],
    badges: ["No Preservatives", "Prebiotics Added", "Sustainable Energy", "No Refined Sugar"],
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
  },
};

export function getProductContent(id: ProductId): ProductContent {
  return PRODUCT_CONTENT[id];
}

export const ALL_PRODUCTS = Object.values(PRODUCT_CONTENT);
