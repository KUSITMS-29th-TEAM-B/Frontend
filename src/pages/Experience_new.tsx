import React, { useEffect, useState } from "react";
import BubbleChartWithGradient from "../components/BubbleChartWithGradient";
import ToggleButton from "../components/common/ToggleButton";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { bubbleChartData, yearData } from "../dummy";
import ExperienceTestPage from "./ExperienceTest";
import { AnimatePresence, motion } from "framer-motion";
import useComponentSize from "../components/hooks/useComponentSize";

const ExperienceNewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [componentRef, size] = useComponentSize();
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState(searchParams.get("tab") || "역량별");

  // 사이드탭 설정 함수
  const handleTab = (isActive: boolean) => {
    setActive(isActive);
  };

  useEffect(() => setTab(searchParams.get("tab") || "역량별"), [searchParams]);

  //
  //
  //
  return (
    <>
      <div className="page">
        <ToggleButton />
      </div>

      {tab === "연도별" ? (
        <MainContainer>
          <CenteredContainer
            ref={componentRef}
            initial={{ width: "100%" }}
            animate={{
              width: active ? "50%" : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 40,
              when: "beforeChildren",
            }}
          >
            <ExperienceTestPage handleActive={handleTab} width={size.width} />
          </CenteredContainer>
          <AnimatePresence>
            <ActiveContainer
              initial={{ width: "0%" }}
              animate={{ width: active ? "50%" : "0%" }}
              exit={{
                transition: { delay: 0.5, stiffness: 50, damping: 20 },
              }}
              transition={{ type: "spring", stiffness: 40 }}
            >
              {active ? "활동 상세 사이드 탭" : null}
            </ActiveContainer>
          </AnimatePresence>
        </MainContainer>
      ) : null}

      {tab === "역량별" ? (
        <BubbleChartWithGradient data={bubbleChartData} />
      ) : null}
    </>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ActiveContainer = styled(motion.div)`
  border-radius: 10px;
  background: #f7f7fb;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const CenteredContainer = styled(motion.div)`
  width: 100%;
  border-box: box-sizing;
  border: 1px solid black;
  height: 500px;
  overflow: scroll;
`;

export default ExperienceNewPage;
