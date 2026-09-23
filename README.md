This is the Mornfreak storefront built with Next.js and Shopify Storefront APIs.

## Getting Started

First, create `.env.local` from `.env.example` and fill in the Shopify values:

```bash
cp .env.example .env.local
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Local checkout testing

The cart page redirects to the Shopify hosted checkout returned by `/api/cart/checkout`. To test the Shopify/Razorpay test-mode flow locally:

1. Keep Razorpay in test mode inside Shopify payments settings.
2. Ensure `.env.local` has `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`, and `SHOPIFY_APP_URL=http://localhost:3000`.
3. Start the app with `npm run dev`.
4. Add a product to the cart, open `/cart`, and click `Checkout`.
5. Confirm the browser redirects from the local cart to the Shopify checkout URL, then complete the Razorpay test payment on the hosted checkout page.

Shipping, tax, discount, and Razorpay payment behavior are controlled by Shopify checkout, not the local Next.js page.

## Verification

```bash
npm run lint
```
