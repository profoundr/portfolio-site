import React from "react";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "./SVGs/benefits-icons";

export const BenefitsBento = () => {
  const BenefitCard = ({
    icon: Icon,
    title,
    description,
    className = "",
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    className?: string;
  }) => (
    <div
      className={`flex flex-col justify-between items-start w-full border border-border p-8 bg-backgroundSecondary text-white ${className}`}
    >
      <div className="flex justify-center self-start items-center w-12 h-12 mr-6 border border-borderSecondary rounded-lg bg-white mb-9">
        <div className="w-8 h-8">
          <Icon className="text-fontTertiary" />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-fontTertiary">
        <h3 className="text-3xl leading-tight font-medium tracking-tight">
          {title}
        </h3>
        <div className="opacity-65 text-base leading-tight font-normal tracking-tight">
          {description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-screen-2xl px-16 py-[112px] bg-white mx-auto border border-border border-t-0">
      <p className="text-base rounded-lg border border-border px-4 py-2 font-medium font-interTight text-fontTertiary leading-none uppercase w-fit opacity-70 mb-4">
        Benefits
      </p>
      <h2 className="text-[46px] font-bold leading-[46px] tracking-[-0.04em] m-0 text-fontTertiary mt-1 mb-8">
        <span className="">Launch fast</span> without looking early
      </h2>

      <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] w-full">
        <div className="col-span-5 row-span-3">
          <BenefitCard
            icon={Icon1}
            title="Look 10x bigger"
            description="Polished, professional design that makes you look like a serious company — even if it's just you and a cofounder."
            className="h-full"
          />
        </div>

        <div className="col-span-4 row-span-2">
          <BenefitCard
            icon={Icon2}
            title="Thoughtful design"
            description="Simple, sharp, and user-focused. Every decision is made with your customer and conversion in mind."
            className="h-full"
          />
        </div>

        <div className="col-span-3 row-span-2">
          <BenefitCard
            icon={Icon3}
            title="Transparent pricing"
            description="Clear pricing upfront, with fixed-scope projects so you know exactly what you're paying for."
            className="h-full"
          />
        </div>

        <div className="col-span-4 row-span-3">
          <BenefitCard
            icon={Icon4}
            title="Industry experience"
            description="I run — one of the largest SaaS design galleries online. I know what makes a great SaaS site."
            className="h-full"
          />
        </div>

        <div className="col-span-5 row-span-3">
          <BenefitCard
            icon={Icon5}
            title="Fast turnarounds"
            description="Webflow keeps things lean. Most projects ship in 3–4 weeks, with a tight process and no wasted time."
            className="h-full"
          />
        </div>

        <div className="col-span-3 row-span-1">
          <BenefitCard
            icon={Icon6}
            title="Satisfaction guaranteed"
            description="Start with a 1-week paid trial. Low commitment, no risk. Only continue if you're happy."
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BenefitsBento;
