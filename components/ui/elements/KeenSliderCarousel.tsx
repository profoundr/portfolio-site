"use client";

import React, { useState, useRef, WheelEvent as ReactWheelEvent } from "react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

interface KeenSliderCarouselProps {
  images: string[];
}

const KeenSliderCarousel: React.FC<KeenSliderCarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: "auto",
      spacing: 40,
    },
    vertical: true,
    drag: true,
    mode: "free", // Keeps drag momentum
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const wheelCooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const WHEEL_COOLDOWN_DURATION = 50; // ms

  const handlePrevSlide = () => {
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  const handleNextSlide = () => {
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  const handleWheelScroll = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!instanceRef.current) return;

    if (wheelCooldownTimeoutRef.current) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const delta = event.deltaY;
    const wheelThreshold = 10;

    if (Math.abs(delta) > wheelThreshold) {
      if (delta < 0) {
        instanceRef.current.prev();
      } else {
        instanceRef.current.next();
      }

      wheelCooldownTimeoutRef.current = setTimeout(() => {
        wheelCooldownTimeoutRef.current = null;
      }, WHEEL_COOLDOWN_DURATION);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "black",
        position: "relative",
      }}
      onWheel={handleWheelScroll}
    >
      {/* Navigation Buttons */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          zIndex: 10,
        }}
      >
        <button
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          style={{
            padding: "12px 18px",
            fontSize: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            lineHeight: 1,
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ↑
        </button>
        <button
          onClick={handleNextSlide}
          aria-label="Next slide"
          style={{
            padding: "12px 18px",
            fontSize: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            lineHeight: 1,
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ↓
        </button>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="keen-slider"
        style={{
          height: "100%",
          width: "45vw",
          cursor: "grab",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="keen-slider__slide"
            style={{
              minWidth: "45vw",
              maxWidth: "45vw",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingTop: "56.25%", // 16:9 Aspect Ratio
                position: "relative",
                backgroundColor: "#222", // Placeholder background
              }}
            >
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 45vw"
                priority={idx < 2} // Prioritize loading first few images
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeenSliderCarousel;
