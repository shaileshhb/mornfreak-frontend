import type { LegalDocument } from "./types";

export const PRIVACY_DOCUMENT: LegalDocument = {
  title: "Privacy Policy",
  intro:
    "At **Mornfreak**, your privacy matters. We collect only the information needed to process orders, provide support, improve your experience, and keep our community connected.",
  sections: [
    {
      heading: "What We Collect",
      paragraphs: [
        "We may collect your **name, email, phone number, delivery address, order details, and website activity** when you shop or interact with Mornfreak.",
      ],
    },
    {
      heading: "How We Use It",
      paragraphs: [
        "Your information helps us **process orders, deliver products, provide customer support, improve our products and website, and send relevant updates or offers** where permitted.",
      ],
    },
    {
      heading: "Your Data Is Safe",
      paragraphs: [
        "We use reasonable security measures to protect your information. **We do not sell your personal information.** Trusted payment, delivery, and service partners may receive only the information necessary to provide their services.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "We may use cookies to improve website functionality, understand website usage, and enhance your shopping experience.",
      ],
    },
    {
      heading: "Your Choices",
      paragraphs: [
        "You can **unsubscribe from marketing communications** and may request access, correction, or deletion of your personal information where applicable.",
      ],
    },
    {
      heading: "Community & Content",
      paragraphs: [
        "As a community-driven brand, we love customer reviews, recipes, photos, and stories. We will only use submitted content for promotional purposes where appropriate permission has been provided.",
      ],
    },
  ],
  contact: {
    heading: "Contact Us",
    lead: "For privacy questions, contact:",
    name: "Mornfreak",
    email: "hello@mornfreak.com",
    website: "https://www.mornfreak.com",
    websiteLabel: "www.mornfreak.com",
    tagline: "Better breakfasts. Better habits. Better community.",
  },
};
