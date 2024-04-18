"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product } from "@/data/data";
import product1 from "@/images/products/1.png";
import product2 from "@/images/products/2.png";
import product3 from "@/images/products/3.png";
import product4 from "@/images/products/4.png";
import product5 from "@/images/products/5.png";
import product6 from "@/images/products/6.png";
import product7 from "@/images/products/7.png";
import product8 from "@/images/products/8.png";
import product9 from "@/images/products/9.png";

import product10 from "@/images/products/10.png";
import product11 from "@/images/products/11.png";
import product12 from "@/images/products/12.png";
import product13 from "@/images/products/13.png";
import product14 from "@/images/products/14.png";
import product15 from "@/images/products/15.png";
import product16 from "@/images/products/1.png";
import product17 from "@/images/products/1.png";
import product18 from "@/images/products/18.png";
import product19 from "@/images/products/19.png";
import product20 from "@/images/products/20.png";
import product21 from "@/images/products/21.png";
import product22 from "@/images/products/22.png";
import product23 from "@/images/products/23.png";
import product24 from "@/images/products/24.png";

export const productImgs = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
  product12,
  product13,
  product14,
  product15,
  product16,
  product17,
  product18,
  product19,
  product20,
  product21,
  product22,
  product23,
  product24,
];
export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  supplier?: string;
  id?: number;
  data?: Product[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Satori Eco Yoga Mat",
    description: "Eco-friendly Material",
    price: 45,
    image: productImgs[19],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.4",
    numberOfReviews: 98,
    supplier: "Unilever",
  },
  {
    id: 2,
    name: "Zenith Series Hiking Boots",
    description: "Waterproof and Durable",
    price: 120,
    image: productImgs[5],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "Unilever",
  },
  {
    id: 3,
    name: "Electra Wireless Headphones",
    description: "Noise Cancelling, Bluetooth 5.0",
    price: 85,
    image: productImgs[6],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "Unilever",
  },
  {
    id: 4,
    name: " Performance Running Shoes",
    description: "Lightweight and Breathable",
    price: 100,
    image: productImgs[7],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "Unilever",
  },
  {
    id: 5,
    name: "Leather Gloves",
    description: "Perfect mint green",
    price: 42,
    image: productImgs[4],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "Unilever",
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    image: productImgs[5],
    category: "Electronics",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: "",
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot...",
  },
  {
    id: 7,
    name: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    image: productImgs[8],
    category: "Pharmaceuticals",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot...",
  },
  {
    id: 8,
    name: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    image: productImgs[7],
    category: "Pharmaceuticals",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot...",
  },
  {
    id: 1,
    name: "Vibrant Mountain Majesty",
    description: "A vibrant portrayal of...",
    price: 45,
    image: productImgs[9],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.4",
    numberOfReviews: 98,
    supplier: "DALL·E 2",
  },
  {
    id: 2,
    name: "Mystic Mountain Dawn",
    description: "This serene landscape...",
    price: 120,
    image: productImgs[10],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "DALL·E 2",
  },
  {
    id: 3,
    name: "Storm's Wrath",
    description: "A powerful depiction...",
    price: 85,
    image: productImgs[11],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: "",
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "DALL·E 2",
  },
  {
    id: 4,
    name: " Twilight Fantasia",
    description: "Set at twilight...",
    price: 100,
    image: productImgs[12],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "DALL·E 2",
  },
  {
    id: 5,
    name: "Neon Peaks",
    description: "For the futuristic...",
    price: 42,
    image: productImgs[13],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "DALL·E 2",
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    image: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: "",
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot Sportswear",
  },
  {
    id: 7,
    name: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    image: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot Sportswear",
  },
  {
    id: 8,
    name: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    image: productImgs[7],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: "",
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
    supplier: "FleetFoot Sportswear",
  },
];

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  supplier,
  id,
  data = PRODUCTS.filter(
    (product) => product.supplier === supplier && product.id != id
  ),
}) => {
  const sliderRef = useRef(null);

  //

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} art={true} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
