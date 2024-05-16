import React from "react";
import styled from "styled-components";
import { jobDetails } from "../../services/JD/jdData";

interface JobContainerProps {
  jdId: number;
}

const JDContainer: React.FC<JobContainerProps> = ({ jdId }) => {
  const JDdata = jobDetails[jdId - 1];

  return (
    <StyledContainer>
      <div>{JDdata.id}</div>
      <div>{JDdata.title}</div>
      <div>{JDdata.content}</div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    border-radius: 0.75rem;
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
`;

export default JDContainer;
