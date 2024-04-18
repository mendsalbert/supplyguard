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
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Tracked Orders
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-full ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {[PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]].map(renderProduct)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
