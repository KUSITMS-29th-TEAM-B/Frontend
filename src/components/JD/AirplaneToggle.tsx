import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 300px;  
`;

const Line = styled.div`
  position: absolute;
  width: 150px;
  top: 20px;
  margin-left: 10px;
  border-bottom: 2px solid black;
  overflow: hidden;
`;

const Circle = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "lightblue" : "grey")};
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 10px;
  cursor: pointer;
`;

const AirplaneIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

interface StepIndicatorProps {
  step: number;
  onChange: (newStep: number) => void;
}

const AirplaneToggle: React.FC<StepIndicatorProps> = ({ step, onChange }) => {
  return (
    <Container>
      <Line />
      {[1, 2, 3].map((num) => (
        <Circle key={num} active={step === num} onClick={() => onChange(num)}>
          {step === num ? (
            <AirplaneIcon viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,12V19L8,21V22H16V21L14,19V12L21,16Z"
              />
            </AirplaneIcon>
          ) : (
            num
          )}
        </Circle>
      ))}
    </Container>
  );
};

export default AirplaneToggle;
