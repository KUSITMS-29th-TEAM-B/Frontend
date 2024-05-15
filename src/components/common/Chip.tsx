import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}
const Chip = ({ text, ...props }: ChipProps) => {
  return <StyledDiv {...props}>{text}</StyledDiv>;
};

const StyledDiv = styled.div`
  ${(props) => props.theme.fonts.body3};
  color: ${(props) => props.theme.colors.main400};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.main300};
  padding: 0.5rem 32px;
`;

export default Chip;
