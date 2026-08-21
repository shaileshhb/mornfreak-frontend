import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export function BuiltForRealMornings() {
  return (
    <section className="overflow-hidden bg-background py-5 lg:min-h-[720px] lg:py-8 xl:min-h-[780px]">
      <Container className="max-w-[90rem]">
        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:justify-items-start lg:gap-x-10 xl:gap-x-16">
          <div className="w-full text-center lg:flex lg:flex-col lg:items-start lg:text-left">
            <p className="font-sans text-base font-bold uppercase tracking-[0.15em] text-primary">
              Built for real mornings
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,7.5vw,2.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-foreground lg:mt-5 lg:text-[clamp(4.5rem,6.2vw,6.75rem)] lg:leading-[0.84]">
              <span className="lg:hidden">
                Nutrition behind
                <br />
                every great morning.
              </span>
              <span className="hidden lg:block">
                Nutrition
                <br />
                behind every
                <br />
                great morning.
              </span>
            </h2>
            <Link
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-foreground px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-background transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:mt-10"
              href="/products"
            >
              Shop Mornfreak <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="mt-8 w-full max-w-md lg:col-start-auto lg:row-start-auto lg:mt-0 lg:max-w-none lg:self-center lg:justify-self-end">
            <Image
              src="/images/built-for-real-morning.png"
              alt="Mornfreak Protein Oats pouch and Peanut Butter Powder jar"
              width={1199}
              height={1312}
              sizes="(max-width: 1023px) 28rem, 45vw"
              className="mx-auto h-auto max-h-[min(22rem,70vw)] w-full object-contain motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-[1.025] sm:max-h-[26rem] lg:max-h-none lg:w-[112%] lg:max-w-none lg:-translate-x-[11%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
