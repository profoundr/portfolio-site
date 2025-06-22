import {
  DirectusCMS,
  NextJS,
  Remix,
  Shopify,
  TailwindCSS,
} from "@/components/SVGs/icons";
import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="w-full bg-slateBg">
      <div className="w-full bg-slateBg max-w-screen-2xl mx-auto  py-10 lg:py-20 px-5 lg:px-16 text-slateText">
        <div className="flex flex-col lg:flex-row gap-10">
          <div>
            <h1 className="text-[60px] md:text-[80px] lg:text-[124px] leading-[60px] md:leading-[80px] lg:leading-[130px]  font-medium lg:pl-10 font-interTight">
              About
            </h1>
            <p className="opacity-65 text-base lg:text-xl font-medium mt-10 font-interTight leading-[20px] lg:leading-[28px] tracking-tight  lg:max-w-[750px] lg:pl-10">
              Hey, I’m Victor, an Independent Product Designer delivering
              top-tier Websites, SaaS, Mobile experiences, and good vibes for
              almost two decades.
            </p>
          </div>
          <div>
            <Image src="/test-image.png" alt="About" width={500} height={500} />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-[50px] md:text-[65px] lg:text-[85px] leading-none font-medium lg:pl-10 font-interTight mt-20">
            Mission
          </h2>
          <p className="opacity-65 text-xl font-medium font-interTight leading-[28px] tracking-tight lg:max-w-[750px] lg:pl-10">
            Hey, I’m Victor, an Independent Product Designer delivering top-tier
            Websites, SaaS, Mobile experiences, and good vibes for almost two
            decades.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="text-[50px] md:text-[65px] lg:text-[85px] leading-[90px] font-medium lg:pl-10 font-interTight mt-20">
            Techstack
          </h2>

          {/* <span className="absolute bg-transparent  top-[-8px] left-4 text-[12px] px-1">
            Techstack
          </span> */}
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            <div className="border border-border rounded-lg grid grid-cols-5 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
              <div className="w-fit flex flex-col items-center justify-between">
                <NextJS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Next.JS</span>
              </div>
              <div className="w-fit flex flex-col items-center justify-between">
                <Remix className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Remix</span>
              </div>
              <div className="w-fit flex flex-col items-center gap-2">
                <TailwindCSS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Tailwind CSS</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <Shopify className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Shopify</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <DirectusCMS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Directus CMS</span>
              </div>
              <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
                Frontend
              </div>
            </div>
            <div className="border border-border rounded-lg grid grid-cols-5 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
              <div className="w-fit flex flex-col items-center justify-between">
                <NextJS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Next.JS</span>
              </div>
              <div className="w-fit flex flex-col items-center justify-between">
                <Remix className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Remix</span>
              </div>
              <div className="w-fit flex flex-col items-center gap-2">
                <TailwindCSS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Tailwind CSS</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <Shopify className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Shopify</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <DirectusCMS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Directus CMS</span>
              </div>
              <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
                Frontend
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 w-full">
            <div className="border border-border rounded-lg grid grid-cols-5 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
              <div className="w-fit flex flex-col items-center justify-between">
                <NextJS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Next.JS</span>
              </div>
              <div className="w-fit flex flex-col items-center justify-between">
                <Remix className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Remix</span>
              </div>
              <div className="w-fit flex flex-col items-center gap-2">
                <TailwindCSS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Tailwind CSS</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <Shopify className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Shopify</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <DirectusCMS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Directus CMS</span>
              </div>
              <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
                Frontend
              </div>
            </div>
            <div className="border border-border rounded-lg grid grid-cols-5 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
              <div className="w-fit flex flex-col items-center justify-between">
                <NextJS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Next.JS</span>
              </div>
              <div className="w-fit flex flex-col items-center justify-between">
                <Remix className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Remix</span>
              </div>
              <div className="w-fit flex flex-col items-center gap-2">
                <TailwindCSS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Tailwind CSS</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <Shopify className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Shopify</span>
              </div>{" "}
              <div className="w-fit flex flex-col items-center justify-between">
                <DirectusCMS className="mb-2 md:-w-14 md:h-14 w-8 h-8 text-slateGray" />
                <span className="text-[12px] mx-auto">Directus CMS</span>
              </div>
              <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
                Frontend
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
