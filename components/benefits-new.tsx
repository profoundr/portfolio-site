import React from "react";
import { Icon1, Icon2, Icon3, Icon4 } from "./SVGs/benefits-icons";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: <Icon1 />,
    title: "No delays",
    description:
      "Reduce settlement time from days to seconds. Experience faster access to funds and improved cash flow.",
  },
  {
    icon: <Icon2 />,
    title: "Global payments",
    description:
      "Seamlessly execute cross-border payments, to reach suppliers, partners, and customers around the world.",
  },
  {
    icon: <Icon3 />,
    title: "Reduce costs",
    description:
      "Benefit from near zero cost transactions, reducing overhead expenses and optimizing your financial operations.",
  },
  {
    icon: <Icon4 />,
    title: "Minimize fraud",
    description:
      "Leverage real time monitoring to prevent fraudulent activity before it can impact your operations.",
  },
];

export const BenefitsNew = () => {
  return (
    <div className="w-full bg-white max-w-screen-2xl mx-auto  py-20 px-4 sm:px-8 md:px-16 border border-t-0 border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-base rounded-lg border border-border px-4 py-2 font-medium font-interTight text-fontTertiary leading-none uppercase w-fit opacity-70 mb-8">
          Benefits
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-1 bg-fontPrimary text-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tighter">
                The future of business is default global
              </h2>
              <p className="mt-4 text-base lg:text-lg opacity-80">
                The modern infrastructure to integrate stablecoins into global
                payment flows.
              </p>
            </div>
            <button className="mt-8 bg-[#D4E273] text-black font-bold py-3 px-4 rounded-lg w-fit flex items-center gap-2 text-sm">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-backgroundSecondary rounded-3xl p-8 border border-border"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg border border-border mb-6">
                  <div className="w-6 h-6 text-fontTertiary">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-fontTertiary tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-fontTertiary/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsNew;
