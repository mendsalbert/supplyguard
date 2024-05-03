"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS, RESPONSIBILITIES_ORDER } from "@/data/data";
import React, { FC, useState, useEffect, useRef } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "../ContactInfo";
import PaymentMethod from "../PaymentMethod";
import ShippingAddress from "../ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectCurrentOrder, fetchOrder } from "@/features/order/orderSlice";
import { useAccount } from "wagmi";

const CheckoutPage = ({ params }: { params: { id: any } }) => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const sortRolesByResponsibilities = (roles: any) => {
    // Sorting based on the index of role's responsibility in the RESPONSIBILITIES_ORDER array
    return roles.sort((a: any, b: any) => {
      let roleAIndex = RESPONSIBILITIES_ORDER.indexOf(
        a?.role?.responsibilities
      );
      let roleBIndex = RESPONSIBILITIES_ORDER.indexOf(
        b?.role?.responsibilities
      );

      // Handling roles not found in the RESPONSIBILITIES_ORDER by placing them at the end
      roleAIndex = roleAIndex === -1 ? Number.MAX_SAFE_INTEGER : roleAIndex;
      roleBIndex = roleBIndex === -1 ? Number.MAX_SAFE_INTEGER : roleBIndex;

      return roleAIndex - roleBIndex;
    });
  };

  const dispatch = useAppDispatch();

  const userOrders = useAppSelector(selectCurrentOrder) as any;

  const account = useAccount();

  useEffect(() => {
    dispatch(fetchOrder(account.address));
  }, [dispatch, params.id]);

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderLeft = (roles: any, roleApproval: any, newOrder: any) => {
    return (
      <div className="space-y-8 z-[99999]">
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
            data={roles}
            newOrder={newOrder}
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
            Track order
          </h2>
        </div>

        <div className="relative z-10">
          <div className="absolute -z-50 h-full left-6 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
          {/* <div className=" absolute flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0  "></div> */}
          <div className="flex-1">
            <div className="space-y-8 z-[99999]">
              {userOrders?.map((order: any) => {
                const filteredRoleApprovals = order.roleApprovals.filter(
                  (approval: any) => approval.productId === params.id
                );

                const newOrder = {
                  ...order,
                  roleApprovals: filteredRoleApprovals, // Replace roleApprovals with filtered
                };

                const sortedRoles = sortRolesByResponsibilities(
                  newOrder.roleApprovals
                );

                return sortedRoles.map((roles: any) =>
                  renderLeft(roles, newOrder.roleApprovals, newOrder)
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
