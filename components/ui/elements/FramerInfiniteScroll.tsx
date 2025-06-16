"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

interface ScrollItemProps {
  children: React.ReactNode;
  index: number;
}

const ScrollItem = ({ children, index }: ScrollItemProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };

  return (
    <motion.li
      variants={item}
      initial="hidden"
      animate={controls}
      ref={ref}
      style={{
        listStyle: "none",
        marginBottom: "2rem",
        position: "relative",
        width: "45vw",
        aspectRatio: "16/9",
        height: "auto",
      }}
    >
      {children}
    </motion.li>
  );
};

interface InfiniteScrollCarouselProps {
  items: React.ReactNode[];
  itemsPerLoad?: number;
}

const FramerInfiniteCarousel: React.FC<InfiniteScrollCarouselProps> = ({
  items,
  itemsPerLoad = 3,
}) => {
  const [displayedItems, setDisplayedItems] = useState<React.ReactNode[]>([]);

  const getMoreItems = () => {
    const currentLength = displayedItems.length;
    // Calculate which items to show next by using modulo to cycle through the array
    const newItems = Array.from({ length: itemsPerLoad }, (_, index) => {
      const itemIndex = (currentLength + index) % items.length;
      return items[itemIndex];
    });

    setDisplayedItems((prev) => [...prev, ...newItems]);
  };

  useEffect(() => {
    // Load initial items
    getMoreItems();
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <InfiniteScroll
        dataLength={displayedItems.length}
        next={getMoreItems}
        hasMore={true} // Always true for infinite scrolling
        loader={<h4>Loading...</h4>}
        style={{ overflow: "hidden" }} // Prevent double scrollbars
      >
        <motion.ul
          initial="hidden"
          animate="show"
          variants={container}
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          {displayedItems.map((item, idx) => (
            <ScrollItem key={idx} index={idx}>
              {item}
            </ScrollItem>
          ))}
        </motion.ul>
      </InfiniteScroll>
    </div>
  );
};

export default FramerInfiniteCarousel;
