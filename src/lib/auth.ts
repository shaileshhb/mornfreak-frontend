/**
 * Server-only session helpers. Tokens stay in httpOnly cookies.
 */
export {
  getCurrentCustomer,
  hasCustomerSession as isAuthenticated,
} from "./shopify-auth";
