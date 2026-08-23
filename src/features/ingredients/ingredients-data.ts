export type Ingredient = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  keyFeatures: string[];
};

export const PROTEIN_OATS_INGREDIENTS: Ingredient[] = [
  {
    id: "oats",
    title: "Oats",
    description:
      "Whole rolled oats for slow-release energy that keeps you going through the morning.",
    image: "/images/ingredients/oats.avif",
    imageAlt: "Wooden bowl filled with rolled oats",
    keyFeatures: [
      "Complex carbohydrates for sustained energy",
      "Naturally high in fibre",
      "Gentle on digestion",
    ],
  },
  {
    id: "protein-blend",
    title: "Protein Blend (Whey + Soy)",
    description:
      "A clean dual-source protein blend that supports muscle recovery and morning satiety.",
    image: "/images/ingredients/protein-blend.avif",
    imageAlt: "Wooden bowl filled with protein powder blend",
    keyFeatures: [
      "26g protein per 100g serving",
      "Whey + soy for a complete amino profile",
      "No unnecessary fillers",
    ],
  },
  {
    id: "date-powder",
    title: "Date Powder",
    description:
      "Naturally sweetened with dates — real fruit sweetness, no refined sugar.",
    image: "/images/ingredients/date-powder.avif",
    imageAlt: "Wooden bowl filled with date powder",
    keyFeatures: [
      "Zero refined sugar",
      "Naturally sweet taste",
      "Whole-food sweetener",
    ],
  },
  {
    id: "pumpkin-seeds",
    title: "Pumpkin Seeds",
    description:
      "Hulled pumpkin seeds for plant protein, minerals and crunch that holds up in hot oats.",
    image: "/images/ingredients/pumpkin-seeds.avif",
    imageAlt: "Bowl of pumpkin seeds",
    keyFeatures: [
      "Plant protein and magnesium",
      "Naturally rich in zinc",
      "Crunch in every bowl",
    ],
  },
  {
    id: "sunflower-seeds",
    title: "Sunflower Seeds",
    description:
      "Hulled sunflower seeds for vitamin E, mild nuttiness and extra bite without extra sugar.",
    image: "/images/ingredients/sunflower-seeds.avif",
    imageAlt: "Bowl of sunflower seeds",
    keyFeatures: [
      "Source of vitamin E",
      "Mild, nutty flavour",
      "Healthy plant fats",
    ],
  },
  {
    id: "flax-seeds",
    title: "Flax Seeds",
    description:
      "Flax seeds for omega-3 fats and fibre that help the bowl keep you full.",
    image: "/images/ingredients/flax-seeds.avif",
    imageAlt: "Bowl of flax seeds",
    keyFeatures: [
      "Rich in omega-3 (ALA)",
      "High in fibre",
      "Supports satiety",
    ],
  },
  {
    id: "chia-seeds",
    title: "Chia Seeds",
    description:
      "Tiny chia seeds that soak up liquid, add fibre and help the oats stay filling.",
    image: "/images/ingredients/chia-seeds.avif",
    imageAlt: "Bowl of chia seeds",
    keyFeatures: [
      "High in soluble fibre",
      "Plant omega-3",
      "Helps keep you full",
    ],
  },
  {
    id: "almonds",
    title: "Almonds",
    description:
      "Whole almonds for clean plant fats, texture and lasting satisfaction.",
    image: "/images/ingredients/almonds.avif",
    imageAlt: "Wooden bowl filled with whole almonds",
    keyFeatures: [
      "Healthy plant fats",
      "Natural crunch",
      "Supports satiety",
    ],
  },
  {
    id: "raisins",
    title: "Raisins",
    description:
      "Naturally sweet raisins that add flavour and a touch of chew in every bite.",
    image: "/images/ingredients/raisins.avif",
    imageAlt: "Wooden bowl filled with raisins",
    keyFeatures: [
      "Naturally sweet",
      "No added sugar needed",
      "Balanced flavour in every serve",
    ],
  },
  {
    id: "monkfruit",
    title: "Monkfruit",
    description:
      "A clean, zero-calorie natural sweetener that finishes the flavour without the crash.",
    image: "/images/ingredients/monkfruit.avif",
    imageAlt: "Wooden bowl of monkfruit sweetener with a spoon and mint",
    keyFeatures: [
      "Zero calorie sweetener",
      "No artificial aftertaste",
      "Supports zero added sugar claim",
    ],
  },
];

export const PEANUT_BUTTER_INGREDIENTS: Ingredient[] = [
  {
    id: "peanuts",
    title: "100% Peanuts",
    description:
      "Nothing else. No fillers, no additives — just roasted peanuts pressed into a clean, versatile powder.",
    image: "/images/ingredients/peanut-powder.avif",
    imageAlt: "Wooden bowl filled with peanut powder and whole peanuts",
    keyFeatures: [
      "Single-ingredient formula",
      "9g protein per serving",
      "87% less fat than traditional peanut butter",
      "No added sugar or salt",
    ],
  },
];
