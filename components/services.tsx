import React from "react";

export default function Services() {
  return (
    <div className="max-w-[1398px] w-full mx-auto px-4 sm:px-8 md:px-16 bg-white text-[#3d3d3d] text-[22px] leading-[30.8px] font-['PP_Neue_Montreal',Arial,sans-serif]">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-[30px] w-[698.999px]">
          <h2 className="text-[98px] font-medium leading-[107.8px] text-[#111111] relative z-10">
            Services
          </h2>
          <p className="text-[26px] leading-[36.4px] text-[#3d3d3d] cursor-default">
            I provide three focused design services to keep things simple and
            effective. No headaches, just great design.
          </p>
        </div>

        {/* CTA Link */}
        <a
          href="/services"
          className="relative w-[326.234px] h-[65.9951px] text-[46px] leading-[46px] text-[#111111] pb-5 border-b-0 hover:border-b hover:border-[#F75B00] transition-all duration-500 ease-out"
        >
          <span className="absolute bottom-[-4.4px] left-0 right-0 h-[1.09649px] bg-[#F75B00] transform origin-left transition-transform duration-[550ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] delay-500"></span>
          <div>See my services</div>
          <span className="absolute bottom-[-4.4px] left-0 right-0 h-[1.09649px] bg-[#F75B00] transform scale-x-0 origin-right transition-transform duration-[550ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)]"></span>
        </a>
      </div>

      {/* Spacer */}
      <div className="h-[79.989px]"></div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Website Service */}
        <a
          href="/work?filter=website#options"
          className="flex flex-col w-full border border-[#ebebeb] rounded-lg bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex justify-between items-center p-[30px] bg-white rounded-t-lg relative z-10">
            <div className="flex gap-[10px]">
              <div className="text-[26px] font-normal text-[#a0a0a0] cursor-default">
                1.
              </div>
              <div className="text-[46px] font-medium text-[#111111]">
                Website
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-center items-center h-[33.9912px] w-[33.9912px] rounded-full bg-[#F75B00] text-white text-[14px] px-4 py-2 relative overflow-hidden">
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  See projects
                </div>
                <div className="absolute inset-0 bg-[#F75B00] z-1"></div>
                <div className="absolute inset-0 bg-[#111111] z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10 border-t border-[#ebebeb] p-[30px]">
            <p className="text-[18px] leading-[25.2px]">
              Clear and engaging websites that actually do their job, whether
              it&apos;s starting fresh or giving an old one a makeover.
            </p>
          </div>
          <div className="absolute inset-0 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-5"></div>
        </a>

        {/* Product Service */}
        <a
          href="/work?filter=product#options"
          className="flex flex-col w-full border border-[#ebebeb] rounded-lg bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex justify-between items-center p-[30px] bg-[#f8f9fb] rounded-t-lg relative z-10">
            <div className="flex gap-[10px]">
              <div className="text-[26px] font-normal text-[#a0a0a0] cursor-default">
                2.
              </div>
              <div className="text-[46px] font-medium text-[#111111]">
                Product
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-center items-center h-[33.9912px] w-[33.9912px] rounded-full bg-[#193440] text-white text-[14px] px-4 py-2 relative overflow-hidden">
                <div className="relative z-10">See projects</div>
                <div className="absolute inset-0 bg-[#193440] z-1"></div>
                <div className="absolute inset-0 bg-[#111111] z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10 border-t border-[#ebebeb] p-[30px]">
            <p className="text-[18px] leading-[25.2px]">
              Scalable and intuitive interfaces for B2B and B2C SaaS products
              that truly work. From user flows to design systems.
            </p>
          </div>
          <div className="absolute inset-0 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-5"></div>
        </a>

        {/* Mobile Service */}
        <a
          href="/work?filter=mobile#options"
          className="flex flex-col w-full border border-[#ebebeb] rounded-lg bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex justify-between items-center p-[30px] bg-white rounded-t-lg relative z-10">
            <div className="flex gap-[10px]">
              <div className="text-[26px] font-normal text-[#a0a0a0] cursor-default">
                3.
              </div>
              <div className="text-[46px] font-medium text-[#111111]">
                Mobile
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-center items-center h-[33.9912px] w-[33.9912px] rounded-full bg-[#a8e6cf] text-white text-[14px] px-4 py-2 relative overflow-hidden">
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  See projects
                </div>
                <div className="absolute inset-0 bg-[#a8e6cf] z-1"></div>
                <div className="absolute inset-0 bg-[#111111] z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10 border-t border-[#ebebeb] p-[30px]">
            <p className="text-[18px] leading-[25.2px]">
              Seamless and fluid mobile experiences designed to fit how people
              use apps in the real world and actually loved by users.
            </p>
          </div>
          <div className="absolute inset-0 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-5"></div>
        </a>
      </div>
    </div>
  );
}
