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

  const numCircles = 8; // 주변에 배치할 원의 개수

  const radius = 200; // 중앙 원으로부터의 거리
  // 중앙 원의 크기
  const centralWidth = 392;
  // 주변 원 크기
  const surroundWidth = 88;

  // 각 원의 위치를 계산하는 함수
  const calculatePosition = (index: number) => {
    const angle = (index / numCircles) * 2 * Math.PI + 5; // 각 원의 각도
    const x = Math.cos(angle) * radius + centralWidth / 2 - surroundWidth / 2; // X 좌표
    const y = Math.sin(angle) * radius; // Y 좌표
    return { x, y };
  };

  useEffect(() => setTab(searchParams.get("tab") || "역량별"), [searchParams]);

  return (
    <div className="page">
      {/* <MyResponsiveCirclePacking data={data} /> */}
      <ToggleButton />
      {tab === "연도별" ? (
        <>
          <YearList>
            {yearData.map((item) =>
              year === item.year ? (
                <YearContainer onMouseLeave={() => setYear(null)}>
                  <img
                    src={yearActiveImg}
                    alt="year-active"
                    style={{ marginTop: "-150px", zIndex: 2000 }}
                    // onMouseLeave={() => setYear(null)}
                  />
                  <YearText style={{ marginTop: "-150px", zIndex: 3000 }}>
                    {item.year}
                  </YearText>
                  {item.activities.map((activity, index) => {
                    const position = calculatePosition(index);
                    return (
                      <ActivityCircle
                        key={index}
                        style={{
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                          zIndex: 4000,
                        }}
                        onMouseOver={() => console.log("마우스 호버")}
                      >
                        {activity}
                      </ActivityCircle>
                    );
                  })}
                </YearContainer>
              ) : (
                <YearContainer>
                  <YearCircle
                    onMouseOver={() => setYear(item.year)}
                    style={{ marginTop: year ? "-180px" : "0px", zIndex: 2000 }}
                  >
                    {item.year}
                  </YearCircle>
                </YearContainer>
              )
            )}
            <Line />
          </YearList>
        </>
      ) : null}
      {tab === "역량별" ? (
        <BubbleChartWithGradient data={bubbleChartData} />
      ) : null}
    </div>
  );
};

const YearList = styled.div`
  margin-top: 185px;
  display: flex;
  flex-direction: row;
  gap: 114px;
  cursor: pointer;
`;

const YearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const YearText = styled.div`
  position: absolute;
  ${(props) => props.theme.fonts.headline2}
  color: white;
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
  cursor: pointer;
`;

const ActivityCircle = styled.div`
  position: absolute;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(197, 201, 255, 0.7) 23.15%,
    rgba(255, 255, 255, 0) 141.03%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => props.theme.fonts.subtitle4};
  ${(props) => props.theme.colors.neutral700};
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
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
