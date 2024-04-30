"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import React, { FC, useState, useEffect, useRef } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";

import { client } from "@/api/client";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectCurrentOrder, fetchOrder } from "@/features/order/orderSlice";
import { useAccount } from "wagmi";
import imageUrlBuilder from "@sanity/image-url";
import Heading from "@/components/Heading/Heading";
import ModalApproveOrder from "@/components/ModalApproveOrder";

const PageLogin = () => {
  const dispatch = useAppDispatch();

  const userOrders = useAppSelector(selectCurrentOrder) as any;

  const account = useAccount();

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  function urlFor(source: any) {
    return builder.image(source);
  }

  const builder = imageUrlBuilder(client);

  useEffect(() => {
    dispatch(fetchOrder(account.address));
  }, [dispatch]);

  const renderProductItem = (product: any, index: number) => {
    const { image, price, name, quantity, supplier, _id } = product?.product;
    const { supplierName } = supplier;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-24  flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={(image?.asset && urlFor(image.asset).url()) || ""}
            alt={name || ""}
            fill
            className="h-full w-full object-contain object-center"
            sizes="150px"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{supplierName}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{product?.quantity}</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-500 dark:text-primary-500 "
              >
                {/* <Link href={`/track-order-single/${_id}`}>View Order</Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (order: any) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#{order?.orderNumber}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{order?.orderDate || ""}</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">{order?.status}</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <Link href="/track-order-single/4">
              <ButtonSecondary
                sizeClass="py-2.5 px-4 sm:px-6"
                fontSize="text-sm font-medium"
              >
                Approve Order
              </ButtonSecondary>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {order?.items?.map((product: any, index: any) =>
            renderProductItem(product, index)
          )}
        </div>
      </div>
    );
  };
  const [isAuth, setIsAuth] = useState(false);
  const closeModalAuth = () => setIsAuth(false);

  return (
    <div className="nc-CheckoutPage">
      <ModalApproveOrder show={isAuth} onCloseModalDelete={closeModalAuth} />
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-full ">
            <h3 className="text-lg font-semibold mb-10">
              Approve This order as Supplier Manager : Albert Mends
            </h3>
            <div className="space-y-5">
              {userOrders?.map((order: any) => renderOrder(order))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageLogin;
