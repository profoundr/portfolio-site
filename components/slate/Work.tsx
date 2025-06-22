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
    <div className="relative bg-slateBg">
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
            <div className="fixed inset-0 z-[100]">
              {/* Close button */}
              <motion.button
                key={`button-${active.id}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex fixed lg:absolute top-6 right-6 items-center justify-center ${active.backgroundColor} ${active.textColor} rounded-full h-10 w-10 z-50 shadow-lg`}
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
                        className="h-fit flex-col items-start py-5 border-b border-border px-5 lg:px-12 gap-1 hidden lg:flex"
                      >
                        <span className="text-base font-semibold tracking-[0px]  scale-x-105 h-[20px]">
                          {active.category}
                        </span>
                        <div className="flex flex-row gap-4 h-[12px]">
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
                        className="grid grid-cols-2 justify-items-start lg:mt-20 px-5 lg:px-12 py-3 border-b border-border"
                      >
                        <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                          Client
                        </span>
                        <span className=" text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                          {active.client}
                        </span>
                      </motion.div>
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 items-center justify-items-start px-5 lg:px-12 py-3 border-b border-opacity-60 border-border"
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
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 justify-items-start px-5 lg:px-12 py-3 border-b border-border"
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
                          className="grid grid-cols-2 justify-items-start px-5 lg:px-12 py-5 border-b border-border"
                        >
                          <span className="text-base font-semibold tracking-[0px]  scale-x-105">
                            {" "}
                            Details
                          </span>
                          <span className=" text-[12px] font-medium tracking-tight opacity-60 scale-x-[1.15]">
                            {" "}
                            {active.details.map((detail) => (
                              <span key={detail}>
                                • {detail} <br />
                              </span>
                            ))}
                          </span>
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
                        priority
                        width={1200}
                        height={1200}
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid of work items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px_30px] px-5">
          {workItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}-${id}`}
              onClick={() => setActive(item)}
              className={`flex flex-col gap-3 cursor-pointer ${
                item.span === 2 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <motion.h2
                layoutId={`title-${item.id}-${id}`}
                className="text-4xl font-medium flex flex-row items-center justify-start gap-6"
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
              <motion.div layoutId={`image-${item.id}-${id}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={2000}
                  height={2000}
                  className="w-full h-auto"
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
    title: "Aesthetic Posters Collection",
    category: "Aesthetic",
    type: "POSTERS",
    number: "08",
    span: 2,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "A comprehensive collection of minimalist aesthetic posters that explore the intersection of typography, color theory, and visual hierarchy. Each piece is carefully crafted to evoke specific emotions and create memorable visual experiences.",
    details: [
      "Designed 12 unique poster variations",
      "Explored 6 different color palettes",
      "Created custom typography treatments",
      "Developed brand guidelines for consistency",
    ],
    technologies: [
      "Adobe Illustrator",
      "Photoshop",
      "Typography",
      "Color Theory",
      "Grid Systems",
    ],
    backgroundColor: "bg-slateBg",
    textColor: "text-slateText",
    previewLink: "togetherwomenshealth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
  {
    id: 2,
    title: "Digital Art Series",
    category: "Digital",
    type: "ART",
    number: "12",
    span: 1,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "A series of digital artworks that push the boundaries of contemporary design. Each piece combines traditional artistic principles with modern digital techniques to create compelling visual narratives.",
    details: [
      "Created 8 original digital artworks",
      "Experimented with various digital painting techniques",
      "Developed custom brush sets",
      "Established consistent visual language",
    ],
    technologies: [
      "Procreate",
      "Adobe Photoshop",
      "Digital Painting",
      "Composition",
      "Color Grading",
    ],
    backgroundColor: "bg-blue-50",
    textColor: "text-blue-900",
    previewLink: "togeth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
  {
    id: 3,
    title: "Brand Identity Package",
    category: "Brand",
    type: "IDENTITY",
    number: "05",
    span: 1,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "Complete brand identity package including logo design, color palette, typography system, and brand guidelines. This project demonstrates the power of cohesive visual communication.",
    details: [
      "Designed primary and secondary logos",
      "Created comprehensive brand guidelines",
      "Developed color palette and typography system",
      "Produced brand application examples",
    ],
    technologies: [
      "Logo Design",
      "Brand Strategy",
      "Typography",
      "Color Theory",
      "Adobe Creative Suite",
    ],
    backgroundColor: "bg-green-50",
    textColor: "text-green-900",
    previewLink: "togeth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
  {
    id: 4,
    title: "Web Design Portfolio",
    category: "Web",
    type: "DESIGN",
    number: "15",
    span: 2,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "Modern web design portfolio showcasing responsive design principles and user experience best practices. The design emphasizes clean aesthetics and intuitive navigation.",
    details: [
      "Designed responsive layouts for all devices",
      "Created interactive prototypes",
      "Optimized for accessibility standards",
      "Implemented modern design patterns",
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Responsive Design",
      "UX/UI",
      "Prototyping",
    ],
    backgroundColor: "bg-purple-50",
    textColor: "text-purple-900",
    previewLink: "togeth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
  {
    id: 5,
    title: "Photography Collection",
    category: "Photo",
    type: "GRAPHY",
    number: "22",
    span: 1,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "Curated photography collection featuring architectural photography and urban landscapes. Each image captures the essence of modern city life through careful composition and lighting.",
    details: [
      "Shot 50+ architectural photographs",
      "Edited and color graded all images",
      "Created series of urban landscapes",
      "Developed consistent editing style",
    ],
    technologies: [
      "Photography",
      "Lightroom",
      "Composition",
      "Color Grading",
      "Architecture",
    ],
    backgroundColor: "bg-orange-50",
    textColor: "text-orange-900",
    previewLink: "togeth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
  {
    id: 6,
    title: "Illustration Series",
    category: "Illustration",
    type: "SERIES",
    number: "18",
    span: 1,
    image:
      "https://storage.googleapis.com/studio-design-asset-files/projects/p6aow1GEaR/s-1800x1800_v-frms_webp_7af8a4f1-106e-45b7-9501-0210a260909d_middle.webp",
    description:
      "Hand-drawn illustration series exploring themes of nature and human connection. Each illustration tells a unique story through detailed line work and thoughtful composition.",
    details: [
      "Created 10 hand-drawn illustrations",
      "Developed consistent illustration style",
      "Explored various drawing techniques",
      "Established visual storytelling approach",
    ],
    technologies: [
      "Hand Drawing",
      "Illustration",
      "Composition",
      "Storytelling",
      "Traditional Media",
    ],
    backgroundColor: "bg-pink-50",
    textColor: "text-pink-900",
    previewLink: "togeth.com",
    clientHref: "https://togeth.com",
    client: "TWH",
  },
];
