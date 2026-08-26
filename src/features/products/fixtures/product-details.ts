import {
  PEANUT_BUTTER_INGREDIENTS,
  PROTEIN_OATS_INGREDIENTS,
} from "@/features/ingredients/ingredients-data";
import { PRODUCT_CONTENT } from "@/lib/products";

import type {
  ProductDetail,
  ProductGalleryCallout,
  ProductImage,
  ProductIngredient,
} from "../types";

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

const proteinOats425g = PRODUCT_CONTENT.proteinOats425g;
const proteinOats77g = PRODUCT_CONTENT.proteinOats77g;
const proteinOats425gPackOf2 = PRODUCT_CONTENT.proteinOats425gPackOf2;
const proteinOats77gPackOf6 = PRODUCT_CONTENT.proteinOats77gPackOf6;
const peanutButter = PRODUCT_CONTENT.peanutButter;
const peanutButterPackOf2 = PRODUCT_CONTENT.peanutButterPackOf2;

const PEANUT_BUTTER_GALLERY_IMAGES: ProductImage[] = [
  {
    url: "/images/products/peanut-butter/peanut-powder.avif",
    alt: "Mornfreak Pure Peanut Butter Powder jar",
  },
  {
    url: "/images/products/peanut-butter/peanut-butter-pour.avif",
    alt: "Peanut butter powder poured from the jar",
  },
  {
    url: "/images/products/peanut-butter/pb-power-2.avif",
    alt: "Peanut Butter Powder benefits: muscle repair, fibre, energy and weight control",
  },
  {
    url: "/images/products/peanut-butter/pb-serving.avif",
    alt: "Calories and macros: 66.5 kcal per serving versus regular peanut butter",
  },
  {
    url: "/images/products/peanut-butter/pb-nutrition-2.avif",
    alt: "Nutrition table per 100g and per 16g serving",
  },
  {
    url: "/images/products/peanut-butter/pb-ingredients.avif",
    alt: "Jar back panel: 100% roasted peanuts and 7-second mix instructions",
  },
  {
    url: "/images/products/peanut-butter/pb-graph.avif",
    alt: "Graph of calories per gram of protein versus regular peanut butter",
  },
  {
    url: "/images/products/peanut-butter/pb-crafting.avif",
    alt: "How peanut butter powder is crafted: roast, mill, refine and seal",
  },
  {
    url: "/images/products/peanut-butter/pb-power.avif",
    alt: "Pure peanut butter powder with twice the protein and no added sugar",
  },
  {
    url: "/images/products/peanut-butter/pb-peanuts.avif",
    alt: "Premium Java and Bold peanuts slow-roasted in small batches",
  },
  {
    url: "/images/products/peanut-butter/pb-compare.avif",
    alt: "Peanut Butter Powder compared with regular peanut butter",
  },
];

const PEANUT_BUTTER_GALLERY_CALLOUTS: ProductGalleryCallout[] = [
  { icon: "dumbbell", label: "Muscle Repair" },
  { icon: "wheat", label: "Fiber Rich" },
  { icon: "leaf", label: "Nutrient Dense" },
  { icon: "heart", label: "Cholesterol Free" },
  { icon: "zap", label: "Sustained Energy" },
  { icon: "scale", label: "Weight Control" },
];

export const PRODUCT_DETAIL_FIXTURES: Record<string, ProductDetail> = {
  "peanut-butter-powder": {
    id: peanutButter.id,
    slug: peanutButter.slug,
    name: peanutButter.name,
    label: peanutButter.label,
    tagline: peanutButter.tagline,
    description: peanutButter.description,
    images: PEANUT_BUTTER_GALLERY_IMAGES,
    overlayBadge: "100% Peanuts",
    // galleryCallouts: PEANUT_BUTTER_GALLERY_CALLOUTS,
    price: 30,
    compareAtPrice: null,
    currency: "AED",
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
      { label: "Serving size", value: "16g" },
      { label: "Energy", value: "66.5 kcal" },
      { label: "Protein", value: "9.0g" },
      { label: "Total Carbohydrate", value: "4.2g" },
      { label: "Dietary Fibre", value: "2.0g" },
      { label: "Total Sugar", value: "0.9g" },
      { label: "Total Fat", value: "2.0g" },
      { label: "Saturated fat", value: "0.4g" },
      { label: "Trans fat", value: "0.0g" },
      { label: "Cholesterol", value: "0.0mg" },
      { label: "Sodium", value: "0.0mg" },
    ],
    nutritionCaption: "Per 16g serving",
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
  "peanut-butter-powder-pack-of-2": {
    id: peanutButterPackOf2.id,
    slug: peanutButterPackOf2.slug,
    name: peanutButterPackOf2.name,
    label: peanutButterPackOf2.label,
    tagline: peanutButterPackOf2.tagline,
    description: peanutButterPackOf2.description,
    images: PEANUT_BUTTER_GALLERY_IMAGES,
    overlayBadge: "100% Peanuts",
    galleryCallouts: PEANUT_BUTTER_GALLERY_CALLOUTS,
    price: 50,
    compareAtPrice: null,
    currency: "AED",
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
  "protein-oats-425g": {
    id: proteinOats425g.id,
    slug: proteinOats425g.slug,
    name: proteinOats425g.name,
    label: proteinOats425g.label,
    tagline: proteinOats425g.tagline,
    description: proteinOats425g.description,
    images: [
      {
        url: "/images/products/oats/oats-425g-1.avif",
        alt: "Protein Oats 425g pouch",
      },
      {
        url: "/images/products/oats/oats-425g-2.avif",
        alt: "Protein Oats 425g pouch",
      },
      {
        url: "/images/products/oats/oats-425g-back.avif",
        alt: "Protein Oats 425g pouch back panel",
      },
      {
        url: "/images/products/oats/oats-425g-3.avif",
        alt: "Protein Oats 425g pouch with a prepared chocolate oat bowl",
      },
      {
        url: "/images/products/oats/oats-425g-4.avif",
        alt: "Optimize your life",
      },
      {
        url: "/images/products/oats/oats-425g-5.avif",
        alt: "Super seeds and nuts",
      },
      {
        url: "/images/products/oats/oats-general-1.avif",
        alt: "Rich Chocolate oats",
      },
      {
        url: "/images/products/oats/oats-nutrition.avif",
        alt: "Protein Oats nutritional information table",
      },
      {
        url: "/images/products/oats/oats-ingredients.avif",
        alt: "Single-serve cup back panel with ingredients and prep steps",
      },
    ],
    price: 32,
    compareAtPrice: null,
    currency: "AED",
    stats: proteinOats425g.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: proteinOats425g.badges,
    servingInfo: proteinOats425g.weight,
    comingSoon: true,
    howToUse: [
      { text: "Add a 70g serving to a bowl." },
      { text: "Pour over hot milk or water." },
      { text: "Stir well, rest 2 minutes" },
      { text: "Enjoy warm" },
    ],
    ingredientStatement:
      "Gluten-free oats, protein blend (texturized soy protein, whey protein concentrate and soy protein isolate), dates powder, seeds nuts and fruits mix (almonds, pumpkin seeds, sunflower seeds, chia seeds, flax seeds and black raisins), prebiotic fibre, cocoa, pink salt and monk fruit.",
    nutrition: [
      { label: "Serving size", value: "100g" },
      { label: "Energy", value: "383 kcal" },
      { label: "Protein", value: "26.0g" },
      { label: "Total Carbohydrate", value: "42.0g" },
      { label: "Total Sugar", value: "10.3g" },
      { label: "Added sugar", value: "0.0g" },
      { label: "Total Fat", value: "6.3g" },
      { label: "Saturated fat", value: "1.6g" },
      { label: "Trans fat", value: "0.0g" },
      { label: "Cholesterol", value: "0mg" },
      { label: "Sodium", value: "349mg" },
    ],
    nutritionCaption: "Per 100g serving",
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
  "protein-oats-425g-pack-of-2": {
    id: proteinOats425gPackOf2.id,
    slug: proteinOats425gPackOf2.slug,
    name: proteinOats425gPackOf2.name,
    label: proteinOats425gPackOf2.label,
    tagline: proteinOats425gPackOf2.tagline,
    description: proteinOats425gPackOf2.description,
    images: [
      {
        url: "/images/products/oats/oats-425g-1.avif",
        alt: "Protein Oats 425g pouch",
      },
      {
        url: "/images/products/oats/oats-425g-2.avif",
        alt: "Protein Oats 425g pouch",
      },
      {
        url: "/images/products/oats/oats-425g-back.avif",
        alt: "Protein Oats 425g pouch back panel",
      },
      {
        url: "/images/products/oats/oats-425g-3.avif",
        alt: "Protein Oats 425g pouch with a prepared chocolate oat bowl",
      },
      {
        url: "/images/products/oats/oats-425g-4.avif",
        alt: "Optimize your life",
      },
      {
        url: "/images/products/oats/oats-425g-5.avif",
        alt: "Super seeds and nuts",
      },
      {
        url: "/images/products/oats/oats-general-1.avif",
        alt: "Rich Chocolate oats",
      },
      {
        url: "/images/products/oats/oats-nutrition.avif",
        alt: "Protein Oats nutritional information table",
      },
      {
        url: "/images/products/oats/oats-ingredients-2.avif",
        alt: "Meet the ingredients: oats, protein blend, dates, seeds, almonds and raisins",
      },
      {
        url: "/images/products/oats/oats-ingredients.avif",
        alt: "Single-serve cup back panel with ingredients and prep steps",
      },
    ],
    price: 58,
    compareAtPrice: null,
    currency: "AED",
    stats: proteinOats425gPackOf2.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: proteinOats425gPackOf2.badges,
    servingInfo: proteinOats425gPackOf2.weight,
    comingSoon: true,
    howToUse: [
      { text: "Add a 70g serving to a bowl." },
      { text: "Pour over hot milk or water." },
      { text: "Stir well, rest 2 minutes" },
      { text: "Enjoy warm" },
    ],
    ingredientStatement:
      "Gluten-free oats, protein blend (texturized soy protein, whey protein concentrate and soy protein isolate), dates powder, seeds nuts and fruits mix (almonds, pumpkin seeds, sunflower seeds, chia seeds, flax seeds and black raisins), prebiotic fibre, cocoa, pink salt and monk fruit.",
    nutrition: [
      { label: "Serving size", value: "100g" },
      { label: "Energy", value: "383 kcal" },
      { label: "Protein", value: "26.0g" },
      { label: "Total Carbohydrate", value: "42.0g" },
      { label: "Total Sugar", value: "10.3g" },
      { label: "Added sugar", value: "0.0g" },
      { label: "Total Fat", value: "6.3g" },
      { label: "Saturated fat", value: "1.6g" },
      { label: "Trans fat", value: "0.0g" },
      { label: "Cholesterol", value: "0mg" },
      { label: "Sodium", value: "349mg" },
    ],
    nutritionCaption: "Per 100g serving",
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
  "protein-oats-77g": {
    id: proteinOats77g.id,
    slug: proteinOats77g.slug,
    name: proteinOats77g.name,
    label: proteinOats77g.label,
    tagline: proteinOats77g.tagline,
    description: proteinOats77g.description,
    images: [
      {
        url: "/images/products/oats/oats-77g-1.avif",
        alt: "Protein Oats pouch with a prepared chocolate oat bowl"
      },
      {
        url: "/images/products/oats/oats-77g-2.avif",
        alt: "Protein Oats pouch with a prepared chocolate oat bowl"
      },
      {
        url: "/images/products/oats/oats-77g-back.avif",
        alt: "Protein Oats pouch back panel"
      },
      {
        url: "/images/products/oats/oats-77g-pour.avif",
        alt: "Protein Oats pour",
      },
      {
        url: "/images/products/oats/oats-ingredients.avif",
        alt: "Meet the ingredients"
      },
    ],
    price: 10,
    compareAtPrice: null,
    currency: "AED",
    stats: proteinOats77g.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: proteinOats77g.badges,
    servingInfo: proteinOats77g.weight,
    comingSoon: true,
    howToUse: [
      { text: "Add a 70g serving to a bowl." },
      { text: "Pour over hot milk or water." },
      { text: "Stir, rest 2 minutes, then eat." },
    ],
    ingredientStatement:
      "Gluten-free oats, protein blend (texturized soy protein, whey protein concentrate and soy protein isolate), dates powder, seeds nuts and fruits mix (almonds, pumpkin seeds, sunflower seeds, chia seeds, flax seeds and black raisins), prebiotic fibre, cocoa, pink salt and monk fruit.",
    nutrition: [
      { label: "Serving size", value: "77g" },
      { label: "Calories", value: "276 kcal" },
      { label: "Protein", value: "20.0g" },
      { label: "Total Fat", value: "5.00g" },
      { label: "Saturated Fat", value: "1.16g" },
      { label: "Trans fat", value: "0g" },
      { label: "Cholesterol", value: "0mg" },
      { label: "Sodium", value: "262mg" },
      { label: "Total Carbohydrate", value: "37.6g" },
      { label: "Dietary Fiber", value: "7.1g" },
      { label: "Total Sugars", value: "7.11g" },
      { label: "Added sugar", value: "0.0g" },
    ],
    nutritionCaption: "77g serving",
    ingredients: toProductIngredients(PROTEIN_OATS_INGREDIENTS),
    proofPoints: [
      { icon: "dumbbell", label: "20g Protein / 77g" },
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
  "protein-oats-77g-pack-of-6": {
    id: proteinOats77gPackOf6.id,
    slug: proteinOats77gPackOf6.slug,
    name: proteinOats77gPackOf6.name,
    label: proteinOats77gPackOf6.label,
    tagline: proteinOats77gPackOf6.tagline,
    description: proteinOats77gPackOf6.description,
    images: [
      {
        url: "/images/products/oats/oats-77g-1.avif",
        alt: "Protein Oats pouch with a prepared chocolate oat bowl"
      },
      {
        url: "/images/products/oats/oats-77g-2.avif",
        alt: "Protein Oats pouch with a prepared chocolate oat bowl"
      },
      {
        url: "/images/products/oats/oats-77g-back.avif",
        alt: "Protein Oats pouch back panel"
      },
      {
        url: "/images/products/oats/oats-77g-pour.avif",
        alt: "Protein Oats pour",
      },
      {
        url: "/images/products/oats/oats-ingredients.avif",
        alt: "Meet the ingredients"
      },
    ],
    price: 50,
    compareAtPrice: null,
    currency: "AED",
    stats: proteinOats77gPackOf6.stats.map((stat) => ({
      label: stat.label,
      value: stat.value,
    })),
    trustBadges: proteinOats77gPackOf6.badges,
    servingInfo: proteinOats77gPackOf6.weight,
    comingSoon: true,
    howToUse: [
      { text: "Add a 70g serving to a bowl." },
      { text: "Pour over hot milk or water." },
      { text: "Stir, rest 2 minutes, then eat." },
    ],
    ingredientStatement:
      "Gluten-free oats, protein blend (texturized soy protein, whey protein concentrate and soy protein isolate), dates powder, seeds nuts and fruits mix (almonds, pumpkin seeds, sunflower seeds, chia seeds, flax seeds and black raisins), prebiotic fibre, cocoa, pink salt and monk fruit.",
    nutrition: [
      { label: "Serving size", value: "77g" },
      { label: "Calories", value: "276 kcal" },
      { label: "Protein", value: "20.0g" },
      { label: "Total Fat", value: "5.00g" },
      { label: "Saturated Fat", value: "1.16g" },
      { label: "Trans fat", value: "0g" },
      { label: "Cholesterol", value: "0mg" },
      { label: "Sodium", value: "262mg" },
      { label: "Total Carbohydrate", value: "37.6g" },
      { label: "Dietary Fiber", value: "7.1g" },
      { label: "Total Sugars", value: "7.11g" },
      { label: "Added sugar", value: "0.0g" },
    ],
    nutritionCaption: "77g serving",
    ingredients: toProductIngredients(PROTEIN_OATS_INGREDIENTS),
    proofPoints: [
      { icon: "dumbbell", label: "20g Protein / 77g" },
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
};

export const PRODUCT_DETAIL_SLUGS = Object.keys(PRODUCT_DETAIL_FIXTURES);
