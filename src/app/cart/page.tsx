"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  removeProductFromCart,
  selectCurrentCart,
} from "@/features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const reduxCart = useAppSelector(selectCurrentCart);
  const user_ = useAppSelector((state) => state.users.currentUser) as any;

  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const [quantityValues, setQuantityValues] = useState<{
    [key: string]: number;
  }>({});
  const [ethExchangeRate, setEthExchangeRate] = useState<number>(1);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchEthExchangeRate = async () => {
      try {
        const ethExchangeRateResponse = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
        );
        const ethExchangeRateData = await ethExchangeRateResponse.json();
        const ethToUsdRate = parseFloat(
          ethExchangeRateData?.data?.rates?.USD || "0"
        );
        // const orderTotalEth = orderTotal / ethToUsdRate;

        setEthExchangeRate(ethToUsdRate);
      } catch (error) {
        console.error("Error fetching ETH exchange rate:", error);
      }
    };

    fetchEthExchangeRate();
  }, []);

  const handleChangeQuantity = (itemId: string, value: number) => {
    setQuantityValues((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));
  };

  const formatNumberWithCommas = (number: number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderSubtotal = () => {
    const subtotal = reduxCart
      ?.filter((item: any) => item !== null) // Filter out items with null fields
      .reduce(
        (acc: number, item: any) =>
          acc + Number(item?.price) * (quantityValues[item._id] || 1),
        0
      );

    return (
      <div className="flex justify-between pb-4">
        <span>Subtotal</span>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          ${formatNumberWithCommas(subtotal)}
        </span>
      </div>
    );
  };

  const renderShippingEstimate = () => {
    // You can calculate shipping estimate here based on your business logic
    const shippingEstimate = 5.0;

    return (
      <div className="flex justify-between py-4">
        <span>Shipping estimate</span>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          ${shippingEstimate}
        </span>
      </div>
    );
  };

  const renderTaxEstimate = () => {
    // You can calculate tax estimate here based on your business logic
    const taxEstimate = 24.9;

    return (
      <div className="flex justify-between py-4">
        <span>Tax estimate</span>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          ${taxEstimate}
        </span>
      </div>
    );
  };

  const renderOrderTotal = () => {
    const subtotal = reduxCart
      ?.filter((item: any) => item !== null) // Filter out items with null fields
      .reduce(
        (acc: number, item: any) =>
          acc + (Number(item?.price) || 0) * (quantityValues[item._id] || 1),
        0
      );

    // You can calculate order total here based on subtotal, shipping estimate, tax estimate, etc.
    const shippingEstimate = 5.0;
    const taxEstimate = 24.9;
    const orderTotal = subtotal + shippingEstimate + taxEstimate;

    return (
      <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
        <span>Order total</span>
        <span>
          ${formatNumberWithCommas(orderTotal)}
          {" ~ "}
          {Number(orderTotal / ethExchangeRate).toFixed(4)}ETH
        </span>
      </div>
    );
  };

  const handleRemove = async (productId: any) => {
    const id = toast.loading("Deleting...");
    await dispatch(
      removeProductFromCart({ userId: user_._id, productId: productId })
    ).unwrap();
    toast.update(id, {
      render: "Item Removed from cart",
      type: "success",
      isLoading: false,
    });
  };

  const renderProduct = (item: any, index: number) => {
    const { name, price, supplier, description, status, image, _id } = item;
    const quantity = quantityValues[_id] || 1;
    const totalPrice = price * quantity;
    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <ToastContainer />

        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={(image?.asset && urlFor(image.asset).url()) || ""}
            alt={name || ""}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail/4" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail/3">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <span>{supplier?.supplierName}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <NcInputNumber
                    className="relative z-10"
                    defaultValue={quantity}
                    onChange={(value) => handleChangeQuantity(_id, value)}
                  />
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={Number(price * quantity)}
                  />
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                <NcInputNumber
                  className="relative z-10"
                  defaultValue={quantity}
                  onChange={(value) => handleChangeQuantity(_id, value)}
                />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={totalPrice} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {renderStatusInstock()}
            <div
              onClick={() => {
                handleRemove(_id);
              }}
              className="relative cursor-pointer z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span>Remove</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Shopping Cart
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Homepage
            </Link>

            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {reduxCart
              ?.filter((item: any) => item !== null) // Filter out items with null fields
              .map((item: any, index: any) => renderProduct(item, index))}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">Order Summary</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                {renderSubtotal()}
                {renderShippingEstimate()}
                {renderTaxEstimate()}
                {renderOrderTotal()}
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                Checkout
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <svg
                    className="w-4 h-4 absolute -left-1 top-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9945 16H12.0035"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Learn more{` `}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Taxes
                  </a>
                  <span>
                    {` `}and{` `}
                  </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Shipping
                  </a>
                  {` `} infomation
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
