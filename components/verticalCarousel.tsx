// components/VerticalCarousel.tsx
"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useId,
  useRef,
} from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

// --- TYPE DEFINITIONS ---

interface SlideType {
  key: string | number;
  image: string;
  title: string;
  subtitle: string;
  content: {
    subtitle: string;
    mainText: string;
  };
}

interface VerticalCarouselProps {
  slides: SlideType[];
  offsetRadius?: number;
  showNavigation?: boolean;
  animationConfig?: {
    tension: number;
    friction: number;
  };
}

// --- HELPER FUNCTIONS ---

/**
 * Custom modulo function to handle negative numbers correctly.
 */
function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

// --- MAIN COMPONENT ---

export function VerticalCarousel({
  slides,
  offsetRadius = 2,
  showNavigation = true,
}: VerticalCarouselProps) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<SlideType | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);

  /**
   * Clamps the offset radius to a valid range.
   */
  const clampOffsetRadius = useCallback(
    (radius: number) => {
      const upperBound = Math.floor((slides.length - 1) / 2);
      return Math.max(0, Math.min(radius, upperBound));
    },
    [slides.length]
  );

  const effectiveOffsetRadius = clampOffsetRadius(offsetRadius);

  /**
   * Memoized array of slides to be rendered.
   * This includes the center slide and the visible slides on either side.
   */
  const presentableSlides = useMemo(() => {
    const newPresentableSlides: SlideType[] = [];
    for (let i = -effectiveOffsetRadius; i <= effectiveOffsetRadius; i++) {
      const slideIndex = mod(index + i, slides.length);
      newPresentableSlides.push(slides[slideIndex]);
    }
    return newPresentableSlides;
  }, [slides, index, effectiveOffsetRadius]);

  /**
   * Changes the active slide index.
   */
  const moveSlide = useCallback(
    (direction: number) => {
      setIndex((prevIndex) => mod(prevIndex + direction, slides.length));
    },
    [slides.length]
  );

  /**
   * Handles keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        moveSlide(-1);
      } else if (event.key === "ArrowDown") {
        moveSlide(1);
      } else if (event.key === "Escape" && active) {
        setActive(null);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveSlide, active]);

  useOutsideClick(ref, () => setActive(null));

  /**
   * Handles drag gestures on the center slide to navigate.
   */
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50; // Min distance for a swipe

    if (Math.abs(offset.y) > swipeThreshold) {
      // Determine direction based on offset and velocity
      const swipeDirection = offset.y < 0 ? 1 : -1;
      moveSlide(swipeDirection);
    }
  };

  /**
   * Calculates the animation properties for a given slide index.
   */
  const getSlideStyle = (slideIndex: number) => {
    const offsetFromCenter = slideIndex - effectiveOffsetRadius;
    // const distanceFactor =
    //   1 - Math.abs(offsetFromCenter / (effectiveOffsetRadius + 1));

    const translateY = -50 + offsetFromCenter * 115; // Vertical separation
    const translateX = Math.abs(offsetFromCenter) * 15; // Horizontal separation
    const scale = Math.max(0, 1);
    // const opacity = Math.max(0, distanceFactor ** 2);
    const opacity =
      offsetFromCenter === 0
        ? 1
        : offsetFromCenter === 1 || offsetFromCenter === -1
        ? 0.3
        : 0;
    const zIndex = 100 - Math.abs(offsetFromCenter);

    return {
      x: `${translateX}%`,
      y: `${translateY}%`,
      scale,
      opacity,
      zIndex,
    };
  };

  useEffect(() => {
    // Animate the up arrow being clicked 4 times on mount
    let timeouts: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 4; i++) {
      timeouts.push(
        setTimeout(() => {
          moveSlide(-1);
        }, i * 300)
      );
    }
    return () => timeouts.forEach(clearTimeout);
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (active) return;
      if (scrollingRef.current) return; // Ignore if already scrolling

      if (e.deltaY < 0) {
        moveSlide(-1);
      } else if (e.deltaY > 0) {
        moveSlide(1);
      }
      scrollingRef.current = true;
      setTimeout(() => {
        scrollingRef.current = false;
      }, 400); // 400ms cooldown
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [moveSlide, active]);

  return (
    <>
      {/* Overlay background */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            {/* Close button - top left */}
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-8 right-8 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-12 w-12 shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors z-[101]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.key}-${id}`}
              ref={ref}
              className="w-full h-full bg-white dark:bg-neutral-900 overflow-hidden"
            >
              <div className="grid grid-cols-2 h-full">
                <motion.div
                  layoutId={`image-${active.key}-${id}`}
                  className="relative h-full"
                >
                  <Image
                    priority
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-8">
                    <motion.h3
                      layoutId={`title-${active.key}-${id}`}
                      className="text-4xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`subtitle-${active.key}-${id}`}
                      className="text-xl text-neutral-600 dark:text-neutral-400"
                    >
                      {active.subtitle}
                    </motion.p>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="prose dark:prose-invert max-w-none"
                  >
                    <h4 className="text-2xl font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                      {active.content.subtitle}
                    </h4>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {active.content.mainText}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vertical Carousel */}
      <div
        ref={containerRef}
        className="flex flex-col justify-end items-center h-[60%] w-fit col-span-7"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {presentableSlides.map((slide, i) => {
          const isCenterSlide = i === effectiveOffsetRadius;
          return (
            <motion.div
              key={slide.key}
              style={{
                position: "absolute",
                width: "clamp(400px, 60vw, 800px)",
                height: "clamp(300px, 45vh, 600px)",
                transformOrigin: "80% 50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isCenterSlide ? "pointer" : "pointer",
              }}
              initial={false}
              animate={getSlideStyle(i)}
              transition={{ type: "spring", stiffness: 140, damping: 40 }}
              onClick={() => {
                if (!isCenterSlide) {
                  moveSlide(i - effectiveOffsetRadius);
                } else {
                  setActive(slide);
                }
              }}
            >
              <motion.div
                layoutId={`card-${slide.key}-${id}`}
                className="w-full h-full bg-neutral-800 rounded-xl overflow-hidden"
              >
                <motion.div
                  layoutId={`image-${slide.key}-${id}`}
                  className="relative h-full"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <motion.h3
                    layoutId={`title-${slide.key}-${id}`}
                    className="text-lg font-medium text-white mb-1"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`subtitle-${slide.key}-${id}`}
                    className="text-neutral-300 text-sm"
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        <button
          onClick={() => moveSlide(1)}
          className="absolute opacity-0 right-8 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-neutral-800 border-none rounded-full w-14 h-14 cursor-pointer shadow-lg text-3xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Next Slide"
        >
          <span style={{ lineHeight: 1 }}>↓</span>
        </button>

        <button
          onClick={() => moveSlide(-1)}
          className="absolute opacity-0 right-8 top-[calc(50%-100px)] -translate-y-1/2 z-20 bg-white dark:bg-neutral-800 border-none rounded-full w-14 h-14 cursor-pointer shadow-lg text-3xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Previous Slide"
        >
          <span style={{ lineHeight: 1 }}>↑</span>
        </button>
      </div>
    </>
  );
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-neutral-800 dark:text-neutral-200"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

// --- EXAMPLE USAGE COMPONENT (e.g., in your `app/page.tsx`) ---

export default function HomePage() {
  // Sample slides data
  const slides = [
    {
      key: 1,
      image: "/apple.jpg",
      title: "Apple",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Apples are a popular fruit that are known for their sweet taste and crunchy texture.",
      },
    },
    {
      key: 2,
      image: "/orange.jpg",
      title: "Orange",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Oranges are a sweet and juicy fruit that are packed with vitamin C.",
      },
    },
    {
      key: 3,
      image: "/banana.jpg",
      title: "Banana",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Bananas are a sweet and creamy fruit that are high in potassium.",
      },
    },
    {
      key: 4,
      image: "/grape.jpg",
      title: "Grape",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Grapes are a sweet and juicy fruit that are high in antioxidants.",
      },
    },
    {
      key: 5,
      image: "/watermelon.jpg",
      title: "Watermelon",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Watermelon is a sweet and juicy fruit that is high in water.",
      },
    },
    {
      key: 6,
      image: "/pineapple.jpg",
      title: "Pineapple",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Pineapples are a sweet and juicy fruit that are high in vitamin C.",
      },
    },
    {
      key: 7,
      image: "/strawberry.jpg",
      title: "Strawberry",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Strawberries are a sweet and juicy fruit that are high in vitamin C.",
      },
    },
    {
      key: 8,
      image: "/mango.jpg",
      title: "Mango",
      subtitle: "A fruit",
      content: {
        subtitle: "A fruit",
        mainText:
          "Mangoes are a sweet and juicy fruit that are high in vitamin C.",
      },
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #89f7fe, #66a6ff)",
      }}
    >
      {/* Set a fixed height for the carousel container */}
      <div style={{ width: "100%", height: "500px" }}>
        <VerticalCarousel slides={slides} offsetRadius={3} />
      </div>
    </div>
  );
}
