import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SmallCircleComponentProps {
  idx: number;
}

const SmallCircle = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: orange;
  position: absolute;
`;

const SmallCircleComponent: React.FC<SmallCircleComponentProps> = ({ idx }) => {
  return (
    <SmallCircle
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 60 * Math.cos((idx * Math.PI) / 2),
        y: 60 * Math.sin((idx * Math.PI) / 2),
      }}
      whileHover={{ scale: 1.5 }}
      layout
    />
  );
};

export default SmallCircleComponent;
