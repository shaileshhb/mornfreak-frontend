export const animations = {
  fadeIn: "fade-in",
  rise: "rise",
  scaleIn: "scale-in",
} as const;

export type AnimationToken = keyof typeof animations;
