import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-background text-fontPrimary text-base leading-6 px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="py-16">
          <div className="pb-6">
            <div className="flex flex-col">
              {/* Main content section */}
              <div className="max-w-[560px]">
                <h2 className="text-[40px] leading-[48px] font-normal  tracking-[-0.3px] mb-0 mt-0">
                  Unlock efficient revenue <br />
                  growth
                </h2>
                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="/book-a-demo"
                      className="text-fontSecondary font-medium text-lg bg-fontPrimary leading-[27px] cursor-pointer block text-center transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] border border-fontPrimary rounded px-5 py-2 hover:bg-fontPrimary/90"
                    >
                      Get a demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Logo and navigation section */}
              <div className="mt-10">
                <div className="flex flex-row items-center justify-between w-full">
                  <a href="#" className="text-fontPrimary text-base relative">
                    <Image
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/67dc5e3767277eaa0559d172/67dd7d0fd2003c559bdcde4c_Navbar_logo.svg"
                      alt="Realm logo"
                      className="align-middle max-w-full inline-block"
                    />
                  </a>
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <a
                        href="/about-us"
                        className="text-fontPrimary text-sm py-2 hover:text-fontPrimary/80 transition-colors"
                      >
                        About Us
                      </a>
                      <a
                        href="/privacy-policy"
                        className="text-fontPrimary text-sm py-2 hover:text-fontPrimary/80 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="/website-terms"
                        className="text-fontPrimary text-sm py-2 hover:text-fontPrimary/80 transition-colors"
                      >
                        Website Terms
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border w-full"></div>

          {/* Bottom section */}
          <div className="pt-6">
            <div className="flex justify-between items-center">
              <div className="text-sm">— Designed in Helsinki, Finland.</div>
              <div className="flex items-start gap-3">
                <a
                  href="https://www.linkedin.com/company/withrealm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fontPrimary text-sm flex items-center hover:text-fontPrimary/80 transition-colors"
                >
                  <div className="flex flex-col justify-center items-center w-6 h-6">
                    {/* LinkedIn Icon - You can replace this with an actual icon component */}
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
