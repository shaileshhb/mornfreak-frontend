import type { Metadata } from "next";

import { AuthErrorNotice } from "@/features/auth";
import {
  BenefitsMarquee,
  HowWeStackUp,
  HomeHero,
  BuiltForRealMornings,
  RaisingTheBar,
  Reviews,
  FollowUsOnInstagram,
  WhyMornfreak,
} from "@/features/home";
import { UAE_MARKET_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Protein Oats & Peanut Butter Powder UAE",
  description: UAE_MARKET_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const { authError } = await searchParams;

  return (
    <>
      <AuthErrorNotice
        code={typeof authError === "string" ? authError : undefined}
      />
      <HomeHero />
      <BenefitsMarquee />
      <BuiltForRealMornings />
      <WhyMornfreak />
      <RaisingTheBar />
      <HowWeStackUp />
      <Reviews />
      <FollowUsOnInstagram />
    </>
  );
}
