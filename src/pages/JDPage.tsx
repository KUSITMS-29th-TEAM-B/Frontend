import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #FBFBFD;
`;

const CenteredContainer = styled.div`
  width: 30%;
  background-color: grey;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 1rem;
`;

const JDPage: React.FC = () => {
  return (
    <StyledDivContainer>
      <CenteredContainer>
        <h1>jd</h1>
      </CenteredContainer>
    </StyledDivContainer>
  );
};

export default JDPage;
