export const DRAFT3_BASE = "/draft3" as const;

export function draft3Path(path = ""): string {
  if (!path || path === "/") return DRAFT3_BASE;
  return `${DRAFT3_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
