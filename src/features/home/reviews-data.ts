export type Review = {
  id: string;
  name: string;
  title: string;
  body: string;
  rating: number;
  verified: boolean;
  productLabel: string;
  productImage?: string;
  videoUrl?: string;
  videoPoster?: string;
};

export const REVIEWS: Review[] = [
  {
    id: "paul-dennis-video",
    name: "Paul Dennis",
    title: "Peanut butter powder review",
    body: "A review of Mornfreak Peanut Butter Powder.",
    rating: 5,
    verified: true,
    productLabel: "Peanut Butter Powder",
    productImage: "/images/peanut_butter_powder_1.jpeg",
    videoUrl: "https://mornfreak-frontend.vercel.app/videos/review_3.mp4",
    videoPoster: "/images/peanut_butter_powder_1.jpeg",
  },
  {
    id: "rohan-video",
    name: "Rohan M.",
    title: "Finally, oats that keep up",
    body: "My post-training morning routine is much simpler now.",
    rating: 5,
    verified: true,
    productLabel: "Protein Oats",
    productImage: "/images/oats_1.jpeg",
    videoUrl: "https://mornfreak-frontend.vercel.app/videos/review_1.mp4",
    videoPoster: "/images/oats_1.jpeg",
  },
  {
    id: "kabir-video",
    name: "Kabir R.",
    title: "My quickest complete breakfast",
    body: "A fast morning review of Mornfreak Protein Oats.",
    rating: 5,
    verified: true,
    productLabel: "Protein Oats",
    productImage: "/images/oats_2.jpeg",
    videoUrl: "https://mornfreak-frontend.vercel.app/videos/review_2.mp4",
    videoPoster: "/images/oats_2.jpeg",
  },
  {
    id: "ananya",
    name: "Ananya S.",
    title: "Creamy, high-protein game changer",
    body: "It tastes like a proper chocolate breakfast, not a compromise. I stay full through the morning and it takes barely five minutes.",
    rating: 5,
    verified: true,
    productLabel: "Rich Chocolate Protein Oats",
    productImage: "/images/oats_2.jpeg",
  },
  {
    id: "meera",
    name: "Meera K.",
    title: "No sugar crash, no mid-morning snack",
    body: "The texture is rich, the sweetness is balanced and the seeds add a satisfying bite. It has become my weekday default.",
    rating: 5,
    verified: true,
    productLabel: "Rich Chocolate Protein Oats",
    productImage: "/images/oats_2.jpeg",
  },
  {
    id: "nisha",
    name: "Nisha P.",
    title: "Peanut flavour without the heaviness",
    body: "I stir the peanut powder into oats and smoothies. It blends cleanly, tastes natural and gives breakfast a useful protein lift.",
    rating: 5,
    verified: true,
    productLabel: "Peanut Butter Powder",
    productImage: "/images/peanut_butter_powder_1.jpeg",
  },
  {
    id: "arjun",
    name: "Arjun D.",
    title: "Made consistency easy",
    body: "Good ingredients, genuinely convenient and filling enough for long work mornings. That is exactly what I needed.",
    rating: 5,
    verified: true,
    productLabel: "Rich Chocolate Protein Oats",
    productImage: "/images/oats_1.jpeg",
  },
];
