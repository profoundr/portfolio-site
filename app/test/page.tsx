"use client";

import React from "react";
// Removed: import type { SlideData } from "@/components/GSAPCarousel";
import DiagonalSlideshow from "@/components/GSAPComp2";

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
  if (!DUMMY_SLIDES_DATA || DUMMY_SLIDES_DATA.length === 0) {
    return <div>Loading carousel data...</div>;
  }
  // The DiagonalSlideshow component uses defaultSlidesData and defaultContentData internally if props are not provided.
  // To use DUMMY_SLIDES_DATA, we pass our mapped versions.
  return (
    <DiagonalSlideshow slidesData={mappedSlides} contentData={mappedContent} />
  );
}
