"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useKeenSlider } from "keen-slider/react.es";
import "keen-slider/keen-slider.min.css";
import EmblaCarousel from "./Embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { ExpandableCardDemo } from "./Embla/ExpandableCard";
import ArrowIcon from "../SVGs/arrow";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { wrap } from "module";
import { AnimatePresence, motion } from "framer-motion";

export function SecondColumn() {
  const [emblaRef] = useEmblaCarousel();
  const OPTIONS: EmblaOptionsType = { dragFree: true, axis: "y" };
  const SLIDE_COUNT = 7;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="w-1/2 flex flex-col items-start">
      {/* EMBLA
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <span className="mt-[60px]">NORMAL FLEX</span>
      <NormalFlex />
      SWIPER
      <SwiperSlider />
      KEEN Slider
      <KeenSlider /> */}
      FRAMER MOTION SLIDER
      <FramerMotionSlider />
      {/* <Slider /> */}
    </div>
  );
}
export function KeenSlider() {
  const [ref] = useKeenSlider<HTMLDivElement>();
  return (
    <div ref={ref} className="keen-slider w-full">
      <div className="keen-slider__slide w-full flex justify-center items-center h-[500px] bg-slate-500">
        <ExpandableCardDemo />
      </div>
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500 ">
        2
      </div>
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500 ">
        3
      </div>
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500 ">
        4
      </div>
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500 ">
        5
      </div>
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500 ">
        6
      </div>
    </div>
  );
}

function NormalFlex() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 200; // Adjust the scroll amount as needed
    if (carouselRef.current) {
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: 0,
          top: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        carouselRef.current.scrollBy({
          left: 0,
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <>
      <div
        ref={carouselRef}
        className="w-full h-[calc(100vh-220px)] grid grid-cols-1 overflow-scroll scrollbar-hide"
      >
        {Array.from({ length: 5 }, (_, index) => index).map(
          (item: number, index: number) => (
            <div key={index} className="flex flex-grow h-[calc(100vh-120px)]">
              <ExpandableCardDemo />
            </div>
          )
        )}
      </div>
      <div className="flex mt-5 gap-5">
        <button onClick={() => scroll("left")}>
          <ArrowIcon className="rotate-180" />
        </button>
        <button onClick={() => scroll("right")}>
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}

function SwiperSlider() {
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      className="w-full h-[500px] grid grid-cols-1 overflow-scroll scrollbar-hide"
    >
      {Array.from({ length: 5 }, (_, index) => index).map(
        (item: number, index: number) => (
          <SwiperSlide
            key={index}
            className="flex flex-grow h-[calc(100vh-120px)] bg-red-600"
          >
            <ExpandableCardDemo />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
}

function WebsiteCard({ number }: { number: number }) {
  return (
    <div className="w-1/2 flex items-center">
      <span>{number}</span>
    </div>
  );
}

function FramerMotionSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  // const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          // src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
Í          <ExpandableCardDemo />
        </motion.div>
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </>
  );
}
