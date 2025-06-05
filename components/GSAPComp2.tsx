"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
} from "react";
import { gsap, Power3, Power4, Elastic } from "gsap";

// interface Slide {
//   image: string;
//   title: string;
//   subtitle: string;
//   side: string;
//   content: string;
// }

// interface DiagonalSlideshowProps {
//   slides: Slide[];
//   className?: string;
// }

// Helper to get window size
const getWinSize = () => {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  return { width: 0, height: 0 }; // Default for server-side
};

// Helper for mouse position (relative to document)
const getMousePos = (
  e: MouseEvent | React.MouseEvent
): { x: number; y: number } => {
  let posx = 0;
  let posy = 0;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

// Random integer
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Equation of a line
const lineEq = (
  y2: number,
  y1: number,
  x2: number,
  x1: number,
  currentVal: number
): number => {
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return m * currentVal + b;
};

const CHARS = [
  "$",
  "%",
  "#",
  "&",
  "=",
  "*",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  ".",
  ":",
  ",",
  "^",
];

// --- SVG Icon Components ---
const SVGIconArrow: React.FC = () => (
  <svg className="icon icon--arrow" viewBox="0 0 24 24">
    <title>arrow</title>
    <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
  </svg>
);

const SVGIconDrop: React.FC = () => (
  <svg className="icon icon--drop" viewBox="0 0 24 24">
    <title>drop</title>
    <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" />
    <path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
  </svg>
);

const SVGIconLongArrow: React.FC = () => (
  <svg className="icon icon--longarrow" viewBox="0 0 54 24">
    <title>longarrow</title>
    <path d="M.42 11.158L12.38.256c.333-.27.696-.322 1.09-.155.395.166.593.467.593.903v6.977h38.87c.29 0 .53.093.716.28.187.187.28.426.28.716v5.98c0 .29-.093.53-.28.716a.971.971 0 0 1-.716.28h-38.87v6.977c0 .416-.199.717-.592.903-.395.167-.759.104-1.09-.186L.42 12.62a1.018 1.018 0 0 1 0-1.462z" />
  </svg>
);

const SVGIconNavArrow: React.FC = () => (
  <svg className="icon icon--navarrow" viewBox="0 0 408 408">
    <title>navarrow</title>
    <polygon
      fill="#fff"
      fillRule="nonzero"
      points="204 0 168.3 35.7 311.1 178.5 0 178.5 0 229.5 311.1 229.5 168.3 372.3 204 408 408 204"
    ></polygon>
  </svg>
);

// --- Data Interfaces ---
interface SlideData {
  id: string;
  imageUrl: string;
  sideText: string;
  number: number;
  title: string;
  subtitle: string;
}

interface ContentData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  text: string;
}

// --- Default Data (should be passed as props ideally) ---
const defaultSlidesData: SlideData[] = [
  {
    id: "s1",
    imageUrl: "img/1.jpg",
    sideText: "Memories & Thoughts",
    number: 1,
    title: "Automation",
    subtitle: "A tree needs to be your friend if you're going to paint him",
  },
  {
    id: "s2",
    imageUrl: "img/2.jpg",
    sideText: "Random Roam",
    number: 2,
    title: "Machines",
    subtitle: "This is probably the greatest thing to happen in my life",
  },
  {
    id: "s3",
    imageUrl: "img/3.jpg",
    sideText: "Arbitrary Words",
    number: 3,
    title: "Coexistence",
    subtitle: "The only guide is your heart",
  },
  {
    id: "s4",
    imageUrl: "img/4.jpg",
    sideText: "Haunted Drift",
    number: 4,
    title: "Bellamio",
    subtitle: "The only prerequisite is that it makes you happy",
  },
  {
    id: "s5",
    imageUrl: "img/5.jpg",
    sideText: "Fun Diverge",
    number: 5,
    title: "Pastures",
    subtitle: "Let's go up in here, and start having some fun",
  },
  {
    id: "s6",
    imageUrl: "img/6.jpg",
    sideText: "Hopes & Dreams",
    number: 6,
    title: "Focus",
    subtitle: "This is unplanned it really just happens",
  },
];

const defaultContentData: ContentData[] = [
  {
    id: "c1",
    number: 1,
    title: "Automation",
    subtitle: "A tree needs to be your friend if you're going to paint him",
    text: "Just let this happen. We just let this flow right out of our minds. Just relax and let it flow. That easy. Let's put some happy little clouds in our world. It's a very cold picture, I may have to go get my coat. It's about to freeze me to death. This is gonna be a happy little seascape. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.",
  },
  {
    id: "c2",
    number: 2,
    title: "Machines",
    subtitle: "This is probably the greatest thing to happen in my life",
    text: "We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Now, we're going to fluff this cloud. We don't have anything but happy trees here. Let's do that again. Use what you see, don't plan it. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.",
  },
  {
    id: "c3",
    number: 3,
    title: "Coexistence",
    subtitle: "The only guide is your heart",
    text: "Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping. But we're not there yet, so we don't need to worry about it. Now let's put some happy little clouds in here. What the devil. A thin paint will stick to a thick paint. I'm going to mix up a little color. ",
  },
  {
    id: "c4",
    number: 4,
    title: "Bellamio",
    subtitle: "The only prerequisite is that it makes you happy",
    text: "See. We take the corner of the brush and let it play back-and-forth. This is unplanned it really just happens. I'm sort of a softy, I couldn't shoot Bambi except with a camera. I guess I'm a little weird. I like to talk to trees and animals. That's okay though; I have more fun than most people. We'll play with clouds today. Didn't you know you had that much power? You can move mountains. You can do anything. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.",
  },
  {
    id: "c5",
    number: 5,
    title: "Pastures",
    subtitle: "Let's go up in here, and start having some fun",
    text: "So often we avoid running water, and running water is a lot of fun. Everyone is going to see things differently - and that's the way it should be. A big strong tree needs big strong roots. Steve wants reflections, so let's give him reflections. We don't have to be committed. We are just playing here. Making all those little fluffies that live in the clouds. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.",
  },
  {
    id: "c6",
    number: 6,
    title: "Focus",
    subtitle: "This is unplanned it really just happens",
    text: "But we're not there yet, so we don't need to worry about it. Now let's put some happy little clouds in here. What the devil. A thin paint will stick to a thick paint. I'm going to mix up a little color. We'll use Van Dyke Brown, Permanent Red, and a little bit of Prussian Blue. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.",
  },
];

// --- Text Animation Functions (Replicating Charming) ---
const splitText = (text: string) => {
  return text.split("").map((char, index) => (
    <span key={index} data-initial={char} style={{ display: "inline-block" }}>
      {char}
    </span>
  ));
};

const randomizeLettersFn = (
  letterElements: HTMLSpanElement[]
): Promise<void> => {
  return new Promise((resolve) => {
    const lettersTotal = letterElements.length;
    if (lettersTotal === 0) {
      resolve();
      return;
    }
    let cnt = 0;

    letterElements.forEach((letter, pos) => {
      let loopTimeout: any;
      const loop = () => {
        letter.innerHTML = CHARS[getRandomInt(0, CHARS.length - 1)];
        loopTimeout = setTimeout(loop, getRandomInt(50, 250));
      };
      loop();

      const timeout = setTimeout(() => {
        clearTimeout(loopTimeout);
        letter.style.opacity = "1";
        letter.innerHTML = letter.dataset.initial || "";
        cnt++;
        if (cnt === lettersTotal) {
          resolve();
        }
      }, pos * Math.max(10, 500 / lettersTotal) + 50 * Math.random());
    });
  });
};

const disassembleLettersFn = (
  letterElements: HTMLSpanElement[]
): Promise<void> => {
  return new Promise((resolve) => {
    const lettersTotal = letterElements.length;
    if (lettersTotal === 0) {
      resolve();
      return;
    }
    let cnt = 0;

    letterElements.forEach((letter, pos) => {
      setTimeout(() => {
        gsap.to(letter, { opacity: 0, duration: 0.1 });
        cnt++;
        if (cnt === lettersTotal) {
          resolve();
        }
      }, pos * 20);
    });
  });
};

// --- Slide Component ---
interface SlideComponentProps {
  slideData: SlideData;
  isCurrent: boolean;
  isLeft: boolean;
  isRight: boolean;
  isVisible: boolean;
  onClick: () => void;
  winsize: { width: number; height: number };
  transforms: { x: number; y: number; rotation: number }[];
  positionIndex: number;
  allowTilt: boolean;
  isContentOpen: boolean;
}

const SlideComponent = React.forwardRef<
  {
    showTexts: (animate?: boolean) => void;
    hideTexts: (animate?: boolean) => void;
    moveToPosition: (settings: any) => Promise<void>;
    reset: () => void;
    hide: () => void;
  },
  SlideComponentProps
>(
  (
    {
      slideData,
      isCurrent,
      isVisible,
      onClick,
      transforms,
      positionIndex,
      allowTilt,
      isContentOpen,
    },
    ref
  ) => {
    const elRef = useRef<HTMLDivElement>(null);
    const imgWrapRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sideRef = useRef<HTMLDivElement>(null);

    const titleSpans = useRef<HTMLSpanElement[]>([]);
    const sideSpans = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
      if (titleRef.current) {
        titleRef.current.innerHTML = ""; // Clear previous
        slideData.title.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.dataset.initial = char;
          span.style.display = "inline-block";
          titleRef.current?.appendChild(span);
        });
        titleSpans.current = Array.from(
          titleRef.current.querySelectorAll("span")
        );
      }
      if (sideRef.current) {
        sideRef.current.innerHTML = ""; // Clear previous
        slideData.sideText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.dataset.initial = char;
          span.style.display = "inline-block";
          sideRef.current?.appendChild(span);
        });
        sideSpans.current = Array.from(
          sideRef.current.querySelectorAll("span")
        );
      }
    }, [slideData.title, slideData.sideText]);

    // Positioning
    useEffect(() => {
      if (imgWrapRef.current) {
        // Guard against invalid positionIndex
        if (positionIndex < 0 || positionIndex >= transforms.length) {
          // If positionIndex is invalid, hide the slide or set to a default safe state
          gsap.set(imgWrapRef.current, { opacity: 0 });
          return;
        }

        gsap.set(imgWrapRef.current, {
          x: transforms[positionIndex].x,
          y: transforms[positionIndex].y,
          rotationX: 0,
          rotationY: 0,
          opacity: isCurrent || isVisible ? 1 : 0,
          rotationZ: transforms[positionIndex].rotation,
        });
      }
    }, [positionIndex, transforms, isCurrent, isVisible]);

    const mouseenterFn = useCallback(() => {
      if (!isCurrent || !allowTilt || isContentOpen) return;
      gsap.to(imgRef.current, {
        duration: 0.8,
        ease: Power3.easeOut,
        scale: 1.1,
      });
    }, [isCurrent, allowTilt, isContentOpen]);

    const mousemoveFn = useCallback(
      (ev: React.MouseEvent) => {
        if (
          !isCurrent ||
          !allowTilt ||
          !imgWrapRef.current ||
          !titleWrapRef.current ||
          isContentOpen
        )
          return;

        const mousepos = getMousePos(ev.nativeEvent);
        const bounds = imgWrapRef.current.getBoundingClientRect();
        const relmousepos = {
          x: mousepos.x - bounds.left,
          y: mousepos.y - bounds.top,
        };

        const t = { x: [-20, 20], y: [-20, 20] };
        const r = { x: [-15, 15], y: [-15, 15] };

        const trans = {
          x: ((t.x[1] - t.x[0]) / bounds.width) * relmousepos.x + t.x[0],
          y: ((t.y[1] - t.y[0]) / bounds.height) * relmousepos.y + t.y[0],
        };
        const rot = {
          x: ((r.x[1] - r.x[0]) / bounds.height) * relmousepos.y + r.x[0],
          y: ((r.y[1] - r.y[0]) / bounds.width) * relmousepos.x + r.y[0],
        };

        gsap.to(imgWrapRef.current, {
          duration: 1.5,
          ease: "Power1.easeOut",
          x: transforms[positionIndex].x + trans.x, // Add tilt to base position
          y: transforms[positionIndex].y + trans.y,
          rotationX: rot.x,
          rotationY: rot.y,
        });
        gsap.to(titleWrapRef.current, {
          duration: 1.5,
          ease: "Power1.easeOut",
          x: -trans.x, // Counter-move text
          y: -trans.y,
        });
      },
      [isCurrent, allowTilt, transforms, positionIndex, isContentOpen]
    );

    const mouseleaveFn = useCallback(() => {
      if (!isCurrent || !allowTilt || isContentOpen) return;
      // Animate imgWrapRef
      if (imgWrapRef.current) {
        gsap.to(imgWrapRef.current, {
          duration: 1.8,
          ease: "Power4.easeOut",
          x: transforms[positionIndex].x,
          y: transforms[positionIndex].y,
          rotationX: 0,
          rotationY: 0,
        });
      }
      // Animate titleWrapRef
      if (titleWrapRef.current) {
        gsap.to(titleWrapRef.current, {
          duration: 1.8,
          ease: "Power4.easeOut",
          x: 0,
          y: 0,
          rotationX: 0, // Ensure these are also reset for the title if they were affected elsewhere
          rotationY: 0,
        });
      }
      // Animate imgRef scale
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          duration: 1.8,
          ease: "Power4.easeOut",
          scale: 1,
        });
      }
    }, [isCurrent, allowTilt, transforms, positionIndex, isContentOpen]);

    // Text animations (simplified for now)
    const showTexts = useCallback((animate = true) => {
      gsap.set([titleWrapRef.current, sideRef.current], { opacity: 1 });
      if (animate) {
        if (titleSpans.current.length > 0)
          randomizeLettersFn(titleSpans.current);
        if (sideSpans.current.length > 0) randomizeLettersFn(sideSpans.current);
        const slideNumberEl = elRef.current?.querySelector(".slide__number");
        if (slideNumberEl) {
          gsap.to(slideNumberEl, {
            duration: 0.6,
            ease: Elastic.easeOut.config(1, 0.5),
            x: "0%",
            opacity: 1,
            startAt: { x: "-10%", opacity: 0 },
          });
        }
      } else {
        if (titleSpans.current.length > 0)
          titleSpans.current.forEach((s) => {
            s.innerHTML = s.dataset.initial || "";
            s.style.opacity = "1";
          });
        if (sideSpans.current.length > 0)
          sideSpans.current.forEach((s) => {
            s.innerHTML = s.dataset.initial || "";
            s.style.opacity = "1";
          });
        const slideNumberEl = elRef.current?.querySelector(".slide__number");
        if (slideNumberEl) {
          gsap.set(slideNumberEl, {
            x: "0%",
            opacity: 1,
          });
        }
      }
    }, []);

    const hideTexts = useCallback((animate = false) => {
      if (animate) {
        if (titleSpans.current.length > 0)
          disassembleLettersFn(titleSpans.current).then(() =>
            gsap.set(titleWrapRef.current, { opacity: 0 })
          );
        if (sideSpans.current.length > 0)
          disassembleLettersFn(sideSpans.current).then(() =>
            gsap.set(sideRef.current, { opacity: 0 })
          );
      } else {
        gsap.set([titleWrapRef.current, sideRef.current], { opacity: 0 });
      }
    }, []);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      showTexts,
      hideTexts,
      moveToPosition: (settings: any) => {
        return new Promise<void>((resolve) => {
          if (!imgWrapRef.current) {
            resolve();
            return;
          }
          // Guard against invalid settings.position + 2
          const targetTransformIndex = settings.position + 2;
          if (
            targetTransformIndex < 0 ||
            targetTransformIndex >= transforms.length
          ) {
            console.warn(
              "Invalid target position in moveToPosition:",
              settings.position
            );
            // Optionally, handle this more gracefully, e.g., by not animating or resolving immediately
            resolve();
            return;
          }

          gsap.to(imgWrapRef.current, {
            duration: 0.8,
            ease: Power4.easeInOut,
            delay: settings.delay || 0,
            x: transforms[targetTransformIndex].x,
            y: transforms[targetTransformIndex].y,
            rotationX: 0,
            rotationY: 0,
            rotationZ: transforms[targetTransformIndex].rotation,
            opacity: 1,
            onStart:
              settings.from !== undefined
                ? () => {
                    gsap.set(imgWrapRef.current, {
                      opacity: 1,
                    });
                  }
                : undefined,
            onComplete: resolve,
          });
          if (settings.resetImageScale && imgRef.current) {
            gsap.to(imgRef.current, {
              duration: 0.8,
              ease: Power4.easeInOut,
              scale: 1,
            });
          }
        });
      },
      reset: () => {
        /* Add class reset logic if needed */
      },
      hide: () => {
        if (imgWrapRef.current) gsap.set(imgWrapRef.current, { opacity: 0 });
      },
    }));

    useEffect(() => {
      if (isCurrent && !isContentOpen) {
        showTexts();
      } else if (!isCurrent || isContentOpen) {
        hideTexts();
      }
    }, [isCurrent, isContentOpen, showTexts, hideTexts]);

    let slideClasses = "slide";
    if (isCurrent) slideClasses += " slide--current";
    if (isVisible) slideClasses += " slide--visible";

    return (
      <div ref={elRef} className={slideClasses} data-id={slideData.id}>
        <div
          ref={imgWrapRef}
          className="slide__img-wrap"
          onClick={onClick}
          onMouseEnter={mouseenterFn}
          onMouseMove={mousemoveFn}
          onMouseLeave={mouseleaveFn}
        >
          <div
            ref={imgRef}
            className="slide__img"
            style={{ backgroundImage: `url(${slideData.imageUrl})` }}
          ></div>
        </div>
        <div ref={sideRef} className="slide__side">
          {/* Spans injected by useEffect */}
        </div>
        <div ref={titleWrapRef} className="slide__title-wrap">
          <span className="slide__number">{slideData.number}</span>
          <h3 ref={titleRef} className="slide__title">
            {/* Spans injected by useEffect */}
          </h3>
          <h4 className="slide__subtitle">{slideData.subtitle}</h4>
        </div>
      </div>
    );
  }
);

SlideComponent.displayName = "SlideComponent";

// --- Content Item Component ---
interface ContentItemComponentProps {
  contentData: ContentData;
  isCurrent: boolean;
  onClose: () => void;
}

const ContentItemComponent = React.forwardRef<
  { show: () => void; hide: () => void },
  ContentItemComponentProps
>(({ contentData, isCurrent, onClose }, ref) => {
  const elRef = useRef<HTMLDivElement>(null);
  const backCtrlRef = useRef<HTMLButtonElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    if (!elRef.current) return;
    elRef.current.classList.add("content__item--current");
    gsap.to(
      [
        backCtrlRef.current,
        numberRef.current,
        titleRef.current,
        subtitleRef.current,
        textRef.current,
      ],
      {
        duration: 0.8,
        ease: Power4.easeOut,
        delay: 0.4,
        opacity: 1,
        y: 0,
        startAt: { y: 40 },
        stagger: 0.05,
      }
    );
  }, []);

  const hide = useCallback(() => {
    if (!elRef.current) return;
    elRef.current.classList.remove("content__item--current");
    gsap.to(
      [
        backCtrlRef.current,
        numberRef.current,
        titleRef.current,
        subtitleRef.current,
        textRef.current,
      ].reverse(),
      {
        duration: 0.3,
        ease: Power3.easeIn,
        opacity: 0,
        y: 10,
        stagger: 0.01,
      }
    );
  }, []);

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <div
      ref={elRef}
      className={`content__item ${isCurrent ? "content__item--current" : ""}`}
    >
      {/* This button is part of the parent .content div in original HTML, moved here for simplicity */}
      {isCurrent && (
        <button
          ref={backCtrlRef}
          className="content__close"
          onClick={onClose}
          style={{ opacity: 0 }}
        >
          {" "}
          {/* Style set by GSAP */}
          <SVGIconLongArrow />
        </button>
      )}
      <span ref={numberRef} className="content__number" style={{ opacity: 0 }}>
        {contentData.number}
      </span>
      <h3 ref={titleRef} className="content__title" style={{ opacity: 0 }}>
        {contentData.title}
      </h3>
      <h4
        ref={subtitleRef}
        className="content__subtitle"
        style={{ opacity: 0 }}
      >
        {contentData.subtitle}
      </h4>
      <div ref={textRef} className="content__text" style={{ opacity: 0 }}>
        {contentData.text}
      </div>
    </div>
  );
});

ContentItemComponent.displayName = "ContentItemComponent";

// --- Main Slideshow Component ---
interface DiagonalSlideshowProps {
  slidesData?: SlideData[];
  contentData?: ContentData[];
}

const DiagonalSlideshow: React.FC<DiagonalSlideshowProps> = ({
  slidesData = defaultSlidesData,
  contentData = defaultContentData,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [winsize, setWinsize] = useState({ width: 0, height: 0 });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allowTiltGlobal, setAllowTiltGlobal] = useState(true);

  const slideshowRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<
    ({
      moveToPosition: (settings: any) => Promise<void>;
      showTexts: (animate?: boolean) => void;
      hideTexts: (animate?: boolean) => void;
      hide: () => void;
      reset: () => void;
    } | null)[]
  >([]);
  const contentItemRefs = useRef<
    ({
      show: () => void;
      hide: () => void;
    } | null)[]
  >([]);

  // Calculate transforms for slides based on window size
  const slideTransforms = useMemo(() => {
    // Assuming slide image wrap width/height is dynamic or fixed via CSS.
    // For simplicity, using placeholder or requiring CSS to define this.
    // Original demo calculates this dynamically. Here we use percentages of winsize
    // or fixed values. This needs to match your CSS for .slide__img-wrap
    const slideWidth = winsize.width * 0.27; // Example: 27% of viewport width
    const slideHeight = winsize.height * 0.8; // Example: 80% of viewport height

    return [
      {
        x: -1 * (winsize.width / 2 + slideWidth),
        y: -1 * (winsize.height / 2 + slideHeight),
        rotation: -30,
      },
      {
        x: -1 * (winsize.width / 2 - slideWidth / 3),
        y: -1 * (winsize.height / 2 - slideHeight / 3),
        rotation: 0,
      },
      { x: 0, y: 0, rotation: 0 },
      {
        x: winsize.width / 2 - slideWidth / 3,
        y: winsize.height / 2 - slideHeight / 3,
        rotation: 0,
      },
      {
        x: winsize.width / 2 + slideWidth,
        y: winsize.height / 2 + slideHeight,
        rotation: 30,
      },
      {
        x: -1 * (winsize.width / 2 - slideWidth / 2 - winsize.width * 0.075),
        y: 0,
        rotation: 0,
      },
    ];
  }, [winsize]);

  useEffect(() => {
    // Set initial window size on client mount
    setWinsize(getWinSize());

    document.documentElement.classList.add("js");
    const supportsCssVars = () => {
      const style = document.createElement("style");
      style.innerHTML = "root: { --tmp-var: bold; }";
      document.head.appendChild(style);
      const supported = !!(
        window.CSS &&
        window.CSS.supports &&
        window.CSS.supports("font-weight", "var(--tmp-var)")
      );
      style.parentNode?.removeChild(style);
      return supported;
    };
    if (!supportsCssVars()) {
      // Consider a less obtrusive way to inform the user in a React app
      alert(
        "Please view this demo in a modern browser that supports CSS Variables."
      );
    }

    // Image preloading
    const images = slidesData.map((s) => s.imageUrl);
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoading(false);
          document.body.classList.remove("loading");
        }
      };
    });
    if (images.length === 0) {
      setIsLoading(false);
      document.body.classList.remove("loading");
    }
  }, [slidesData]);

  useEffect(() => {
    const handleResize = () => {
      setWinsize(getWinSize());
      // Recalculate positions or trigger re-render if necessary
      if (isContentOpen && decoRef.current) {
        gsap.set(decoRef.current, {
          scaleX: getWinSize().width / decoRef.current.offsetWidth,
          scaleY: getWinSize().height / decoRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isContentOpen]);

  const getSlideElement = (index: number) => slideRefs.current[index];
  const getContentElement = (index: number) => contentItemRefs.current[index];

  const showContentHandler = useCallback(() => {
    if (isContentOpen || isAnimating) return;
    setIsAnimating(true);
    setAllowTiltGlobal(false);
    setIsContentOpen(true);

    if (slideshowRef.current)
      slideshowRef.current.classList.add("slideshow--previewopen");
    if (decoRef.current) {
      gsap.to(decoRef.current, {
        duration: 0.8,
        ease: Power4.easeInOut,
        scaleX: winsize.width / decoRef.current.offsetWidth,
        scaleY: winsize.height / decoRef.current.offsetHeight,
        x: -20,
        y: 20,
      });
    }

    const currentS = getSlideElement(currentSlideIndex);
    const prevS = getSlideElement(
      (currentSlideIndex - 1 + slidesData.length) % slidesData.length
    );
    const nextS = getSlideElement((currentSlideIndex + 1) % slidesData.length);

    prevS?.moveToPosition({ position: -2 }); // move to left-out
    nextS?.moveToPosition({ position: 2 }); // move to right-out
    currentS?.moveToPosition({ position: 3, resetImageScale: true }); // move to content-open position (index 5 in transforms is '3' here)

    const currentC = getContentElement(currentSlideIndex);
    currentC?.show();
    currentS?.hideTexts(true);
    setIsAnimating(false); // Simplified: original demo might have more complex promise chaining for this
  }, [
    isContentOpen,
    isAnimating,
    currentSlideIndex,
    slidesData.length,
    winsize,
    slideTransforms,
  ]);

  const hideContentHandler = useCallback(() => {
    if (!isContentOpen || isAnimating) return;
    setIsAnimating(true);

    if (slideshowRef.current)
      slideshowRef.current.classList.remove("slideshow--previewopen");

    const currentC = getContentElement(currentSlideIndex);
    currentC?.hide();

    if (decoRef.current) {
      gsap.to(decoRef.current, {
        duration: 0.8,
        ease: Power4.easeInOut,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      });
    }

    const currentS = getSlideElement(currentSlideIndex);
    const prevS = getSlideElement(
      (currentSlideIndex - 1 + slidesData.length) % slidesData.length
    );
    const nextS = getSlideElement((currentSlideIndex + 1) % slidesData.length);

    prevS?.moveToPosition({ position: -1 }); // move to left
    nextS?.moveToPosition({ position: 1 }); // move to right
    currentS?.moveToPosition({ position: 0 }).then(() => {
      // move to center
      setAllowTiltGlobal(true);
      setIsContentOpen(false);
      setIsAnimating(false);
    });
    currentS?.showTexts();
  }, [
    isContentOpen,
    isAnimating,
    currentSlideIndex,
    slidesData.length,
    slideTransforms,
  ]);

  const bounceDeco = (direction: "next" | "prev", delay: number) => {
    if (!decoRef.current) return;
    gsap.to(decoRef.current, {
      duration: 0.4,
      ease: "Power2.easeIn",
      delay: delay + delay * 0.2,
      x: direction === "next" ? -40 : 40,
      y: direction === "next" ? -40 : 40, // Original had y also change
      onComplete: () => {
        gsap.to(decoRef.current, {
          duration: 0.6,
          ease: "Power2.easeOut",
          x: 0,
          y: 0,
        });
      },
    });
  };

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating || isContentOpen) return;
      setIsAnimating(true);
      setAllowTiltGlobal(false);

      const prevSlideOld = getSlideElement(
        (currentSlideIndex - 1 + slidesData.length) % slidesData.length
      );
      const currentSlideOld = getSlideElement(currentSlideIndex);
      const nextSlideOld = getSlideElement(
        (currentSlideIndex + 1) % slidesData.length
      );

      const newCurrentIndex =
        direction === "next"
          ? (currentSlideIndex + 1) % slidesData.length
          : (currentSlideIndex - 1 + slidesData.length) % slidesData.length;

      const upcomingSlideIndex =
        direction === "next"
          ? (newCurrentIndex + 1) % slidesData.length
          : (newCurrentIndex - 1 + slidesData.length) % slidesData.length;
      const upcomingSlide = getSlideElement(upcomingSlideIndex);

      // Hide texts of current slide that is moving away
      currentSlideOld?.hideTexts();
      bounceDeco(direction, 0.07);

      // Animate slides
      prevSlideOld
        ?.moveToPosition({
          position: direction === "next" ? -2 : 0,
          delay: direction === "next" ? 0 : 0.14,
        })
        .then(() => {
          if (direction === "next") prevSlideOld?.hide();
        });

      currentSlideOld?.moveToPosition({
        position: direction === "next" ? -1 : 1,
        delay: 0.07,
      });

      nextSlideOld
        ?.moveToPosition({
          position: direction === "next" ? 0 : 2,
          delay: direction === "next" ? 0.14 : 0,
        })
        .then(() => {
          if (direction === "prev") nextSlideOld?.hide();
        });

      // The new current slide (which was 'next' or 'prev') shows its texts
      const newCurrentSlide = getSlideElement(newCurrentIndex);
      newCurrentSlide?.showTexts();

      upcomingSlide
        ?.moveToPosition({
          position: direction === "next" ? 1 : -1,
          from: direction === "next" ? 2 : -2,
          delay: 0.21,
        })
        .then(() => {
          // Reset classes for all involved slides (simplified, original demo does more specific reset)
          slideRefs.current.forEach((sRef) =>
            getSlideElement(slideRefs.current.indexOf(sRef))?.reset()
          );

          setCurrentSlideIndex(newCurrentIndex); // Update current index AFTER animations are set up
          setAllowTiltGlobal(true);
          setIsAnimating(false);
        });
    },
    [
      isAnimating,
      currentSlideIndex,
      slidesData.length,
      isContentOpen,
      slideTransforms,
    ]
  );

  const handleSlideClick = (slideIdx: number) => {
    if (isAnimating) return;
    if (slideIdx === currentSlideIndex) {
      showContentHandler();
    } else if (slideIdx === (currentSlideIndex + 1) % slidesData.length) {
      navigate("next");
    } else if (
      slideIdx ===
      (currentSlideIndex - 1 + slidesData.length) % slidesData.length
    ) {
      navigate("prev");
    }
  };

  if (isLoading && slidesData.length > 0) {
    // Basic loader text, original has CSS animation
    // return <div>Loading slideshow...</div>;
    // The loading class on body is handled by useEffect
  }
  if (slidesData.length < 4) {
    return <div>Requires at least 4 slides.</div>;
  }

  return (
    <>
      <div className="frame">
        <header className="codrops-header">
          <h1 className="codrops-header__title">Diagonal Slideshow</h1>
          <div className="codrops-links">
            <a
              className="github"
              href="https://github.com/codrops/DiagonalSlideshow/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="codrops-icon codrops-icon--prev"
              href="https://tympanus.net/Development/SlideOutBoxMenu/"
              title="Previous Demo"
            >
              <SVGIconArrow />
            </a>
            <a
              className="codrops-icon codrops-icon--drop"
              href="https://tympanus.net/codrops/?p=35765"
              title="Back to the article"
            >
              <SVGIconDrop />
            </a>
          </div>
        </header>
      </div>

      <div
        ref={slideshowRef}
        className={`slideshow ${isContentOpen ? "slideshow--previewopen" : ""}`}
      >
        <div ref={decoRef} className="slideshow__deco"></div>
        {slidesData.map((slide, index) => {
          const isCurrent = index === currentSlideIndex;
          const isNext = index === (currentSlideIndex + 1) % slidesData.length;
          const isPrev =
            index ===
            (currentSlideIndex - 1 + slidesData.length) % slidesData.length;

          let positionIdx = -1; // Default to hidden or undefined state
          if (isContentOpen) {
            if (isCurrent) positionIdx = 5; // center-content-open
            else if (isPrev) positionIdx = 0; // left-out
            else if (isNext) positionIdx = 4; // right-out
            // Other slides are implicitly hidden or positioned far off by CSS/lack of explicit positioning
          } else {
            if (isCurrent) positionIdx = 2; // center
            else if (isPrev) positionIdx = 1; // left
            else if (isNext) positionIdx = 3; // right
            // Check for upcoming slides (2 away)
            else if (index === (currentSlideIndex + 2) % slidesData.length)
              positionIdx = 4; // right-out initially
            else if (
              index ===
              (currentSlideIndex - 2 + slidesData.length) % slidesData.length
            )
              positionIdx = 0; // left-out initially
          }

          return (
            <SlideComponent
              key={slide.id}
              ref={(
                el: {
                  showTexts: (animate?: boolean) => void;
                  hideTexts: (animate?: boolean) => void;
                  moveToPosition: (settings: any) => Promise<void>;
                  reset: () => void;
                  hide: () => void;
                } | null
              ) => {
                slideRefs.current[index] = el;
              }}
              slideData={slide}
              isCurrent={isCurrent}
              isLeft={isPrev && !isContentOpen}
              isRight={isNext && !isContentOpen}
              isVisible={
                isCurrent ||
                (isPrev && !isContentOpen) ||
                (isNext && !isContentOpen)
              }
              onClick={() => handleSlideClick(index)}
              winsize={winsize}
              transforms={slideTransforms}
              positionIndex={positionIdx}
              allowTilt={allowTiltGlobal && isCurrent && !isContentOpen}
              isContentOpen={isContentOpen && isCurrent}
            />
          );
        })}

        <button
          className="nav nav--prev"
          onClick={() => navigate("prev")}
          style={{ pointerEvents: isContentOpen ? "none" : "auto" }}
        >
          <SVGIconNavArrow />
        </button>
        <button
          className="nav nav--next"
          onClick={() => navigate("next")}
          style={{ pointerEvents: isContentOpen ? "none" : "auto" }}
        >
          <SVGIconNavArrow />
        </button>
      </div>

      <div className="content">
        {contentData.map((content, index) => (
          <ContentItemComponent
            key={content.id}
            ref={(el: { show: () => void; hide: () => void } | null) => {
              contentItemRefs.current[index] = el;
            }}
            contentData={content}
            isCurrent={index === currentSlideIndex && isContentOpen}
            onClose={hideContentHandler}
          />
        ))}
        {/* Close button moved into ContentItemComponent for active content */}
      </div>
    </>
  );
};

export default DiagonalSlideshow;
