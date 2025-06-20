import React from "react";
import { Gauge, Eye, BadgeCheck } from "lucide-react";

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

export const FeatureHighlights = () => {
  return (
    <div className="w-full flex justify-center items-center z-[1000] opacity-50 bg-[#0f1118]">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full text-white">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-6 bg-transparent text-white"
          >
            <div className="rounded-xl p-4 flex items-center justify-center mb-2 md:mb-0 ">
              {feature.icon}
            </div>
            <span className="text-lg font-medium text-center md:text-left text-white">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
