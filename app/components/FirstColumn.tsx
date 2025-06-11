import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense } from "react";
const ASCIIText = dynamic(() => import("@/components/ascii-text"), {
  ssr: false,
});

export default function FirstColumn() {
  return (
    <div className="flex flex-col col-span-8 ml-0 pl-20 pb-20 mt-auto text-white relative">
      {/* <div className="absolute top-0 left-0 w-full h-full">
        <ASCIIText
          text="Hey!"
          enableWaves={true}
          asciiFontSize={8}
          textFontSize={20}
        />
      </div> */}

      <span className="text-[60px] lg:text-[10vh] leading-[95px] font-light">
        Where Creativity Meets Code
      </span>
      {/* <span className="text-large">I am a freelance software developer</span> */}
      <span className="text-small pt-5">
        My name is [], I am a web developer who makes web apps leveraging AI.
      </span>
      <div className="relative mt-4">
        {/* <span className="absolute bg-transparent  top-[-8px] left-4 text-[12px] px-1">
          Techstack
        </span>
        <div className="border-[1.5px] border-white rounded-lg grid grid-cols-5 p-4 justify-items-center items-end">
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/nextjs.svg"
              width={60}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Next.JS</span>
          </div>
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/Remix.svg"
              width={50}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Remix</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <Image
              src="/SVGs/TailwindCSS.svg"
              width={70}
              height={40}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Tailwind CSS</span>
          </div>{" "}
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/shopify.svg"
              width={50}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Shopify</span>
          </div>{" "}
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/DirectusCMS.svg"
              width={70}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Directus CMS</span>
          </div>
        </div> */}
      </div>
      {/* <div className="relative mt-4">
        <span className="absolute  top-[-8px] left-4 text-[12px] px-1">
          AI Techstack
        </span>
        <div className="border-[1.5px] border-white rounded-lg grid grid-cols-4 p-4 justify-items-center items-end">
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/Copilot.svg"
              width={60}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Github CoPilot</span>
          </div>
          <div className="w-fit flex flex-col items-center gap-2">
            <Image
              src="/SVGs/OpenAI.svg"
              width={60}
              height={40}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Chat GPT</span>
          </div>{" "}
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/shopify.svg"
              width={50}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Shopify</span>
          </div>{" "}
          <div className="w-fit flex flex-col items-center justify-between">
            <Image
              src="/SVGs/DirectusCMS.svg"
              width={70}
              height={50}
              alt="Next.js"
              className="mb-2"
            />
            <span className="text-[12px] mx-auto">Directus CMS</span>
          </div>
        </div>
      </div> */}
      <button className="mt-4 bg-[#756f6f] text-white py-12 px-4 rounded-lg">
        Let&apos;s connect
      </button>
    </div>
  );
}
