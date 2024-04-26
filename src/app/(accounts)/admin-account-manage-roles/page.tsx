"use client";
import ModalAddRole from "@/components/ModalAddRole";
import ModalRoleDelete from "@/components/ModalDeleteRole";
import ModalEdit from "@/components/ModalEdit";
import ModalEditRole from "@/components/ModalEditRole";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonThird from "@/shared/Button/ButtonThird";
import {
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  fetchProductsFromSupplier,
  selectProductsBySupplier,
} from "@/features/product";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import {
  fetchRolesBySupplier,
  selectRolesBySupplier,
} from "@/features/role/roleSlice";
import truncateEthAddress from "truncate-eth-address";

const AccountOrder = () => {
  const dispatch = useAppDispatch();
  const rolesBySupplier = useAppSelector(selectRolesBySupplier);
  const lastAddressUsedForFetching = useRef();

  const [roleId, setRoleId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const openModalAdd = () => setIsAdding(true);
  const openModalEdit = () => setIsEditing(true);
  const openModalDelete = () => setIsDeleting(true);
  const closeModalAdd = () => setIsAdding(false);
  const closeModalEdit = () => setIsEditing(false);
  const closeModalDelete = () => setIsDeleting(false);

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address && JSON.parse(address) !== lastAddressUsedForFetching.current) {
      const parsedAddress = JSON.parse(address);

      dispatch(fetchRolesBySupplier(parsedAddress));
      lastAddressUsedForFetching.current = parsedAddress;
    }
  }, [dispatch, rolesBySupplier]);

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

  const renderProductItem = (product: any, index: number) => {
    const { fullname, ethaddress, responsibilities, _id, _createdAt } = product;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 flex flex-row justify-center items-center">
          {/* <Image
            fill
            sizes="100px"
            src={image?.asset && urlFor(image.asset).url()}
            alt={name}
            className="h-full w-full object-cover object-center"
          /> */}
          <UserCircleIcon className="h-16 w-16" />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {fullname} | {truncateEthAddress(ethaddress)}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{responsibilities}</span>
                </p>
                <p className="mt-0 text-sm  text-green-500">
                  <span>{status}</span>
                </p>
                <p className="mt-0 text-sm  text-slate-500">
                  {/* <span>${price}</span> */}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Date Added</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{_createdAt}</span>
            </p>

            <div className="flex items-center space-x-2">
              <span
                onClick={() => {
                  openModalEdit();
                  setRoleId(_id);
                }}
                className="border text-green-500 cursor-pointer border-green-500 rounded-md p-1"
              >
                <PencilIcon className="w-4 h-4 " />
              </span>
              <span
                onClick={() => {
                  openModalDelete();
                  setRoleId(_id);
                }}
                className="border text-red-500 cursor-pointer border-red-500 rounded-md p-1"
              >
                <TrashIcon className="w-4 h-4 " />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className=" w-full  sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            {/* <p className="text-lg font-semibold">32 Products</p> */}
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2 w-full">
              <div className="bg-white shadow-sm dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded-full w-full">
                {renderMagnifyingGlassIcon()}
                <input
                  type="text"
                  placeholder="Type and press enter"
                  className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
                  autoFocus
                />
                <button type="button">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </p>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {rolesBySupplier?.map(renderProductItem)}
          <div className="text-center pt-6">
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <ModalAddRole show={isAdding} onCloseModalEdit={closeModalAdd} />
      <ModalEditRole
        show={isEditing}
        onCloseModalEdit={closeModalEdit}
        roleId={roleId}
      />
      <ModalRoleDelete
        show={isDeleting}
        onCloseModalDelete={closeModalDelete}
        roleId={roleId}
      />
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          All Roles({rolesBySupplier.length})
        </h2>
        <ButtonThird onClick={openModalAdd} className="bg-[#0ba5e9] text-white">
          Add Role
        </ButtonThird>
      </div>
      {renderOrder()}
    </div>
  );
};

export default AccountOrder;
