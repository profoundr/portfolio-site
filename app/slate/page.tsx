import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <Work />
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full bg-white">
      <div className="w-full bg-white max-w-screen-2xl mx-auto  py-20 px-4 sm:px-8 md:px-16 text-black">
        <h1 className="text-[124px] leading-[130px]  font-medium pl-10 font-interTight">
          Independent <br />
          Product Designer{" "}
        </h1>
        <p className="opacity-65 text-xl font-medium mt-10 font-interTight leading-tight tracking-tight  max-w-[750px] pl-10">
          Hey, I’m Victor, an Independent Product Designer delivering top-tier
          Websites, SaaS, Mobile experiences, and good vibes for almost two
          decades.
        </p>
      </div>
    </div>
  );
}

function Work() {
  return (
    <div className="relative bg-white">
      <div className="w-full bg-white max-w-screen-2xl mx-auto  text-black">
        <div className="grid grid-cols-3 gap-[60px_30px]">
          <div className=" col-span-2 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
          <div className=" col-span-1 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>

          <div className=" col-span-1 flex flex-col gap-3 mt-auto">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
          <div className=" col-span-2 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
          <div className=" col-span-1 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
          <div className=" col-span-1 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
          <div className=" col-span-1 flex flex-col gap-3">
            <h2 className="text-4xl font-medium flex flex-row  items-center justify-start gap-6">
              <span className="text-base font-semibold tracking-[0px] text-fontPrimary scale-x-105">
                Aesthetic
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                POSTERS
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                |
              </span>
              <span className="text-fontTertiary text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                08
              </span>
            </h2>
            <Image
              src="https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp"
              alt="work"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
