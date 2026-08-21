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
      <FollowUsOnInstagram />
      {/* <MornfreakStandard /> */}
    </>
  );
}
