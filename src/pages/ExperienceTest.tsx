import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import YearCircleComponent from "../components/Experience/YearCircle";

const Line = styled.div`
  width: 120rem;
  height: 1px;
  background-color: grey;
  position: relative;
  margin-left: 1rem;
  top: 50%;
`;

const YearContainer = styled(motion.div)`
  width: 100px;
  display: flex;
  position: relative;
  margin-right: 100px;  
`;

const ExperienceTestPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);

  const years = [2000, 2005, 2010, 2015, 2020];
  const keywords = ["큐시즘", "밋업", "밤양갱", "화이팅"];

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
      setClicked(true);
    } else if (clicked && clickedYear === selectedYear) {
      setClicked(false);
    } else if (clicked && clickedYear !== selectedYear) {
      setSelectedYear(clickedYear);
    }
  };

  return (
    <>
      <Line>
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
              selectedYear !== null ? null : setSelectedYear(year)
            }
            onClick={() => handleClicked(year)}
            onMouseLeave={() => (clicked ? null : setSelectedYear(null))}
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
    </>
  );
};

export default ExperienceTestPage;
