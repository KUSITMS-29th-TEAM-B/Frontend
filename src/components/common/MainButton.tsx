import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const MainButton = ({ children, ...props }: MainButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

const Button = styled.button`
  flex-shrink: 0;
  border-radius: 67.408px;
  background: ${(props) => props.theme.colors.main500};
  padding: 22px 44px;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.theme.fonts.title4};
  gap: 5px;
  &:disabled {
    background: ${(props) => props.theme.colors.neutral500};
  }
`;

export default MainButton;
