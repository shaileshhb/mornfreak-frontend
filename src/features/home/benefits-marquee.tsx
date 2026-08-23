import { BicepsFlexed } from "lucide-react";
import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconShell({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="size-9 shrink-0 sm:size-10"
      {...props}
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" />
      {children}
    </svg>
  );
}

function HighProteinIcon() {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-current sm:size-10"
    >
      <BicepsFlexed size={20} strokeWidth={1.75} className="sm:size-[22px]" />
    </span>
  );
}

function SweetenedIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M20 28V16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 22c-2.2-1.8-4.2-2.2-5.5-1.6-1 .5-1.2 1.6-.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 19.5c2-2.2 4.2-2.8 5.6-2 1 .6 1.1 1.8.3 2.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 14.5c.5-1.2 1.2-2 1.8-2.5.6.5 1.3 1.3 1.8 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function PrebioticIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M14 14.5c0-1.5 1.4-2.5 3.2-2.5h5.6c1.8 0 3.2 1 3.2 2.5v3.2c0 2.4-1.2 4.5-2.2 6.2-.7 1.2-1.2 2.4-1.2 3.6v2.5h-5.2v-2.5c0-1.2-.5-2.4-1.2-3.6-1-1.7-2.2-3.8-2.2-6.2v-3.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 17.5h7M17 21h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function SeedsIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M20 11.5c3.8 2.2 6 5.8 6 9.5 0 3.8-2.7 7.5-6 7.5s-6-3.7-6-7.5c0-3.7 2.2-7.3 6-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 13v13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function NoSugarIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="12.5" y="18" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="14.5" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="20.5" y="19.5" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 28.5 29 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconShell>
  );
}

function NoArtificialIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M15.5 12.5h9M17 12.5v3.2L13.8 26c-.4 1.1.4 2.5 1.8 2.5h8.8c1.4 0 2.2-1.4 1.8-2.5L23 15.7v-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.2 22.5h7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 28.5 29 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconShell>
  );
}

function ReadyIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="20" cy="20" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 15.5V20l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11.5v1.5M28.5 20h-1.5M20 28.5V27M11.5 20H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function ScienceIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle cx="20" cy="20" r="2.2" fill="currentColor" />
      <ellipse
        cx="20"
        cy="20"
        rx="10"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(60 20 20)"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="10"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-60 20 20)"
      />
      <ellipse cx="20" cy="20" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" />
    </IconShell>
  );
}

const BENEFITS = [
  { label: ["HIGH PROTEIN"], Icon: HighProteinIcon },
  { label: ["SWEETENED WITH", "DATES & MONK FRUIT"], Icon: SweetenedIcon },
  { label: ["PREBIOTIC FIBER", "FOR GUT HEALTH"], Icon: PrebioticIcon },
  { label: ["MADE WITH", "SUPER SEEDS & ALMONDS"], Icon: SeedsIcon },
  { label: ["NO REFINED", "SUGAR"], Icon: NoSugarIcon },
  { label: ["NO ARTIFICIAL", "SWEETENERS"], Icon: NoArtificialIcon },
  { label: ["READY IN", "SECONDS"], Icon: ReadyIcon },
  { label: ["SCIENCE-BACKED", "NUTRITION"], Icon: ScienceIcon },
] as const;

const TRACK_REPEATS = 3;

function BenefitItems({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={decorative || undefined}>
      {Array.from({ length: TRACK_REPEATS }, (_, repeatIndex) =>
        BENEFITS.map(({ label, Icon }) => (
          <li
            key={`${repeatIndex}-${label.join(" ")}`}
            className="flex items-center gap-3 border-r border-current/80 px-5 py-3.5 sm:gap-3.5 sm:px-7 sm:py-4"
          >
            <Icon />
            <span className="whitespace-nowrap font-sans text-[0.65rem] font-bold uppercase leading-tight tracking-[0.16em] sm:text-xs">
              {label.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
        )),
      )}
    </ul>
  );
}

export function BenefitsMarquee() {
  return (
    <section
      aria-label="Product benefits"
      className="group overflow-hidden mt-5"
      style={{ backgroundColor: "#FDE8E3", color: "#B90B19" }}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <BenefitItems />
        <BenefitItems decorative />
      </div>
    </section>
  );
}
