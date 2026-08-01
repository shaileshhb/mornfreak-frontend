import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Draft3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
