"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { useRouter } from "next/navigation";

import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import { Transition } from "@/app/headlessui";

import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import { addProductToCart } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";

export interface ProductQuickView2Props {
  className?: string;
  data: any;
  art: boolean;
}

const ProductQuickView2: FC<ProductQuickView2Props> = ({
  className = "",
  data,
  art,
}) => {
  const {
    name,
    price,
    supplier,
    source,
    category,
    description,
    variantType,
    status,
    image,
    imageUrl,
    _id,
  } = data;

  const dispatch = useAppDispatch();

  const { supplierName } = supplier || source;

  const router = useRouter();

  const user = useAppSelector((state) => state.users.currentUser) as any;

  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const [variantActive, setVariantActive] = useState(0);

  const [qualitySelected, setQualitySelected] = useState(1);

  const handleAddToCart = async () => {
    await dispatch(
      addProductToCart({ userId: user._id, productId: _id })
    ).unwrap();
  };

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(_id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={
              (image?.asset && urlFor(image.asset).url()) ||
              (image?.url && urlFor(image.url).url()) ||
              imageUrl
            }
            alt={name}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span> {supplierName || source} </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                </p>
              </div>
              <Prices price={price} art={art} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl 2xl:text-3xl font-semibold">
            <Link href={art ? `/art-detail/${_id}` : `/product-detail/${_id}`}>
              {data?.name}
            </Link>
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={data?.price}
              qualitySelected={qualitySelected}
            />

            <div className="h-6 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 ">
                    {supplierName}
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <p>{description}</p>
        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          {art ? (
            ""
          ) : (
            <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                defaultValue={qualitySelected}
                onChange={setQualitySelected}
              />
            </div>
          )}

          {art ? (
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={() => {
                // notifyAddTocart({ size: "XL" });
              }}
            >
              <SparklesIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">Own this Art</span>
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={() => {
                handleAddToCart();
                notifyAddTocart({ size: "XL" });
              }}
              // fire a function to store this inside the db
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">Add to cart</span>
            </ButtonPrimary>
          )}
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        <div className="text-center">
          {/* <Link
            className="text-primary-6000 hover:text-primary-500 font-medium"
            href={art ? `/art-detail/${_id}` : `/product-detail/${_id}`}
          >
            View full details
          </Link> */}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView2 ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={image?.asset && urlFor(image.asset).url()}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* META FAVORITES */}
            <LikeButton className="absolute right-3 top-3 " />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-10">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView2;
