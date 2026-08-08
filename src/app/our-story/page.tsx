import type { Metadata } from "next";

import { OurStoryPage } from "@/features/our-story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover why Mornfreak is building protein-forward breakfast for better mornings, with purposeful ingredients and no added sugar.",
  alternates: {
    canonical: "/our-story",
  },
};

export default function Page() {
  return <OurStoryPage />;
}
