"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { Product } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "../Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "../ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
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
const ProductDetailPage = ({ params }: { params: { id: number } }) => {
  const {
    sizes,
    variants,
    status,
    allOfSizes,
    image,
    supplier,
    name,
    price,
    id,
  } = PRODUCTS[params?.id - 1];

  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  //
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={image}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">{name} </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={price}
              art={true}
              qualitySelected={qualitySelected}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    {supplier}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex quas
          dolores accusamus tempore officiis iste ipsam nobis, aspernatur
          temporibus minus?
        </p>
        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <SparklesIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Own this Art</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src={image}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>

              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading={`Other Products from ${supplier}`}
            supplier={supplier}
            id={id}
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          />

          {/* SECTION */}
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
