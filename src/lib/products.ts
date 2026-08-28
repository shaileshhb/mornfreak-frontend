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
      "Instantly boost your protein intake with MornFreak Pure Peanut Butter Powder, made from 100% roasted peanuts. This clever powder transforms into creamy peanut butter in just 7 seconds — simply mix 2 tablespoons of PB powder with 1.5–2 tablespoons of water and stir until smooth! With 87% less fat and 1/3 fewer calories compared to traditional peanut butter, it's the smarter choice for health-conscious individuals. Each serving delivers 9g of plant-based protein, making it ideal for muscle repair and sustained energy throughout the day. It's gluten-free, unsweetened, contains no trans fat, no added sugar or salt, and is completely cholesterol free. Nutrient dense and fibre rich, it supports weight control as part of a balanced diet. Use it as a spread, blend it into smoothies and shakes, or incorporate it into your favourite baked goods like cookies, brownies, and pancakes. Available in a 230g jar, this versatile powder is a clean, powerful addition to any diet.",
    images: [
      "/images/products/peanut-butter/peanut-powder.avif",
      "/images/products/peanut-butter/peanut-butter-pour.avif",
    ],
    heroImage: "/images/products/peanut-butter/peanut-powder.avif",
    hoverImage: "/images/products/peanut-butter/peanut-butter-pour.avif",
    serveImage: "/images/products/peanut-butter/peanut-powder.avif",
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
      "Instantly boost your protein intake with MornFreak Pure Peanut Butter Powder, made from 100% roasted peanuts. This clever powder transforms into creamy peanut butter in just 7 seconds — simply mix 2 tablespoons of PB powder with 1.5–2 tablespoons of water and stir until smooth! With 87% less fat and 1/3 fewer calories compared to traditional peanut butter, it's the smarter choice for health-conscious individuals. Each serving delivers 9g of plant-based protein, making it ideal for muscle repair and sustained energy throughout the day. It's gluten-free, unsweetened, contains no trans fat, no added sugar or salt, and is completely cholesterol free. Nutrient dense and fibre rich, it supports weight control as part of a balanced diet. Use it as a spread, blend it into smoothies and shakes, or incorporate it into your favourite baked goods like cookies, brownies, and pancakes. Available in a 230g jar, this versatile powder is a clean, powerful addition to any diet.",
    images: [
      "/images/products/peanut-butter/pb-pack-of-2.avif",
      "/images/products/peanut-butter/peanut-butter-pour.avif",
    ],
    heroImage: "/images/products/peanut-butter/pb-pack-of-2.avif",
    hoverImage: "/images/products/peanut-butter/peanut-butter-pour.avif",
    serveImage: "/images/products/peanut-butter/pb-pack-of-2.avif",
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
      "Start your mornings the smart way with MornFreak Protein Oats – Super Seeds & Nuts in Rich Chocolate flavour. Each serving delivers an impressive 26g of protein through a balanced blend of whey and plant-based sources, combined with complex carbohydrates and dietary fibre to keep you fuelled throughout the day. Enriched with omega-3 healthy fats from a super seeds mix of chia, flax, and pumpkin seeds, plus added prebiotics to support gut health and digestion, this nutrient-dense breakfast is designed for real performance. Naturally sweetened with dates powder and monk fruit, it contains zero added sugar and no artificial flavours or preservatives. The gluten-free, non-GMO formula is easy to digest and ready in under a minute – enjoy it as a hot bowl, overnight oats, protein smoothie, or snack bowl. With real ingredients like almonds, cocoa, black raisins, and pink salt, every scoop is crafted to deliver balanced nutrition without compromising on taste. Ideal for breakfast, pre- or post-workout meals, or an evening snack.",
    images: ["/images/products/oats-425g/oats-425g-1.avif", "/images/products/oats-425g/oats-425g-pour.avif"],
    heroImage: "/images/products/oats-425g/oats-425g-1.avif",
    hoverImage: "/images/products/oats-425g/oats-425g-pour.avif",
    serveImage: "/images/products/oats-425g/oats-425g-1.avif",
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
      "Start your mornings the smart way with MornFreak Protein Oats – Super Seeds & Nuts in Rich Chocolate flavour. Each serving delivers an impressive 26g of protein through a balanced blend of whey and plant-based sources, combined with complex carbohydrates and dietary fibre to keep you fuelled throughout the day. Enriched with omega-3 healthy fats from a super seeds mix of chia, flax, and pumpkin seeds, plus added prebiotics to support gut health and digestion, this nutrient-dense breakfast is designed for real performance. Naturally sweetened with dates powder and monk fruit, it contains zero added sugar and no artificial flavours or preservatives. The gluten-free, non-GMO formula is easy to digest and ready in under a minute – enjoy it as a hot bowl, overnight oats, protein smoothie, or snack bowl. With real ingredients like almonds, cocoa, black raisins, and pink salt, every scoop is crafted to deliver balanced nutrition without compromising on taste. Ideal for breakfast, pre- or post-workout meals, or an evening snack.",
    images: ["/images/products/oats-425g/oats-425g-1.avif", "/images/products/oats-425g/oats-425g-pour.avif"],
    heroImage: "/images/products/oats-425g/oats-425g-1.avif",
    hoverImage: "/images/products/oats-425g/oats-425g-pour.avif",
    serveImage: "/images/products/oats-425g/oats-425g-1.avif",
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
      "Start your mornings with MornFreak Protein Oats – Rich Chocolate, a delicious and satisfying breakfast made for busy, active days. Each 77g serving delivers 20g of protein from a whey and plant-based protein blend, along with wholesome oats, nuts, seeds, fibre, and added prebiotics. Naturally sweetened with dates and monk fruit, it delivers rich chocolate flavour without refined sugar. Easy to prepare in under a minute, enjoy it as hot oats, overnight oats, a smoothie, or a convenient pre- or post-workout meal.",
    images: ["/images/products/oats-77g/oats-77g-nobg-1.avif", "/images/products/oats-77g/oats-77g-pour.avif"],
    heroImage: "/images/products/oats-77g/oats-77g-nobg-1.avif",
    hoverImage: "/images/products/oats-77g/oats-77g-pour.avif",
    serveImage: "/images/products/oats-77g/oats-77g-nobg-1.avif",
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
      "Start your mornings with MornFreak Protein Oats – Rich Chocolate, a delicious and satisfying breakfast made for busy, active days. Each 77g serving delivers 20g of protein from a whey and plant-based protein blend, along with wholesome oats, nuts, seeds, fibre, and added prebiotics. Naturally sweetened with dates and monk fruit, it delivers rich chocolate flavour without refined sugar. Easy to prepare in under a minute, enjoy it as hot oats, overnight oats, a smoothie, or a convenient pre- or post-workout meal.",
    images: ["/images/products/oats-77g/oats-77g-pack-of-6.avif", "/images/products/oats-77g/oats-77g-pour.avif"],
    heroImage: "/images/products/oats-77g/oats-77g-pack-of-6.avif",
    hoverImage: "/images/products/oats-77g/oats-77g-pour.avif",
    serveImage: "/images/products/oats-77g/oats-77g-pack-of-6.avif",
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
