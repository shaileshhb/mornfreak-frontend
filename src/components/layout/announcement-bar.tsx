import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      href="/products"
      className="block bg-foreground px-4 py-2.5 text-center font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:text-xs"
    >
      Back in stock: Mornfreak Protein Oats — Rich Chocolate
    </Link>
  );
}
