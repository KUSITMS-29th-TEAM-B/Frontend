import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import { useNavigate, useParams } from "react-router-dom";
import { Job, RecruitmentStatus } from "../types/type";
import arrowIcon from "../assets/icons/icon_arrow_right.svg";

const JDDetailPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [activebutton, setActivebutton] = useState("");
  const [firstTime, setFirstTime] = useState(true); // 자기소개서 작성한 이력 여부

  const job: Job = {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.End,
    dday: 11,
    content:
      "<p>우리 팀과 함께 혁신적인 프로젝트를 만들어 갈 프론트엔드 개발자를 찾습니다.</p>",
  }; //dummydata
  const jdId = useParams().id;
  const nav = useNavigate();

  const ExptoggleContainer = () => {
    if (!active) {
      setActive(!active);
      setActivebutton("Exp");
    } else if (active && activebutton === "Exp") {
      setActive(!active);
      setActivebutton("");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <StyledDivContainer className="page">
      <MainContainer>
        <CenteredContainer
          initial={{ width: "100%" }}
          animate={{
            x: active ? "-5%" : "8.5rem",
            width: active ? "45%" : "200%",
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            when: "beforeChildren",
          }}
        >
          <ToggleContainer>
            <AirplaneToggle step={1} />
          </ToggleContainer>
          <TopTitleBar>
            <Title>공고 상세</Title>
            <TopButton onClick={() => nav(`/jd/edit/${jdId}`)}>
              <TopButtonText>
                {firstTime ? "자기소개서 작성" : "자기소개서 확인"}
                <img src={arrowIcon} alt="icon" />
              </TopButtonText>
            </TopButton>
          </TopTitleBar>
          <JobContainer>{jdId}</JobContainer>
        </CenteredContainer>
        <AnimatePresence>
          <ActiveContainer
            initial={{ x: "45%", width: "45%" }}
            animate={{ x: !active ? "110%" : "0%" }}
            exit={{
              x: "0%",
              transition: { delay: 0.5, stiffness: 50, damping: 20 },
            }}
            transition={{ type: "spring", stiffness: 40 }}
          >
            <ExperienceButton
              onClick={ExptoggleContainer}
              active={activebutton === "Exp"}
            >
              <ButtonText active={activebutton === "Exp"}>경험분석</ButtonText>
            </ExperienceButton>
            <ExpContainer>
              <ExperienceList />
            </ExpContainer>
          </ActiveContainer>
        </AnimatePresence>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDDetailPage;

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

const ExpContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color:#343A5D;
`;

const TopButton = styled.button`
    display: inline-flex;
    padding: 0.5rem 2.75rem;
    align-items: flex-start;
    gap: 0.625rem;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    align-items: center;
    border-radius: 0.5rem;
    border: none;
    color:var(--white);
    background: var(--main-500, #7D82FF);
`;

const TopButtonText = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: center;
  overflow: hidden;
  padding-left: 8rem;
  background-color: #FBFBFD;
`;

const CenteredContainer = styled(motion.div)`
  width: 100%; 
  border-radius: 10px;
  background: transparent;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  margin: 0.5rem 0.25rem 0.5rem 0.5rem;  
`;

const JobContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 2rem;
    align-items: flex-start;
    min-height: 30rem;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
`;

const ActiveContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  margin: 0 3.5rem;
  margin-top : 10rem;
  background: #F7F7FB;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const buttonActiveStyle = css`
  background: #7D82FF; 
`;

interface ButtonProps {
  active: boolean;
}

const ExperienceButton = styled.button<ButtonProps>`
  position: absolute;
  left: -2rem;
  top: 1rem;
  width: 2rem;
  height: 7rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.66019rem 0rem 0rem 0.66019rem;
  background: var(--neutral-300, #EAEBF3);
  ${({ active }) => active && buttonActiveStyle}
`;

const ButtonText = styled.div<ButtonProps>`
    display: flex;
    width: 1rem;
    ${(props) => props.theme.fonts.body5};
    height: 5rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ active }) => (active ? "#FFFFFF" : "#63698D")};
`;
