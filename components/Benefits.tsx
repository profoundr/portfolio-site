import React from "react";
import { Users, Smile, Clock, Layout, Award, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Users className="w-7 h-7 text-neutral-700" />, // Look 10x bigger
    title: "Look 10x bigger",
    description:
      "Polished, professional design that makes you look like a serious company — even if it's just you and a cofounder.",
  },
  {
    icon: <Smile className="w-7 h-7 text-neutral-700" />, // Transparent pricing
    title: "Transparent pricing",
    description:
      "Clear pricing upfront, with fixed-scope projects so you know exactly what you're paying for.",
  },
  {
    icon: <Clock className="w-7 h-7 text-neutral-700" />, // Fast turnarounds
    title: "Fast turnarounds",
    description:
      "Webflow keeps things lean. Most projects ship in 3–4 weeks, with a tight process and no wasted time.",
  },
  {
    icon: <Layout className="w-7 h-7 text-neutral-700" />, // Thoughtful design
    title: "Thoughtful design",
    description:
      "Simple, sharp, and user-focused. Every decision is made with your customer and conversion in mind.",
  },
  {
    icon: <Award className="w-7 h-7 text-neutral-700" />, // Industry experience
    title: "Industry experience",
    description:
      "I run Saaspo — one of the largest SaaS design galleries online. I know what makes a great SaaS site.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-neutral-700" />, // Satisfaction guaranteed
    title: "Satisfaction guaranteed",
    description:
      "Start with a 1-week paid trial. Low commitment, no risk. Only continue if you're happy.",
  },
];

export const Benefits = () => {
  return (
    <section className="w-full flex flex-col items-center p-20 z-[1000]">
      <div className="w-full mb-12">
        <div className="mb-2 text-sm text-neutral-400">Benefits</div>
        <h2 className="text-3xl md:text-5xl  mb-2">
          Websites that help small teams
        </h2>
        <div className="text-3xl md:text-5xl ">
          <span className="text-white">move fast</span>
          <span className="text-white"> and </span>
          <span className="text-white">look sharp</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="relative backdrop-blur-md border border-[3#E7E7E7] rounded-xl p-6 flex flex-col gap-3 min-h-[170px] shadow-sm"
          >
            {/* {feature.badge && (
              <span className="absolute right-4 -top-3 text-white text-xs px-3 py-1 rounded-md shadow ">
                {feature.badge}
              </span>
            )} */}
            <div>{feature.icon}</div>
            <div className="text-lg">{feature.title}</div>
            <div className="text-sm leading-snug">{feature.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
