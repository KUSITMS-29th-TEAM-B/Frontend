import React from "react";
import styled, { useTheme } from "styled-components";
import MainButton from "../components/common/MainButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import { ArrowDown, ArrowLeft } from "../assets";
import Textarea from "../components/common/Textarea";
import { questions } from "../assets/data/questions";
import TimePicker from "../components/common/TimePicker";
import { useNavigate } from "react-router-dom";

const ExperienceWritePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  /**
   * 경험 기본 정보
   */

  const renderExperienceBasicInfo = () => {
    return (
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ArrowDown />}
          aria-controls="basic-info"
          id="basic-info"
          sx={{
            "&.Mui-expanded": {
              minHeight: 0,
            },
            ".MuiAccordionSummary-content": {
              "&.Mui-expanded": {
                margin: "12px 0px",
              },
            },
            minHeight: 0,
            borderRadius: "12px",
            background: theme.colors.main50,
          }}
        >
          경험 기본 정보
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "32px 20px" }}>
          <BasicFormContainer>
            <div className="period">경험 기간</div>
            {/* <TimePicker
              time={startDate}
              setTime={(time: string) => setStartDate(time)}
            />
            <TimePicker
              time={endDate}
              setTime={(time: string) => setEndDate(time)}
            /> */}
            <div className="keyword">경험 분류</div>
            <div className="tag">역량 태그 선택</div>
          </BasicFormContainer>
        </AccordionDetails>
      </Accordion>
    );
  };

  /**
   *
   */
  const renderQuestionForm = () => {
    return (
      <Accordion
        sx={{
          boxShadow: "none",
          "&::before": {
            backgroundColor: "transparent",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDown />}
          aria-controls="basic-info"
          id="basic-info"
          sx={{
            "&.Mui-expanded": {
              minHeight: 0,
            },
            ".MuiAccordionSummary-content": {
              "&.Mui-expanded": {
                margin: "12px 0px",
              },
            },
            minHeight: 0,
            borderRadius: "12px",
            background: theme.colors.main50,
          }}
        >
          경험 질문
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "32px 0px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {questions.map((item, index) => (
            <Textarea
              label={`${index + 1}. ${item}`}
              rows={8}
              labelStyle={
                theme.fonts.title4 + `color: ${theme.colors.neutral700}`
              }
              style={{
                borderRadius: "12px",
                border: `1px solid ${theme.colors.neutral400}`,
                background: `${theme.colors.neutral0}`,
              }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    );
  };

  //
  //
  //
  return (
    <MainContainer className="page">
      <TopContainer>
        <div className="title">
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <ArrowLeft />
          </button>
          경험 작성
        </div>
        <CustomButton>저장</CustomButton>
      </TopContainer>
      <ContentContainer>
        <TitleInput placeholder="경험의 제목을 입력해주세요"></TitleInput>
        {renderExperienceBasicInfo()}
        {renderQuestionForm()}
      </ContentContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${(props) => props.theme.colors.neutral20};
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${(props) => props.theme.fonts.title1};
    color: ${(props) => props.theme.colors.neutral700};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 80px;
  border-radius: 15px;
  border: 1px solid var(--neutral-200, #eeeff7);
  background: var(--neutral-0, #fff);
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const CustomButton = styled(MainButton)`
  padding: 10px 64px;
  border-radius: 8px;
  ${(props) => props.theme.fonts.button2};
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  padding: 24px 0px;
  border-bottom: 0.775px solid ${(props) => props.theme.colors.neutral300};
  outline: none;
  ${(props) => props.theme.fonts.title1};
  &::placeholder {
    color: ${(props) => props.theme.colors.neutral500};
  }
`;

const BasicFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
  .forms {
    display: flex;
    flex-direction: row;
    gap: 64px;
  }
  .label {
    ${(props) => props.theme.fonts.subtitle2};
    color: ${(props) => props.theme.colors.neutral700};
  }
`;

export default ExperienceWritePage;
