"use client";
import Label from "@/components/Label/Label";
import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchUserByAddress, updateUserByAddress } from "@/features/user";
import { Auth } from "@polybase/auth";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
const auth = typeof window !== "undefined" ? new Auth() : null;
// use the get user by address, to fill the users with the defualt space

const AccountPage = () => {
  const user = useAppSelector((state) => state.users.currentUser) as any;
  const account = useAccount();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    supplierName: "",
    description: "",
    address: "",
    email: "",
    contactInfo: {
      phone: "",
      website: "",
    },
  });

  useEffect(() => {
    // Check if the user data is available before setting it
    if (user) {
      setUserData({
        supplierName: user.supplierName || "",
        description: user.description || "",
        address: user.address || "",
        email: user.email || "",
        contactInfo: {
          phone: user.contactInfo?.phone || "",
          website: user.contactInfo?.website || "",
        },
      });
    }
  }, [user]);

  useEffect(() => {
    const address = localStorage.getItem("address") as any;
    dispatch(fetchUserByAddress(JSON.parse(address)));
  }, [dispatch, isLoading]);

  const [imageFile, setImageFile] = useState(null);
  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const [nestedKey, nestedName] = name.split(".");

    if (nestedName) {
      setUserData((prevData: any) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedName]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = toast.loading("Updating...");
    setIsLoading(true);
    try {
      const updatedUser = await dispatch(
        updateUserByAddress({
          ethereumAddress: account.address,
          userData,
          imageFile,
        })
      ).unwrap();
      toast.update(id, {
        render: "All is good :) Account Updated!",
        type: "success",
        isLoading: false,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.update(id, {
        render: "Ops! Something went wrong",
        type: "error",
        isLoading: false,
      });
      setIsLoading(false);
    }
  };

  // Safe check and fallback
  const imageUrl =
    user && user.profilePicture && user.profilePicture.asset
      ? urlFor(user.profilePicture.asset).url()
      : null;
  return (
    <div className={`nc-AccountPage `}>
      <ToastContainer hideProgressBar={false} />

      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Business infomation
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            {/* AVATAR */}
            <div className="relative rounded-full overflow-hidden flex">
              <Image
                src={imageUrl || avatarImgs[7]}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6"
          >
            <div>
              <Label>Company Name</Label>
              <Input
                className="mt-1.5"
                placeholder={user?.supplierName || "Supply Guard"}
                name="supplierName"
                value={userData.supplierName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder={user?.email || "example@gmail.com"}
                  name="email"
                  value={userData.email}
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label>Addess</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  name="address"
                  required
                  placeholder={user?.address || "New york, USA"}
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* ---- */}

            {/* ---- */}
            <div>
              <Label>Contact number</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  name="contactInfo.phone"
                  type="phone"
                  required
                  placeholder={user?.contactInfo?.phone || "003 888 232"}
                  value={userData.contactInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>About Company</Label>
              <Textarea
                className="mt-1.5"
                name="description"
                required
                placeholder={user?.description || "about company"}
                value={userData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="pt-2">
              <ButtonPrimary loading={isLoading} type="submit">
                Update account
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
