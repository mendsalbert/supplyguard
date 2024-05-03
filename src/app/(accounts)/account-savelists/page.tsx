"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  addProductToWishlist,
  fetchUserByAddress,
  removeProductFromWishlist,
} from "@/features/user/userSlice";

const AccountSavelists = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.currentUser) as any;

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch]);

  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of saved products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {user?.wishlist?.map((item: any, index: any) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
