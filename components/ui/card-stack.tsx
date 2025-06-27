"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

let interval: any;

type Card = {
  id: number;
  image: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        // Wait for animation to complete before moving card to back
        setTimeout(() => {
          setCards((prevCards: Card[]) => {
            const newArray = [...prevCards];
            newArray.push(newArray.shift()!);
            return newArray;
          });
          setIsAnimating(false);
        }, 600); // Match animation duration
      }
    }, 5000);
  };

  return (
    <div className="relative w-[360px] h-[550px]">
      <AnimatePresence mode="wait">
        {cards.map((card, index) => {
          const isTopCard = index === 0;

          return (
            <motion.div
              key={card.id}
              className="absolute dark:bg-black bg-white w-[360px] h-[570px] p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
              style={{
                transformOrigin: "top center",
              }}
              initial={{
                top: index * -CARD_OFFSET,
                left: index * CARD_OFFSET,
                scale: 1,
                zIndex: cards.length - index,
                x: 0,
                opacity: 1,
              }}
              animate={{
                top: index * -CARD_OFFSET,
                left: index * CARD_OFFSET,
                scale: 1,
                zIndex: cards.length - index,
                x: isTopCard && isAnimating ? 400 : 0,
                opacity: isTopCard && isAnimating ? 0 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              exit={{
                x: 400,
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
            >
              <Image
                src={card.image}
                alt={card.image}
                width={600}
                height={600}
                className="object-cover aspect-[5/7]"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
