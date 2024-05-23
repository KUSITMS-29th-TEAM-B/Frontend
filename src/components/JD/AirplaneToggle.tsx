import React from "react";
import styled from "styled-components";
import AirplaneIcon from "../../assets/icons/icon_airplane.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 300px;
`;

const Line = styled.div`
  position: absolute;
  width: 160px;
  top: 30px;
  margin-left: 10px;
  border-bottom: 1px solid #a6aac0;
  overflow: hidden;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f3f9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 10px;
  border: none;
`;

const IconWrapper = styled.img`
  width: 20px;
  height: 20px;
`;

const ActiveCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #fff;
  background: var(--1, linear-gradient(180deg, #7d82ff 0%, #d2d9ff 100%));
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 10px;
`;

interface StepIndicatorProps {
  step: number;
}

const AirplaneToggle: React.FC<StepIndicatorProps> = ({ step }) => {
  return (
    <Container>
      <Line />
      {[1, 2, 3].map((num) => (
        <div key={num}>
          {step === num ? (
            <ActiveCircle>
              <IconWrapper src={AirplaneIcon} alt="Airplane Icon" />
            </ActiveCircle>
          ) : (
            <Circle>{num}</Circle>
          )}
        </div>
      ))}
    </Container>
  );
};

export default AirplaneToggle;
