import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SlideTextProps {
  direction?: "left" | "right" | "up" | "down";
  children?: React.ReactNode;
}

const TextContainer: React.FC<SlideTextProps> = ({
  direction = "right",
  children,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  let initialPosition = 0;
  let initialProps = {};
  let animateProps = {};

  switch (direction) {
    case "right":
      initialPosition = 100;
      initialProps = { x: initialPosition, opacity: 0 };
      animateProps = {
        x: inView ? 0 : initialPosition,
        opacity: inView ? 1 : 0,
      };
      break;
    case "left":
      initialPosition = -100;
      initialProps = { x: initialPosition, opacity: 0 };
      animateProps = {
        x: inView ? 0 : initialPosition,
        opacity: inView ? 1 : 0,
      };
      break;
    case "up":
      initialPosition = -100;
      initialProps = { y: initialPosition, opacity: 0 };
      animateProps = {
        y: inView ? 0 : initialPosition,
        opacity: inView ? 1 : 0,
      };
      break;
    case "down":
      initialPosition = 100;
      initialProps = { y: initialPosition, opacity: 0 };
      animateProps = {
        y: inView ? 0 : initialPosition,
        opacity: inView ? 1 : 0,
      };
      break;
  }

  return (
    <div className="container" style={{ display: "flex" }}>
      <motion.div
        ref={ref}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextContainer;
