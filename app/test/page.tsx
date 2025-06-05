"use client";

import React, { useState, useId, useRef, useEffect } from "react";
// Removed: import type { SlideData } from "@/components/GSAPCarousel";
import { VerticalCarousel } from "@/components/verticalCarousel";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

// Define the structure of DUMMY_SLIDES_DATA items for clarity in mapping
interface DummySlideItem {
  id: number;
  image: string;
  title: string;
  number: string;
  sideText: string;
  detailedContent: {
    subtitle: string;
    mainText: string;
  };
}

const DUMMY_SLIDES_DATA: DummySlideItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Azure Peaks",
    number: "01",
    sideText: "Mountain Serenity",
    detailedContent: {
      subtitle: "Whispers of the Wild",
      mainText:
        "Breathe in the crisp mountain air and witness the grandeur of Azure Peaks. A sanctuary where nature's artistry is on full display, offering moments of profound peace and untamed beauty.",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Silent Valley",
    number: "02",
    sideText: "Tranquil Waters",
    detailedContent: {
      subtitle: "Reflections of Stillness",
      mainText:
        "Silent Valley, a hidden gem where time slows. The placid lake mirrors the sky, surrounded by ancient forests, inviting quiet contemplation and a deep connection with the earth.",
    },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coastal Dreams",
    number: "03",
    sideText: "Ocean's Embrace",
    detailedContent: {
      subtitle: "Where Sand Meets Sea",
      mainText:
        "Let the rhythm of the waves soothe your soul. Coastal Dreams is a stretch of pristine beach where the golden sands meet the endless azure, a perfect escape to rejuvenate and dream.",
    },
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Canvas",
    number: "04",
    sideText: "City's Pulse",
    detailedContent: {
      subtitle: "Vibrancy in Concrete",
      mainText:
        "Experience the dynamic energy of Urban Canvas. A city that never sleeps, painted with bright lights, architectural marvels, and the diverse stories of its inhabitants. A symphony of modern life.",
    },
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Enchanted Forest",
    number: "05",
    sideText: "Mystic Woods",
    detailedContent: {
      subtitle: "Secrets of the Ancients",
      mainText:
        "Step into the Enchanted Forest, where sunlight filters through ancient canopies, and whispers of old magic linger in the air. A realm of mystery and wonder, waiting to be explored.",
    },
  },
];

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

const mappedSlides: MappedSlideData[] = DUMMY_SLIDES_DATA.map((item) => ({
  id: `s${item.id}`,
  imageUrl: item.image,
  sideText: item.sideText,
  number: parseInt(item.number, 10),
  title: item.title,
  subtitle: item.detailedContent.subtitle,
}));

const mappedContent: MappedContentData[] = DUMMY_SLIDES_DATA.map((item) => ({
  id: `c${item.id}`,
  number: parseInt(item.number, 10),
  title: item.title,
  subtitle: item.detailedContent.subtitle,
  text: item.detailedContent.mainText,
}));

export default function TestCarouselPage() {
  const [active, setActive] = useState<
    (typeof DUMMY_SLIDES_DATA)[number] | null
  >(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const simulation = new WebGLFluidEnhanced(containerRef.current);

      // Color palette from user
      const colorPalette = ["#FFFFFF"];

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

  if (!DUMMY_SLIDES_DATA || DUMMY_SLIDES_DATA.length === 0) {
    return <div>Loading carousel data...</div>;
  }

  // Transform DUMMY_SLIDES_DATA into slides for VerticalCarousel
  const slides = DUMMY_SLIDES_DATA.map((item) => ({
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
    <div className="relative h-screen w-full overflow-hidden ">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      />
      <div className="fixed top-0 left-0 w-full h-full z-[100]">
        <VerticalCarousel
          slides={slides}
          offsetRadius={2}
          showNavigation={true}
        />
      </div>
    </div>
  );
}
