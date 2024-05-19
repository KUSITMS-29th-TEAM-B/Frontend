import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SlideTextProps {
  direction?: "left" | "right";
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

  const initialX = direction === "right" ? 100 : -100;

  return (
    <div
      className="container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <motion.div
        ref={ref}
        initial={{ x: initialX, opacity: 0 }}
        animate={{ x: inView ? 0 : initialX, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextContainer;
