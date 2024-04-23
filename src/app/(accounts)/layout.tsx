"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchUserByAddress } from "@/features/user";
import { Auth } from "@polybase/auth";
import truncateEthAddress from "truncate-eth-address";

const auth = typeof window !== "undefined" ? new Auth() : null;

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.currentUser) as any;

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch]);

  const pages: {
    name: string;
    link: Route;
  }[] = [
    {
      name: "Account info",
      link: "/account",
    },
    {
      name: "Save lists",
      link: "/account-savelists",
    },
    {
      name: " My order",
      link: "/account-order",
    },
    {
      name: "Owned Art",
      link: "/account-arts",
    },
  ];

  const Adminpages: {
    name: string;
    link: Route;
  }[] = [
    {
      name: "Dashboard",
      link: "/admin-account-dashboard",
    },
    {
      name: "Business info",
      link: "/admin-account",
    },
    {
      name: "Manage Products",
      link: "/admin-account-products",
    },
    {
      name: " Manage Roles",
      link: "/admin-account-manage-roles",
    },
    {
      name: "Owned Art",
      link: "/admin-account-arts",
    },
  ];

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Account</h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                {user?.supplierName || user?.username} ·
              </span>{" "}
              {user?.email} · {truncateEthAddress(user?.ethereumAddress || "")}
            </span>
          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {
              user?.isSupplier === true
                ? Adminpages.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                        pathname === item.link
                          ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))
                : user?.isSupplier === false
                ? pages.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                        pathname === item.link
                          ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))
                : null // Or handle the case when neither condition is true
            }
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
