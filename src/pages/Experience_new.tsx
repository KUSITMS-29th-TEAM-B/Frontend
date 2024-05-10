import React, { useEffect, useState } from "react";
import BubbleChartWithGradient from "../components/BubbleChartWithGradient";
import ToggleButton from "../components/common/ToggleButton";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { bubbleChartData, yearData } from "../dummy";
import ExperienceTestPage from "./ExperienceTest";

const ExperienceNewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") || "역량별");

  useEffect(() => setTab(searchParams.get("tab") || "역량별"), [searchParams]);

  return (
    <div className="page">
      <ToggleButton />
      {tab === "연도별" ? (
        <StyledContainer>
          <ExperienceTestPage />
        </StyledContainer>
      ) : null}
      {tab === "역량별" ? (
        <BubbleChartWithGradient data={bubbleChartData} />
      ) : null}
    </div>
  );
};

const StyledContainer = styled.div`
    width: 100vw;
    margin-top: 20%;
`;

export default ExperienceNewPage;
