"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ArrowLeft } from "lucide-react";

export default function Work() {
  const [active, setActive] = useState<(typeof workItems)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="relative bg-slateBg pb-14 lg:pb-24">
      <div className="w-full bg-slateBg max-w-screen-2xl mx-auto text-slateText">
        {/* Overlay background */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        {/* Expanded dialog */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 z-[1000]">
              {/* Close button */}
              <motion.button
                key={`button-${active.id}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex fixed lg:absolute top-6 right-6 items-center justify-center ${active.backgroundColor} ${active.textColor} rounded-full h-10 w-10 z-50`}
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              {/* Dialog content */}
              <motion.div
                layoutId={`card-${active.id}-${id}`}
                ref={ref}
                className={`w-full h-full  ${active.backgroundColor}`}
              >
                <div className="w-full h-full mx-auto flex flex-col-reverse lg:flex-row overflow-y-scroll lg:overflow-hidden gap-14 items-center lg:justify-end">
                  {/* Left side - Content */}
                  <div className="w-full h-full lg:overflow-y-scroll hide-scrollbar flex flex-col items-center lg:items-end justify-start">
                    <div
                      className={`w-full max-w-screen lg:max-w-[750px] flex flex-col justify-center pb-20 lg:py-20 ${active.textColor} my-auto`}
                    >
                      <motion.div
                        layoutId={`category-${active.id}-${id}`}
                        className="h-fit items-center py-5 border-b border-slateText px-5 lg:px-12 hidden lg:flex gap-6"
                      >
                        <span className="text-base font-semibold tracking-[0px] scale-x-105">
                          {active.category}
                        </span>
                        <div className="flex flex-row gap-4">
                          <span className="text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                            {active.type}
                          </span>
                          <span className="text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                            |
                          </span>
                          <span className="text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                            {active.number}
                          </span>
                        </div>
                      </motion.div>
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 justify-items-start lg:mt-20 px-5 lg:px-12 py-3 border-b border-slateText"
                      >
                        <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                          Client
                        </span>
                        <span className=" text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                          {active.client}
                        </span>
                      </motion.div>
                      {active.previewLink && active.clientHref && (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="grid grid-cols-2 items-center justify-items-start px-5 lg:px-12 py-3 border-b border-opacity-60 border-slateText"
                        >
                          <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                            {" "}
                            Preview Link
                          </span>
                          <a
                            href={active.clientHref}
                            target="_blank"
                            className=" text-[12px] font-medium tracking-tight scale-x-[1.15] uppercase underline"
                          >
                            {active.previewLink}
                          </a>
                        </motion.div>
                      )}
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 justify-items-start px-5 lg:px-12 py-3 border-b border-slateText"
                      >
                        <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                          Technologies
                        </span>
                        <span className=" text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15] flex flex-col gap-1 uppercase">
                          {active.technologies.map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </span>
                      </motion.div>
                      {active.details.length > 0 && (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="grid grid-cols-2 justify-items-start px-5 lg:px-12 py-5 border-b border-slateText"
                        >
                          <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                            {" "}
                            Details
                          </span>
                          <ul className="text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15] list-disc pl-4">
                            {active.details.map((detail) => (
                              <li key={detail} className="mb-1">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 px-5 lg:px-12 py-5"
                      >
                        <p className="opacity-80 text-xl font-medium mt-10 font-interTight leading-[28px] tracking-tight">
                          {active.description}
                        </p>
                      </motion.div>
                      <motion.div
                        key={`button-${active.id}-${id}`}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center justify-center rounded-full h-12 w-12 z-50 ml-5 lg:ml-12 mt-16`}
                        onClick={() => setActive(null)}
                      >
                        <ArrowLeft
                          className={`w-10 h-10 hover:scale-110 transition-all duration-300`}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="w-full h-full lg:max-w-[50vw]">
                    <motion.div
                      layoutId={`image-${active.id}-${id}`}
                      className="h-full"
                    >
                      <Image
                        width={4000}
                        height={4000}
                        src={active.image}
                        alt={active.category}
                        className="w-full h-full object-cover scale-105"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid of work items */}
        <div
          id="work"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px_15px] px-5"
        >
          {workItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}-${id}`}
              onClick={() => setActive(item)}
              className={`flex flex-col gap-3 cursor-pointer overflow-clip ${
                item.span === 2 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <motion.h2
                layoutId={`title-${item.id}-${id}`}
                className="text-4xl font-medium flex flex-row items-center justify-start gap-6 ml-1"
              >
                <span className="text-base font-semibold tracking-[0px] text-slateGray scale-x-105">
                  {item.category}
                </span>
                <span className="text-slateGray text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                  {item.type}
                </span>
                <span className="text-slateGray text-[12px] font-medium tracking-tight opacity-60 rotate-[50deg]">
                  |
                </span>
                <span className="text-slateGray text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                  {item.number}
                </span>
              </motion.h2>
              <motion.div
                className="overflow-clip"
                layoutId={`image-${item.id}-${id}`}
              >
                <Image
                  src={item.image}
                  alt={item.category}
                  width={4000}
                  height={4000}
                  className="w-full h-auto hover:scale-105 transition-all duration-300"
                  // className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const workItems = [
  {
    id: 1,
    category: "Neat Method",
    type: "E COMMERCE",
    number: "01",
    span: 2,
    image: "/portfolio-images/image_1.png",
    description:
      "Neat Method is a luxury home organizing brand with 50+ franchise locations across the U.S. and over $6M in annual revenue. Contributed to their Shopify Hydrogen storefront with clean, maintainable code and pixel-perfect implementation of high-fidelity designs.",
    details: [
      "Migrated storefront from Liquid to Hydrogen (Remix)",
      "Developed advanced product filtering system",
      "Maintained and optimized storefront performance",
      "Built custom sales pages and dynamic landing pages",
      "Integrated seamlessly with Shopify backend",
    ],
    technologies: ["Shopfiy Hydrogen", "Remix", "Tailwind CSS"],
    backgroundColor: "bg-[#EBE8E2]",
    textColor: "text-slateText",
    previewLink: "neatmethod.com",
    clientHref: "https://neatmethod.com",
    client: "Freelance",
  },
  {
    id: 2,
    category: "Dbrief",
    type: "SAAS",
    number: "02",
    span: 1,
    image: "/portfolio-images/image_3.png",
    description:
      "Dbrief is an app built by journalists for journalists to streamline interviews with subject matter experts (SMEs). It allows sending interactive, AI-powered interviews, tracking progress in real time, and communicating with SMEs to request edits or clarifications — all in one seamless workflow.",
    details: [
      "Developed full-stack architecture including frontend, backend, and Supabase integration",
      "Implemented AI-powered content correction and follow-up question generation system",
      "Handled secure, server-side processing without public APIs",
      "Ensured clean UX for both interviewers and contributors",
    ],
    technologies: ["React.js", "Supabase", "OpenAI API", "Tailwind CSS"],
    backgroundColor: "bg-[#CAE2D5]",
    textColor: "text-slateText",
    previewLink: "dbrief.com",
    clientHref: "https://dbrief.com",
    client: "Freelance",
  },
  {
    id: 3,
    category: "Women's First Medical Spa",
    type: "HEALTHCARE WEBSITE",
    number: "03",
    span: 1,
    image: "/portfolio-images/image_4.png",
    description:
      "Women's First Medical Spa is a health and wellness clinic offering a range of cosmetic and medical services. Originally built on WordPress, the site was fully rebuilt using modern technologies for better performance, maintainability, and pixel-perfect design fidelity.",
    details: [
      "Rebuilt entire website from WordPress to Next.js and Tailwind CSS",
      "Used Directus CMS for content management",
      "Converted the original design pixel-to-pixel for consistent visual fidelity",
      "Improved performance, accessibility, and maintainability of the codebase",
      "Structured reusable components for scalable frontend development",
      "Ensured responsive, mobile-friendly layouts across all pages",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Directus CMS", "Shadcn UI"],
    backgroundColor: "bg-[#E8D8D7]",
    textColor: "text-[#7D3A3E]",
    previewLink: "womensfirstmedicalspa.com",
    clientHref: "https://womensfirstmedicalspa.com",
    client: "Freelance",
  },
  {
    id: 4,
    category: "Together Women's Health",
    type: "HEALTHCARE WEBSITE",
    number: "04",
    span: 2,
    image: "/portfolio-images/image_2.png",
    description:
      "Together Women's Health (TWH) is a healthcare organization with 20+ women's health practices across the U.S., generating $10 – $20M in annual revenue. The original site was built with Plasmic and was fully rebuilt using Next.js for improved performance, scalability, and developer control.",
    details: [
      "Migrated the entire website from Plasmic to a custom-built Next.js application",
      "Built dynamic, data-driven pages that fetch and render content from Directus",
      "Integrated Directus as a headless CMS to manage all content and images",
      "Improved site performance, SEO, and maintainability by removing page-builder dependencies",
      "Structured scalable, reusable React components for long-term growth",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Directus"],
    backgroundColor: "bg-[#C9D4FB]",
    textColor: "text-[#2E3550]",
    previewLink: "togetherwomenshealth.com",
    clientHref: "https://togetherwomenshealth.com",
    client: "Freelance",
  },
  {
    id: 5,
    category: "Together Women's Health Imaging Center",
    type: "WEBSITE",
    number: "05",
    span: 1,
    image: "/portfolio-images/image_5.png",
    description:
      "Together Women’s Health Imaging Center is a new franchise under the TWH organization, offering specialized imaging services for women’s health. The website was built using Plasmic, with dynamic content managed through Directus CMS for scalable, flexible content delivery.",
    details: [
      "Built the full website in Plasmic with responsive, brand-consistent design",
      "Integrated Directus CMS to manage service-specific content and images",
      "Implemented multi-domain support with dynamic theming and content loading, enabling scalable deployment from a single codebase and Plasmic project",
      "Ensured pixel-perfect implementation aligned with brand standards",
    ],
    technologies: ["Plasmic", "Directus", "Javascript", "CSS"],
    backgroundColor: "bg-[#9CA0AD]",
    textColor: "text-slateText",
    previewLink: "togetherwomenshealthimagingcenter.com",
    clientHref: "https://togetherwomenshealthimagingcenter.com",
    client: "Freelance",
  },
  {
    id: 6,
    category: "TWH Map",
    type: "CUSTOM MAP",
    number: "06",
    span: 1,
    image: "/portfolio-images/image_7.png",
    description:
      "The Together Women’s Health Map is a custom React application embedded across multiple TWH websites to help users find the right clinic or doctor. It features advanced filtering by location, specialty, and distance, while dynamically adapting to each site’s branding and domain context. Built for reusability, it powers the location search experience across the entire TWH ecosystem.",
    details: [
      "Developed a reusable React map application embedded across multiple TWH sites",
      "Implemented advanced filters for doctor type, state/city, and distance radius",
      "Integrated Algolia search to enable fast, typo-tolerant search for doctors and locations",
      "Integrated with dynamic location data from a centralized backend or CMS",
      "Adapted theming and data based on each site’s domain and configuration",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Directus", "Algolia"],
    backgroundColor: "bg-[#E1E1E1]",
    textColor: "text-slateText",
    previewLink: "togetherwomenshealth.com/locations",
    clientHref: "https://togetherwomenshealth.com/locations/michigan",
    client: "Freelance",
  },
  {
    id: 7,
    category: "Pluto Misfits",
    type: "Dashboard",
    number: "07",
    span: 1,
    image: "/portfolio-images/image_6.png",
    description:
      "The Pluto Misfits Campaign Dashboard was built to support a web3 marketing campaign where users completed social tasks (like following Pluto’s X profile) to earn points. These points could then be redeemed for Pluto NFTs. The dashboard enabled smooth onboarding, task tracking, and point accumulation, helping drive engagement and community growth.",
    details: [
      "Built the frontend UI for the dashboard using NextJS and Tailwind CSS",
      "Implemented authentication flow for secure user access and session handling",
      "Created interfaces for task completion tracking and point system visibility",
      "Ensured responsive, user-friendly design for both desktop and mobile",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Next Auth", "Shadcn UI"],
    backgroundColor: "bg-[#C3FFE8]",
    textColor: "text-slateText",
    client: "Pluto",
  },
];
