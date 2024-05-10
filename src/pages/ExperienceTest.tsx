import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YearCircleComponent from "../components/Experience/YearCircle";

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
  position: relative;
  top: 50%;
`;

const ExperienceTestPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [2000, 2005, 2010, 2015, 2020];

  useEffect(() => {
    console.log("Experience Test Page loaded.");
  }, []);

  return (
    <Line>
      {years.map((year, index) => (
        <YearCircleComponent
          key={year}
          year={year}
          index={index}
          isSelected={selectedYear === year}
          onClick={() => setSelectedYear(year)}
          layout
        />
      ))}
    </Line>
  );
};

export default ExperienceTestPage;
