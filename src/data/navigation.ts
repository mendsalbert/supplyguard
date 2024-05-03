import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [{ id: ncNanoId(), href: "/", name: "Home" }],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/collection", name: "Category Page" },
      { id: ncNanoId(), href: "/track-order", name: "Track my order" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/checkout", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "For Supliers",
    children: [
      { id: ncNanoId(), href: "/admin-account", name: "Dashboard" },
      { id: ncNanoId(), href: "/admin-account", name: "Accout Page" },
      // { id: ncNanoId(), href: "/subscription", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/about", name: "About Page" },
      { id: ncNanoId(), href: "/blog", name: "Demo/Video" },
      { id: ncNanoId(), href: "/paper", name: "Technology" },
      { id: ncNanoId(), href: "/paper", name: "How It Works:" },
      // { id: ncNanoId(), href: "/signup", name: "FAQ" },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  // {
  //   id: ncNanoId(),
  //   href: "/collection",
  //   name: "Suppliers",
  // },

  {
    id: ncNanoId(),
    href: "/collection",
    name: "Products",
  },
  {
    id: ncNanoId(),
    href: "/arts",
    name: "Art & Collectibles",
  },

  {
    id: ncNanoId(),
    href: "/track-order",
    name: "Track Orders",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "More",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  // {
  //   id: ncNanoId(),
  //   href: "/search",
  //   name: "Explore",
  //   type: "dropdown",
  //   children: OTHER_PAGE_CHILD,
  // },
];
