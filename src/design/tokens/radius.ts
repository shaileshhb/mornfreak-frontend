export const radius = {
  sm: "var(--ds-radius-sm)",
  md: "var(--ds-radius-md)",
  lg: "var(--ds-radius-lg)",
  xl: "var(--ds-radius-xl)",
  full: "var(--ds-radius-full)",
} as const;

export type RadiusToken = keyof typeof radius;
