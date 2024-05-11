import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #FBFBFD;
  overflow-x: hidden;
`;

const ToggleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Title = styled.h1`
  color:#343A5D;
`;

const JDListPage: React.FC = () => {
  return (
    <StyledDivContainer className="page">
      <TopTitleBar>
        <Title>등록한 공고 목록</Title>
      </TopTitleBar>
    </StyledDivContainer>
  );
};

export default JDListPage;
