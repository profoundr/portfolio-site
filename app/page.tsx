import Process from "@/components/slate/Process";
import Services from "@/components/slate/Services";
import Work from "@/components/slate/Work";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <div className="animate-[fadeIn_0.5s_ease-out_2s_forwards] opacity-0 z-[1000] relative">
        <Work />
      </div>
      <Services />
      <Process />
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full bg-slateBg ">
      <div className="w-full bg-slateBg max-w-screen-2xl mx-auto px-5 py-10 lg:px-16 lg:py-20 text-slateText ">
        <div className="overflow-hidden">
          <h1 className="text-[60px] md:text-[80px] lg:text-[124px] leading-[60px] md:leading-[80px] lg:leading-[130px]  font-medium lg:pl-10 font-interTight animate-[slideUpBlur_1.2s_ease-out_1s_forwards] opacity-0">
            Building Beautiful, <br /> Performant Websites
            {/* FullStack Developer{" "} */}
            {/* Beautiful Interfaces. Reliable Code.{" "} */}
          </h1>
        </div>

        <p className="text-base lg:text-xl font-medium mt-10 font-interTight !leading-normal tracking-wide  lg:max-w-[750px] lg:pl-10 animate-[fadeIn65_0.5s_ease-out_1.5s_forwards] opacity-0">
          Hey! I&apos;m Kedar, and I work with experienced designers to build
          digital products that are beautiful, fast, and reliable.
        </p>
      </div>
    </div>
  );
}
