import React from "react";

const services = [
  {
    number: "1",
    title: "Strategy",
    description:
      "Every project starts with understanding what matters. I'll dig into what you're trying to achieve, who it's for, and what success looks like. The goal is to make sure we're solving the right problems from the start.",
  },
  {
    number: "2",
    title: "Design",
    description:
      "This is where things start to take shape. I'll explore a couple of different directions and share the strongest options with you. You'll be involved throughout, so the end result feels right and works well.",
  },
  {
    number: "3",
    title: "Development",
    description:
      "Once the design feels right, I'll build the site in Webflow. It'll be clean, fast, and responsive. I use Client First and Relume to keep everything consistent and speed up the process without sacrificing quality.",
  },
];

export default function Services() {
  return (
    <div className="w-full bg-slateBg px-5 py-10 lg:py-24">
      <div className="max-w-screen-2xl w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col w-full gap-8">
            <h2 className="text-[70px] lg:text-[98px] font-medium leading-none tracking-tight text-slateText relative z-10">
              Services
            </h2>
            <p className="text-base lg:text-xl font-medium mb-5 font-interTight leading-[20px] lg:leading-[28px] tracking-tight  max-w-[750px] text-slateText opacity-65">
              I provide three focused design services to keep things simple and
              effective. No headaches, just great design.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Website Service */}

          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col w-full border border-border rounded-lg hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-between items-center p-[30px] rounded-t-lg relative z-10">
                <div className="flex gap-[10px] items-center">
                  <div className="text-[26px] font-normal text-slateGray opacity-60 cursor-default">
                    {service.number}
                  </div>
                  <div className="text-[30px] lg:text-[46px] font-medium text-slateText">
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
