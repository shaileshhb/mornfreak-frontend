import {
  BenefitsMarquee,
  HowWeStackUp,
  HomeHero,
  BuiltForRealMornings,
  RaisingTheBar,
  Reviews,
  WhyMornfreak,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <BenefitsMarquee />
      <BuiltForRealMornings />
      <WhyMornfreak />
      <RaisingTheBar />
      <HowWeStackUp />
      <Reviews />
    </>
  );
}
