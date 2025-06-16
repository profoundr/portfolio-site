"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText"; // Uncomment if SplitText is available and to be used

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(SplitText); // Uncomment if SplitText is available
// }

// Interfaces
export interface SlideData {
  id: string | number;
  image: string;
  title: string;
  number: string; // Or number, depending on format
  sideText: string;
  detailedContent: {
    subtitle: string;
    mainText: string;
  };
}

interface Winsize {
  width: number;
  height: number;
}

interface SlideDimensions {
  width: number;
  height: number;
}

// --- SlideshowContainer (Main Component) ---
interface SlideshowContainerProps {
  slides: SlideData[];
}

const SlideshowContainer: React.FC<SlideshowContainerProps> = ({
  slides = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentViewOpen, setIsContentViewOpen] = useState(false);
  const [winsize, setWinsize] = useState<Winsize>({ width: 0, height: 0 });
  const [currentDirection, setCurrentDirection] = useState<"next" | "prev">(
    "next"
  );

  const slideshowRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decoRef = useRef<HTMLDivElement>(null);
  const contentComponentRef = useRef<{
    show: () => void;
    hide: (onComplete?: () => void) => void;
  }>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWinsize = () => {
        setWinsize({ width: window.innerWidth, height: window.innerHeight });
      };
      updateWinsize();
      window.addEventListener("resize", updateWinsize);
      return () => window.removeEventListener("resize", updateWinsize);
    }
  }, []);

  const getSlideDimensions = useCallback(
    (slideEl: HTMLElement | null): SlideDimensions => {
      if (slideEl) {
        const imgWrapper = slideEl.querySelector(".slide__image-wrap");
        if (imgWrapper) {
          return {
            width: imgWrapper.clientWidth || 400,
            height: imgWrapper.clientHeight || 300,
          };
        }
        return {
          width: slideEl.offsetWidth || 400,
          height: slideEl.offsetHeight || 300,
        };
      }
      return { width: 400, height: 300 }; // Default/fallback
    },
    []
  );

  const calculateTransform = useCallback(
    (
      positionName: string,
      slideElOrIndex: HTMLElement | null | number
    ): { x: number; y: number; rotationZ: number; opacity?: number } => {
      if (!winsize.width || !winsize.height)
        return { x: 0, y: 0, rotationZ: 0, opacity: 0 };

      let slideDims: SlideDimensions;
      if (
        typeof slideElOrIndex === "number" &&
        slideRefs.current[slideElOrIndex]
      ) {
        slideDims = getSlideDimensions(slideRefs.current[slideElOrIndex]);
      } else if (slideElOrIndex && typeof slideElOrIndex !== "number") {
        slideDims = getSlideDimensions(slideElOrIndex);
      } else {
        // Fallback if element not found, e.g. during initial calculation before refs are fully set.
        // Attempt to get dimensions for a typical slide if index is provided.
        const typicalSlideEl = slideRefs.current.find((el) => el);
        slideDims = getSlideDimensions(typicalSlideEl || null);
      }

      const slideWidth = Math.max(slideDims.width, 1);
      const slideHeight = Math.max(slideDims.height, 1);

      const positions: Record<
        string,
        { x: number; y: number; rotationZ: number; opacity: number }
      > = {
        OFFSCREEN_PREV: {
          x: -1 * (winsize.width / 2 + slideWidth),
          y: -1 * (winsize.height / 2 + slideHeight),
          rotationZ: -30,
          opacity: 0,
        },
        PREV: {
          x: -1 * (winsize.width / 2 - slideWidth / 3),
          y: -1 * (winsize.height / 2 - slideHeight / 3),
          rotationZ: 0,
          opacity: 1,
        },
        CURRENT: {
          x: 0,
          y: 0,
          rotationZ: 0,
          opacity: 1,
        },
        NEXT: {
          x: winsize.width / 2 - slideWidth / 3,
          y: winsize.height / 2 - slideHeight / 3,
          rotationZ: 0,
          opacity: 1,
        },
        OFFSCREEN_NEXT: {
          x: winsize.width / 2 + slideWidth,
          y: winsize.height / 2 + slideHeight,
          rotationZ: 30,
          opacity: 0,
        },
        CONTENT_VIEW_CURRENT: {
          x: -1 * (winsize.width / 2 - slideWidth / 2 - winsize.width * 0.075),
          y: 0,
          rotationZ: 0,
          opacity: 1,
        },
      };
      return (
        positions[positionName] || { ...positions.OFFSCREEN_PREV, opacity: 0 }
      ); // Default to offscreen if name is invalid
    },
    [winsize, getSlideDimensions, slideRefs]
  ); // slideRefs added as a dependency

  // Initial Setup: Position slides
  useEffect(() => {
    if (slides.length === 0 || !winsize.width || typeof window === "undefined")
      return;

    // Ensure slideRefs array is populated
    slideRefs.current = slideRefs.current.slice(0, slides.length);

    slides.forEach((_, index) => {
      const slideEl = slideRefs.current[index];
      if (slideEl) {
        let initialPositionName = "OFFSCREEN_PREV"; // Default
        let initialOpacity = 0;

        if (index === currentIndex) {
          initialPositionName = "CURRENT";
        } else if (index === (currentIndex + 1) % slides.length) {
          initialPositionName = "NEXT";
        } else if (
          index ===
          (currentIndex - 1 + slides.length) % slides.length
        ) {
          initialPositionName = "PREV";
        } else {
          // Determine if it's further next or further prev for offscreen positioning
          const diff = index - currentIndex;
          const wrapDiff =
            Math.abs(diff) > slides.length / 2
              ? diff > 0
                ? diff - slides.length
                : diff + slides.length
              : diff;
          initialPositionName =
            wrapDiff > 0 ? "OFFSCREEN_NEXT" : "OFFSCREEN_PREV";
        }

        const transformProps = calculateTransform(initialPositionName, slideEl);
        gsap.set(slideEl, { ...transformProps }); // Opacity is part of transformProps
      }
    });
  }, [slides, currentIndex, winsize, calculateTransform]); // Removed currentDirection

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating || slides.length < 2) return;
      setIsAnimating(true);
      setCurrentDirection(dir);

      const oldCurrentIdx = currentIndex;
      const newCurrentIdx =
        dir === "next"
          ? (oldCurrentIdx + 1) % slides.length
          : (oldCurrentIdx - 1 + slides.length) % slides.length;

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(newCurrentIdx);
          setIsAnimating(false);
          // Text animations will be handled by SlideComponent reacting to slideState prop
        },
      });

      const duration = 0.8;
      const ease = "power4.inOut";
      const staggerDelay = 0.07;

      // Define roles for clarity
      const oldPrevSlideEl =
        slideRefs.current[(oldCurrentIdx - 1 + slides.length) % slides.length];
      const currentMovingSlideEl = slideRefs.current[oldCurrentIdx]; // Slide that IS current and will move
      const oldNextSlideEl =
        slideRefs.current[(oldCurrentIdx + 1) % slides.length];
      const newCurrentTakingPositionEl = slideRefs.current[newCurrentIdx]; // Slide that WILL BE current

      // Determine the slide that will become the new 'next' or 'prev' after transition
      const upcomingSlideEl =
        dir === "next"
          ? slideRefs.current[(newCurrentIdx + 1) % slides.length]
          : slideRefs.current[
              (newCurrentIdx - 1 + slides.length) % slides.length
            ];
      const upcomingPosition = dir === "next" ? "NEXT" : "PREV";
      const offscreenFrom =
        dir === "next" ? "OFFSCREEN_NEXT" : "OFFSCREEN_PREV";

      if (dir === "next") {
        if (
          oldPrevSlideEl &&
          oldPrevSlideEl !== currentMovingSlideEl &&
          oldPrevSlideEl !== newCurrentTakingPositionEl
        ) {
          tl.to(
            oldPrevSlideEl,
            {
              ...calculateTransform("OFFSCREEN_PREV", oldPrevSlideEl),
              duration,
              ease,
            },
            0
          );
        }
        if (currentMovingSlideEl) {
          tl.to(
            currentMovingSlideEl,
            {
              ...calculateTransform("PREV", currentMovingSlideEl),
              duration,
              ease,
            },
            staggerDelay
          );
        }
        if (newCurrentTakingPositionEl) {
          tl.to(
            newCurrentTakingPositionEl,
            {
              ...calculateTransform("CURRENT", newCurrentTakingPositionEl),
              duration,
              ease,
            },
            staggerDelay * 2
          );
        }
        if (
          upcomingSlideEl &&
          upcomingSlideEl !== newCurrentTakingPositionEl &&
          upcomingSlideEl !== currentMovingSlideEl
        ) {
          gsap.set(
            upcomingSlideEl,
            calculateTransform(offscreenFrom, upcomingSlideEl)
          );
          tl.to(
            upcomingSlideEl,
            {
              ...calculateTransform(upcomingPosition, upcomingSlideEl),
              duration,
              ease,
            },
            staggerDelay * 3
          );
        }
      } else {
        // dir === 'prev'
        if (
          oldNextSlideEl &&
          oldNextSlideEl !== currentMovingSlideEl &&
          oldNextSlideEl !== newCurrentTakingPositionEl
        ) {
          tl.to(
            oldNextSlideEl,
            {
              ...calculateTransform("OFFSCREEN_NEXT", oldNextSlideEl),
              duration,
              ease,
            },
            0
          );
        }
        if (currentMovingSlideEl) {
          tl.to(
            currentMovingSlideEl,
            {
              ...calculateTransform("NEXT", currentMovingSlideEl),
              duration,
              ease,
            },
            staggerDelay
          );
        }
        if (newCurrentTakingPositionEl) {
          tl.to(
            newCurrentTakingPositionEl,
            {
              ...calculateTransform("CURRENT", newCurrentTakingPositionEl),
              duration,
              ease,
            },
            staggerDelay * 2
          );
        }
        if (
          upcomingSlideEl &&
          upcomingSlideEl !== newCurrentTakingPositionEl &&
          upcomingSlideEl !== currentMovingSlideEl
        ) {
          gsap.set(
            upcomingSlideEl,
            calculateTransform(offscreenFrom, upcomingSlideEl)
          );
          tl.to(
            upcomingSlideEl,
            {
              ...calculateTransform(upcomingPosition, upcomingSlideEl),
              duration,
              ease,
            },
            staggerDelay * 3
          );
        }
      }

      // Decorative Background Animation
      if (decoRef.current) {
        const decoAnim = gsap.timeline();
        decoAnim
          .to(decoRef.current, {
            x: dir === "next" ? -40 : 40,
            y: dir === "next" ? -40 : 40,
            duration: 0.4,
            ease: "power2.in",
          })
          .to(decoRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        tl.add(decoAnim, staggerDelay * 1.2); // Stagger deco bounce (0.07s + 0.07s*0.2 as per spec)
      }
    },
    [isAnimating, slides.length, currentIndex, calculateTransform, winsize]
  );

  const showContent = useCallback(() => {
    if (isAnimating || slides.length === 0 || !slideRefs.current[currentIndex])
      return;
    setIsAnimating(true);
    setIsContentViewOpen(true);

    const currentSlideEl = slideRefs.current[currentIndex];
    const prevSlideIdx = (currentIndex - 1 + slides.length) % slides.length;
    const nextSlideIdx = (currentIndex + 1) % slides.length;
    const prevSlideEl = slideRefs.current[prevSlideIdx];
    const nextSlideEl = slideRefs.current[nextSlideIdx];

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    const duration = 0.8;
    const ease = "power4.inOut";

    if (prevSlideEl && prevSlideEl !== currentSlideEl) {
      tl.to(
        prevSlideEl,
        {
          ...calculateTransform("OFFSCREEN_PREV", prevSlideEl),
          duration,
          ease,
        },
        0
      );
    }
    if (nextSlideEl && nextSlideEl !== currentSlideEl) {
      tl.to(
        nextSlideEl,
        {
          ...calculateTransform("OFFSCREEN_NEXT", nextSlideEl),
          duration,
          ease,
        },
        0
      );
    }
    if (currentSlideEl) {
      const imgEl = currentSlideEl.querySelector("img");
      if (imgEl)
        gsap.to(imgEl, { scale: 1, duration: 0.5, ease: "power4.out" }); // Reset image scale
      tl.to(
        currentSlideEl,
        {
          ...calculateTransform("CONTENT_VIEW_CURRENT", currentSlideEl),
          duration,
          ease,
        },
        0
      );
    }
    if (
      decoRef.current &&
      winsize.width &&
      winsize.height &&
      decoRef.current.offsetWidth > 0 &&
      decoRef.current.offsetHeight > 0
    ) {
      const decoTransform = {
        scaleX: winsize.width / decoRef.current.offsetWidth,
        scaleY: winsize.height / decoRef.current.offsetHeight,
        x: -20,
        y: 20,
      };
      tl.to(decoRef.current, { ...decoTransform, duration, ease }, 0);
    } else if (decoRef.current) {
      // Fallback scale if dimensions are zero initially, might need adjustment
      tl.to(decoRef.current, { scale: 10, x: -20, y: 20, duration, ease }, 0);
    }

    if (contentComponentRef.current?.show) {
      // ContentComponent.show will be called after a delay to sync with slide animations
      tl.call(
        () => contentComponentRef.current?.show(),
        undefined,
        duration * 0.5
      ); // Example delay
    }
  }, [
    isAnimating,
    slides.length,
    currentIndex,
    calculateTransform,
    winsize,
    contentComponentRef,
  ]);

  const hideContent = useCallback(() => {
    if (isAnimating || slides.length === 0 || !slideRefs.current[currentIndex])
      return;
    setIsAnimating(true);

    const onHideAnimComplete = () => {
      setIsContentViewOpen(false); // This triggers ContentComponent unmount

      // After ContentComponent is logically hidden/removed, animate slides back
      const tlSlidesBack = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          // Text animations should trigger via SlideComponent state change
        },
      });

      const duration = 0.8;
      const ease = "power4.inOut";

      const currentSlideEl = slideRefs.current[currentIndex];
      const prevSlideIdx = (currentIndex - 1 + slides.length) % slides.length;
      const nextSlideIdx = (currentIndex + 1) % slides.length;
      const prevSlideEl = slideRefs.current[prevSlideIdx];
      const nextSlideEl = slideRefs.current[nextSlideIdx];

      if (decoRef.current) {
        tlSlidesBack.to(
          decoRef.current,
          { scaleX: 1, scaleY: 1, x: 0, y: 0, duration, ease },
          0
        );
      }
      if (prevSlideEl && prevSlideEl !== currentSlideEl) {
        gsap.set(
          prevSlideEl,
          calculateTransform("OFFSCREEN_PREV", prevSlideEl)
        );
        tlSlidesBack.to(
          prevSlideEl,
          { ...calculateTransform("PREV", prevSlideEl), duration, ease },
          0.1
        );
      }
      if (nextSlideEl && nextSlideEl !== currentSlideEl) {
        gsap.set(
          nextSlideEl,
          calculateTransform("OFFSCREEN_NEXT", nextSlideEl)
        );
        tlSlidesBack.to(
          nextSlideEl,
          { ...calculateTransform("NEXT", nextSlideEl), duration, ease },
          0.1
        );
      }
      if (currentSlideEl) {
        tlSlidesBack.to(
          currentSlideEl,
          { ...calculateTransform("CURRENT", currentSlideEl), duration, ease },
          0
        );
      }
    };

    // Trigger ContentComponent's internal hide animation
    if (contentComponentRef.current?.hide) {
      contentComponentRef.current.hide(onHideAnimComplete);
    } else {
      // If ContentComponent has no hide method or unmounts directly, proceed
      onHideAnimComplete();
    }
  }, [
    isAnimating,
    slides.length,
    currentIndex,
    calculateTransform,
    winsize,
    contentComponentRef,
  ]);

  const getSlideState = (
    index: number
  ): "current" | "prev" | "next" | "off-screen" | "content-view" => {
    if (isContentViewOpen) {
      return index === currentIndex ? "content-view" : "off-screen";
    }
    if (index === currentIndex) return "current";
    if (index === (currentIndex - 1 + slides.length) % slides.length)
      return "prev";
    if (index === (currentIndex + 1) % slides.length) return "next";
    return "off-screen";
  };

  // Initialize slideRefs array length
  useEffect(() => {
    slideRefs.current = Array(slides.length).fill(null);
  }, [slides.length]);

  return (
    <div
      ref={slideshowRef}
      className="slideshow-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#1a1a1a",
      }}
    >
      <DecorativeBackground ref={decoRef} />

      <div
        className="slides-wrapper"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SlideComponent
            key={slide.id}
            ref={(el) => {
              if (el) {
                slideRefs.current[index] = el;
              } else {
                slideRefs.current[index] = null;
              }
            }}
            slideData={slide}
            slideState={getSlideState(index)}
            onClickCurrent={showContent}
            onClickNext={() => navigate("next")}
            onClickPrev={() => navigate("prev")}
            winsize={winsize}
            isAnimating={isAnimating}
            isActive={index === currentIndex && !isContentViewOpen}
            isContentViewOpen={isContentViewOpen} // Pass this down for finer control in SlideComponent
          />
        ))}
      </div>

      {isContentViewOpen && slides.length > 0 && slides[currentIndex] && (
        <ContentComponent
          slideData={slides[currentIndex]}
          onClose={hideContent}
          ref={contentComponentRef}
        />
      )}
      {/* Debug Navigation Buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
          display: "flex",
          gap: "15px",
          padding: "10px",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
        }}
      >
        <button
          onClick={() => navigate("prev")}
          disabled={isAnimating || slides.length < 2}
          style={{
            padding: "10px 15px",
            background: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Prev
        </button>
        <button
          onClick={() => navigate("next")}
          disabled={isAnimating || slides.length < 2}
          style={{
            padding: "10px 15px",
            background: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
        {getSlideState(currentIndex) === "current" &&
          !isContentViewOpen &&
          slides.length > 0 && (
            <button
              onClick={showContent}
              disabled={isAnimating}
              style={{
                padding: "10px 15px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Open Content
            </button>
          )}
      </div>
    </div>
  );
};

// --- SlideComponent (Individual Slide) ---
interface SlideComponentProps {
  slideData: SlideData;
  slideState: "current" | "prev" | "next" | "off-screen" | "content-view";
  onClickCurrent: () => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  winsize: Winsize;
  isAnimating: boolean;
  isActive: boolean;
  isContentViewOpen: boolean;
}

const SlideComponent = React.forwardRef<HTMLDivElement, SlideComponentProps>(
  (
    {
      slideData,
      slideState,
      onClickCurrent,
      onClickNext,
      onClickPrev,
      winsize,
      isAnimating,
      isActive,
      isContentViewOpen,
    },
    ref
  ) => {
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sideTextRef = useRef<HTMLParagraphElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      if (isAnimating) return;
      if (slideState === "current" && !isContentViewOpen) onClickCurrent();
      else if (slideState === "next" && !isContentViewOpen) onClickNext();
      else if (slideState === "prev" && !isContentViewOpen) onClickPrev();
    };

    // Text Animations
    useEffect(() => {
      const numberEl = numberRef.current;
      const titleEl = titleRef.current;
      const sideEl = sideTextRef.current;

      const shouldShowTexts = slideState === "current" && !isContentViewOpen;
      const shouldShowSideText =
        (slideState === "prev" || slideState === "next") && !isContentViewOpen;

      // Number Animation
      if (numberEl) {
        if (shouldShowTexts) {
          gsap.fromTo(
            numberEl,
            { x: "-10%", opacity: 0 },
            {
              x: "0%",
              opacity: 1,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
              delay: isActive ? 0.6 : 0,
            }
          );
        } else {
          gsap.to(numberEl, { opacity: 0, x: "-10%", duration: 0.3 });
        }
      }
      // Title Animation (simple fade for now, TODO: SplitText)
      if (titleEl) {
        if (shouldShowTexts) {
          gsap.to(titleEl, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: isActive ? 0.7 : 0,
          });
        } else {
          gsap.to(titleEl, { opacity: 0, y: 10, duration: 0.3 });
        }
      }
      // Side Text Animation
      if (sideEl) {
        if (shouldShowSideText) {
          gsap.to(sideEl, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
        } else {
          gsap.to(sideEl, { opacity: 0, y: 10, duration: 0.3 });
        }
      }
    }, [slideState, isContentViewOpen, isActive]);

    // Tilt Effect
    useEffect(() => {
      const wrapper = imageWrapperRef.current;
      const textWrapper = titleWrapRef.current;

      if (!wrapper || !isActive || isAnimating || isContentViewOpen) {
        if (wrapper)
          gsap.to(wrapper, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power1.out",
          });
        if (textWrapper)
          gsap.to(textWrapper, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power1.out",
          });
        return;
      }

      const handleMouseMove = (ev: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const relMousePos = {
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        };

        const imageTilt = {
          x: gsap.utils.mapRange(0, rect.width, -20, 20, relMousePos.x),
          y: gsap.utils.mapRange(0, rect.height, -20, 20, relMousePos.y),
          rotationX: gsap.utils.mapRange(
            0,
            rect.height,
            -15,
            15,
            relMousePos.y
          ),
          rotationY: gsap.utils.mapRange(0, rect.width, 15, -15, relMousePos.x),
        };
        gsap.to(wrapper, { ...imageTilt, duration: 1.5, ease: "power1.out" });
        if (textWrapper) {
          gsap.to(textWrapper, {
            x: -imageTilt.x,
            y: -imageTilt.y,
            duration: 1.5,
            ease: "power1.out",
          });
        }
      };
      const handleMouseLeave = () => {
        gsap.to(wrapper, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 1.8,
          ease: "power4.out",
        });
        if (textWrapper) {
          gsap.to(textWrapper, {
            x: 0,
            y: 0,
            duration: 1.8,
            ease: "power4.out",
          });
        }
      };

      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf([wrapper, textWrapper]);
      };
    }, [isActive, isAnimating, isContentViewOpen, winsize]);

    // Image Scale Effect
    useEffect(() => {
      const wrapper = imageWrapperRef.current;
      const img = imgRef.current;
      if (!wrapper || !img || !isActive || isAnimating || isContentViewOpen) {
        if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power4.out" });
        return;
      }
      let timeoutId: NodeJS.Timeout;
      const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
          gsap.to(img, { scale: 1.1, duration: 0.8, ease: "power3.out" });
        }, 40);
      };
      const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        gsap.to(img, { scale: 1, duration: 1.8, ease: "power4.out" });
      };
      wrapper.addEventListener("mouseenter", handleMouseEnter);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        clearTimeout(timeoutId);
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        if (img) gsap.killTweensOf(img);
      };
    }, [isActive, isAnimating, isContentViewOpen]);

    const slideBaseWidth = "clamp(280px, 30vw, 420px)";
    const slideImageHeight = "clamp(380px, 40vh, 520px)";

    const style: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: slideBaseWidth,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      cursor:
        slideState === "current" ||
        ((slideState === "next" || slideState === "prev") && !isContentViewOpen)
          ? "pointer"
          : "default",
      transform: "translate(-50%, -50%)",
      willChange: "transform, opacity",
      opacity: 0, // Initial opacity, GSAP will control it via calculateTransform
    };

    return (
      <div
        ref={ref}
        className={`slide-component state-${slideState}`}
        style={style}
        onClick={handleClick}
      >
        <div
          ref={imageWrapperRef}
          className="slide__image-wrap"
          style={{
            width: "100%",
            height: slideImageHeight,
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            willChange: "transform",
          }}
        >
          <Image
            ref={imgRef}
            src={slideData.image}
            alt={slideData.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "16px",
              willChange: "transform",
            }}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 35vw"
            priority={
              slideState === "current" ||
              slideState === "next" ||
              slideState === "prev"
            }
          />
        </div>

        <div
          ref={titleWrapRef}
          className="slide__text-content-wrapper"
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "90%",
            willChange: "transform",
          }}
        >
          <div
            ref={numberRef}
            className="slide__number"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
              fontWeight: "bold",
              opacity: 0,
              color: "#ccc",
            }}
          >
            {slideData.number}
          </div>
          <h3
            ref={titleRef}
            className="slide__title"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)",
              margin: "8px 0",
              opacity: 0,
              color: "#f0f0f0",
              transform: "translateY(10px)",
            }}
          >
            {slideData.title}
          </h3>
          {(slideState === "prev" || slideState === "next") &&
            !isContentViewOpen && (
              <p
                ref={sideTextRef}
                className="slide__side-text"
                style={{
                  opacity: 0,
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  color: "#aaa",
                  transform: "translateY(10px)",
                }}
              >
                {slideData.sideText}
              </p>
            )}
        </div>
      </div>
    );
  }
);
SlideComponent.displayName = "SlideComponent";

// --- ContentComponent (Detailed View) ---
interface ContentComponentProps {
  slideData: SlideData;
  onClose: () => void;
}

interface ContentComponentHandles {
  show: () => void;
  hide: (onComplete?: () => void) => void;
}

const ContentComponent = React.forwardRef<
  ContentComponentHandles,
  ContentComponentProps
>(({ slideData, onClose }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const backCtrlRef = useRef<HTMLButtonElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const elementsToAnimate = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    elementsToAnimate.current = [
      backCtrlRef.current,
      numberRef.current,
      titleRef.current,
      subtitleRef.current,
      textRef.current,
    ].filter((el) => el !== null) as HTMLElement[];
  }, []);

  const show = () => {
    if (!contentRef.current || elementsToAnimate.current.length === 0) return;
    gsap.set(contentRef.current, { display: "flex" });
    gsap.fromTo(
      elementsToAnimate.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.4,
        ease: "power4.out",
      }
    );
  };

  const hide = (onComplete?: () => void) => {
    if (!contentRef.current || elementsToAnimate.current.length === 0) {
      if (onComplete) onComplete();
      return;
    }
    gsap.to(elementsToAnimate.current.slice().reverse(), {
      opacity: 0,
      y: 10,
      duration: 0.3,
      stagger: 0.01,
      ease: "power3.in",
      onComplete: () => {
        if (contentRef.current)
          gsap.set(contentRef.current, { display: "none" });
        if (onComplete) onComplete();
      },
    });
  };

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  // Show is called by parent (SlideshowContainer) after it's mounted

  return (
    <div
      ref={contentRef}
      className="content-view"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(20,20,20,0.98)",
        zIndex: 1000,
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5vw",
        color: "#fff",
        willChange: "opacity",
      }}
    >
      <button
        ref={backCtrlRef}
        onClick={onClose}
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          background: "transparent",
          border: "2px solid #fff",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
          padding: "10px 15px",
          borderRadius: "5px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        &times; Close
      </button>
      <div
        ref={numberRef}
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        {slideData.number}
      </div>
      <h1
        ref={titleRef}
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
          margin: "15px 0",
          textAlign: "center",
        }}
      >
        {slideData.title}
      </h1>
      <h2
        ref={subtitleRef}
        style={{
          fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
          color: "#ccc",
          margin: "5px 0 25px",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        {slideData.detailedContent.subtitle}
      </h2>
      <p
        ref={textRef}
        style={{
          maxWidth: "750px",
          textAlign: "center",
          lineHeight: "1.8",
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          color: "#ddd",
        }}
      >
        {slideData.detailedContent.mainText}
      </p>
    </div>
  );
});
ContentComponent.displayName = "ContentComponent";

// --- DecorativeBackground ---
const DecorativeBackground = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="slideshow__deco"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "clamp(180px, 22vw, 280px)",
        height: "clamp(180px, 22vw, 280px)",
        backgroundColor: "rgba(120, 120, 120, 0.15)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%) scale(1)",
        zIndex: 0,
        willChange: "transform",
      }}
    ></div>
  );
});
DecorativeBackground.displayName = "DecorativeBackground";

const GSAPCarousel = SlideshowContainer;
export default GSAPCarousel;

// Helper function (if needed, e.g. for SplitText randomization manually)
// const getRandomChar = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':"|,.<>/?';
//   return chars[Math.floor(Math.random() * chars.length)];
// };

// Example Usage (in a page.tsx or another component to test):
/*
import GSAPCarousel from '@/components/GSAPCarousel'; // Adjust path as needed

const DUMMY_SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Azure Peaks",
    number: "01",
    sideText: "Mountain Serenity",
    detailedContent: {
      subtitle: "Whispers of the Wild",
      mainText: "Breathe in the crisp mountain air and witness the grandeur of Azure Peaks. A sanctuary where nature's artistry is on full display, offering moments of profound peace and untamed beauty."
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Silent Valley",
    number: "02",
    sideText: "Tranquil Waters",
    detailedContent: {
      subtitle: "Reflections of Stillness",
      mainText: "Silent Valley, a hidden gem where time slows. The placid lake mirrors the sky, surrounded by ancient forests, inviting quiet contemplation and a deep connection with the earth."
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coastal Dreams",
    number: "03",
    sideText: "Ocean's Embrace",
    detailedContent: {
      subtitle: "Where Sand Meets Sea",
      mainText: "Let the rhythm of the waves soothe your soul. Coastal Dreams is a stretch of pristine beach where the golden sands meet the endless azure, a perfect escape to rejuvenate and dream."
    }
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Canvas",
    number: "04",
    sideText: "City's Pulse",
    detailedContent: {
      subtitle: "Vibrancy in Concrete",
      mainText: "Experience the dynamic energy of Urban Canvas. A city that never sleeps, painted with bright lights, architectural marvels, and the diverse stories of its inhabitants. A symphony of modern life."
    }
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Enchanted Forest",
    number: "05",
    sideText: "Mystic Woods",
    detailedContent: {
      subtitle: "Secrets of the Ancients",
      mainText: "Step into the Enchanted Forest, where sunlight filters through ancient canopies, and whispers of old magic linger in the air. A realm of mystery and wonder, waiting to be explored."
    }
  }
];

export default function TestCarouselPage() {
  if (DUMMY_SLIDES_DATA.length === 0) {
    return <div>Loading slides...</div>; // Or some other placeholder
  }
  return <GSAPCarousel slides={DUMMY_SLIDES_DATA} />;
}
*/
