import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import { useNavigate, useParams } from "react-router-dom";
import { RecruitmentStatus } from "../types/type";
import arrowIcon from "../assets/icons/icon_arrow_right.svg";
import StateBox from "../components/JD/StateBox";
import { useRecoilState } from "recoil";
import arrowLeft from "../assets/icons/icon_arrow_left.svg";
import { detailStore } from "../store/jdStore";
import calendarIcon from "../assets/icons/icon_calendar.svg";
import linkIcon from "../assets/icons/icon_link.svg";

const jdData = {
  id: 3,
  title: "백엔드 개발자 채용",
  description: "Node.js 경험자",
  recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
  status: RecruitmentStatus.End,
  dday: 30,
  link: "https://www.naver.com/",
  date: "2013.01.10",
  content: `<div>
        <h2>Job Description</h2>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
        <br/>
        <h1>Job Description</h1>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
        <h2>Job Description</h2>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
        <br/>
        <h1>Job Description</h1>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
        <h2>Job Description</h2>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
        <br/>
        <h1>Job Description</h1>
        <p>
          We are looking for a talented frontend developer to join our team. The
          ideal candidate should have experience with HTML, CSS, JavaScript, and
          modern frontend frameworks such as React.
        </p>
         </div>`,
};

const JDDetailPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [activebutton, setActivebutton] = useState("");
  const firstTime = jdData.status === "작성전"; // 자기소개서 작성한 이력 여부
  const jdId = useParams().id;
  const nav = useNavigate();
  const [detailId, setDetailId] = useRecoilState<number>(detailStore);

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

  useEffect(() => {
    if (!active) {
      setDetailId(0);
    }
  }, [active]);

  return (
    <StyledDivContainer className="page">
      <MainContainer>
        <CenteredContainer
          initial={{ width: "100%" }}
          animate={{
            x: active ? "7%" : "23%",
            width: active ? "50%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            when: "beforeChildren",
          }}
        >
          <ToggleContainer>
            <AirplaneToggle step={2} />
          </ToggleContainer>
          <TopTitleBar>
            <Title>
              <img src={arrowLeft} alt="arrowicon" onClick={() => nav(-1)} />
              공고 상세
            </Title>
            <TopButton onClick={() => nav(`/jd/edit/${jdId}`)}>
              <TopButtonText>
                {firstTime ? "자기소개서 작성" : "자기소개서 확인"}
                <img src={arrowIcon} alt="icon" />
              </TopButtonText>
            </TopButton>
          </TopTitleBar>
          <JobContainer>
            <div className="job_box">
              <JobStatusBar>
                <StateBox className="job_status" status={jdData.status} />
                <div className="job_date">{jdData.date}</div>
              </JobStatusBar>
              <JobTopBox>
                <JobTopTitleBox>
                  <div className="job_detail_dday">{"D-" + jdData.dday}</div>
                  <div className="job_detail_title">{jdData.title}</div>
                </JobTopTitleBox>
                <JobTopDescription>{jdData.description}</JobTopDescription>
                <JobSubBox>
                  <div className="period">
                    <img
                      src={calendarIcon}
                      alt="calendar"
                      width={16}
                      height={16}
                    />
                    {jdData.recruitmentPeriod}
                  </div>
                  <div className="link">
                    <img src={linkIcon} alt="link" width={16} height={16} />
                    <a
                      href={jdData.link}
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {jdData.link}
                    </a>
                  </div>
                </JobSubBox>
              </JobTopBox>
              <ScrollDiv>
                <JobBottomBox>
                  <div dangerouslySetInnerHTML={{ __html: jdData.content }} />
                </JobBottomBox>
              </ScrollDiv>
            </div>
          </JobContainer>
        </CenteredContainer>
        <AnimatePresence>
          <ActiveContainer
            isActive={detailId !== 0}
            initial={{ x: "100%", width: "45%" }}
            animate={{
              x: !active ? "110%" : "5%",
              width: "45%",
            }}
            exit={{
              x: "0%",
              transition: { delay: 0.5, stiffness: 50, damping: 20 },
            }}
            transition={{
              type: "spring",
              stiffness: 40,
            }}
          >
            <ExperienceButton
              onClick={ExptoggleContainer}
              active={activebutton === "Exp"}
            >
              <ButtonText active={activebutton === "Exp"}>경험연결</ButtonText>
            </ExperienceButton>
            {detailId !== 0 ? (
              <div>{detailId}</div>
            ) : (
              <ScrollDiv>
                <ExpContainer>
                  <ExperienceList />
                </ExpContainer>
              </ScrollDiv>
            )}
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
  height: 40rem;
  display: flex;
  flex-direction: column;
  //overflow-y: scroll;
  //overflow-x: hidden;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
    display: flex;
    flex-direction: row;
    color:#343A5D;
    align-items: center;
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
  background-color: #FBFBFD;
`;

const JobContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40rem;
    align-items: flex-start;
    gap: 0.625rem;
    //padding: 2rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
    //min-height: 100rem;
`;

const ScrollDiv = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
    }
    ::-webkit-scrollbar-track {
    }
`;

const JobTopBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 1.5rem;
    padding-bottom: 0rem;
`;

const JobStatusBar = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 0.75rem 2rem;
    height: 3rem;
    background: ${(props) => props.theme.colors.neutral50};
    border-top-right-radius: 0.9rem;
    border-top-left-radius: 0.9rem;
    align-items: center;
    .job_date {
        color:  ${(props) => props.theme.colors.neutral500};
        ${(props) => props.theme.fonts.cap1};
        margin-left: 1rem;
    }
    
`;

const JobTopTitleBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--neutral-700, #343A5D);
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    .job_detail_dday{
        display: flex;
        height: 1.5rem;
        min-width: 5rem;
        flex:1;
        padding: 0.25rem 0.5rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 3.125rem;
        border: 1px solid var(--main-500, #7D82FF);
        color: var(--main-500, #7D82FF);
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        margin-top: 0.25rem;
    }
    .job_detail_title{
        flex: 12;
        display: flex;
        text-align: center;
        align-items: center;
        padding-top: 0.25rem;
    }
`;

const JobTopDescription = styled.div`
    color: var(--neutral-600, #63698D);
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem; 
    padding: 1rem 0;
`;

const JobSubBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--neutral-500, #A6AAC0);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    padding-bottom: 1rem;
    border-bottom: 1px solid #EAEBF3;
    .period{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .link{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--neutral-500, #A6AAC0);
        ${(props) => props.theme.fonts.link};
    }
`;

const JobBottomBox = styled.div`
    height: 23rem;
    color: var(--neutral-700, #343A5D);
    //overflow-y: scroll;
    margin: 0rem 0rem 2rem 2rem;
    div {
        padding-right: 1rem;
    }
`;

const CenteredContainer = styled(motion.div)`
  width: 100%; 
  border-radius: 10px;
  background: transparent;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  //min-height: 100rem;
`;

const ActiveContainer = styled(motion.div)<{ isActive: boolean }>`
  width: 45%;
  border-radius: 10px;
  margin: 0 3.5rem; 
  margin-top : 10rem;
  background: ${(props) => (props.isActive ? "#FFF" : "#F7F7FB")};
  //background: red;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 40rem;
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
