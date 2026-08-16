"use client"

import {
  Dumbbell,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function MornfreakStandard() {

  const TRUST_POINTS = [
    { label: "Clean Ingredients", icon: Leaf },
    { label: "High Protein", icon: Dumbbell },
    { label: "No Added Sugar", icon: ShieldCheck },
    { label: "Made for Real Results", icon: Sparkles },
  ] as const;

  // return (
  //   <section className="bg-card py-20 sm:py-28">
  //     <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-foreground/10 md:grid-cols-4 md:divide-y-0">
  //       {TRUST_POINTS.map(({ label, icon: Icon }) => (
  //         <div
  //           key={label}
  //           className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center"
  //         >
  //           <span className="flex size-11 items-center justify-center rounded-full border border-primary/30">
  //             <Icon aria-hidden className="text-primary" size={20} strokeWidth={1.6} />
  //           </span>
  //           <span className="font-sans text-xs font-bold uppercase tracking-[0.12em]">{label}</span>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // )

  return (
    <section className="bg-card py-10 sm:py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {TRUST_POINTS.map(({ label, icon: Icon }, index) => {
          const isFirstColMobile = index % 2 === 0;
          const isFirstRowMobile = index < 2;

          return (
            <div
              key={label}
              className={`flex flex-col items-center justify-center gap-3 border-foreground/10 px-4 py-10 text-center ${isFirstColMobile ? "" : "border-l"
                } ${isFirstRowMobile ? "" : "border-t"} ${index === 0 ? "" : "md:border-l"
                } md:border-t-0`}
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-primary/30">
                <Icon aria-hidden className="text-primary" size={20} strokeWidth={1.6} />
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.12em]">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  )
}
