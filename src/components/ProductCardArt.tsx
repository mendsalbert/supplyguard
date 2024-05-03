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
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import { ToastContainer, toast } from "react-toastify";
import { mintNFT } from "@/lib/queries";
import {
  addProductToCart,
  fetchCart,
  fetchUserByAddress,
  selectCurrentCart,
} from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ethers } from "ethers";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
  art?: boolean;
}

const ProductCardArt: FC<any> = ({ className = "", data, art }) => {
  const { description, price, title, imageUrl, source, id } = data;
  const ethPrice = ethers.utils.formatEther(price.toString()) as any;

  const user = useAppSelector((state) => state.users.currentUser) as any;
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch]);

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

  const mintNFTHandler = async () => {
    // const idt = toast.loading("Getting your Art Ready...");

    let res = await mintNFT(id.toString(), "0.003");
    // toast.update(idt, {
    //   render: "NFT Minted Succefully",
    //   type: "success",
    //   isLoading: false,
    // });
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={mintNFTHandler}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Own this Art</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCardArt relative flex flex-col bg-transparent ${className}`}
      >
        <ToastContainer />

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <NcImage
            containerClassName="flex aspect-w-4 aspect-h-4 w-full h-0"
            src={imageUrl || ""}
            className="object-cover w-full h-full drop-shadow-xl"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            alt="product"
          />

          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {title || ""}
            </h2>
            <p
              className={`text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2`}
            >
              {description.substring(0, 80) + "..." || ""}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={ethPrice || 0} art={art} />

            <div className="flex items-center mb-0.5">
              <SparklesIcon className="w-5 h-5 pb-[1px] text-slate-500" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {source || ""}
              </span>
            </div>
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

export default ProductCardArt;
