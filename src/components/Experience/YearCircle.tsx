import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import KeyWordCircle from "./KeyWordCircle";

interface YearCircleComponentProps {
  year: number;
  keywordList: string[];
  selectedYear: number | null;
  clicked: boolean;
}

const YearCircle = styled(motion.div)<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  background:${({ isSelected }) =>
    isSelected
      ? "linear-gradient(180deg, #7D82FF 0%, rgba(125, 130, 255, 0.20) 100%)"
      : "var(--neutral-200, #EEEFF7)"}; 
       background-color: ${({ isSelected }) =>
         isSelected ? "#D6E4FF" : "var(--neutral-200, #EEEFF7)"}; 
  background-color: ${({ isSelected }) =>
    isSelected ? "#FFF" : "var(--neutral-200, #EEEFF7)"}; 
  top: -40px;
`;

const YearText = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  padding: 35%;
  color: ${({ isSelected }) => (isSelected ? "#FFF" : "#63698D")}; 
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 500)}; 
`;

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
  selectedYear,
  clicked,
}) => {
  const [hover, setHover] = useState(false);

  //   useEffect(() => {
  //     console.log(
  //       "keyword: " +
  //         year +
  //         "  hover여부  " +
  //         (hover || (clicked && year === selectedYear))
  //     );
  //   }, [selectedYear, clicked]);

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
      isSelected={year === selectedYear}
      onHoverStart={() => !clicked && setHover(true)}
      onHoverEnd={() => !clicked && setHover(false)}
    >
      <YearText isSelected={year === selectedYear}>{year}</YearText>
      {(hover || clicked) &&
        year === selectedYear &&
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
                <KeyWordCircle idx={index} keyword={keywordList[index]} />
              </KeyWordContainer>
            );
          }
          return null;
        })}
    </YearCircle>
  );
};

export default YearCircleComponent;