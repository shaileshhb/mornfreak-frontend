import Link from "next/link";

import { draft2Path } from "@/lib/draft2";

export function Draft2AnnouncementBar() {
  return (
    <Link
      href={draft2Path("/products")}
      className="block bg-[#241510] px-4 py-2.5 text-center font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary sm:text-xs"
    >
      ✦ Back in stock: Mornfreak Protein Oats — Rich Chocolate ✦
    </Link>
  );
}
