const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type ErrorBody = {
  error?: string;
  details?: { path: string; message: string }[];
};

/**
 * Thrown for every non-2xx API response and for network failures (status 0).
 * `fieldErrors` is keyed by the dotted path the backend validator reports,
 * e.g. "address.line1".
 */
export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Record<string, string>;

  constructor(
    status: number,
    message: string,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function apiUrl(path: string): string {
  return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

function toFieldErrors(details: ErrorBody["details"]): Record<string, string> {
  if (!details) return {};

  return details.reduce<Record<string, string>>((acc, detail) => {
    if (detail.path && !acc[detail.path]) acc[detail.path] = detail.message;
    return acc;
  }, {});
}

/**
 * POST JSON to the backend. Credentials are always included so the HttpOnly
 * refresh cookie is sent and can be set cross-origin.
 */
export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(apiUrl(path), {
      method: "POST",
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Check your connection and try again.");
  }

  const payload = (await response.json().catch(() => null)) as
    | (ErrorBody & T)
    | null;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.error ?? "Something went wrong. Try again.",
      toFieldErrors(payload?.details),
    );
  }

  return payload as T;
}
