export const PRODUCTS = {
  peanutButter: {
    id: "peanutButter",
    label: "Peanut Butter",
    primary: "#320A85",
    secondary: "#5B2BB5",
    background: "#F3EEFA",
    foreground: "#1A0A33",
    badge: "#320A85",
    badgeForeground: "#FFFFFF",
    glow: "rgb(50 10 133 / 0.35)",
  },
  proteinOats: {
    id: "proteinOats",
    label: "Protein Oats",
    primary: "#ECB371",
    secondary: "#F0C892",
    background: "#FDF6EE",
    foreground: "#3D2A14",
    badge: "#ECB371",
    badgeForeground: "#3D2A14",
    glow: "rgb(236 179 113 / 0.4)",
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;

export type ProductTokens = (typeof PRODUCTS)[ProductId];

export const PRODUCT_IDS = Object.keys(PRODUCTS) as ProductId[];
