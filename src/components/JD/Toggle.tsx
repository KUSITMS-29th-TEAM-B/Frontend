import React from "react";
import styled from "styled-components";

interface ToggleProps {
  isActive: boolean;
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isActive, onClick }) => {
  return (
    <ToggleButton onClick={onClick} isActive={isActive}>
      <ToggleCircle isActive={isActive} />
    </ToggleButton>
  );
};

export default Toggle;

const ToggleButton = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.isActive ? "#9AAAFF" : "#D9DBE6")};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
`;

const ToggleCircle = styled.div<{ isActive: boolean }>`
  width: 13px;
  height: 13px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${(props) => (props.isActive ? "23px" : "3px")};
  transition: left 0.3s, background-color 0.3s;
`;
