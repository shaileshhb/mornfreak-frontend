/**
 * Global semantic color token names.
 * Values live in design/themes/light.css — components must use Tailwind semantic utilities.
 */
export const semanticColorTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
] as const;

export type SemanticColorToken = (typeof semanticColorTokens)[number];
