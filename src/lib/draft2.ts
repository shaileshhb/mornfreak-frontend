export const DRAFT2_BASE = "/draft2" as const;

export function draft2Path(path = ""): string {
  if (!path || path === "/") return DRAFT2_BASE;
  return `${DRAFT2_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
