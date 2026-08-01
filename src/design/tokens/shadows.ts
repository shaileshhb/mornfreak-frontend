export const shadows = {
  sm: "var(--ds-shadow-sm)",
  md: "var(--ds-shadow-md)",
  lg: "var(--ds-shadow-lg)",
} as const;

export type ShadowToken = keyof typeof shadows;
