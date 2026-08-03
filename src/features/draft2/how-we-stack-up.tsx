import {
  BatteryCharging,
  Check,
  CircleX,
  Dumbbell,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sprout,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/container";

const COMPARISON_ROWS = [
  { label: "High Protein", detail: "26g Protein Per Serving", icon: Dumbbell, values: [true, false, false] },
  { label: "Super Seeds & Nuts", detail: "Almonds, Seeds & More", icon: Sprout, values: [true, true, false] },
  { label: "Sugar Free", detail: "No Added Sugar", icon: Leaf, values: [true, false, false] },
  { label: "Sustained Energy", detail: "Complex Carbs & Fiber", icon: BatteryCharging, values: [true, true, true] },
  { label: "Easy to Digest", detail: "Gentle, Clean & Nutritious", icon: Sparkles, values: [true, true, false] },
  { label: "No Preservatives", detail: "100% Clean Ingredients", icon: ShieldCheck, values: [true, false, false] },
] as const;

const COLUMNS = ["Mornfreak Protein Oats", "Other Oats", "Traditional Oats"] as const;

export function Draft2HowWeStackUp() {
  return (
    <section className="bg-[#fff9ef] py-20 sm:py-28">
      <Container className="max-w-[76rem]">
        <header className="flex items-center justify-center gap-4 text-center">
          <Zap aria-hidden className="text-foreground" size={25} fill="currentColor" />
          <h2 className="font-display text-6xl uppercase italic leading-none tracking-wide sm:text-7xl">
            How we stack up
          </h2>
          <Zap aria-hidden className="scale-x-[-1] text-foreground" size={25} fill="currentColor" />
        </header>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[34%] border-b border-foreground/15 p-5" scope="col">
                  <span className="sr-only">Benefit</span>
                </th>
                {COLUMNS.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`border-b p-5 text-center font-sans text-xs font-bold uppercase tracking-[0.12em] ${
                      index === 0
                        ? "border-foreground bg-foreground text-white"
                        : "border-foreground/15 text-foreground/65"
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(({ label, detail, icon: Icon, values }) => (
                <tr key={label}>
                  <th
                    scope="row"
                    className="border-b border-foreground/15 p-5 font-sans text-sm font-bold"
                  >
                    <span className="flex items-start gap-3">
                      <Icon aria-hidden className="mt-0.5 shrink-0 text-foreground" size={20} strokeWidth={1.7} />
                      <span>
                        <span className="block uppercase tracking-wide">{label}</span>
                        <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-muted-foreground">
                          {detail}
                        </span>
                      </span>
                    </span>
                  </th>
                  {values.map((hasFeature, index) => (
                    <td
                      key={`${label}-${COLUMNS[index]}`}
                      className={`border-b p-5 text-center ${
                        index === 0
                          ? "border-foreground bg-foreground text-white"
                          : "border-foreground/15 text-foreground/30"
                      }`}
                    >
                      {hasFeature ? (
                        <Check
                          aria-label="Included"
                          className="mx-auto"
                          size={24}
                          strokeWidth={2.2}
                        />
                      ) : (
                        <CircleX
                          aria-label="Not included"
                          className="mx-auto"
                          size={22}
                          strokeWidth={1.5}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
