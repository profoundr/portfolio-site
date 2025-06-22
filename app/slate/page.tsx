import { ExpandableCardSlate } from "@/components/slate/ExpandableCard";
import Footer from "@/components/slate/Footer";
import Process from "@/components/slate/Process";
import Services from "@/components/slate/Services";
import Work from "@/components/slate/Work";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <Work />
      <Services />
      <Process />
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full bg-slateBg">
      <div className="w-full bg-slateBg max-w-screen-2xl mx-auto px-5 py-10 lg:px-16 lg:py-20 text-slateText">
        <h1 className="text-[60px] md:text-[80px] lg:text-[124px] leading-[60px] md:leading-[80px] lg:leading-[130px]  font-medium lg:pl-10 font-interTight">
          Independent <br />
          Product Designer{" "}
        </h1>
        <p className="opacity-65 text-base lg:text-xl font-medium mt-10 font-interTight leading-[20px] lg:leading-[28px] tracking-tight  lg:max-w-[750px] lg:pl-10">
          Hey, I’m Victor, an Independent Product Designer delivering top-tier
          Websites, SaaS, Mobile experiences, and good vibes for almost two
          decades.
        </p>
      </div>
    </div>
  );
}
