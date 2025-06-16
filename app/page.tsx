"use client";

import React, { useState, useId, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
// Removed: import type { SlideData } from "@/components/GSAPCarousel";
import { VerticalCarousel } from "@/components/verticalCarousel";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";
import { BackgroundBeams } from "@/components/ui/backgrounds/fade-lines";
import { AuroraBackground } from "@/components/ui/backgrounds/aurora";
import { SlidesData } from "@/data/portfolio-data";
import FirstColumn from "../components/FirstColumn";

// Define the structure of SlidesData items for clarity in mapping

// Types matching GSAPComp2's internal SlideData and ContentData interfaces
interface MappedSlideData {
  id: string;
  imageUrl: string;
  sideText: string;
  number: number;
  title: string;
  subtitle: string;
}

interface MappedContentData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  text: string;
}

const mappedSlides: MappedSlideData[] = SlidesData.map((item) => ({
  id: `s${item.id}`,
  imageUrl: item.image,
  sideText: item.sideText,
  number: parseInt(item.number, 10),
  title: item.title,
  subtitle: item.detailedContent.subtitle,
}));

const mappedContent: MappedContentData[] = SlidesData.map((item) => ({
  id: `c${item.id}`,
  number: parseInt(item.number, 10),
  title: item.title,
  subtitle: item.detailedContent.subtitle,
  text: item.detailedContent.mainText,
}));

export default function TestCarouselPage() {
  const [active, setActive] = useState<(typeof SlidesData)[number] | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const simulation = new WebGLFluidEnhanced(containerRef.current);

      // Color palette from user
      const colorPalette = ["#2f2f2f"];

      // Configure the simulation with the provided config
      // simulation.setConfig({
      //   dyeResolution: 250,
      //   densityDissipation: 0.5,
      //   velocityDissipation: 0,
      //   backgroundColor: "#000000",
      //   pressure: 0.5,
      //   curl: 5,
      //   colorPalette,
      //   hover: false,
      //   transparent: false,
      //   bloom: false,
      //   bloomIterations: 88,
      // });

      simulation.setConfig({
        colorPalette,
        backgroundColor: "#000000",
        simResolution: 250,
        splatForce: 1000,
        inverted: true,
        hover: false,
        brightness: 0.3,
      });

      simulation.start();

      // Function to create a random splat
      const randomSplat = () => {
        // const x = Math.random() * window.innerWidth;
        // const y = Math.random() * window.innerHeight;
        // const color =
        //   colorPalette[Math.floor(Math.random() * colorPalette.length)];
        // simulation.splatAtLocation(x, y, 12, 12, color);
        simulation.multipleSplats(20);
      };

      // Add a few initial splats
      for (let i = 0; i < 6; i++) randomSplat();

      // Keep creating splats every 3 seconds
      const interval = setInterval(randomSplat, 2000);

      return () => {
        clearInterval(interval);
        simulation.stop();
      };
    }
  }, []);

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

  if (!SlidesData || SlidesData.length === 0) {
    return <div>Loading carousel data...</div>;
  }

  // Transform SlidesData into slides for VerticalCarousel
  const slides = SlidesData.map((item) => ({
    key: item.id,
    image: item.image,
    title: item.title,
    subtitle: item.sideText,
    content: {
      subtitle: item.detailedContent.subtitle,
      mainText: item.detailedContent.mainText,
    },
  }));

  return (
    <div className="flex flex-col bg-[#0f1118]">
      <div className="relative w-full ">
        {/* <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      /> */}
        {/* <BackgroundBeams /> */}
        <AuroraBackground>
          {/* <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              Background lights are cool you know.
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
              And this, is chemical burn.
            </div>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              Debug now
            </button>
          </motion.div> */}
          <FirstColumn />

          {/* <VerticalCarousel
          slides={slides}
          offsetRadius={2}
          showNavigation={true}
        /> */}
        </AuroraBackground>{" "}
      </div>
      <div className="h-full w-full" />

      {/* Fade-out overlay at the bottom */}
    </div>
  );
}
