import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SmallCircleComponentProps {
  idx: number;
  keyword: string;
}

const SmallCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(197, 201, 255, 0.70) 23.15%, rgba(255, 255, 255, 0.00) 141.03%);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-700, #343A5D);
  font-size: 10px;
`;

const SmallCircleComponent: React.FC<SmallCircleComponentProps> = ({
  idx,
  keyword,
}) => {
  return <SmallCircle>{keyword}</SmallCircle>;
};

export default SmallCircleComponent;
