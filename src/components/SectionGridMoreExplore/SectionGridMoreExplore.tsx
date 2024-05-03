"use client";

import React, { FC, useState } from "react";
import CardCategory1 from "@/components/CardCategories/CardCategory1";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import CardCategory6 from "@/components/CardCategories/CardCategory6";
import { DEMO_MORE_EXPLORE_DATA, ExploreType } from "./data";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
}) => {
  const [tabActive, setTabActive] = useState("Man");

  const renderCard = (item: ExploreType) => {
    switch (boxCard) {
      case "box1":
        return (
          <CardCategory1 key={item.id} featuredImage={item.image} {...item} />
        );

      case "box4":
        return (
          <CardCategory4
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            {...item}
          />
        );
      case "box6":
        return (
          <CardCategory6
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            {...item}
          />
        );

      default:
        return (
          <CardCategory4
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
            {...item}
          />
        );
    }
  };

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Start exploring.
        </Heading>
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {data.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
