import type { Metadata } from "next";

import { IngredientsPage } from "@/features/ingredients";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "Meet the ingredients behind Mornfreak Protein Oats and Pure Peanut Butter Powder — clean, purposeful, and free from added sugar.",
  alternates: {
    canonical: "/ingredients",
  },
};

export default function Page() {
  return <IngredientsPage />;
}
