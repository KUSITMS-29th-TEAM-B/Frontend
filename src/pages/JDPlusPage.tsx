import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import BundleEditor from "../components/editor/BundleEditor";
import TimeSelector from "../components/common/TimePicker";
import OneDatePick from "../components/common/DatePicker";
import { useNavigate } from "react-router-dom";
import Modal from "../components/JD/JDModal";

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
    flex: 8;
`;

const ContentContainer = styled.div`
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const JDPlusPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

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
    if (!startDate && !endDate) {
      setStartDate(date);
    } else if (endDate && date < endDate) {
      setStartDate(date);
    } else {
      alert("시작 날짜는 끝나는 날짜보다 앞이여야합니다.");
      setStartDate(endDate);
    }
  };

  const handleEDateChange = (date: Date) => {
    if (!endDate && !startDate) {
      setEndDate(date);
    } else if (startDate && date > startDate) {
      setEndDate(date);
    } else {
      alert("끝나는 날짜는 시작 날짜보다 뒤여야합니다.");
      setEndDate(startDate);
    }
  };

  //저장시에도 따로 기간 확인 진행하기.

  const handleEditorChange = (newContent: string) => {
    console.log("Content was updated:", newContent);
    setContent(newContent);
  };

  useEffect(() => {
    console.log("Dates updated:", startDate, endDate);
    console.log("Time was updated:", selectedTime);
  }, [selectedTime, startDate, endDate]);

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
          <SaveButton onClick={() => nav("/jd")}>저장</SaveButton>
        </ButtonContainer>
      </TopTitleBar>
      <MainContainer>
        <TopContainer>
          <LeftTitleContainer>
            <InputContainer>
              <InputTitle>기업명</InputTitle>
              <InputBox />
            </InputContainer>
            <InputContainer>
              <InputTitle>제목</InputTitle>
              <InputBox />
            </InputContainer>
          </LeftTitleContainer>
          <RightTitleContainer>
            <InputContainer>
              <InputTitle>지원기간</InputTitle>
              <PeriodBox>
                {startDate ? (
                  <OneDatePick date={startDate} setDate={handleSDateChange} />
                ) : (
                  <OneDatePick date={new Date()} setDate={handleSDateChange} />
                )}
                {endDate ? (
                  <OneDatePick date={endDate} setDate={handleEDateChange} />
                ) : (
                  <OneDatePick date={new Date()} setDate={handleEDateChange} />
                )}
                <TimeSelector time={selectedTime} setTime={handleTimeChange} />
              </PeriodBox>
            </InputContainer>
            <InputContainer>
              <InputTitle>링크</InputTitle>
              <InputBox />
            </InputContainer>
          </RightTitleContainer>
        </TopContainer>
        <ContentContainer>
          <BundleEditor
            content={content}
            onContentChange={handleEditorChange}
          ></BundleEditor>
        </ContentContainer>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDPlusPage;
