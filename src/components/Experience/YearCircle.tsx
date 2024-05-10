import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import SmallCircleComponent from "./KeyWordCircle";

interface YearCircleComponentProps {
  year: number;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  layout: boolean;
}

const YearCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: skyblue;
  position: absolute;
  top: -20px; 
`;

const YearCircleComponent: React.FC<YearCircleComponentProps> = ({
  year,
  index,
  isSelected,
  onClick,
  layout,
}) => {
  return (
    <YearCircle
      initial={false}
      animate={{
        x: index * 100, // 위치 계산
        scale: isSelected ? 2 : 1,
      }}
      whileHover={{ scale: 2 }}
      onClick={onClick}
      layout={layout}
    >
      {isSelected &&
        Array.from({ length: 4 }).map((_, idx) => (
          <SmallCircleComponent key={idx} idx={idx} />
        ))}
    </YearCircle>
  );
};

export default YearCircleComponent;
