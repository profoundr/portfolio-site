"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

const services = [
  {
    number: "1",
    title: "Web Development",
    description:
      "Dynamic, interactive web experiences built with modern technologies—scalable, maintainable, and designed to go far beyond standard templates.",
  },
  {
    number: "2",
    title: "E-Commerce Development",
    description:
      "Custom e-commerce solutions that drive sales, including bespoke Shopify storefronts and seamless integration with third-party APIs for inventory, shipping, and marketing automation.",
  },
  {
    number: "3",
    title: "SaaS Development",
    description:
      "Helping startups turn ideas into functional products by building a solid, maintainable foundation for SaaS applications and implementing the core features needed for launch.",
  },
];

export default function Services() {
  // Intersection observer for the main section
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Intersection observer for individual service cards
  const [cardsRef, cardsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={sectionRef}
      className={`w-full bg-slateBg px-5 py-10 lg:py-24 transition-opacity duration-300 z-[200] relative ${
        sectionInView ? "opacity-100" : "opacity-0"
      }`}
      id="services"
    >
      <div className="max-w-screen-2xl w-full mx-auto z-[200]">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col w-full gap-8">
            <h2
              className={`text-[70px] lg:text-[98px] font-medium leading-none tracking-tight text-slateText relative z-10 transition-all duration-300 delay-200 ${
                sectionInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Services
            </h2>
            <p
              className={`text-base lg:text-xl font-medium font-interTight !leading-relaxed tracking-wide mb-5 max-w-[750px] text-slateText transition-all duration-300 delay-300 ${
                sectionInView
                  ? "opacity-65 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Building great software is a partnership. I work closely with
              founders and teams to deliver custom web solutions that are
              engineered to perform, scale, and last.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-300 delay-500 ${
            cardsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Website Service */}
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`flex flex-col w-full border border-border rounded-lg hover:shadow-lg transition-all duration-300 group ${
                cardsInView ? "animate-fadeInBlur" : "opacity-0"
              }`}
              style={{
                animationDelay: `${(idx + 1) * 200}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex justify-between items-center p-[30px] rounded-t-lg relative z-10">
                <div className="flex gap-[10px] items-center">
                  <div className="text-[26px] font-normal text-slateGray opacity-60 cursor-default">
                    {service.number}
                  </div>
                  <div className="lg:text-[30px] leading-none font-medium text-slateText">
                    {service.title}
                  </div>
                </div>
              </div>
              <div className="relative z-10 border-t border-border p-[30px]">
                <p className="text-base leading-tight tracking-tight text-slateText">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
