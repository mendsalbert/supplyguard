import rightImg from "@/images/hero-right1.png";
import logo from "@/images/logo.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "@/components/SectionPromo3";

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={logo}
          heading="👋 About Us."
          btnText=""
          subHeading="SupplyGuard is a decentralized supply chain management tool that leverages blockchain technology to enhance transparency and efficiency in the flow of goods and information. It utilizes Ethereum smart contracts to automate transactions and secure data across the supply chain, ensuring each step is immutable and verifiable. SupplyGuard's platform integrates AI to optimize operations and offers real-time tracking of products through QR codes and blockchain verification. By eliminating the complexities and opacities of traditional supply chains, SupplyGuard aims to provide a seamless, secure, and user-friendly interface for businesses and consumers. This innovative solution significantly reduces potential fraud and errors, paving the way for a more reliable and transparent global supply chain ecosystem."
        />
      </div>
    </div>
  );
};

export default PageAbout;
