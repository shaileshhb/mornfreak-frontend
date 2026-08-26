export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/mornfreak";

export type InstagramPost = {
  href: string;
  image: string;
  alt: string;
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    href: "https://www.instagram.com/reel/Dag61lSCECf",
    image: "/images/instagram/reel-1.avif",
    alt: "Mornfreak founder pointing at the camera with the line Better Mornings Together",
  },
  {
    href: "https://www.instagram.com/reel/Da-CwnBNfGG",
    image: "/images/instagram/reel-3.avif",
    alt: "Man holding a jar of Mornfreak Pure Peanut Butter Powder with the overlay I Am Interested",
  },
  {
    href: "https://www.instagram.com/reel/DcOc_mTN9DB",
    image: "/images/instagram/reel-4.avif",
    alt: "Man holding a pouch of Mornfreak Protein Oats with the overlay Quick protein breakfast",
  },
  {
    href: "https://www.instagram.com/reel/DcDiBPutGWG",
    image: "/images/instagram/reel-2.avif",
    alt: "Woman sitting in bed under a navy duvet with the overlay Breakfast or Yoga",
  },
];
