import React from "react";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description:
      "Every project starts with understanding what matters. I'll dig into what you're trying to achieve, who it's for, and what success looks like. The goal is to make sure we're solving the right problems from the start.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "This is where things start to take shape. I'll explore a couple of different directions and share the strongest options with you. You'll be involved throughout, so the end result feels right and works well.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Once the design feels right, I'll build the site in Webflow. It'll be clean, fast, and responsive. I use Client First and Relume to keep everything consistent and speed up the process without sacrificing quality.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "I'll hand everything over and show you how to manage the site yourself. You won't need to rely on anyone to make updates. You'll get a simple, reliable setup that just works.",
  },
];

const Process = () => {
  return (
    <div className="w-full bg-slateBg lg:pt-10 lg:pb-24 px-5 py-10">
      <div className="w-full max-w-screen-2xl bg-slateBg mx-auto border-t-0">
        <section className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto gap-12">
          {/* Left column */}
          <div className="flex flex-col justify-center lg:min-w-[380px] lg:max-w-[420px] lg:sticky top-24 h-fit bg-slateBg">
            <div className="flex justify-between items-end text-slateText">
              <div className="flex flex-col w-full gap-8">
                <h2 className="text-[70px] lg:text-[98px] font-medium leading-none tracking-tight t relative z-10">
                  Services
                </h2>
                <p className="opacity-65 text-base lg:text-xl font-medium mb-5 font-interTight leading-tight tracking-tight  max-w-[750px]">
                  I provide three focused design services to keep things simple
                  and effective. No headaches, just great design.
                </p>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="flex flex-col flex-1 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col w-full border border-border rounded-lg hover:shadow-lg transition-all duration-300 group"
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
                    Clear and engaging websites that actually do their job,
                    whether it&apos;s starting fresh or giving an old one a
                    makeover.
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
