import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import YearCircle from "./YearCircle";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  deleteState,
  primeTagState,
  yearState,
} from "../../store/selectedStore";
import { getExperienceYears } from "../../services/Experience/experienceApi";
import { getCookie } from "../../services/cookie";
import { TagType, YearData } from "../../types/experience";

interface YearListProps {
  width: number;
  openDeleteModal: () => void;
}

const YearList = ({ width, openDeleteModal }: YearListProps) => {
  const user = getCookie("user");
  const [selectedYear, setSelectedYear] = useRecoilState<number | null>(
    yearState
  );
  const setSelectedPrimeTag = useSetRecoilState<TagType | null>(primeTagState);
  const [isDelete, setIsDelete] = useRecoilState(deleteState);
  const [years, setYears] = React.useState<number[]>([]);
  const [allYearsData, setAllYearsData] = React.useState<YearData[]>([]);

  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

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
      setSelectedPrimeTag(null);
      setIsDelete(false);
    } else {
      setSelectedYear(year);
    }
  };

  // 연도별 원 위치 계산
  const calculateXPosition = (index: number) => {
    const distance = 100;
    if (hoveredYear && selectedYear) {
      const hoveredIndex = years.indexOf(hoveredYear);
      const selectedIndex = years.indexOf(selectedYear);

      if (hoveredIndex < selectedIndex && index < selectedIndex) {
        return index * 250 - 50;
      } else if (hoveredIndex > selectedIndex && index === hoveredIndex) {
        return index * 250 + 250;
      }
      if (index > hoveredIndex) {
        return index * 250 + distance + 100;
      }
    }
    if (hoveredYear) {
      const hoveredIndex = years.indexOf(hoveredYear);
      if (index > hoveredIndex) {
        return index * 250 + distance;
      }
      if (index === hoveredIndex) {
        return index * 250 + 70;
      }
    }
    if (selectedYear) {
      const selectedIndex = years.indexOf(selectedYear);
      if (index > selectedIndex) {
        return index * 250 + distance;
      }
      if (index === selectedIndex) {
        return index * 250 + 70;
      }
    }
    return index * 250;
  };

  // 전체 연도 및 연도별 태그 목록 정보
  useEffect(() => {
    if (user?.token) {
      getExperienceYears(user?.token).then((res) => {
        const { years, yearTagInfos } = res.data;
        setYears(years);
        setAllYearsData(yearTagInfos);
      });
    }
  }, [user?.token]);

  // 클릭한 연도 원형 중심으로 스크롤 이동
  useEffect(() => {
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
      {allYearsData?.map((data, index) => (
        <YearMotionDiv
          ref={(el) => (yearRefs.current[data.year] = el)}
          key={data.year}
          initial={{ x: index * 100 }}
          animate={{
            x: calculateXPosition(index),
            scale:
              hoveredYear === data.year || selectedYear === data.year ? 5 : 1,
          }}
          whileHover={{
            scale:
              hoveredYear === data.year || selectedYear === data.year ? 5 : 1,
          }}
          onMouseOver={() => handleMouseOver(data.year)}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleYearContainerClick(data.year)}
        >
          <YearCircle
            year={data.year}
            primeTagList={
              data.tags.length > 5
                ? [...data.tags.slice(0, 5), { id: "더보기", name: "더보기" }]
                : data.tags
            }
            hoveredYear={hoveredYear}
            openDeleteModal={openDeleteModal}
          />
        </YearMotionDiv>
      ))}
    </Line>
  );
};

const Line = styled.div<{ length: number }>`
  min-width: 100vw;
  width: ${(props) => props.length}px;
  height: 1px;
  background-color: grey;
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: row;
  padding: 0px 200px;
`;

const YearMotionDiv = styled(motion.div)`
  width: 100px;
  display: flex;
  gap: 800px;
`;

export default YearList;
