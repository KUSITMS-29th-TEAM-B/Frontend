import React, { useEffect, useState } from "react";
import BubbleChartWithGradient from "../components/BubbleChartWithGradient";
import ToggleButton from "../components/common/ToggleButton";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { bubbleChartData, yearData } from "../dummy";
import yearActiveImg from "../assets/images/yearActiveCircle.png";

const ExperiencePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") || "역량별");
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => setTab(searchParams.get("tab") || "역량별"), [searchParams]);

  return (
    <div className="page">
      {/* <MyResponsiveCirclePacking data={data} /> */}
      <ToggleButton />
      {tab === "연도별" ? (
        <>
          <YearContainer>
            {yearData.map((item) =>
              year === item.year ? (
                <img
                  src={yearActiveImg}
                  alt="year-active"
                  style={{ marginTop: "-150px", zIndex: 2000 }}
                />
              ) : (
                <YearCircle onMouseOver={() => setYear(item.year)}>
                  {item.year}
                </YearCircle>
              )
            )}
            <Line />
          </YearContainer>
        </>
      ) : null}
      {tab === "역량별" ? (
        <BubbleChartWithGradient data={bubbleChartData} />
      ) : null}
    </div>
  );
};

const YearContainer = styled.div`
  margin-top: 185px;
  display: flex;
  flex-direction: row;
  gap: 114px;
`;

const YearCircle = styled.div`
  z-index: 2000;
  box-sizing: border-box;
  display: flex;
  width: 58.447px;
  height: 58.447px;
  border-radius: 50%;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background: #d9dbe6;
  padding: 16px 22px;
  ${(props) => props.theme.fonts.body5}
`;

const Line = styled.div`
  position: absolute;
  right: 0;
  top: 400px;
  width: 100%;
  height: 0.7px;
  background: #a6aac0;
`;

export default ExperiencePage;
