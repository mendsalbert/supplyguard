"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import { ethers } from "ethers";
import SupplyGuard from "../../lib/SupplyGuard.json";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";

import { getAllNFTs } from "@/lib/queries";
import Button from "@/shared/Button/Button";
import { contract } from "@/lib";
import ProductCardArt from "@/components/ProductCardArt";
import isAuth from "../lib/auth";

const PageCollection2 = ({}) => {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      let res = await getAllNFTs();
      setArts(res);
    };

    fetchNFTs();
  }, []);

  return (
    <div className={`nc-PageCollection2`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              SupplyGuard AI Arts
              {/* <Button onClick={fetchNFTs}>Get Nfts</Button> */}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Start Your Collection with Exclusive Art Minting at Attractive
              Prices{" "}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {arts?.map((item, index) => (
                    <ProductCardArt data={item} key={index} art={true} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default isAuth(PageCollection2);
