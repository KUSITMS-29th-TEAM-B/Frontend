import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import YearCircleComponent from "../components/Experience/YearCircle";

const Line = styled.div`
  width: 120%;
  height: 1px;
  background-color: grey;
  position: relative;
  margin-left: 1rem;
  top: 50%;
`;

const YearContainer = styled(motion.div)`
  width: 100px;
  height: 0px;
  position: relative;
  margin-right: 100px;  
`;

const ExperienceTestPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = [2000, 2005, 2010, 2015, 2020];

  useEffect(() => {
    console.log("Experience Test Page loaded.");
  }, []);

  const calculatePosition = (index: number) => {
    if (selectedYear === null) {
      return index * 300;
    }
    const selectedIndex = years.indexOf(selectedYear);
    const distance = 300;
    if (index > selectedIndex) {
      return index * 300 + distance;
    }
    return index * 300;
  };

  return (
    <>
      <Line>
        {years.map((year, index) => (
          <YearContainer
            key={year}
            initial={{ x: index * 100 }}
            animate={{
              x: calculatePosition(index),
              scale: selectedYear === year ? 2 : 1,
            }}
            whileHover={{ scale: 2 }}
            onClick={() => setSelectedYear(year)}
          >
            <YearCircleComponent year={year} />
          </YearContainer>
        ))}
      </Line>
    </>
  );
};

export default ExperienceTestPage;
