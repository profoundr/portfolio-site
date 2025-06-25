"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description:
      "Every project starts with clarity. This phase defines business goals, pinpoints user needs, and lays out a roadmap that informs every decision that follows.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes evolve into refined interfaces that balance aesthetics with usability. Every pixel and interaction is intentional — built to engage and convert.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Designs are translated into fast, scalable, and accessible code. Modern frameworks and best practices ensure long-term maintainability and performance.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Before going live, everything is rigorously tested — across devices, browsers, and use cases. Post-launch support ensures a smooth handoff and confident delivery.",
  },
];

const Process = () => {
  // Intersection observer for the main section
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Intersection observer for individual process steps
  const [stepsRef, stepsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={sectionRef}
      className={`w-full bg-slateBg lg:pt-10 lg:pb-24 px-5 py-10 transition-opacity duration-300 ${
        sectionInView ? "opacity-100" : "opacity-0"
      }`}
      id="process"
    >
      <div className="w-full max-w-screen-2xl bg-slateBg mx-auto border-t-0">
        <section className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto gap-12">
          {/* Left column */}
          <div className="flex flex-col justify-center lg:min-w-[380px] lg:max-w-[420px] lg:sticky top-24 h-fit bg-slateBg">
            <div className="flex justify-between items-end text-slateText">
              <div className="flex flex-col w-full gap-8">
                <h2
                  className={`text-[70px] font-medium leading-none tracking-tight relative z-10 transition-all duration-300 delay-200 ${
                    sectionInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  How I Work
                </h2>
                <p
                  className={`text-base lg:text-xl font-medium font-interTight !leading-normal tracking-wide max-w-[750px] transition-all duration-300 delay-300 ${
                    sectionInView
                      ? "opacity-65 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  A clear, focused process designed to deliver high-impact
                  websites — grounded in strategy, elevated by design, and
                  backed by solid development.
                </p>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div
            ref={stepsRef}
            className={`flex flex-col flex-1 gap-6 transition-all duration-300 delay-500 ${
              stepsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col w-full border border-border rounded-lg hover:shadow-lg transition-all duration-300 group ${
                  stepsInView ? "animate-fadeInBlur" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${(idx + 1) * 200}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex justify-between items-center p-[30px] rounded-t-lg relative z-10">
                  <div className="flex gap-[10px] items-center">
                    <div className="text-2xl leading-none font-normal text-slateGray opacity-60 cursor-default">
                      {step.number}
                    </div>
                    <div className="text-[30px] lg:text-[46px] font-medium text-slateText">
                      {step.title}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 border-t border-border p-[30px]">
                  <p className="text-base leading-tight tracking-tight text-slateText">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Process;
