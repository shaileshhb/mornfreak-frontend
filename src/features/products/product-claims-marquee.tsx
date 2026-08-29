import type { ComponentType, ReactNode, SVGProps } from "react";

import type { ProductId } from "@/types/product";

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

function Slash() {
  return (
    <path d="M11 28.5 29 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  );
}

function NoSweetenersIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="12.5" y="18" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="14.5" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="20.5" y="19.5" width="7" height="7" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <Slash />
    </IconShell>
  );
}

function NoColorIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M16 12.5h8M18 12.5v3.5L14.6 26c-.4 1.2.4 2.5 1.8 2.5h7.2c1.4 0 2.2-1.3 1.8-2.5L22 16v-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.4 22.5h7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <Slash />
    </IconShell>
  );
}

function NoFlavouringIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M17.5 11.5h5v9.5c0 2.6-1.1 4.8-2.5 6.2-1.4-1.4-2.5-3.6-2.5-6.2v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16.5 28.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <Slash />
    </IconShell>
  );
}

function NonGmoIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M16 12.5h8M17.5 12.5v5.2L13.8 26.2c-.4 1.1.4 2.3 1.7 2.3h8.9c1.3 0 2.1-1.2 1.7-2.3L22.5 17.7v-5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Slash />
    </IconShell>
  );
}

function GlutenFreeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M20 28.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 16.5c-2.4-1.6-4.6-1.4-5.6-.4-.8.8-.6 1.9.4 2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 19c2.6-1.8 4.8-1.6 5.8-.4.8.9.5 2.1-.6 2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 22c-2.2-1.2-4-1-4.8-.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Slash />
    </IconShell>
  );
}

function VeganIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M20 28V18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 19.5c-2.4-2-5-2.4-6.4-1.4-1.2.8-1.2 2.2.2 3.2 1.8 1.2 4.2 1.4 6.2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 17c2.2-2.6 5.2-3.4 6.8-2.2 1.4 1 1.2 2.6-.2 3.8-1.8 1.6-4.4 2-6.6 1.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

type Claim = {
  label: string;
  Icon: ComponentType<IconProps>;
};

const SHARED_CLAIMS: Claim[] = [
  { label: "No Artificial Sweeteners", Icon: NoSweetenersIcon },
  { label: "No Artificial Color", Icon: NoColorIcon },
  { label: "No Artificial Flavouring", Icon: NoFlavouringIcon },
  { label: "NON-GMO", Icon: NonGmoIcon },
  { label: "Gluten Free", Icon: GlutenFreeIcon },
];

const PEANUT_BUTTER_CLAIMS: Claim[] = [
  ...SHARED_CLAIMS,
  { label: "100% Vegan", Icon: VeganIcon },
];

const PEANUT_BUTTER_IDS = new Set<ProductId>(["peanutButter", "peanutButterPackOf2"]);

const TRACK_REPEATS = 3;

function ClaimItems({ claims, decorative = false }: { claims: Claim[]; decorative?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={decorative || undefined}>
      {Array.from({ length: TRACK_REPEATS }, (_, repeatIndex) =>
        claims.map(({ label, Icon }) => (
          <li
            key={`${repeatIndex}-${label}`}
            className="flex items-center gap-3 border-r border-current/80 px-5 py-3.5 sm:gap-3.5 sm:px-7 sm:py-4"
          >
            <Icon />
            <span className="whitespace-nowrap font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] sm:text-xs">
              {label}
            </span>
          </li>
        )),
      )}
    </ul>
  );
}

type ProductClaimsMarqueeProps = {
  productId: ProductId;
};

export function ProductClaimsMarquee({ productId }: ProductClaimsMarqueeProps) {
  const claims = PEANUT_BUTTER_IDS.has(productId) ? PEANUT_BUTTER_CLAIMS : SHARED_CLAIMS;

  return (
    <section
      aria-label="Product claims"
      className="group overflow-hidden mt-3"
      style={{ backgroundColor: "#FDE8E3", color: "#B90B19" }}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <ClaimItems claims={claims} />
        <ClaimItems claims={claims} decorative />
      </div>
    </section>
  );
}
