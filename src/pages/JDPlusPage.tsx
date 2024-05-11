import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import BundleEditor from "../components/editor/BundleEditor";
import TimeSelector from "../components/common/TimePicker";
import OneDatePick from "../components/common/DatePicker";

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
  min-height: 30rem;
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    //background-color: red;
    height: 10rem;
    align-items: center;
    margin: 1.5rem;
    justify-content: center;
`;

const LeftTitleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid black;
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
    display: flex;
    justify-content: center;
    flex: 2;
    font-size: 16px;
    color: black;
`;

const InputBox = styled.input`
    display: flex;
    justify-content: center;
    flex: 8;
    background-color: #F2F3F9;
    border-radius: 10px;
    height: 2.5rem;
    border: none;
`;

const ContentContainer = styled.div`
    //background-color: green;
    align-items: center;
    margin: 1.5rem;
    justify-content: center;
    z-index: 1;
`;

const JDPlusPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleSDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEDateChange = (date: Date) => {
    setEndDate(date);
  };

  const handleEditorChange = (newContent: string) => {
    console.log("Content was updated:", newContent);
    setContent(newContent);
  };

  useEffect(() => {
    console.log("Time was updated:", selectedTime, startDate, endDate);
  }, [selectedTime, startDate, endDate]);

  return (
    <StyledDivContainer className="page">
      <ToggleContainer>
        <AirplaneToggle step={1} />
      </ToggleContainer>
      <TopTitleBar>
        <Title>새로운 공고 등록</Title>
        <ButtonContainer>
          <CancelButton>취소</CancelButton>
          <SaveButton>저장</SaveButton>
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
              <OneDatePick date={startDate} setDate={handleSDateChange} />
              <OneDatePick date={endDate} setDate={handleEDateChange} />
              <TimeSelector time={selectedTime} setTime={handleTimeChange} />
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
