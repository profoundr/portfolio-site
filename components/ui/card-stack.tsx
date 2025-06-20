"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  image?: string;
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

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-[500px] w-[500px] md:h-[500px] md:w-[500px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-[500px] w-[500px] md:h-[500px] md:w-[500px] rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-end overflow-hidden"
            style={{
              transformOrigin: "top center",
              backgroundImage: card.image ? `url(${card.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              left: index * CARD_OFFSET,
              scale: 1, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/20"></div>

            {/* Name and designation */}
            <div className="relative z-10">
              {/* <p className="text-white font-medium text-lg">{card.name}</p>
              <p className="text-white/80 font-normal">{card.designation}</p> */}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
