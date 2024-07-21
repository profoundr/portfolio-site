"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import "keen-slider/keen-slider.min.css";
import EmblaCarousel from "./Embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export function SecondColumn() {
  const [emblaRef] = useEmblaCarousel();
  const OPTIONS: EmblaOptionsType = { dragFree: true, axis: 'y'  };
  const SLIDE_COUNT = 7;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="w-1/2 flex items-center">
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
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />

      {/* <Slider /> */}
    </div>
  );
}
export function Slider() {
  const [ref] = useKeenSlider<HTMLDivElement>();

  return (
    <div ref={ref} className="keen-slider w-full">
      <div className="keen-slider__slide w-[500px] flex justify-center items-center h-[500px] bg-slate-500">
        1
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


function WebsiteCard({ number }: { number: number }) {
  return (
    <div className="w-1/2 flex items-center">
      <span>{number}</span>
    </div>
  );
}