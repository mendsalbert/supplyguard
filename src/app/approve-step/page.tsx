"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { avatarImgs, qrCode } from "@/contains/fakeData";
import ButtonThird from "@/shared/Button/ButtonThird";

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProductItem = (product: any, index: number) => {
    const { image, name } = product;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-24  flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{"Natural"}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span>
                </p>
              </div>
              <Prices className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">1</span>
            </p>

            <div className="flex">
              {/* <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Leave review
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#WU3746HGG12</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>Aug 8, 2023</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">Delivered</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <Link href="/track-order-single">
              <ButtonThird
                sizeClass="py-2.5 px-4 sm:px-6"
                fontSize="text-sm font-medium"
                className="bg-green-600 text-white"
              >
                Approve
              </ButtonThird>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]].map(renderProductItem)}
        </div>
      </div>
    );
  };
  const renderProduct = (item: Product, index: number) => {
    const { image, price, name } = item;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        {/* <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"> */}
        <div className="relative h-24 w-24  flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={image}
            fill
            alt={name}
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
                  <Link href="/product-detail/2">{name}</Link>
                </h3>
                <p className="text-sm">QTY: 42</p>
                <p className="text-sm flex flex-row items-center space-x-2">
                  <ClockIcon className="w-4 h-4 mr-1 " />
                  21/03/23 3:54PM
                </p>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-0 items-end justify-between text-sm">
            <div className=" ">
              <Image
                src={image}
                fill
                alt={name}
                className="h-16 w-16 hidden object-contain"
                // sizes="150px"
              />
            </div>

            <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <Link href="/track-order-single">View Track</Link>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-6">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <Image
              fill
              src={qrCode}
              alt={"name"}
              className="h-24 w-24 object-cover object-center"
            />
          </div>
          <h2 className="block text-2xl sm:text-2xl lg:text-4xl font-semibold ">
            Approve as a supplier manager
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-full ">
            <h3 className="text-lg font-semibold mb-10">
              Albert Mends | 0x4f...43f
            </h3>
            <div className="space-y-5">{renderOrder()}</div>
          </div>
        </div>
      </main>
      Y
    </div>
  );
};

export default CheckoutPage;
