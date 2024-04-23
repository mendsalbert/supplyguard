"use client";
import React, { FC, useState } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import explore1Svg from "@/images/collections/explore1.svg";
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Auth } from "@polybase/auth";
import { useAppDispatch, useAppSelector } from "@/app/store";

import { addUser, selectAllUsers, selectCurrentUser } from "@/features/user";

export interface CardCategory4Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  bgSVG?: string;
  name: string;
  desc: string;
  color?: string;
  count?: number;
  client?: boolean;
  supplier?: boolean;
}
const auth = typeof window !== "undefined" ? new Auth() : null;

const OnBoardCardCategory: FC<CardCategory4Props> = ({
  className = "",
  featuredImage = ".",
  bgSVG = explore1Svg,
  name,
  desc,
  color = "bg-rose-50",
  count,
  client,
  supplier,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);

  const signIn = () => {
    // setisLoading(true);
    auth?.signIn().then((res) => {
      dispatch(
        addUser({
          isSupplier: name === "Client" ? false : true,
          ethereumAddress: res?.userId,
        })
      );
      // store address in localstorage
      console.log(res);
      // setisLoading(false);
    });
  };

  const signOut = () => {
    auth?.signOut();
  };

  const sign = () => {
    auth?.ethPersonalSign("approve");
  };

  return (
    <div
      className={` relative w-full aspect-w-2 aspect-h-2 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          <Image src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-around">
          <div className="flex justify-center items-center">
            {client ? (
              <UserCircleIcon
                className={`w-16 h-16 rounded-full overflow-hidden z-0 `}
              />
            ) : (
              <BuildingOffice2Icon
                className={`w-16 h-16 rounded-full overflow-hidden z-0 `}
              />
            )}

            {/* <NcImage
              alt=""
              src={featuredImage}
              containerClassName={`w-24 h-24 rounded-full overflow-hidden z-0 ${color}`}
              width={80}
              height={80}
            /> */}
          </div>

          <div className="text-center">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
              {desc}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>{name}</h2>
          </div>

          <ButtonSecondary
            loading={isLoading}
            onClick={() => {
              signIn();
              //add is an admin here
              window.location.href = "/account";
            }}
          >
            Connect
          </ButtonSecondary>

          {/* <Link
            href={"/collection"}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>See Collection</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link> */}
        </div>
      </div>

      {/* <Link href={"/collection"}></Link> */}
    </div>
  );
};

export default OnBoardCardCategory;
