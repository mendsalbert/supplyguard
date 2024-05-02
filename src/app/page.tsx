"use client";
import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";

import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";

import SectionHero3 from "@/components/SectionHero/SectionHero3";
import ReduxProvider from "./redux-provider";

function PageHome() {
  return (
    <ReduxProvider>
      <div className="nc-PageHome relative overflow-hidden">
        <SectionHero3 />

        {/* <SectionPromo3 /> */}
        <div className="mt-24 lg:mt-0">
          <DiscoverMoreSlider />
        </div>

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionHowItWork />
          </div>

          {/* <SectionPromo1 /> */}

          <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            <SectionGridMoreExplore />
          </div>

          {/* <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

          {/* <SectionPromo2 /> */}

          {/* <SectionSliderLargeProduct cardStyle="style2" /> */}

          <SectionSliderCategories />

          {/* <SectionPromo3 /> */}
        </div>
      </div>
    </ReduxProvider>
  );
}

export default PageHome;
