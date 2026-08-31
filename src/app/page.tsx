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
  MornfreakStandard,
} from "@/features/home";

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
      {/* <MornfreakStandard /> */}
    </>
  );
}
