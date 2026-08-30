import { apiPost } from "@/lib/api";

export type AddressInput = {
  type: "SHIPPING" | "BILLING";
  fullName?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  /** ISO 3166-1 alpha-2, uppercase. */
  country: string;
  postalCode: string;
  phone?: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: AddressInput;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type MessageResponse = { message: string };
export type TokenResponse = { accessToken: string };

export function register(input: RegisterInput) {
  return apiPost<MessageResponse>("/api/auth/register", input);
}

export function login(input: LoginInput) {
  return apiPost<TokenResponse>("/api/auth/login", input);
}

export function refresh() {
  return apiPost<TokenResponse>("/api/auth/refresh");
}

export function logout() {
  return apiPost<MessageResponse>("/api/auth/logout");
}

export function verifyEmail(token: string) {
  return apiPost<MessageResponse>("/api/auth/verify-email", { token });
}

export function resendVerification(email: string) {
  return apiPost<MessageResponse>("/api/auth/resend-verification", { email });
}

export function forgotPassword(email: string) {
  return apiPost<MessageResponse>("/api/auth/forgot-password", { email });
}

export function resetPassword(token: string, newPassword: string) {
  return apiPost<MessageResponse>("/api/auth/reset-password", {
    token,
    newPassword,
  });
}
