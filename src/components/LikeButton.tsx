"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import {
  addProductToWishlist,
  fetchUserByAddress,
  removeProductFromWishlist,
} from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  id?: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked,
  id,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const user = useAppSelector((state) => state.users.currentUser) as any;
  const dispatch = useAppDispatch();
  const { open } = useWeb3Modal();
  const account = useAccount();
  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsLiked(user?.wishlist?.some((item: any) => item._id === id));
    }
  }, [user, id]);

  const handleLikeClick = async () => {
    if (account.address == undefined) {
      open();
      return;
    }
    setIsLiked(!isLiked); // Toggle the local state first
    if (!isLiked) {
      await dispatch(
        addProductToWishlist({ userId: user._id, productId: id })
      ).unwrap();
    } else {
      await dispatch(
        removeProductFromWishlist({ userId: user._id, productId: id })
      ).unwrap();
    }
  };
  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={handleLikeClick}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
