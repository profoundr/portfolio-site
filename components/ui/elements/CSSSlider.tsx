// components/DiagonalSlideshow.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
// For Next.js, you might prefer to use the <Image> component for optimization:
// import Image from 'next/image';

const DiagonalSlideshow = ({ slides }: { slides: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Optional: for managing animation states if you add complex transitions
  const [isAnimating, setIsAnimating] = useState(false);

  if (!slides || slides.length === 0) {
    return <div className="p-4 text-center">No slides to display.</div>;
  }

  const totalSlides = slides.length;

  const goToPrevious = () => {
    if (isAnimating) return;
    // setIsAnimating(true); // Set if you have transition end handlers
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    if (isAnimating) return;
    // setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // If you use isAnimating, you'd need a useEffect to set it to false
  // after your CSS transition duration.
  // useEffect(() => {
  //   if (isAnimating) {
  //     const timer = setTimeout(() => setIsAnimating(false), 700); // Match your transition duration
  //     return () => clearTimeout(timer);
  //   }
  // }, [isAnimating]);

  const currentSlideData = slides[currentIndex];

  return (
    <div className="relative w-full h-screen bg-neutral-800 overflow-hidden flex flex-col items-center justify-center">
      {/* This outer container helps center and constrain the visual part */}
      <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden">
        {" "}
        {/* Adjust max-width and aspect-ratio as needed */}
        {slides.map((slide, index) => (
          <div
            key={slide.id || index} // Assuming slides have unique IDs or use index
            className={`
                            absolute top-1/2 left-1/2 w-[150%] h-[150%] /* Scale up the container */
                            transform -translate-x-1/2 -translate-y-1/2 -rotate-15 /* Center, then rotate */
                            transition-opacity duration-700 ease-in-out
                            ${
                              index === currentIndex
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0 pointer-events-none"
                            }
                        `}
            // The original Codrops demo uses scale(2.2, 2.3) on the zoomer.
            // With Tailwind's arbitrary values: className="... scale-[2.2_2.3] ..."
            // You'll need to adjust w-[150%] h-[150%] and scale values to achieve the desired zoom and coverage.
          >
            {/* Use Next.js Image for optimization if desired */}
            <Image
              width={1920}
              height={1080}
              src={slide.imageUrl}
              alt={slide.title || `Slide ${index + 1}`}
              className={`
                                block w-full h-full object-cover
                                transform rotate-15 /* Counter-rotate the image */
                                transition-transform duration-700 ease-in-out
                                ${
                                  index === currentIndex
                                    ? "scale-100"
                                    : "scale-110" /* Optional zoom effect for active/inactive */
                                }
                            `}
              // For Next.js <Image/> component, you'd use layout="fill" objectFit="cover"
              // and the transform utilities.
            />
          </div>
        ))}
      </div>

      {/* Slide Text Content - Positioned over the slideshow */}
      <div className="absolute z-20 bottom-10 md:bottom-20 left-10 md:left-20 right-10 md:right-auto max-w-md p-6 bg-black/50 text-white rounded-lg">
        {/* Animate title changes by using a key or a more advanced text animation technique */}
        <h2
          key={currentSlideData.title} // Key change forces re-render, can trigger simple fade if CSS is set
          className="text-2xl md:text-4xl font-bold mb-2 animate-fadeInBlur" // Example custom animation
        >
          {currentSlideData.title}
        </h2>
        {currentSlideData.description && (
          <p
            key={currentSlideData.description}
            className="text-sm md:text-base animate-fadeInBlur animation-delay-200" // Example custom animation
          >
            {currentSlideData.description}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute z-30 top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-10">
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="p-3 bg-black/30 text-white rounded-full hover:bg-black/60 transition-colors disabled:opacity-50"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="p-3 bg-black/30 text-white rounded-full hover:bg-black/60 transition-colors disabled:opacity-50"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Dot Indicators (Optional) */}
      <div className="absolute z-20 bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => {
              if (isAnimating) return;
              // setIsAnimating(true);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-white"
                : "bg-neutral-500 hover:bg-neutral-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DiagonalSlideshow;
