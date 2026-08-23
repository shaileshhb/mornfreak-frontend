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
    id: "super-seed-mix",
    title: "Pumpkin Seeds",
    description:
      "Pumpkin seeds",
    image: "/images/ingredients/pumpkin-seeds.avif",
    imageAlt: "Bowl of pumpkin seeds",
    keyFeatures: [
      "Pumpkin seeds",
      "Rich in healthy fats and fibre",
      "Adds crunch and nutrition",
    ],
  },
  {
    id: "super-seed-mix",
    title: "Sunflower Seeds",
    description:
      "Sunflower seeds",
    image: "/images/ingredients/sunflower-seeds.avif",
    imageAlt: "Bowl of sunflower seeds",
    keyFeatures: [
      "Sunflower seeds",
      "Rich in healthy fats and fibre",
      "Adds crunch and nutrition",
    ],
  },
  {
    id: "super-seed-mix",
    title: "Flax Seeds",
    description:
      "Flax seeds",
    image: "/images/ingredients/flax-seeds.avif",
    imageAlt: "Bowl of flax seeds",
    keyFeatures: [
      "Flax seeds",
      "Rich in omega-3 fatty acids",
      "Adds crunch and nutrition",
    ],
  },
  {
    id: "super-seed-mix",
    title: "Chia Seeds",
    description:
      "Chia seeds",
    image: "/images/ingredients/chia-seeds.avif",
    imageAlt: "Bowl of chia seeds",
    keyFeatures: [
      "Chia seeds",
      "Rich in healthy fats and fibre",
      "Adds crunch and nutrition",
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
