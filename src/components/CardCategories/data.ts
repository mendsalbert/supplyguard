import img1 from "@/images/collections/package.svg";
import img2 from "@/images/collections/map-2.svg";
import img3 from "@/images/collections/4.png";
import img4 from "@/images/collections/gift-card.svg";
import { CardCategory3Props } from "./CardCategory3";

export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: "Order Supplies with Confidence",
    // desc: "Shop the latest <br /> from top brands",
    desc: "Essentials tracked to <br /> your door",
    featuredImage: img1,
    color: "bg-yellow-50",
  },
  {
    name: "Always in the Loop",
    desc: "Real-time, seamless tracking",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "Deals That Move with You",
    desc: "Save big, follow every step",
    featuredImage: img4,
    color: "bg-green-50",
  },
];
