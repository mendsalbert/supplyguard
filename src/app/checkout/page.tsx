"use client";
import React, { FC, useState, useEffect, useRef } from "react";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/api/client";
import imageUrlBuilder from "@sanity/image-url";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectCurrentCart } from "@/features/user/userSlice";
const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const reduxCart = useAppSelector(selectCurrentCart);
  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const [quantityValues, setQuantityValues] = useState<{
    [key: string]: number;
  }>({});

  const handleChangeQuantity = (itemId: string, value: number) => {
    setQuantityValues((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));
  };

  const formatNumberWithCommas = (number: number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };
  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
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
      <div className="mt-4 flex justify-between py-2.5">
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
      <div className="flex justify-between py-2.5">
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
      <div className="flex justify-between py-2.5">
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
        <span>${formatNumberWithCommas(orderTotal)}</span>
      </div>
    );
  };

  const renderProduct = (item: any, index: number) => {
    const { name, price, supplier, description, status, image, _id } = item;
    const quantity = quantityValues[_id] || 1;
    const totalPrice = price * quantity;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-32 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={(image?.asset && urlFor(image.asset).url()) || ""}
            alt={name || ""}
            className="h-full w-full object-contain object-center"
            sizes="150px"
          />
          <Link href="/product-detail/2" className="absolute inset-0"></Link>
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

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              <NcInputNumber
                className="relative z-10"
                defaultValue={quantity}
                onChange={(value) => handleChangeQuantity(_id, value)}
              />
            </div>

            <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span>Remove</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={"/collection"} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {reduxCart
                ?.filter((item: any) => item !== null) // Filter out items with null fields
                .map((item: any, index: any) => renderProduct(item, index))}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {renderSubtotal()}
              {renderShippingEstimate()}
              {renderTaxEstimate()}
              {renderOrderTotal()}
            </div>
            <ButtonPrimary className="mt-8 w-full">Confirm order</ButtonPrimary>
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
      </main>
    </div>
  );
};

export default CheckoutPage;
