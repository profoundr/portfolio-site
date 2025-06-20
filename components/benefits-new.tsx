import React from "react";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "./SVGs/benefits-icons";
import Image from "next/image";

export const BenefitsNew = () => {
  const cornerDots =
    " shadow-[0_1px_1px_0_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)] rounded-2xl hidden";

  const connectorSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
    >
      <rect width="1" height="23" fill="#0A0A0A" />
      <rect
        x="18"
        y="11.0176"
        width="1"
        height="17.9955"
        transform="rotate(89.8725 18 11.0176)"
        fill="#0A0A0A"
      />
    </svg>
  );
  return (
    <div className="w-full max-w-screen-2xl px-16 py-[112px] bg-white mx-auto border border-border border-t-0">
      <p className="text-base rounded-lg border border-border px-4 py-2 font-medium  font-interTight  text-fontTertiary leading-none uppercase w-fit opacity-70 mb-4">
        Benefits
      </p>
      <h2 className="text-[46px] font-bold leading-[46px] tracking-[-0.04em] m-0 text-fontTertiary mt-1 mb-8">
        <span className="">Launch fast</span> without looking early
      </h2>

      <div className="flex-1  mx-auto bg-backgroundSecondary text-white flex justify-between items-center relative shadow-sm border border-border rounded-2xl w-full text-base leading-6 font-inter bg-[url('/image.png')] bg-contain">
        {/* First Column */}
        <div className="flex flex-col flex-1 justify-start items-start relative border-r border-border">
          {/* First Card */}
          <div className="flex flex-col justify-between items-start w-full  border-b border-border p-8">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon1 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Look 10x bigger
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                Polished, professional design that makes you look like a serious
                company — even if it&apos;s just you and a cofounder.
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="flex flex-col justify-between items-start w-full  p-8">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon2 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Thoughtful design
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                Simple, sharp, and user-focused. Every decision is made with
                your customer and conversion in mind.
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col flex-1 justify-start items-start relative border-r border-border">
          {/* Third Card */}
          <div className="flex flex-col justify-between items-start w-full  border-b border-border p-8">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon3 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Transparent pricing
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                Clear pricing upfront, with fixed-scope projects so you know
                exactly what you&apos;re paying for.
              </div>
            </div>
          </div>

          {/* Fourth Card */}
          <div className="flex flex-col justify-between items-start w-full  p-8 relative">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon4 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Industry experience
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                I run — one of the largest SaaS design galleries online. I know
                what makes a great SaaS site.
              </div>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col flex-1 justify-start items-start relative">
          {/* Fifth Card */}
          <div className="flex flex-col justify-between items-start w-full  border-b border-border p-8 relative">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon5 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Fast turnarounds
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                Webflow keeps things lean. Most projects ship in 3–4 weeks, with
                a tight process and no wasted time.
              </div>
            </div>
          </div>

          {/* Sixth Card */}
          <div className="flex flex-col justify-between items-start w-full  p-8">
            <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
              <div className="w-8 h-8">
                <Icon6 className="text-fontTertiary" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-fontTertiary">
              <h3 className="text-3xl leading-tight font-medium tracking-tight">
                Satisfaction guaranteed
              </h3>
              <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
                Start with a 1-week paid trial. Low commitment, no risk. Only
                continue if you&apos;re happy.
              </div>
            </div>
          </div>
        </div>

        {/* Corner dots */}
        <div className={`absolute top-4 left-4 w-2 h-2 ${cornerDots}`}></div>
        <div className={`absolute top-4 right-4 w-2 h-2 ${cornerDots}`}></div>
        <div className={`absolute bottom-4 left-4 w-2 h-2 ${cornerDots}`}></div>
        <div
          className={`absolute bottom-4 right-4 w-2 h-2 ${cornerDots}`}
        ></div>
      </div>
    </div>
  );
};

export default BenefitsNew;
