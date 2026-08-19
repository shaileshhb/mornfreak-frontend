import type { Metadata } from "next";

import { LegalDocumentPage, REFUND_DOCUMENT } from "@/features/legal";

export const metadata: Metadata = {
  title: "Refund & Return Policy",
  description:
    "How Mornfreak handles refunds and replacements for damaged, incorrect, missing, or defective food products.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function Page() {
  return <LegalDocumentPage document={REFUND_DOCUMENT} />;
}
