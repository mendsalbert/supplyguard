import Label from "@/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";
import truncateEthAddress from "truncate-eth-address";
import {
  ClockIcon,
  EnvelopeIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { client } from "@/api/client";
import imageUrlBuilder from "@sanity/image-url";
import { RESPONSIBILITIES_ORDER, responsibilitiesMap } from "@/data/data";
import Policy from "../product-detail/Policy";

const sortRolesByResponsibility = (roles: any) => {
  return roles.sort((a: any, b: any) => {
    const indexA = RESPONSIBILITIES_ORDER.indexOf(a.role.responsibilities);
    const indexB = RESPONSIBILITIES_ORDER.indexOf(b.role.responsibilities);
    return indexA - indexB;
  });
};

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  data?: any;
  sortedRoles?: any;
  newOrder?: any;
}

const ContactInfo: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
  data,
  sortedRoles,
  newOrder,
}) => {
  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  const renderAccount = () => {
    return (
      <div className="border bg-white border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className=" tracking-tight">
                {responsibilitiesMap[data?.role?.responsibilities] ||
                  "Unknown Role"}
              </span>
              {data.approved ? (
                <ShieldCheckIcon className="h-7 w-7 pb-1 ml-3 text-green-500" />
              ) : (
                <ClockIcon className="h-7 w-7 pb-1 ml-3" />
              )}
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{data?.role?.fullname}</span>
              <span className="ml-3 tracking-tighter">
                {truncateEthAddress(data?.role?.ethaddress || "")}
                <span>{String(data?.approved)}</span>
              </span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={() => onOpenActive()}
          >
            Details
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between w-full ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              <div
                className={`flex flex-col p-5 rounded-2xl  dark:bg-opacity-90`}
              >
                <TruckIcon className="w-7 h-7" />
                <div className="mt-2.5">
                  <p className="font-semibold text-slate-900">{"Supplier"}</p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    {data?.role?.supplier?.supplierName}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-col p-5 rounded-2xl  dark:bg-opacity-90`}
              >
                <EnvelopeIcon className="w-6 h-6" />
                <div className="mt-2.5">
                  <p className="font-semibold text-slate-900">
                    {"Supplier Email"}
                  </p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    {data?.role?.supplier?.email}
                  </p>
                </div>
              </div>

              <div
                className={`flex flex-col p-5 rounded-2xl  dark:bg-opacity-90`}
              >
                <ClockIcon className="w-6 h-6" />
                <div className="mt-2.5">
                  <p className="font-semibold text-slate-900">
                    {"Date of Order"}
                  </p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    {newOrder._createdAt}
                  </p>
                </div>
              </div>

              {data.approved ? (
                <div
                  className={`flex flex-col p-5 rounded-2xl  dark:bg-opacity-90`}
                >
                  <ShieldCheckIcon className="w-6 h-6" />
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      {"Date Approved"}
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      {data.approvedAt}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-col p-5 rounded-2xl  dark:bg-opacity-90`}
                >
                  <IdentificationIcon className="w-6 h-6" />
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      {"Supplier Address"}
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      {truncateEthAddress(data?.role?.ethaddress || "")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              Close
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
