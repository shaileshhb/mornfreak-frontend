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
        url: "/images/products/oats/oats-3.jpeg",
        alt: "Protein Oats pouch with a prepared chocolate oat bowl",
      },
      {
        url: "/images/products/oats/oats-5.jpeg",
        alt: "Bowl of Rich Chocolate oats for breakfast, snacking and travel",
      },
      {
        url: "/images/products/oats/oats-nutrition.jpeg",
        alt: "Protein Oats nutritional information table",
      },
      {
        url: "/images/products/oats/oats-ingredients-2.jpeg",
        alt: "Meet the ingredients: oats, protein blend, dates, seeds, almonds and raisins",
      },
      {
        url: "/images/products/oats/oats-info-2.jpeg",
        alt: "Protein Oats benefits: 26g protein, prebiotics and rich chocolate taste",
      },
      {
        url: "/images/products/oats/oats-ingredients.jpeg",
        alt: "Single-serve cup back panel with ingredients and prep steps",
      },
      {
        url: "/images/products/oats/oats-4.jpeg",
        alt: "Prepared Protein Oats bowl with banana, berries and chocolate",
      },
      {
        url: "/images/products/oats/oats-clean.jpeg",
        alt: "Clean, gut-friendly fuel claims next to Protein Oats pouch",
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
      { text: "Add a 70g serving to a bowl." },
      { text: "Pour over hot milk or water." },
      { text: "Stir, rest 2 minutes, then eat." },
    ],
    ingredientStatement:
      "Gluten-free oats, protein blend (texturized soy protein, whey protein concentrate and soy protein isolate), dates powder, seeds nuts and fruits mix (almonds, pumpkin seeds, sunflower seeds, chia seeds, flax seeds and black raisins), prebiotic fibre, cocoa, pink salt and monk fruit.",
    nutrition: [
      { label: "Serving size", value: "70g" },
      { label: "Energy", value: "383 kcal" },
      { label: "Protein", value: "26.0g" },
      { label: "Carbohydrates", value: "42.0g" },
      { label: "of which sugars", value: "10.3g" },
      { label: "Fibre", value: "8.4g" },
      { label: "Fat", value: "6.3g" },
      { label: "Saturated fat", value: "1.6g" },
      { label: "Trans fat", value: "0.0g" },
      { label: "Added sugar", value: "0.0g" },
      { label: "Sodium", value: "349mg" },
    ],
    nutritionCaption: "Per 100g",
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
        url: "/images/products/peanut-butter/pb-power-2.jpeg",
        alt: "Peanut Butter Powder benefits: muscle repair, fibre, energy and weight control",
      },
      {
        url: "/images/products/peanut-butter/pb-serving.jpeg",
        alt: "Calories and macros: 66.5 kcal per serving versus regular peanut butter",
      },
      {
        url: "/images/products/peanut-butter/pb-nutrition-2.jpeg",
        alt: "Nutrition table per 100g and per 16g serving",
      },
      {
        url: "/images/products/peanut-butter/pb-ingredients.jpeg",
        alt: "Jar back panel: 100% roasted peanuts and 7-second mix instructions",
      },
      {
        url: "/images/products/peanut-butter/pb-graph.jpeg",
        alt: "Graph of calories per gram of protein versus regular peanut butter",
      },
      {
        url: "/images/products/peanut-butter/pb-crafting.jpeg",
        alt: "How peanut butter powder is crafted: roast, mill, refine and seal",
      },
      {
        url: "/images/products/peanut-butter/pb-power.jpeg",
        alt: "Pure peanut butter powder with twice the protein and no added sugar",
      },
      {
        url: "/images/products/peanut-butter/pb-peanuts.jpeg",
        alt: "Premium Java and Bold peanuts slow-roasted in small batches",
      },
      {
        url: "/images/products/peanut-butter/pb-compare.jpeg",
        alt: "Peanut Butter Powder compared with regular peanut butter",
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
      { text: "Take 2 tbsp (16g) of powder." },
      { text: "Mix with 1.5–2 tbsp water." },
      { text: "Stir until smooth (about 7 seconds)." },
    ],
    ingredientStatement: "Roasted peanuts (100%).",
    nutrition: [
      { label: "Serving size", value: "16g (2 tbsp)" },
      { label: "Energy", value: "66.5 kcal" },
      { label: "Protein", value: "9.0g" },
      { label: "Carbohydrates", value: "4.2g" },
      { label: "of which sugars", value: "0.9g" },
      { label: "Fibre", value: "2.0g" },
      { label: "Fat", value: "2.0g" },
      { label: "Saturated fat", value: "0.4g" },
      { label: "Trans fat", value: "0.0g" },
      { label: "Added sugar", value: "0.0g" },
      { label: "Sodium", value: "0.0mg" },
    ],
    nutritionCaption: "Per 16g serving (2 tbsp)",
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
