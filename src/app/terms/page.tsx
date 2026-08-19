import type { Metadata } from "next";

import { LegalDocumentPage, TERMS_DOCUMENT } from "@/features/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Mornfreak website and purchasing Mornfreak products.",
  alternates: {
    canonical: "/terms",
  },
};

export default function Page() {
  return <LegalDocumentPage document={TERMS_DOCUMENT} />;
}
