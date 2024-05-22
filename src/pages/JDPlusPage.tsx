import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import BundleEditor from "../components/editor/BundleEditor";
import TimeSelector from "../components/common/TimePicker";
import OneDatePick from "../components/common/DatePicker";
import { useNavigate } from "react-router-dom";
import Modal from "../components/JD/JDModal";
import ClockIcon from "../assets/icons/icon_clock_net600.svg";
import { jobpost } from "../services/JD/jdApi";
import { JobAPI } from "../types/type";
import { getCookie } from "../services/cookie";

const JDPlusPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();
  const user = getCookie("user");
  const [jobData, setJobData] = useState<JobAPI>({
    title: "",
    enterpriseName: "",
    content: "",
    link: "",
    startAt: null,
    endedAt: null,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  //유효성검사
  const isJobDataComplete = () => {
    const { title, enterpriseName, content, link, startAt, endedAt } = jobData;
    return (
      title.trim() !== "" &&
      enterpriseName.trim() !== "" &&
      content.trim() !== "" &&
      link.trim() !== "" &&
      startAt !== null &&
      endedAt !== null
    );
  };

  // endTime 계산
  const getEndTime = () => {
    if (!jobData.endedAt) return null; // endDate가 null이면 null 반환
    if (selectedTime) {
      const hours = parseInt(selectedTime.split(":")[0]);
      const minutes = parseInt(selectedTime.split(":")[1]);

      const endTime = new Date(jobData.endedAt); // endDate를 기반으로 새 Date 객체 생성
      endTime.setHours(hours, minutes, 0); // 시간과 분 설정
      console.log("최종시간은", endTime);
      return endTime;
    }
  };
  const endTime = getEndTime();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleSDateChange = (date: Date) => {
    if (!jobData.startAt && !jobData.endedAt) {
      setJobData({ ...jobData, startAt: date });
    } else if (jobData.endedAt && date < jobData.endedAt) {
      setJobData({ ...jobData, startAt: date });
    } else {
      setJobData({ ...jobData, startAt: jobData.endedAt });
    }
  };

  const handleEDateChange = (date: Date) => {
    if (!jobData.endedAt && !jobData.startAt) {
      setJobData({ ...jobData, endedAt: date });
    } else if (jobData.startAt && jobData.startAt) {
      setJobData({ ...jobData, endedAt: date });
    } else {
      setJobData({ ...jobData, endedAt: jobData.startAt });
    }
  };

  const handleEditorChange = (newContent: string) => {
    setJobData({ ...jobData, content: newContent });
  };

  //   useEffect(() => {
  //     console.log("Dates updated:", startDate, endDate);
  //     console.log("Time was updated:", selectedTime);
  //     console.log(endTime);
  //   }, [selectedTime, startDate, endDate]);

  //api
  const handleJDPost = async (job: JobAPI, token: string) => {
    try {
      const response = await jobpost(
        {
          enterpriseName: job.enterpriseName,
          title: job.title,
          content: job.content,
          link: job.link,
          startAt: job.startAt,
          endedAt: job.endedAt,
        },
        user.token
      );
      console.log(response);
      nav("/jd");
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  return (
    <StyledDivContainer className="page">
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
      <ToggleContainer>
        <AirplaneToggle step={1} />
      </ToggleContainer>
      <TopTitleBar>
        <Title>새로운 공고 등록</Title>
        <ButtonContainer>
          <CancelButton onClick={openModal}>취소</CancelButton>
          <SaveButton
            onClick={() => {
              if (isJobDataComplete()) {
                handleJDPost(jobData, user.token);
              } else {
                alert("모든 문항을 입력하세요.");
              }
            }}
          >
            저장
          </SaveButton>
        </ButtonContainer>
      </TopTitleBar>
      <MainContainer>
        <TopContainer>
          <LeftTitleContainer>
            <InputContainer>
              <InputTitle>기업명</InputTitle>
              <InputBox
                value={jobData.enterpriseName}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    enterpriseName: e.target.value,
                  })
                }
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>제목</InputTitle>
              <InputBox
                value={jobData.title}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    title: e.target.value,
                  })
                }
              />
            </InputContainer>
          </LeftTitleContainer>
          <RightTitleContainer>
            <InputContainer>
              <InputTitle>지원기간</InputTitle>
              <PeriodBox>
                {jobData.startAt ? (
                  <div className="datepicker">
                    <OneDatePick
                      date={jobData.startAt}
                      setDate={handleSDateChange}
                    />
                  </div>
                ) : (
                  <div className="datepicker">
                    <OneDatePick date={null} setDate={handleSDateChange} />
                  </div>
                )}
                <div style={{ marginLeft: 20 }}>~</div>
                {jobData.endedAt ? (
                  <div className="datepicker">
                    <OneDatePick
                      date={jobData.endedAt}
                      setDate={handleEDateChange}
                    />
                  </div>
                ) : (
                  <div className="datepicker">
                    <OneDatePick date={null} setDate={handleEDateChange} />
                  </div>
                )}
                <img src={ClockIcon} alt="clock" style={{ marginLeft: 20 }} />

                <div className="datepicker">
                  <TimeSelector
                    time={selectedTime}
                    setTime={handleTimeChange}
                  />
                </div>
              </PeriodBox>
            </InputContainer>
            <InputContainer>
              <InputTitle>링크</InputTitle>
              <InputBox
                value={jobData.link}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    link: e.target.value,
                  })
                }
              />
            </InputContainer>
          </RightTitleContainer>
        </TopContainer>
        <ContentContainer>
          <BundleEditor
            content={jobData.content}
            onContentChange={handleEditorChange}
          ></BundleEditor>
        </ContentContainer>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDPlusPage;

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
  margin-top: 1.25rem;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.625rem 4rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: none;
  color:var(--white);
  background: var(--main-500, #D9D9D9);
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 0.625rem 4rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: none;
  margin-left: 1rem;
  color:var(--white);
  background: var(--main-500, #7D82FF);
`;

const MainContainer = styled.div`
    width: 100%; 
    border-radius: 10px;
    background: #FFF;
    border-radius: 0.9375rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--icon-color, #FFF);
    margin-bottom: 3.25rem;
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    //background-color: red;
    height: 10rem;
    align-items: center;
    //margin: 1.5rem;
    padding: 2rem;
    justify-content: center;
`;

const LeftTitleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const RightTitleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    z-index: 100;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
`;

const InputTitle = styled.div`
    width: 4rem;
    display: flex;
    justify-content: center;
    color: var(--neutral-600, #63698D);
    text-align: right;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    margin-right: 1.25rem;
    letter-spacing: -0.0225rem;
`;

const InputBox = styled.input`
    display: flex;
    justify-content: center;
    flex: 8;
    background-color: #F2F3F9;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    height: 2.5rem;
    border: none;
    &:focus {
    outline: none;
  }
`;

const PeriodBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex: 8;
    .datepicker{
    }
`;

const ContentContainer = styled.div`
    align-items: center;
    justify-content: center;
    z-index: 1;
`;
