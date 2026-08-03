import {
  Draft2Hero,
  Draft2HowWeStackUp,
  Draft2OneSachet,
  Draft2RaisingTheBar,
  Draft2Reviews,
  Draft2WhyMornfreak,
} from "@/features/draft2";

export default function Draft2HomePage() {
  return (
    <>
      <Draft2Hero />
      <Draft2OneSachet />
      <Draft2WhyMornfreak />
      <Draft2RaisingTheBar />
      <Draft2HowWeStackUp />
      <Draft2Reviews />
    </>
  );
}
