"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-full px-5 lg:px-20 py-6 lg:py-10 flex items-center justify-between z-[1000] lg:mb-[-130px]">
      <Link
        href="/"
        className="text-white text-[24px] lg:text-[30px] font-thin tracking-normal logo"
      >
        .KEDAR S
      </Link>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white transform transition-all duration-300 `}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 `}
          />
          <span
            className={`w-full h-0.5 bg-white transform transition-all duration-300 `}
          />
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-12">
        <Link
          href="#"
          className="text-white text-base font-light transition hover:text-gray-300"
        >
          About
        </Link>
        <Link
          href="#"
          className="text-white text-base font-light transition hover:text-gray-300"
        >
          Achievements
        </Link>
        <Link
          href="#"
          className="text-white text-base font-light transition hover:text-gray-300"
        >
          Work
        </Link>

        {/* <Link
          href="#"
          className="ml-4 flex items-center gap-2 text-white font-medium"
        >
          Collaborate
          <span className="inline-block transform translate-x-0.5">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link> */}
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/50 backdrop-blur-sm transform transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col justify-start items-start h-full gap-8 p-10">
          <Link
            href="#"
            className="text-white text-xl font-light transition hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="#"
            className="text-white text-xl font-light transition hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-white text-xl font-light transition hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Achievements
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
    </header>
  );
}
