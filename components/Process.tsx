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
    <div className="w-full max-w-screen-2xl px-16 py-[112px] bg-white mx-auto border border-border border-t-0">
      <p className="text-base rounded-lg border border-border px-4 py-2 font-medium  font-interTight  text-fontTertiary leading-none uppercase w-fit opacity-70 mb-4">
        Benefits
      </p>
      <h2 className="text-[46px] font-bold leading-[46px] tracking-[-0.04em] m-0 text-fontTertiary mt-1 mb-8">
        <span className="">Launch fast</span> without looking early
      </h2>
      <section className="flex flex-row w-full max-w-screen-2xl mx-auto py-16 px-4 gap-12">
        {/* Left column */}
        <div className="flex flex-col justify-center min-w-[380px] max-w-[420px] sticky top-24 h-fit bg-white rounded-2xl shadow-md p-10 border border-border">
          <p className="text-base rounded-lg border border-border px-4 py-2 font-medium  font-interTight  text-fontTertiary leading-none uppercase w-fit opacity-70 mb-4">
            Benefits
          </p>
          <h2 className="text-[46px] font-bold leading-[46px] tracking-[-0.04em] m-0 text-fontTertiary mt-1 mb-8">
            <span className="">Launch fast</span> without looking early
          </h2>
          <button className="bg-gradient-to-b from-[#232323] to-[#232323ee] text-white rounded-xl px-6 py-3 font-medium text-[18px] shadow-lg flex items-center gap-2 w-fit transition hover:scale-105">
            Get started
            <span className="ml-2">↗</span>
          </button>
        </div>
        {/* Right column */}
        <div className="flex flex-col flex-1 gap-6 max-w-[420px]">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-[#f4f0ec] rounded-2xl p-8 border border-border flex flex-col gap-2 shadow-sm relative"
            >
              <span className="text-base px-4 py-2 font-medium  font-interTight  text-fontTertiary leading-none uppercase w-fit opacity-70 mb-4">
                {step.number}
              </span>
              <h3 className="text-[2rem] font-satoshi font-bold text-fontPrimary mb-2">
                {step.title}
              </h3>
              <p className="text-[18px] text-fontPrimary leading-relaxed">
                {step.description}
              </p>
              {idx < steps.length - 1 && (
                <span className="absolute bottom-0 left-8 right-8 h-[1px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Process;
