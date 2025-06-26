"use client";
import {
  DirectusCMS,
  NextJS,
  Remix,
  Shopify,
  TailwindCSS,
  ShopifyHydrogen,
  Supabase,
  GraphQL,
  Algolia,
  Vercel,
  Netlify,
  GoogleCloud,
  VSCode,
  Figma,
  Postman,
  GitHub,
} from "@/components/SVGs/icons";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

export default function AboutPage() {
  return (
    <div className="w-full">
      <About />
      <Mission />
      <Techstack />
      {/* <div className="flex flex-col gap-10">
          <div className="overflow-hidden">
            <h2 className="text-[50px] md:text-[65px] lg:text-[85px] leading-none font-medium lg:pl-10 font-interTight mt-20 opacity-0 animate-[slideUpBlur_0.5s_ease-out_2s_forwards]">
              Mission
            </h2>
          </div>
          <div className="opacity-0 text-xl font-medium font-interTight leading-[28px] tracking-tight lg:max-w-[750px] lg:pl-10 animate-[fadeIn65_0.5s_ease-out_2.5s_forwards] space-y-6">
            <p>
              Building sites with templates, no-code tools, or AI builders can
              work—until they don&apos;t.
            </p>

            <p>
              They&apos;re fast and cheap, but rarely scalable, hard to
              maintain, and make it nearly impossible to stand out. You end up
              with something generic, bloated, and rigid.
            </p>

            <p className="text-2xl font-semibold">
              The mission here is different.
            </p>

            <p>
              The goal is to leverage modern tech—including AI—without
              compromising quality. That means custom, high-performance web
              products that drive sales, convert better, and give startups a
              solid foundation to grow from MVP to scale.
            </p>

            <div className="space-y-4">
              <p className="text-2xl font-semibold">The process is:</p>

              <ul className="space-y-3 pl-6 list-disc">
                <li className="text-xl font-semibold text-white marker:text-white">
                  Fast, but never rushed
                </li>

                <li className="text-xl font-semibold text-white marker:text-white">
                  Clean, but never cookie-cutter
                </li>

                <li className="text-xl font-semibold text-white marker:text-white">
                  Engineered to last, not duct-taped for demo day
                </li>
              </ul>
            </div>

            <p className="text-2xl font-semibold">
              If you&apos;re building something that needs to look sharp, work
              fast, and stay flexible—you&apos;re in the right place.
            </p>
          </div>
        </div> */}
    </div>
  );
}

function About() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-screen-2xl mx-auto  py-10 lg:py-20 px-5 lg:px-16 text-slateText bg-slateBg">
      <div>
        <div className="overflow-hidden">
          <h1 className="text-[60px] md:text-[80px] lg:text-[124px] leading-[60px] md:leading-[80px] lg:leading-[130px]  font-medium lg:pl-10 font-interTight opacity-0 animate-[slideUpBlur_0.5s_ease-out_1s_forwards]">
            About
          </h1>
        </div>
        <p className="text-base lg:text-xl font-medium mt-10 font-interTight !leading-relaxed tracking-wide  lg:max-w-[750px] lg:pl-10 animate-[fadeIn65_0.5s_ease-out_1.5s_forwards] opacity-0">
          With 4 years of hands-on experience building full-stack web products,
          I specialize in crafting performant, maintainable
          applications—primarily with Next.js. I&apos;ve worked on projects
          leveraging Google Cloud Platform, Remix, and other modern stacks, and
          I&apos;m always quick to get up to speed with new tech. Whether
          it&apos;s frontend or backend, my focus is on writing clean,
          understandable code that scales with teams and timelines.
        </p>
      </div>
      <div className="">
        <Image
          src="/test-image.png"
          alt="About"
          width={500}
          height={500}
          className="animate-[fadeIn_0.5s_ease-out_1.5s_forwards] opacity-0"
        />
      </div>
    </div>
  );
}

function Techstack() {
  // Intersection observer for the Techstack section
  const [techstackRef, techstackInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={techstackRef}
      className={`w-full max-w-screen-2xl mx-auto flex flex-col gap-10 transition-all duration-300 py-10 lg:py-20 px-5 text-slateText bg-slateBg ${
        techstackInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <h2
        className={`text-[50px] md:text-[65px] lg:text-[85px] leading-[90px] font-medium lg:pl-10 font-interTight mt-20 opacity-0 animate-[slideUpBlur_0.5s_ease-out_3s_forwards] `}
      >
        Techstack
      </h2>

      <div
        className={`flex flex-col lg:flex-row gap-10 w-full transition-all duration-300 ${
          techstackInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* Frontend */}
        <div className="border border-border rounded-lg grid grid-cols-4 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
          <div className="w-fit flex flex-col items-center justify-between">
            <NextJS className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Next.js</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <Remix className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Remix</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <ShopifyHydrogen className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Shopify Hydrogen</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <TailwindCSS className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Tailwind CSS</span>
          </div>
          <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
            Frontend
          </div>
        </div>

        {/* Backend / Data */}
        <div className="border border-border rounded-lg grid grid-cols-4 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
          <div className="w-fit flex flex-col items-center justify-between">
            <Supabase className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Supabase</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <DirectusCMS className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Directus</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <GraphQL className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">GraphQL</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <Algolia className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Algolia</span>
          </div>
          <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
            Backend / Data
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row gap-10 w-full transition-all duration-300 delay-600 ${
          techstackInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* Cloud & Hosting */}
        <div className="border border-border rounded-lg grid grid-cols-3 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
          <div className="w-fit flex flex-col items-center justify-between">
            <Vercel className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Vercel</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <Netlify className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Netlify</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <GoogleCloud className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Google Cloud</span>
          </div>
          <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
            Cloud & Hosting
          </div>
        </div>

        {/* Tools */}
        <div className="border border-border rounded-lg grid grid-cols-4 p-2 md:px-4 md:pt-4 md:pb-3 justify-items-center items-end relative w-full">
          <div className="w-fit flex flex-col items-center justify-between">
            <GitHub className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">GitHub</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <VSCode className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">VS Code</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <Figma className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Figma</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <Postman className="mb-2 md:w-14 md:h-14 w-8 h-8 text-slateGray" />
            <span className="text-[12px] mx-auto">Postman</span>
          </div>
          <div className="bg-white text-[13px] text-stateText leading-none h-fit position absolute top-[-6.5px] left-4 px-1">
            Tools
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission() {
  const [missionRef, missionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  return (
    <div className="w-full text-slateBg relative">
      <div
        ref={missionRef}
        className="absolute inset-0 z-[10] pointer-events-none"
      >
        <div
          className={`w-full h-full bg-slateText ${
            missionInView
              ? "lg:animate-[radialBloomKeyDelay_3.5s_ease-in-out__forwards] animate-[radialBloomKey_2s_ease-in-out__forwards]"
              : ""
          }`}
          style={{}}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-10 w-full max-w-screen-2xl mx-auto py-10 px-5 z-[1000] relative">
        <div className="overflow-hidden">
          <h2 className="text-[50px] md:text-[65px] lg:text-[85px] leading-none font-medium font-interTight mt-20 opacity-0 animate-[slideUpBlur_0.5s_ease-out_2s_forwards]">
            Mission
          </h2>
        </div>
        <div className="w-full opacity-0 text-base lg:text-xl font-medium mt-10 font-interTight !leading-normal tracking-wide animate-[fadeIn_0.5s_ease-out_2.5s_forwards] space-y-6 text-center">
          <div>
            <span className="opacity-65">
              Building sites with templates, no-code tools, or AI builders can
              work
            </span>
            <span className="opacity-100 text-slatebg">
              {" "}
              — until they don&apos;t.
            </span>
            <p className="opacity-65">
              They&apos;re fast and cheap, but rarely scalable, hard to
              maintain, and make it nearly impossible to stand out. You end up
              with something generic, bloated, and rigid.
            </p>
          </div>

          <div className="flex lg:flex-row flex-col text-start mx-auto ">
            <div className="flex flex-col gap-10">
              <p className="text-2xl font-semibold">
                The mission here is different.
              </p>

              <p className="opacity-65">
                The goal is to leverage modern tech—including AI—without
                compromising quality. That means custom, high-performance web
                products that drive sales, convert better, and give startups a
                solid foundation to grow from MVP to scale.
              </p>

              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-2xl font-semibold">The process is:</p>

                  <ul className="space-y-3 pl-6 list-disc opacity-65">
                    <li className="text-xl font-semibold text-white marker:text-white">
                      Fast, but never rushed
                    </li>

                    <li className="text-xl font-semibold text-white marker:text-white">
                      Clean, but never cookie-cutter
                    </li>

                    <li className="text-xl font-semibold text-white marker:text-white">
                      Engineered to last, not duct-taped for demo day
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-2xl font-semibold">
                If you&apos;re building something that needs to look sharp, work
                fast, and stay flexible—you&apos;re in the right place.
              </p>
            </div>
            <div className="w-full h-full object-cover max-w-[500px] max-h-[500px] overflow-clip">
              <Image
                src="/mission.png"
                className="w-full h-full object-cover scale-[1.12]"
                alt="Mission"
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
