import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import YearCircleComponent from "../components/Experience/YearCircle";
import { useRecoilState } from "recoil";
import { keywordState, yearState } from "../store/selectedStore";

interface ExperiencePageProps {
  width: number;
}

const ExperienceTestPage = ({ width }: ExperiencePageProps) => {
  const [selectedYear, setSelectedYear] = useRecoilState<number | null>(
    yearState
  );
  const [selectedKeyword, setSelectedKeyword] = useRecoilState<string | null>(
    keywordState
  );
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // 임시 데이터
  const years = [2000, 2005, 2010, 2015, 2020];
  const keywords = ["큐시즘", "밋업", "밤양갱", "화이팅", "승효"];

  // 클릭한 year 객체로 스크롤 이동하기 위한 객체 참조 값
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  years.forEach((year) => {
    yearRefs.current[year] = yearRefs.current[year] || null;
  });

  const gap = 600; // 연도별 원 사이 gap
  const lineLength = gap * (years.length - 1); // 원 개수에 따라 선 길이 계산

  // 연도 원에 마우스 올릴 경우
  const handleMouseOver = (year: number) => {
    setHoveredYear(year);
  };
  // 연도 원에 마우스 빠져나올 경우
  const handleMouseLeave = () => {
    setHoveredYear(null);
  };
  // 연도 컨테이너 클릭할 경우
  const handleYearContainerClick = (year: number) => {
    if (selectedYear === year) {
      setSelectedYear(null);
      setSelectedKeyword(null);
    } else {
      setSelectedYear(year);
    }
  };

  // 연도별 원 x 위치 계산
  const calculateXPosition = (index: number) => {
    const distance = 100;
    if (hoveredYear) {
      const hoveredIndex = years.indexOf(hoveredYear);
      if (index > hoveredIndex) {
        return index * 250 + distance;
      }
    }
    if (selectedYear) {
      const selectedIndex = years.indexOf(selectedYear);
      if (index > selectedIndex) {
        return index * 250 + distance;
      }
    }
    return index * 250;
  };

  //
  //
  //
  useEffect(() => {
    console.log(width);
    if (selectedYear) {
      yearRefs.current[selectedYear]?.scrollIntoView({
        inline: "center",
      });
    }
  }, [selectedYear, width]);

  //
  //
  //
  return (
    <Line length={lineLength}>
      {years.map((year, index) => (
        <YearContainer
          ref={(el) => (yearRefs.current[year] = el)}
          key={year}
          initial={{ x: index * 100 }}
          animate={{
            x: calculateXPosition(index),
            scale: hoveredYear === year || selectedYear === year ? 2 : 1,
          }}
          whileHover={{
            scale: hoveredYear === year || selectedYear === year ? 2 : 1,
          }}
          onMouseOver={() => handleMouseOver(year)}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleYearContainerClick(year)}
        >
          <YearCircleComponent
            year={year}
            keywordList={keywords}
            hoveredYear={hoveredYear}
          />
        </YearContainer>
      ))}
    </Line>
  );
};

const Line = styled.div<{ length: number }>`
  width: ${(props) => props.length}px;
  height: 1px;
  background-color: grey;
  position: relative;
  margin-left: 1rem;
  top: 50%;
  display: flex;
  flex-direction: row;
  padding: 0px 200px;
`;

const YearContainer = styled(motion.div)`
  width: 100px;
  display: flex;
  // position: relative;
  gap: 800px;
`;

export default ExperienceTestPage;
