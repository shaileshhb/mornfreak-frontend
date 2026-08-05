import {
  BenefitsMarquee,
  HowWeStackUp,
  HomeHero,
  OneSachet,
  RaisingTheBar,
  Reviews,
  WhyMornfreak,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <BenefitsMarquee />
      <OneSachet />
      <WhyMornfreak />
      <RaisingTheBar />
      <HowWeStackUp />
      <Reviews />
    </>
  );
}
