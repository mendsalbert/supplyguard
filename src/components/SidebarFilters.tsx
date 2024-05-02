"use client";

import React, { useState } from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import MySwitch from "@/components/MySwitch";

// DEMO DATA
const DATA_categories = [
  {
    name: "DALL·E 2",
  },
  {
    name: "midjourney",
  },
];

const DATA_colors = [
  { name: "Nature" },
  { name: "Abstract" },
  { name: "Animals" },
  { name: "Monks" },
];

const DATA_sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "2XL" },
];

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: "Price Low - Hight", id: "Price-low-hight" },
  { name: "Price Hight - Low", id: "Price-hight-low" },
];

const PRICE_RANGE = [1, 500];
//
const SidebarFilters = () => {
  //
  const [isOnSale, setIsIsOnSale] = useState(true);
  const [rangePrices, setRangePrices] = useState([100, 500]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  //

  // OK
  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Categories</h3>
        {DATA_categories.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={categoriesState.includes(item.name)}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              onChange={(checked) => handleChangeCategories(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsColor = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Types</h3>
        {DATA_colors.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              name={item.name}
              label={item.name}
              defaultChecked={colorsState.includes(item.name)}
              onChange={(checked) => handleChangeColors(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sort order</h3>
        {DATA_sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            defaultChecked={sortOrderStates === item.id}
            sizeClassName="w-5 h-5"
            onChange={setSortOrderStates}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsCategories()}
      {renderTabsColor()}

      {/* <div className="py-8 pr-2">
        <MySwitch
          label="On sale!"
          desc="Products currently on sale"
          enabled={isOnSale}
          onChange={setIsIsOnSale}
        />
      </div> */}
      {renderTabsSortOrder()}
    </div>
  );
};

export default SidebarFilters;
