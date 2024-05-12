import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
// import KeyWordCircle from "./KeyWordCircle";
import yearCircle from "../../assets/images/yearActiveCircle.png";
import { useRecoilState } from "recoil";
import { yearState } from "../../store/selectedStore";

interface YearCircleComponentProps {
  year: number;
  keywordList: string[];
  hoveredYear: number | null;
  clickedYear?: number | null;
  handleClickedYear: (year: number) => void;
}

const YearCircleComponent: React.FC<YearCircleComponentProps> = ({
  year,
  keywordList,
  hoveredYear,
  clickedYear,
  handleClickedYear,
}) => {
  const [selectedYear, setSelectedYear] = useRecoilState<number | null>(
    yearState
  );
  console.log("selectedYear", selectedYear);

  const [clickedTag, setClickedTag] = useState("");
  const isClickedYear = clickedYear === year;
  const isHoveredYear = hoveredYear === year;

  const radius = 40;
  const centralWidth = 90;
  const surroundWidth = 40;
  const angles = [-60, -15, 30, 75, 120];

  // 주변 원 위치 계산
  const calculatePosition = (angle: number) => {
    const radian = (angle / 180) * Math.PI;
    const x = Math.cos(radian) * radius + centralWidth / 2 - surroundWidth / 2;
    const y = Math.sin(radian) * radius + centralWidth / 2 - surroundWidth / 2;
    return { x, y };
  };

  // 주변 원 애니메이션 설정값
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

  // 주변 원(상위태그 원) 클릭 함수
  const handleTagClick = (e: any, year: number, keyword: string) => {
    e.stopPropagation();
    handleClickedYear(year);
    setClickedTag(keyword);
    console.log(keyword);
  };

  //
  //
  //
  return (
    <YearCircle isActive={isClickedYear || (!clickedYear && isHoveredYear)}>
      <YearText isActive={isClickedYear || (!clickedYear && isHoveredYear)}>
        {year}
      </YearText>

      {(isClickedYear || (!clickedYear && isHoveredYear)) &&
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
                onClick={(e) => handleTagClick(e, year, keyword)}
              >
                <KeywordCircle
                  animate={{ scale: clickedTag === keyword ? 1.3 : 1 }}
                  whileHover={{ scale: 1.3 }}
                >
                  {keyword}
                </KeywordCircle>
              </KeyWordContainer>
            );
          }
          return null;
        })}
    </YearCircle>
  );
};

const YearCircle = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${({ isActive: isSelected }) =>
    isSelected
      ? // ? "linear-gradient(180deg, #7D82FF 0%, rgba(125, 130, 255, 0.20) 100%)"
        `url(${yearCircle})`
      : "var(--neutral-200, #EEEFF7)"};
  background-size: cover;
  top: -80px;
`;

const YearText = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  padding: 35%;
  color: ${({ isActive: isSelected }) => (isSelected ? "#FFF" : "#63698D")};
  font-weight: ${({ isActive: isSelected }) => (isSelected ? 600 : 500)};
`;

const KeyWordContainer = styled(motion.div)<{ x: number; y: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const KeywordCircle = styled(motion.div)`
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

export default YearCircleComponent;
