import React from "react";
import styled from "styled-components";

interface StateBoxProps {
  status?: string;
  className?: string;
}

const StateBox: React.FC<StateBoxProps> = ({ status, className }) => {
  return (
    <StyledStateBox className={className} status={status}>
      {status}
    </StyledStateBox>
  );
};

const StyledStateBox = styled.div<{ status?: string }>`
  padding: 0.25rem 0.7rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  background-color: ${(props) => {
    switch (props.status) {
      case "작성중":
        return "#E5E6FF";
      case "지원완료":
        return "#E5E6FF";
      case "작성완료":
        return "#FFF5D1";
      case "마감":
        return "#EEEFF7";
      default:
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "작성중":
        return "#5C70DB";
      case "지원완료":
        return "#5C70DB";
      case "작성완료":
        return "#FFA63E";
      case "마감":
        return "#63698D";
      default:
        return "transparent";
    }
  }};
`;

export default StateBox;
