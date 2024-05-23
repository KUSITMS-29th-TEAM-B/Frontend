import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import BundleEditor from "../components/editor/BundleEditor";
import TimeSelector from "../components/common/TimePicker";
import OneDatePick from "../components/common/DatePicker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../components/JD/JDEditModal";
import ClockIcon from "../assets/icons/icon_clock_net600.svg";
import { jobdescriptionget, jobpatch, jobpost } from "../services/JD/jdApi";
import { JobAPI, JobDescriptionAPI } from "../types/type";
import { getCookie } from "../services/cookie";

const JDEditPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const user = getCookie("user");
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
  const jdId = useParams().jdId;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleBackNavigation = () => {
      openModal();
    };

    window.history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", handleBackNavigation);
    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (jdId) {
      getJobData(jdId, user.token);
    }
  }, []);

  // endTime 계산
  const getEndTime = () => {
    if (!jdData.endedAt) return null;
    if (selectedTime) {
      const endTime = new Date(jdData.endedAt);
      let [hours, minutes] = selectedTime.split(":");
      endTime.setHours(parseInt(hours, 10) + 9, parseInt(minutes, 10), 0, 0);
      setJdData({ ...jdData, endedAt: endTime });
    }
  };

  useEffect(() => {
    if (jdData.startAt && jdData.endedAt && selectedTime !== null) {
      getEndTime();
    }
    console.log(selectedTime);
  }, [selectedTime]);

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
    if (!jdData.startAt && !jdData.endedAt) {
      setJdData({ ...jdData, startAt: date });
    } else if (jdData.endedAt && date < jdData.endedAt) {
      setJdData({ ...jdData, startAt: date });
    } else {
      alert("시작 날짜는 끝나는 날짜보다 앞이여야합니다.");
      setJdData({ ...jdData, startAt: jdData.endedAt });
    }
  };

  const handleEDateChange = (date: Date) => {
    if (!jdData.endedAt && !jdData.startAt) {
      setJdData({ ...jdData, endedAt: date });
    } else if (jdData.startAt && jdData.startAt) {
      setJdData({ ...jdData, endedAt: date });
    } else {
      alert("끝나는 날짜는 시작 날짜보다 뒤여야합니다.");

      setJdData({ ...jdData, endedAt: jdData.startAt });
    }
  };

  const handleEditorChange = (newContent: string) => {
    setJdData({ ...jdData, content: newContent });
  };

  //   useEffect(() => {
  //     console.log("Dates updated:", startDate, endDate);
  //     console.log("Time was updated:", selectedTime);
  //     console.log(endTime);
  //   }, [selectedTime, startDate, endDate]);

  //api
  const handleJDPatch = async (job: JobAPI, jdId: string, token: string) => {
    try {
      const response = await jobpatch(
        {
          enterpriseName: job.enterpriseName,
          title: job.title,
          content: job.content,
          link: job.link,
          startAt: job.startAt,
          endedAt: job.endedAt,
        },
        jdId,
        token
      );
      console.log(response);
      nav(`/jd/${jdId}`);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  const getJobData = async (jdId: string, token: string) => {
    try {
      const response = await jobdescriptionget(jdId, token);
      const jdApiData: JobDescriptionAPI = {
        enterpriseName: response.data.enterpriseName,
        title: response.data.title,
        remainingDate: response.data.remainingDate,
        content: response.data.content,
        writeStatus: response.data.writeStatus,
        link: response.data.link,
        createdAt: response.data.createdAt,
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

  return (
    <StyledDivContainer className="page">
      {jdId && (
        <Modal isOpen={isModalOpen} onClose={closeModal} jdId={jdId}></Modal>
      )}
      <ToggleContainer>
        <AirplaneToggle step={1} />
      </ToggleContainer>
      <TopTitleBar>
        <Title>공고 수정</Title>
        <ButtonContainer>
          <CancelButton onClick={openModal}>취소</CancelButton>
          <SaveButton
            onClick={() => {
              if (jdData.startAt && jdData.endedAt && jdId) {
                handleJDPatch(jdData, jdId, user.token);
              } else {
                alert("Start date and end date must be provided.");
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
                value={jdData.enterpriseName}
                onChange={(e) =>
                  setJdData({
                    ...jdData,
                    enterpriseName: e.target.value,
                  })
                }
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>제목</InputTitle>
              <InputBox
                value={jdData.title}
                onChange={(e) =>
                  setJdData({
                    ...jdData,
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
                {jdData.startAt ? (
                  <div className="datepicker">
                    <OneDatePick
                      date={jdData.startAt}
                      setDate={handleSDateChange}
                    />
                  </div>
                ) : (
                  <div className="datepicker">
                    <OneDatePick
                      date={new Date()}
                      setDate={handleSDateChange}
                    />
                  </div>
                )}
                <div style={{ marginLeft: 20 }}>~</div>
                {jdData.endedAt ? (
                  <div className="datepicker">
                    <OneDatePick
                      date={jdData.endedAt}
                      setDate={handleEDateChange}
                    />
                  </div>
                ) : (
                  <div className="datepicker">
                    <OneDatePick
                      date={new Date()}
                      setDate={handleEDateChange}
                    />
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
                value={jdData.link}
                onChange={(e) =>
                  setJdData({
                    ...jdData,
                    link: e.target.value,
                  })
                }
              />
            </InputContainer>
          </RightTitleContainer>
        </TopContainer>
        <ContentContainer>
          <BundleEditor
            content={jdData.content}
            onContentChange={handleEditorChange}
          ></BundleEditor>
        </ContentContainer>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDEditPage;

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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
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
