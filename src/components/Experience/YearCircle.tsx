import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import yearCircle from "../../assets/images/yearActiveCircle.png";
import { useRecoilState } from "recoil";
import { yearState } from "../../store/selectedStore";
import { keywordState } from "../../store/selectedStore";

interface YearCircleProps {
  year: number;
  keywordList: string[];
  hoveredYear: number | null;
}

const YearCircle: React.FC<YearCircleProps> = ({
  year,
  keywordList,
  hoveredYear,
}) => {
  const [selectedYear, setSelectedYear] = useRecoilState<number | null>(
    yearState
  );
  const [selectedKeyword, setSelectedKeyword] = useRecoilState<string | null>(
    keywordState
  );

  const isSelectedYear = selectedYear === year;
  const isHoveredYear = hoveredYear === year;

  const radius = 22;
  const centralWidth = 84;
  const surroundWidth = 88;
  // const angles = [-60, -15, 30, 75, 120];

  const numCircles = 8;
  // 주변 원 위치 계산
  const calculatePosition = (index: number) => {
    // const radian = (angle / 180) * Math.PI;
    const radian = (index / numCircles) * 2 * Math.PI + 5; // 각 원의 각도
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
    animate: (index: number) => ({
      scale: 1,
      opacity: 1,
      x: calculatePosition(index).x,
      y: calculatePosition(index).y,
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 50,
      },
    }),
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  // 주변 원(키워드 원) 클릭 함수
  const handleTagClick = (e: any, year: number, keyword: string) => {
    e.stopPropagation();
    setSelectedYear(year);
    setSelectedKeyword(keyword);
  };

  //
  //
  //
  return (
    <YearCircleContainer isActive={isSelectedYear || isHoveredYear}>
      <YearText isActive={isSelectedYear || isHoveredYear}>{year}</YearText>
      {(isSelectedYear || isHoveredYear) &&
        keywordList.map((keyword, index) => {
          // if (index < angles.length) {
          const position = calculatePosition(index);
          return (
            <KeywordMotionDiv
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
                animate={{ scale: selectedKeyword === keyword ? 0.25 : 0.2 }}
                whileHover={{ scale: 0.25 }}
              >
                {keyword}
              </KeywordCircle>
            </KeywordMotionDiv>
          );
          // }
          // return null;
        })}
    </YearCircleContainer>
  );
};

const YearCircleContainer = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${({ isActive: isSelected }) =>
    isSelected
      ? `url(${yearCircle})`
      : (props) => props.theme.colors.neutral200};
  background-size: cover;
  top: -40px;
`;

const YearText = styled(motion.div)<{ isActive: boolean }>`
  ${(props) => props.theme.fonts.subtitle5};
  color: ${(props) =>
    props.isActive ? "white" : props.theme.colors.neutral600};
  display: flex;
  justify-content: center;
  scale: ${({ isActive }) => (isActive ? 0.5 : 1)};
`;

const KeywordMotionDiv = styled(motion.div)<{ x: number; y: number }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const KeywordCircle = styled(motion.div)`
  ${(props) => props.theme.fonts.subtitle4};
  color: ${(props) => props.theme.colors.neutral700};
  width: 88px;
  height: 88px;
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
  fill: rgba(255, 245, 209, 0.1);
  box-shadow: 0px 0.787px 0.787px 0px rgba(125, 130, 255, 0.05) inset,
    0px 3.148px 3.148px 0px rgba(125, 130, 255, 0.1) inset,
    0px 3.148px 28.334px 0px rgba(125, 130, 255, 0.76) inset;
  backdrop-filter: blur(14.167028427124023px);
`;

export default YearCircle;
