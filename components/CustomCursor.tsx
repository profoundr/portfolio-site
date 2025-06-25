"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;

      setPosition({ x: e.clientX - 10, y: e.clientY - 10 });

      // Get the element under the cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Check if the element has dark background or text
        const computedStyle = window.getComputedStyle(element);
        const cursor = computedStyle.cursor === "pointer";
        setIsPointer(cursor);
        // const backgroundColor = computedStyle.backgroundColor;
        // const color = computedStyle.color;
      }
    };

    const handleMouseEnter = () => {
      if (isMobile) return;
      document.body.style.cursor = "none";
    };

    const handleMouseLeave = () => {
      if (isMobile) return;
      document.body.style.cursor = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("resize", checkMobile);
      document.body.style.cursor = "auto";
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isPointer ? "pointer" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
