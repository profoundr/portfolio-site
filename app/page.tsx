import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen p-24">
      <div className="flex w-full max-w-screen-xl">
        <div className="w-1/2 flex flex-col justify-center">
          <span className="text-large">Hey welcome to [name]</span>
          <span className="text-large">
            I am a freelance software developer
          </span>
          <span className="text-small">
            My name is [], I am a web developer who makes web apps leveraging
            AI.
          </span>
          <div className="relative mt-4">
            <span className="absolute bg-white  top-[-8px] left-4 text-[12px] px-1">
              Techstack
            </span>
            <div className="border-[1.5px] border-[#2f2f2f] rounded-lg grid grid-cols-5 p-4 justify-items-center items-end">
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
            </div>
          </div>
          <div className="relative mt-4">
            <span className="absolute bg-white  top-[-8px] left-4 text-[12px] px-1">
              AI Techstack
            </span>
            <div className="border-[1.5px] border-[#2f2f2f] rounded-lg grid grid-cols-4 p-4 justify-items-center items-end">
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
          </div>
          <button className="mt-4 bg-[#2f2f2f] text-white py-4 px-4 rounded-lg">
            Let&apos;s connect
          </button>
        </div>
        <div className="w-1/2 flex items-center">
          <span>yo</span>
        </div>
      </div>
    </main>
  );
}
