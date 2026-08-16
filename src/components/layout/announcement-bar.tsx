import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      className="block bg-foreground px-4 py-2.5 text-center font-sans text-[0.7rem] font-bold uppercase tracking-[0.1em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:text-xs"
      href="/products">
      Same day delivery available in dubai | Free delivery above 99 AED
    </Link>
  );
}
