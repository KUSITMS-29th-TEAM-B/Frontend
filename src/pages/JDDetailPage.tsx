import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import { useNavigate, useParams } from "react-router-dom";
import { JobDescriptionAPI } from "../types/type";
import arrowIcon from "../assets/icons/icon_arrow_right.svg";
import StateBox from "../components/JD/StateBox";
import { useRecoilState } from "recoil";
import arrowLeft from "../assets/icons/icon_arrow_left.svg";
import { detailStore } from "../store/jdStore";
import calendarIcon from "../assets/icons/icon_calendar.svg";
import linkIcon from "../assets/icons/icon_link.svg";
import ExperienceBox from "../components/JD/ExpContainer";
import { formatDateRange } from "./JDListPage";
import { jobdelete, jobdescriptionget } from "../services/JD/jdApi";
import { getCookie } from "../services/cookie";
import PlaneLoading from "../components/common/Loading";
import JDDeleteModal from "../components/JD/JDDeleteModal";

const JDDetailPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [activebutton, setActivebutton] = useState("");
  const jdId = useParams().jdId;
  const nav = useNavigate();
  const [detailId, setDetailId] = useRecoilState<number | string>(detailStore);
  const [jdData, setJdData] = useState<JobDescriptionAPI>({
    enterpriseName: "",
    title: "",
    remainingDate: "",
    content: "",
    link: "",
    writeStatus: "",
    createdAt: "",
    startAt: null,
    endedAt: null,
  });
  const firstTime = jdData.writeStatus === "NOT_APPLIED"; // 자기소개서 작성한 이력 여부
  const user = getCookie("user");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (jdId) {
      handleJDDelete(jdId, user.token);
    }
    document.body.style.overflow = "auto";
  };

  const ExptoggleContainer = () => {
    if (!active) {
      setActive(!active);
      setActivebutton("Exp");
    } else if (active && activebutton === "Exp") {
      setActive(!active);
      setActivebutton("");
    }
  };

  const handleNavigate = () => {
    if (firstTime) {
      nav(`/jd/apply/${jdId}`);
    } else {
      nav(`/jd/apply/edit/${jdId}`);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (jdId) {
      getJobData(jdId, user.token);
    }
  }, []);

  useEffect(() => {
    if (!active) {
      setDetailId(0);
    }
  }, [active]);

  const getJobData = async (jdId: string, token: string) => {
    try {
      const response = await jobdescriptionget(jdId, token);
      const FormatstartDate = formatDate(response.data.createdAt);
      const jdApiData: JobDescriptionAPI = {
        enterpriseName: response.data.enterpriseName,
        title: response.data.title,
        remainingDate: response.data.remainingDate,
        content: response.data.content,
        writeStatus: response.data.writeStatus,
        link: response.data.link,
        createdAt: FormatstartDate,
        startAt: response.data.startedAt,
        endedAt: response.data.endedAt,
      };
      setJdData(jdApiData);
      console.log(jdData);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
    setIsLoading(false);
  };

  const handleJDDelete = async (jobId: string, token: string) => {
    try {
      const response = await jobdelete(jobId, token);
      console.log(response);
      nav("/jd");
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  return (
    <StyledDivContainer className="page">
      {
        <JDDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
        ></JDDeleteModal>
      }
      {!isLoading ? (
        <MainContainer>
          <CenteredContainer
            initial={{ width: "100%" }}
            animate={{
              x: active ? "7%" : "25%",
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
                <img
                  src={arrowLeft}
                  alt="arrowicon"
                  onClick={() => nav(`/jd`)}
                />
                공고 상세
              </Title>
              <TopButton onClick={handleNavigate}>
                <TopButtonText>
                  {firstTime ? "자기소개서 작성" : "자기소개서 확인"}
                  <img src={arrowIcon} alt="icon" />
                </TopButtonText>
              </TopButton>
            </TopTitleBar>
            <JobContainer>
              <JobStatusBar>
                <div className="left_container">
                  {jdData.writeStatus !== "NOT_APPLIED" && (
                    <StateBox
                      className="job_status"
                      status={jdData.writeStatus}
                    />
                  )}
                  <div className="job_date">{jdData.createdAt?.toString()}</div>
                </div>
                <div className="right_container">
                  <div
                    onClick={() => {
                      nav(`/jd/edit/${jdId}`);
                    }}
                  >
                    수정
                  </div>
                  <div onClick={openModal}>삭제</div>
                </div>
              </JobStatusBar>
              <JobTopBox>
                <JobTopTitleBox>
                  {jdData.writeStatus !== "CLOSED" && (
                    <div className="job_detail_dday">
                      {parseInt(jdData.remainingDate) <= 0
                        ? "D-DAY"
                        : "D-" + jdData.remainingDate}
                    </div>
                  )}
                  <div className="job_detail_title">{jdData.title}</div>
                </JobTopTitleBox>
                <JobTopDescription>{jdData.enterpriseName}</JobTopDescription>
                <JobSubBox>
                  <div className="period">
                    <img
                      src={calendarIcon}
                      alt="calendar"
                      width={16}
                      height={16}
                    />
                    {jdData.startAt &&
                      jdData.endedAt &&
                      formatDateRange(
                        jdData.startAt.toString(),
                        jdData.endedAt.toString()
                      )}
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
                transition: { stiffness: 50, damping: 20 },
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
                <ButtonText active={activebutton === "Exp"}>
                  경험연결
                </ButtonText>
              </ExperienceButton>
              {detailId !== 0 ? (
                <ExperienceBox expId={detailId} />
              ) : (
                <ScrollDiv>
                  <ExpContainer>
                    <ExperienceList showBookmarksOnly={false} />
                  </ExpContainer>
                </ScrollDiv>
              )}
            </ActiveContainer>
          </AnimatePresence>
        </MainContainer>
      ) : (
        <PlaneLoading />
      )}
    </StyledDivContainer>
  );
};

export default JDDetailPage;

export const formatDate = (createdAt: any) => {
  const date = new Date(createdAt);
  const year = date.getFullYear().toString().slice(2); // 년도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 1을 더함)
  const day = date.getDate().toString().padStart(2, "0"); // 날짜

  return `${year}.${month}.${day}`; // 포맷된 문자열 반환
};

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #fbfbfd;
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
  color: #343a5d;
  align-items: center;
`;

const TopButton = styled.button`
  display: inline-flex;
  cursor: pointer;
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
  color: var(--white);
  background: var(--main-500, #7d82ff);
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
  background-color: #fbfbfd;
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
  border: 1px solid var(--neutral-200, #eeeff7);
  background: var(--neutral-0, #fff);
  //min-height: 100rem;
`;

const ScrollDiv = styled.div`
  overflow-y: auto;
  width: 100%;
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
    justify-content: space-between;
    padding: 0.75rem 2rem;
    height: 3rem;
    background: ${(props) => props.theme.colors.neutral50};
    border-top-right-radius: 0.9rem;
    border-top-left-radius: 0.9rem;
    align-items: center;
    .left_container{
        display: flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;
    .job_date {
        color:  ${(props) => props.theme.colors.neutral500};
        ${(props) => props.theme.fonts.cap1};
        margin-left: 1rem;
    }
    }
    .right_container{
        display: flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        color:  ${(props) => props.theme.colors.neutral500};
        font-size: 1rem;
        font-style: normal;
        gap: 1rem;
        font-weight: 400;
        text-decoration-line: underline;
    }
    
`;

const JobTopTitleBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  color: var(--neutral-700, #343a5d);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  .job_detail_dday {
    display: flex;
    height: 1.5rem;
    min-width: 5rem;
    flex: 1;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 3.125rem;
    border: 1px solid var(--main-500, #7d82ff);
    color: var(--main-500, #7d82ff);
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    margin-top: 0.25rem;
  }
  .job_detail_title {
    flex: 12;
    display: flex;
    text-align: center;
    align-items: center;
    padding-top: 0.25rem;
  }
`;

const JobTopDescription = styled.div`
  color: var(--neutral-600, #63698d);
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
  color: var(--neutral-500, #a6aac0);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaebf3;
  .period {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--neutral-500, #a6aac0);
    ${(props) => props.theme.fonts.link};
  }
`;

const JobBottomBox = styled.div`
  height: 23rem;
  color: var(--neutral-700, #343a5d);
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
  margin-top: 10rem;
  background: ${(props) => (props.isActive ? "#FFF" : "#F7F7FB")};
  //background: red;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 40rem;
`;

const buttonActiveStyle = css`
  background: #7d82ff;
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
  cursor: pointer;
  border: none;
  border-radius: 0.66019rem 0rem 0rem 0.66019rem;
  background: var(--neutral-300, #eaebf3);
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
