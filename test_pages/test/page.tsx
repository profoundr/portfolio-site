import BenefitsBento from "@/components/benefits-bento";
import BenefitsNew from "@/components/benefits-new";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import Hero from "@/components/test/hero";
import { BadgeCheck, Eye, Gauge } from "lucide-react";
import React from "react";

const Page = () => {
  const features = [
    {
      icon: <Gauge />,
      label: "Web Development",
    },
    {
      icon: <Eye />,
      label: "UI/UX Design",
    },
    {
      icon: <BadgeCheck />,
      label: "SEO Optimization",
    },
  ];
  return (
    <div className="relative  bg-dashed">
      <Hero />
      <div className="w-full">
        <div className="w-full max-w-screen-2xl mx-auto bg-[#f4f0ec]">
          <div className="w-full flex justify-center items-center z-[1000]">
            <div className="grid grid-cols-1 md:grid-cols-3 border border-border border-t-0 w-full text-fontPrimary bg-white ">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-6 text-fontPrimary border-r border-border last:border-r-0 border-b md:border-b-0 last:border-b-0"
                >
                  <div className="rounded-xl p-4 flex items-center justify-center mb-2 md:mb-0 ">
                    {feature.icon}
                  </div>
                  <span className="text-lg font-medium text-center md:text-left text-fontPrimary">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BenefitsNew />
        <BenefitsBento />
        <Process />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
