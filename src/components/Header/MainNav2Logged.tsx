"use client";

import React, { createRef, FC, useState, useEffect } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LangDropdown from "./LangDropdown";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Auth } from "@polybase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  fetchCart,
  fetchUserByAddress,
  selectCurrentCart,
} from "@/features/user/userSlice";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export interface MainNav2LoggedProps {}

const auth = typeof window !== "undefined" ? new Auth() : null;

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const { open } = useWeb3Modal();

  const inputRef = createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const router = useRouter();
  const reduxCart = useAppSelector(selectCurrentCart);
  const account = useAccount();

  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null); // Correct naming and type
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const user = useAppSelector((state) => state.users.currentUser) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address) {
      try {
        // Parse and dispatch only if address is not null
        const parsedAddress = JSON.parse(address);
        dispatch(fetchUserByAddress(parsedAddress));
      } catch (error) {
        console.error("Error parsing address from localStorage:", error);
        // Handle the error, maybe clear localStorage item if it's corrupted
      }
    } else {
      console.log("No address found in localStorage.");
      // Handle cases where no address is found, perhaps set default state or redirect
    }
  }, [dispatch]);

  useEffect(() => {
    auth?.onAuthUpdate((authState) => {
      setIsAuthenticated(!!authState); // Directly set isAuthenticated to boolean based on authState presence
    });
  }, []);

  useEffect(() => {
    const onboard = localStorage.getItem("isOnboard") === "true"; // Ensure you handle string appropriately
    setIsOnboarded(onboard);
  }, []);

  const signIn = () => {
    auth?.signIn().then((res) => {
      localStorage.setItem("address", JSON.stringify(res?.userId));
    });
  };

  useEffect(() => {
    dispatch(fetchCart(user?._id));
  }, [dispatch, user]);

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search");
          inputRef.current?.blur();
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
          />
          <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  const renderConnectButton = () => (
    <>
      <div
        onClick={() => {
          localStorage.setItem("isOnboard", JSON.stringify(true));
          open();
          router.push("/onboard");
        }}
        className="hover:cursor-pointer rounded-full py-2 px-7 border border-slate-300 dark:border-slate-700"
      >
        Connect
      </div>
    </>
  );
  const renderConnectToButton = () => (
    <>
      <div
        onClick={() => open()}
        className="hover:cursor-pointer rounded-full py-2 px-7 border border-slate-300 dark:border-slate-700"
      >
        Connect
      </div>
      {/* <button onClick={() => open()}>Connect Wallet</button>; */}
    </>
  );

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          {showSearchForm ? renderSearchForm() : <Navigation />}
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {account?.address !== undefined ? (
            <>
              {!showSearchForm && (
                <button
                  className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                  onClick={() => setShowSearchForm(!showSearchForm)}
                >
                  {renderMagnifyingGlassIcon()}
                </button>
              )}
              <AvatarDropdown />
              <CartDropdown />
            </>
          ) : (
            <>{isOnboarded ? renderConnectToButton() : renderConnectButton()}</>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
