import Image from "next/image";
import Link from "next/link";
import React from "react";

// Dummy SVG icons
const DummyIcon1 = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#ccc" />
  </svg>
);
const DummyIcon2 = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" fill="#ccc" />
  </svg>
);

const Hero = () => {
  return (
    <div className="w-full mx-auto relative bg-background text-fontPrimary text-base leading-6 font-interTight  pt-[137px]">
      <div className="w-full relative">
        <div className=" px-16 pb-12 flex flex-row items-center max-w-screen-2xl mx-auto">
          <div className="flex flex-col justify-between items-start pb-40 relative flex-[0_0_758px]">
            {/* Hidden row: Webflow + icon + design (display: none) */}
            {/* Main headline */}
            <h1 className="text-[76px] font-bold leading-[76px] tracking-[-0.04em] m-0">
              <span className="">Launch fast</span> without looking early
            </h1>
            <p className="opacity-65 text-[18px] font-normal mt-10 font-interTight  max-w-[450px]">
              Two Hands exists to make small teams look like big deals, without
              the bloated agency fees.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {/* Get started button (display: block) */}
              <Link
                href="/get-started"
                className="bg-fontPrimary rounded-lg py-4 px-6 text-fontSecondary text-[18px] block no-underline font-medium"
              >
                Get started
              </Link>
              {/* View work button (display: block) */}
              <Link
                href="/feed"
                className="bg-white rounded-lg py-4 px-6 text-fontPrimary text-[18px] block no-underline font-medium"
              >
                View work →
              </Link>
            </div>
          </div>
          <Image
            className="w-full max-w-[650px]"
            src="/test-image.png"
            alt="hero"
            width={1246}
            height={1246}
          />
        </div>
      </div>
      {/* Decorative images at the bottom left/right */}
      {/* <svg
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
      </svg> */}
    </div>
  );
};

export default Hero;
