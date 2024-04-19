import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import OnBoardCardCategory from "@/components/CardCategories/OnBoardCardCategory";
import explore1Svg from "@/images/collections/explore8.svg";
import explore2Svg from "@/images/collections/explore6.svg";
import explore1Png from "@/images/collections/explore1.png";
import Heading from "@/components/Heading/Heading";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = () => {
  return (
    <div className=" bg-[#f7f7f9] ">
      <Heading
        className="mb-18 lg:mb-4 lg:pt-10 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-3xl 2xl:text-5xl font-semibold"
        isCenter
        desc=""
      >
        Let's get you started
      </Heading>{" "}
      <div className="grid gap-4 md:gap-7 x-10  grid-cols-1 md:grid-cols-2 xl:grid-cols-2 py-4 max-w-4xl mx-auto pb-20 ">
        <OnBoardCardCategory
          name="Client"
          desc="onboard as a"
          client={true}
          bgSVG={explore1Svg}
          featuredImage={explore1Png}
          key={1}
          color={"bg-indigo-50"}
        />
        <OnBoardCardCategory
          desc="Onboard as a"
          name="Supplier"
          supplier={true}
          bgSVG={explore2Svg}
          featuredImage={explore1Png}
          key={1}
          color={"bg-indigo-50"}
        />
        {/* <ButtonPrimary>Button</ButtonPrimary> */}
      </div>
    </div>
  );
};

export default PageLogin;
