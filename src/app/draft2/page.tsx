import {
  Draft2ClosingCta,
  Draft2Hero,
  Draft2ProductBands,
  Draft2ProofStrip,
} from "@/features/draft2";

export default function Draft2HomePage() {
  return (
    <>
      <Draft2Hero />
      <Draft2ProductBands />
      <Draft2ProofStrip />
      <Draft2ClosingCta />
    </>
  );
}
