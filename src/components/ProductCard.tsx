"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import {
  ArrowsPointingOutIcon,
  BuildingStorefrontIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import {
  addProductToCart,
  fetchCart,
  fetchUserByAddress,
  selectCurrentCart,
} from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
  art?: boolean;
}

const ProductCard: FC<any> = ({ className = "", data, art }) => {
  const { name, price, supplier, description, status, image, _id } = data;
  const reduxCart = useAppSelector(selectCurrentCart);

  const { supplierName } = supplier;
  const { open } = useWeb3Modal();
  const account = useAccount();
  const user = useAppSelector((state) => state.users.currentUser) as any;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch]);

  const isItemInWishlist = !!user?.wishlist?.filter(
    (item: any) => item._ref !== _id
  ).length;
  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();
  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const handleAddToCart = async () => {
    setIsLoading(true);
    let addedProductToCart = await dispatch(
      addProductToCart({ userId: user._id, productId: _id })
    ).unwrap();
    setIsLoading(false);
  };
  const lastUserIdUsedForFetchingCart = useRef();

  useEffect(() => {
    if (user?._id && user?._id !== lastUserIdUsedForFetchingCart.current) {
      const fetchCartAsync = async () => {
        await dispatch(fetchCart(user?._id));
        lastUserIdUsedForFetchingCart.current = user?._id;
      };

      fetchCartAsync();
    }
  }, [dispatch, fetchCart, user?._id, isLoading, reduxCart]);

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
              (image?.url && urlFor(image.url).url())
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
                  <span> {supplierName} </span>
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

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {art ? (
          ""
        ) : (
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
            onClick={() => {
              if (account.address == undefined) {
                open();
                return;
              }
              handleAddToCart();
              notifyAddTocart({ size: "XL" });
            }}
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ms-1">Add to Cart</span>
          </ButtonPrimary>
        )}
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        {/* <Link
          href={art ? `/art-detail/${_id}` : `/product-detail/${_id}`}
          className="absolute inset-0"
        ></Link> */}

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          {/* <Link
            href={art ? `/art-detail/${_id}` : `/product-detail/${_id}`}
            className="block"
          > */}
          <NcImage
            containerClassName="flex aspect-w-4 aspect-h-4 w-full h-0"
            src={(image?.asset && urlFor(image.asset).url()) || image}
            className="object-cover w-full h-full drop-shadow-xl"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            alt="product"
          />
          {/* </Link> */}
          <ProductStatus status={status} />
          <LikeButton
            liked={false}
            id={_id}
            className="absolute top-3 end-3 z-10"
          />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <p
              className={`text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2`}
            >
              {description.substring(0, 80) + "..." || ""}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} art={art} />
            {art ? (
              <div className="flex items-center mb-0.5">
                <SparklesIcon className="w-5 h-5 pb-[1px] text-slate-500" />
                <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                  {supplierName}
                </span>
              </div>
            ) : (
              <div className="flex items-center mb-0.5">
                <BuildingStorefrontIcon className="w-5 h-5 pb-[1px] text-slate-500" />
                <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                  {supplierName}{" "}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        data={data}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        art={art}
      />
    </>
  );
};

export default ProductCard;
