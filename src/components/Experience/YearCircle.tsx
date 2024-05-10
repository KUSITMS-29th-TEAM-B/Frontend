import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import SmallCircleComponent from "./KeyWordCircle";

interface YearCircleComponentProps {
  year: number;
  //   index: number;
  //   isSelected: boolean;
  //   onClick: () => void;
  //   layout: boolean;
}

const YearCircle = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #D9D9D9;
  position: absolute;
  top: -40px;
`;

const YearText = styled.div`
  display: flex;
  justify-content: center;
  padding: 35%;
  color: #4F4F4F;
`;

const YearCircleComponent: React.FC<YearCircleComponentProps> = ({ year }) => {
  return (
    <YearCircle>
      <YearText>{year}</YearText>
    </YearCircle>
  );
};

export default YearCircleComponent;
