import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import YearCircleComponent from "../components/Experience/YearCircle";

interface ExperiencePageProps {
  active: boolean;
  handleActive: (x: boolean) => void;
}

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

const ExperienceTestPage = ({ active, handleActive }: ExperiencePageProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);

  const years = [2000, 2005, 2010, 2015, 2020];
  const keywords = ["큐시즘", "밋업", "밤양갱", "화이팅", "승효"];

  const gap = 600;
  const lineLength = gap * (years.length - 1);
  console.log(lineLength);

  const handleMouseOver = (year: number) => {
    setSelectedYear(year);
  };
  const handleMouseLeave = () => {
    setSelectedYear(null);
  };

  useEffect(() => {
    console.log("clicked:  " + clicked + "   selectedYear:  " + selectedYear);
  }, [clicked, selectedYear]);

  const calculateXPosition = (index: number) => {
    if (selectedYear === null) {
      return index * 250;
    }
    const selectedIndex = years.indexOf(selectedYear);
    const distance = 250;
    if (index > selectedIndex) {
      return index * 250 + distance;
    }
    return index * 250;
  };

  const handleClicked = (clickedYear: number | null) => {
    if (!clicked && clickedYear === selectedYear) {
      setSelectedYear(clickedYear);
      setClicked(clickedYear);
      handleActive(true);
    } else if (clicked && clickedYear === selectedYear) {
      setClicked(null);
      handleActive(false);
    } else if (clicked && clickedYear !== selectedYear) {
      setSelectedYear(clickedYear);
      handleActive(false);
    }
  };

  return (
    <Line length={lineLength}>
      {years.map((year, index) => (
        <YearContainer
          key={year}
          initial={{ x: index * 100 }}
          animate={{
            x: calculateXPosition(index),
            scale: selectedYear === year ? 2 : 1,
          }}
          whileHover={{ scale: selectedYear === year ? 2 : 1 }}
          onMouseOver={() =>
            selectedYear !== null ? null : handleMouseOver(year)
          }
          onClick={() => handleClicked(year)}
          onMouseLeave={() => (clicked ? null : handleMouseLeave())}
        >
          <YearCircleComponent
            year={year}
            keywordList={keywords}
            selectedYear={selectedYear}
            clicked={clicked}
          />
        </YearContainer>
      ))}
    </Line>
  );
};

export default ExperienceTestPage;
