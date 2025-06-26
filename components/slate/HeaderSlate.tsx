"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeaderSlate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full px-5 py-8 md:py-10 bg-slateBg text-slateText opacity-0 animate-[fadeInBlur_0.5s_ease-out_1.5s_forwards]">
      <div className="max-w-screen-2xl mx-auto flex flex-row items-center justify-between px-5">
        <Link href="/">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slateText"
          >
            <path
              d="M31.205 20.0112C31.6522 19.6128 32 19.065 32 18.4176V2.08393C32 0.341007 29.9131 -0.654958 28.5715 0.490393L17.3416 9.7528C16.5466 10.4002 15.4534 10.4002 14.6584 9.7528L3.42855 0.490393C2.03725 -0.654958 0 0.341007 0 2.08393V18.4176C0 19.0152 0.248448 19.6128 0.745344 20.0112L14.6087 31.5145C15.4037 32.1618 16.4969 32.1618 17.2919 31.5145L31.205 20.0112Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-slateText p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-slateText transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-slateText transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-slateText transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-7">
          <Link
            href="/#work"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Work
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#services"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Services
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#process"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Process
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            About
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group flex flex-row items-center gap-2 px-1 py-3"
          >
            Contact <ArrowRight className="w-4 h-4" />
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-slateBg opacity-100 transform transition-all duration-300 ease-in-out lg:hidden z-[1000] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col justify-start items-start h-full gap-8 p-10 relative z-[1000] bg-slateBg">
          <Link
            href="/#work"
            className="text-slateText text-xl font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Work
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#services"
            className="text-slateText text-xl font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#process"
            className="text-slateText text-xl font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Process
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="text-slateText text-xl font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            About
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-slateText text-xl font-medium opacity-80 transition-all duration-300 relative group flex flex-row items-center gap-2 px-1 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact <ArrowRight className="w-4 h-4" />
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 lg:hidden z-[999] bg-black/20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

// export default HeaderSlate;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <header className="w-full px-5 py-8 md:py-10 bg-slateBg text-slateText lg:opacity-0 lg:animate-[fadeInBlur_0.5s_ease-out_1.5s_forwards]">
      <div className="max-w-screen-2xl mx-auto flex flex-row items-center justify-between px-5">
        <Link
          href="/"
          className="text-white text-[24px] lg:text-[30px] font-thin tracking-normal logo"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slateText"
          >
            <path
              d="M31.205 20.0112C31.6522 19.6128 32 19.065 32 18.4176V2.08393C32 0.341007 29.9131 -0.654958 28.5715 0.490393L17.3416 9.7528C16.5466 10.4002 15.4534 10.4002 14.6584 9.7528L3.42855 0.490393C2.03725 -0.654958 0 0.341007 0 2.08393V18.4176C0 19.0152 0.248448 19.6128 0.745344 20.0112L14.6087 31.5145C15.4037 32.1618 16.4969 32.1618 17.2919 31.5145L31.205 20.0112Z"
              fill="currentColor"
            ></path>
          </svg>{" "}
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 sticky top-6 right-6 z-[2000]"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-slateText transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-slateText transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-slateText transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-row items-center justify-between gap-7">
          <Link
            href="/#work"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Work
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#services"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Services
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#process"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            Process
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group px-1 py-3"
          >
            About
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-slateText text-lg font-medium opacity-80 transition-all duration-300 relative group flex flex-row items-center gap-2 px-1 py-3"
          >
            Contact <ArrowRight className="w-4 h-4" />
            <span className="absolute bottom-2.5 left-0 right-0 w-0 h-[2px] bg-slateText/50 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 right-0 h-screen w-full bg-slateBg backdrop-blur-sm transform transition-all duration-300 ease-in-out lg:hidden z-[1100] opacity-100 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col justify-start items-start h-screen gap-4 p-10 bg-slateBg text-slateText opacity-100">
            <Link
              href="#work"
              className="font-medium opacity-80 transition-all duration-300 relative group p-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="#services"
              className="font-medium opacity-80 transition-all duration-300 relative group p-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#process  "
              className="font-medium opacity-80 transition-all duration-300 relative group p-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="/about"
              className="font-medium opacity-80 transition-all duration-300 relative group p-1"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-medium opacity-80 transition-all duration-300 relative group p-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 lg:hidden z-[-1]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
