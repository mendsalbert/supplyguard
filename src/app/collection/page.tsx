import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import TabFilters from "@/components/TabFilters";
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

//
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

const PageCollection = ({}) => {
  const PRODUCTS: Product[] = [
    {
      id: 1,
      name: "Satori Eco Yoga Mat",
      description: "Eco-friendly Material",
      price: 45,
      image: productImgs[19],
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
      supplier: "Unilever",
    },
    {
      id: 2,
      name: "Zenith Series Hiking Boots",
      description: "Waterproof and Durable",
      price: 120,
      image: productImgs[5],
      category: "Category 1",
      tags: ["tag1", "tag2"],
      link: "/product-detail/",
      variants: "",
      variantType: "color",
      status: "50% Discount",
      rating: "4.9",
      numberOfReviews: 98,
      supplier: "Trailblazer Gear Co",
    },
    {
      id: 3,
      name: "Electra Wireless Headphones",
      description: "Noise Cancelling, Bluetooth 5.0",
      price: 85,
      image: productImgs[6],
      category: "Category 1",
      tags: ["tag1", "tag2"],
      link: "/product-detail/",
      variants: "",
      variantType: "image",
      sizes: ["S", "M", "L", "XL"],
      allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      rating: "4.9",
      numberOfReviews: 98,
      supplier: "SoundSphere Electronics",
    },
    {
      id: 4,
      name: " Performance Running Shoes",
      description: "Lightweight and Breathable",
      price: 100,
      image: productImgs[7],
      category: "Category 1",
      tags: ["tag1", "tag2"],
      variants: "",
      variantType: "color",
      link: "/product-detail/",
      status: "Sold Out",
      rating: "4.9",
      numberOfReviews: 98,
      supplier: "FleetFoot Sportswear",
    },
    {
      id: 5,
      name: "Leather Gloves",
      description: "Perfect mint green",
      price: 42,
      image: productImgs[4],
      category: "Category 1",
      tags: ["tag1", "tag2"],
      variants: "",
      variantType: "image",
      sizes: ["XS", "S", "M", "L", "XL"],
      allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      link: "/product-detail/",
      rating: "4.9",
      numberOfReviews: 98,
      supplier: "FleetFoot Sportswear",
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

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Explore Unique Finds
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Encourages users to discover products that are out of the
              ordinary.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {PRODUCTS.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageCollection;
