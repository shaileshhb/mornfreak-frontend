import type { LegalDocument } from "./types";

export const REFUND_DOCUMENT: LegalDocument = {
  title: "Refund & Return Policy",
  intro:
    "At **Mornfreak**, we care about what reaches your breakfast table. Since our products are **food and consumable items**, we keep our refund process simple, fair, and hassle-free.",
  sections: [
    {
      heading: "When Can You Request a Refund?",
      paragraphs: ["You may request a refund or replacement if:"],
      items: [
        "Your order arrives **damaged or tampered with**",
        "You receive the **wrong product**",
        "An item is **missing from your order**",
        "You receive a product that is **expired or has a verified quality issue**",
      ],
    },
    {
      heading: "How to Request a Refund",
      paragraphs: [
        "Please contact us within **48 hours of delivery** with:",
        "**Order number + photos/videos of the product and packaging + a brief description of the issue.**",
        "Our team will review your request and confirm the next steps.",
      ],
    },
    {
      heading: "Refund or Replacement",
      paragraphs: [
        "Once your claim is approved, we may provide a **replacement or full/partial refund**, depending on the situation.",
        "Approved refunds will be issued to your **original payment method**. Bank or payment-provider processing times may vary.",
      ],
    },
    {
      heading: "Non-Refundable Situations",
      paragraphs: ["We generally cannot accept returns or refunds for:"],
      items: [
        "Change of mind",
        "Personal taste or preference",
        "Products that have been opened or consumed without a verified quality issue",
        "Incorrect delivery details provided by the customer",
      ],
    },
    {
      heading: "Delivery Issues",
      paragraphs: [
        "If your order is marked delivered but you have not received it, please contact us as soon as possible so we can investigate with our delivery partner.",
      ],
    },
    {
      heading: "Our Promise",
      paragraphs: [
        "**We make it right when something goes wrong.**",
        "Your trust is important to us, and every Mornfreak order deserves to arrive **fresh, safe, and exactly as expected.**",
      ],
    },
  ],
  contact: {
    email: "hello@mornfreak.com",
    website: "https://www.mornfreak.com",
    websiteLabel: "www.mornfreak.com",
  },
};
