import React from "react";
import styled from "styled-components";

interface StateBoxProps {
  status?: string;
  className?: string;
}

const StateBox: React.FC<StateBoxProps> = ({ status, className }) => {
  const getStatusLabel = (status: string | undefined) => {
    switch (status) {
      case "WRITING":
        return "작성중";
      case "WRITTEN":
        return "작성완료";
      case "CLOSED":
        return "마감";
      default:
        return "";
    }
  };
  return (
    <StyledStateBox className={className} status={status}>
      {getStatusLabel(status)}
    </StyledStateBox>
  );
};

const StyledStateBox = styled.div<{ status?: string }>`
  padding: 0.25rem 0.7rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  background-color: ${(props) => {
    switch (props.status) {
      case "WRITING":
        return "#E5E6FF";
      case "WRITTEN":
        return "#FFF5D1";
      case "CLOSED":
        return "#EEEFF7";
      default:
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "WRITING":
        return "#5C70DB";
      case "WRITTEN":
        return "#FFA63E";
      case "CLOSED":
        return "#63698D";
      default:
        return "transparent";
    }
  }};
`;

export default StateBox;
