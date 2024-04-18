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
import explore1Svg from "@/images/collections/explore1.svg";
import explore1Png from "@/images/collections/explore1.png";

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
    <div className="flex flex-row">
      <div
        className={`grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-[#f7f7f9] p-14 w-full `}
      >
        <OnBoardCardCategory
          name="FSFD"
          desc="FDS"
          bgSVG={explore1Svg}
          featuredImage={explore1Png}
          key={1}
          color={"bg-indigo-50"}
        />
        <OnBoardCardCategory
          name="FSFD"
          desc="FDS"
          bgSVG={explore1Svg}
          featuredImage={explore1Png}
          key={1}
          color={"bg-indigo-50"}
        />
      </div>
    </div>
  );
};

export default PageLogin;
