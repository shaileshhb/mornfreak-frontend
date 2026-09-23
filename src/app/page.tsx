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
import { getCurrentMarket } from "@/lib/market-server";
import { marketDescription } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const market = await getCurrentMarket();

  return {
    title: {
      absolute: "MORNFREAK",
    },
    description: marketDescription(market),
    alternates: {
      canonical: "/",
    },
  };
}

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
