"use client";
import React, { FC, useState } from "react";
import explore1Svg from "@/images/collections/explore1.svg";
import {
  BuildingOffice2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
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

  const { open } = useWeb3Modal();
  const account = useAccount();

  const signIn = async () => {
    try {
      setisLoading(true);
      const res = await auth?.signIn();
      await dispatch(
        addUser({
          isSupplier: name === "Client" ? false : true,
          ethereumAddress: account.address,
        })
      ).unwrap();
      localStorage.setItem("address", JSON.stringify(account.address));
      const redirectPath = client ? "/account" : "/admin-account";
      window.location.href = redirectPath;
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setisLoading(false);
    }
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
            }}
          >
            Connect
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default OnBoardCardCategory;
