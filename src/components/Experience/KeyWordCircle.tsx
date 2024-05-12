import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SmallCircleComponentProps {
  idx: number;
  keyword: string;
}

const SmallCircleComponent: React.FC<SmallCircleComponentProps> = ({
  idx,
  keyword,
}) => {
  return <SmallCircle>{keyword}</SmallCircle>;
};

const SmallCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(197, 201, 255, 0.7) 23.15%,
    rgba(255, 255, 255, 0) 141.03%
  );
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-700, #343a5d);
  font-size: 10px;
  fill: rgba(255, 245, 209, 0.1);
  box-shadow: 0px 0.787px 0.787px 0px rgba(125, 130, 255, 0.05) inset,
    0px 3.148px 3.148px 0px rgba(125, 130, 255, 0.1) inset,
    0px 3.148px 28.334px 0px rgba(125, 130, 255, 0.76) inset;
  backdrop-filter: blur(14.167028427124023px);
`;

export default SmallCircleComponent;
