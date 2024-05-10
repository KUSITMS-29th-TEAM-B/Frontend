import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import KeyWordCircle from "./KeyWordCircle";

interface YearCircleComponentProps {
  year: number;
  keywordList: string[];
}

const YearCircle = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--neutral-200, #EEEFF7);
  position: absolute;
  top: -40px;
`;

const YearText = styled.div`
  display: flex;
  justify-content: center;
  padding: 35%;
  color: #4F4F4F;
`;

// const KeyWordContainer = styled(motion.div)<{ angle: number }>`
//    position: absolute;
//    margin: -3rem;
// `;

const KeyWordContainer = styled(motion.div)<{ x: number; y: number }>`
  position: absolute;
  width: 20px; 
  height: 20px;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const YearCircleComponent: React.FC<YearCircleComponentProps> = ({
  year,
  keywordList,
}) => {
  const [hover, setHover] = useState(false);
  const radius = 50;
  const centralWidth = 60;
  const surroundWidth = 40;
  const angles = [-60, -15, 30, 75];

  const calculatePosition = (angle: number) => {
    const radian = (angle / 180) * Math.PI;
    const x = Math.cos(radian) * radius + centralWidth / 2 - surroundWidth / 2;
    const y = Math.sin(radian) * radius + centralWidth / 2 - surroundWidth / 2;
    return { x, y };
  };

  const containerVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      x: centralWidth / 2 - surroundWidth / 2,
      y: centralWidth / 2 - surroundWidth / 2,
    },
    animate: (i: any) => ({
      scale: 1,
      opacity: 1,
      x: calculatePosition(angles[i]).x,
      y: calculatePosition(angles[i]).y,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120,
      },
    }),
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  };
  return (
    <YearCircle
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <YearText>{year}</YearText>
      {hover &&
        keywordList.map((keyword, index) => {
          if (index < angles.length) {
            const position = calculatePosition(angles[index]);
            return (
              <KeyWordContainer
                key={index}
                x={position.x}
                y={position.y}
                custom={index}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <KeyWordCircle idx={index} />
              </KeyWordContainer>
            );
          }
          return null;
        })}
    </YearCircle>
  );
};

export default YearCircleComponent;
