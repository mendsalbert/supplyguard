"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import { ethers } from "ethers";
import SupplyGuard from "../../lib/SupplyGuard.json";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
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
import { getAllNFTs } from "@/lib/queries";
import Button from "@/shared/Button/Button";
import { contract } from "@/lib";
import ProductCardArt from "@/components/ProductCardArt";

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

const PageCollection2 = ({}) => {
  const PRODUCTS: Product[] = [
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
      isLiked: false,
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
      isLiked: false,
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
      isLiked: true,
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
      isLiked: true,
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
      isLiked: false,
    },
  ];

  const [arts, setArts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      let res = await getAllNFTs();
      setArts(res);
    };

    fetchNFTs();
  }, []);

  return (
    <div className={`nc-PageCollection2`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              SupplyGuard AI Arts
              {/* <Button onClick={fetchNFTs}>Get Nfts</Button> */}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Start Your Collection with Exclusive Art Minting at Attractive
              Prices{" "}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {arts?.map((item, index) => (
                    <ProductCardArt data={item} key={index} art={true} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageCollection2;
