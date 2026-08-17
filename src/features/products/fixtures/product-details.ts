import {
  PEANUT_BUTTER_INGREDIENTS,
  PROTEIN_OATS_INGREDIENTS,
} from "@/features/ingredients/ingredients-data";
import { PRODUCT_CONTENT } from "@/lib/products";

import type { ProductDetail, ProductIngredient } from "../types";

function toProductIngredients(
  ingredients: typeof PROTEIN_OATS_INGREDIENTS,
): ProductIngredient[] {
  return ingredients.map((ingredient) => ({
    name: ingredient.title,
    image: ingredient.image,
    imageAlt: ingredient.imageAlt,
    description: ingredient.description,
    keyFeatures: ingredient.keyFeatures,
  }));
}

const proteinOats = PRODUCT_CONTENT.proteinOats;
const peanutButter = PRODUCT_CONTENT.peanutButter;

export const PRODUCT_DETAIL_FIXTURES: Record<string, ProductDetail> = {
  "protein-oats": {
    id: proteinOats.id,
    slug: proteinOats.slug,
    name: proteinOats.name,
    tagline: proteinOats.tagline,
    description: proteinOats.description,
    images: [
      {
        url: "/images/oats_1.jpeg",
        alt: "Mornfreak Protein Oats pouch and single-serve cup",
      },
      {
        url: "/images/oats_2.jpeg",
        alt: "Bowl of prepared Mornfreak Protein Oats",
      },
    ],
    price: 599,
    compareAtPrice: 699,
    currency: "INR",
    variants: [
      {
        id: "protein-oats-425g",
        label: "425g Pouch",
        sku: "MF-PO-425",
        price: 599,
        inStock: false,
      },
    ],
    stats: proteinOats.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: proteinOats.badges,
    servingInfo: proteinOats.weight,
    comingSoon: true,
    howToUse: [
      {
        text: "[TODO: confirm preparation copy] Add one 70g serving (1 cup) to a bowl.",
      },
      {
        text: "[TODO: confirm liquid amount] Pour over hot water or milk.",
      },
      {
        text: "[TODO: confirm timing] Stir until combined, then eat.",
      },
    ],
    nutrition: [
      { label: "Serving size", value: "70g (1 cup)" },
      { label: "Energy", value: "268 kcal" },
      { label: "Protein", value: "20g" },
      { label: "Carbohydrates", value: "32g" },
      { label: "of which sugars", value: "6g (naturally occurring)" },
      { label: "Fibre", value: "7g" },
      { label: "Fat", value: "6g" },
      { label: "Added sugar", value: "0g" },
    ],
    ingredients: toProductIngredients(PROTEIN_OATS_INGREDIENTS),
    proofPoints: [
      { icon: "dumbbell", label: "26g Protein / 100g" },
      { icon: "check", label: "No Added Sugar" },
      { icon: "wheat", label: "High Fiber" },
      { icon: "shield", label: "No Preservatives" },
      { icon: "leaf", label: "Naturally Sweetened" },
    ],
    reviews: {
      averageRating: 4.3,
      count: 4,
      items: [
        {
          id: "po-1",
          author: "Priya R.",
          rating: 5,
          date: "2026-07-12",
          verified: true,
          title: "Actually keeps me full till lunch",
          body: "I've tried three other protein oats brands and always ended up hungry by 10am. This one actually holds me over. Chocolate flavour isn't sickly sweet either, which I was worried about given no added sugar.",
        },
        {
          id: "po-2",
          author: "Marcus T.",
          rating: 4,
          date: "2026-06-28",
          verified: true,
          title: "Good but texture takes getting used to",
          body: "Taste is solid, protein hit is real (I checked the label against what they claim, checks out). Only reason it's not 5 stars is the texture is a bit denser than regular oats, took me a couple bowls to get used to it. Will reorder.",
        },
        {
          id: "po-3",
          author: "Ayesha K.",
          rating: 5,
          date: "2026-06-15",
          verified: true,
          title: "My kids don't even notice it's protein oats",
          body: "Been making this for my two boys before school and they have no idea it's not the regular stuff. Way easier than fighting them to eat breakfast. The 70g cups are clutch for when we're rushing out the door.",
        },
        {
          id: "po-4",
          author: "Daniel O.",
          rating: 3,
          date: "2026-05-30",
          verified: true,
          title: "Decent, a bit pricey for the pouch size",
          body: "Flavour and mixability are good, no complaints there. Just feels like the 425g pouch runs out faster than I'd like given how often I'm having it. Would probably buy a bigger bag if offered.",
        },
      ],
    },
  },
  "peanut-butter-powder": {
    id: peanutButter.id,
    slug: peanutButter.slug,
    name: peanutButter.name,
    tagline: peanutButter.tagline,
    description: peanutButter.description,
    images: [
      {
        url: "/images/peanut_butter_powder_1.jpeg",
        alt: "Mornfreak Pure Peanut Butter Powder jar",
      },
      {
        url: "/images/peanut_butter_powder_2.jpeg",
        alt: "Peanut butter powder with whole peanuts",
      },
    ],
    price: 449,
    compareAtPrice: null,
    currency: "INR",
    variants: [
      {
        id: "pbp-230g",
        label: "230g Jar",
        sku: "MF-PBP-230",
        price: 449,
        inStock: false,
      },
    ],
    stats: peanutButter.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: peanutButter.badges,
    servingInfo: peanutButter.weight,
    comingSoon: true,
    howToUse: [
      {
        text: "[TODO: confirm preparation copy] Add 2 tablespoons (12g) to oats, a shake, or baking.",
      },
      {
        text: "[TODO: confirm mixing copy] Stir or blend until smooth.",
      },
      {
        text: "[TODO: confirm serving copy] Use as a lighter peanut flavour boost.",
      },
    ],
    nutrition: [
      { label: "Serving size", value: "12g (2 tbsp)" },
      { label: "Energy", value: "50 kcal" },
      { label: "Protein", value: "9g" },
      { label: "Carbohydrates", value: "4g" },
      { label: "of which sugars", value: "1g (naturally occurring)" },
      { label: "Fibre", value: "2g" },
      { label: "Fat", value: "1.5g" },
      { label: "Trans fat", value: "0g" },
    ],
    ingredients: toProductIngredients(PEANUT_BUTTER_INGREDIENTS),
    proofPoints: [
      { icon: "dumbbell", label: "9g Protein / Serving" },
      { icon: "droplet", label: "87% Less Fat" },
      { icon: "check", label: "No Added Sugar" },
      { icon: "leaf", label: "Plant-Based" },
      { icon: "shield", label: "Gluten-Free" },
    ],
    reviews: {
      averageRating: 4.7,
      count: 3,
      items: [
        {
          id: "pbp-1",
          author: "Sam L.",
          rating: 5,
          date: "2026-07-08",
          verified: true,
          title: "Finally, just peanuts",
          body: "Sick of powders with 8 ingredients I can't pronounce. This is literally just peanuts and it tastes like it. Mixes into oats or a smoothie with zero grit, which surprised me.",
        },
        {
          id: "pbp-2",
          author: "Chelsea W.",
          rating: 4,
          date: "2026-06-22",
          verified: true,
          title: "Great for macros, still getting used to powder PB",
          body: "If you're used to the real jar stuff it's a mental adjustment, but for the protein-to-fat ratio this is unbeatable. I add a scoop to my oats every morning now instead of a whole tablespoon of regular peanut butter.",
        },
        {
          id: "pbp-3",
          author: "Rohit N.",
          rating: 5,
          date: "2026-06-02",
          verified: true,
          title: "No weird aftertaste",
          body: "Tried two other brands before this and both had a slightly bitter aftertaste once mixed. This one doesn't. Simple ingredient list probably explains why. Will be a repeat buy.",
        },
      ],
    },
  },
};

export const PRODUCT_DETAIL_SLUGS = Object.keys(PRODUCT_DETAIL_FIXTURES);
