import React from "react";
import styled from "styled-components";

interface RoundButtonProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}
const RoundButton = ({ children, width = 212, height = 64 }: RoundButtonProps) => {
  return (
    <Button style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  flex-shrink: 0;
  border-radius: 67.408px;
  background: var(--main-500, #7d82ff);
  padding: 22px 44px;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.theme.fonts.title4};
  gap: 5px;
`;

export default RoundButton;
