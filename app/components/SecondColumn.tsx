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
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

export function SecondColumn() {
  const [emblaRef] = useEmblaCarousel();
  const OPTIONS: EmblaOptionsType = { dragFree: true, axis: "y" };
  const SLIDE_COUNT = 7;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="w-1/2 flex flex-col items-start">
      {/* <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <WebsiteCard number={1} />
          </div>
          <div className="embla__slide">
            <WebsiteCard number={2} />
          </div>
          <div className="embla__slide">
            <WebsiteCard number={3} />
          </div>
          <div className="embla__slide">
            <WebsiteCard number={4} />
          </div>
        </div>
      </div> */}
      EMBLA
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <span className="mt-[60px]">NORMAL FLEX</span>
      <NormalFlex />
      SWIPER
      <SwiperSlider />
      KEEN Slider
      <KeenSlider />
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
