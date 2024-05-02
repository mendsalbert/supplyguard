"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import TabFilters from "@/components/TabFilters";
import { useAppDispatch, useAppSelector } from "@/app/store";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/api/client";
import {
  fetchProducts,
  selectAllProducts,
} from "@/features/product/productSlice";
import isAuth from "../lib/auth";

const PageCollection = ({}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [priceRange, setPriceRange] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Callback function to update the price range
  const handlePriceRangeUpdate = (newRange: any) => {
    setPriceRange(newRange);
    const updatedProducts = products.filter((product) => {
      return product.price >= newRange[0] && product.price <= newRange[1];
    });
    setFilteredProducts(updatedProducts);
  };

  const handleCategoryUpdate = (selectedCategory: any) => {
    setSelectedCategory(selectedCategory);
    if (
      selectedCategory.includes("All Categories") ||
      selectedCategory.length === 0
    ) {
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected categories
      const filteredProducts = products.filter((product: any) =>
        selectedCategory.includes(product.category.name)
      );
      // Update the products state with the filtered products
      setFilteredProducts(filteredProducts);
    }
  };
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Explore Unique Finds
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Encourages users to discover products that are out of the
              ordinary.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters
              onPriceRangeUpdate={handlePriceRangeUpdate}
              onCategoryUpdate={handleCategoryUpdate}
            />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {selectedCategory || priceRange
                ? filteredProducts?.map((item, index) => (
                    <ProductCard data={item} key={index} />
                  ))
                : products?.map((item, index) => (
                    <ProductCard data={item} key={index} />
                  ))}
            </div>

            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageCollection;
