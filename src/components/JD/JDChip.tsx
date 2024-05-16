import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}
const JDChip = ({ text, ...props }: ChipProps) => {
  return <StyledDiv {...props}>{text}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  ${(props) => props.theme.fonts.body3};
  color: ${(props) => props.theme.colors.main400};
  border-radius: 4px;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  text-align: center;
  width: 5rem;
  border: 1px solid ${(props) => props.theme.colors.main300};
`;

export default JDChip;
