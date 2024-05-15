import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import HeaderInput from "../components/JD/HeaderInput";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import ContentInput from "../components/JD/ContentInput";
import Modal from "../components/JD/JDModal";
import Toggle from "../components/JD/Toggle";

const JDEditPage: React.FC = () => {
  const [active, setActive] = useState(false); // 오른쪽 슬라이드 팝업 여부
  const [activebutton, setActivebutton] = useState(""); // 경험 분석 or 공고 보기
  const [questionContent, setQuestionContent] = useState<{
    question: { header: string; content: string }[];
  }>({
    question: [
      { header: "", content: "" },
      { header: "", content: "" },
      { header: "", content: "" },
    ],
  }); //문항 데이터
  const [editing, setEditing] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) {
      console.log("작성 완료 상태입니다.");
    } else {
      console.log("작성 중 상태입니다.");
    }
  }, [completed]);

  const handleHeaderChange = (index: number, value: string) => {
    setQuestionContent((prev) => ({
      question: prev.question.map((item, i) =>
        i === index ? { ...item, header: value } : item
      ),
    }));
  };

  const handleContentChange = (index: number, value: string) => {
    setQuestionContent((prev) => ({
      question: prev.question.map((item, i) =>
        i === index ? { ...item, content: value } : item
      ),
    }));
  };

  const handleAddQuestions = () => {
    setQuestionContent((prev) => ({
      question: [...prev.question, { header: "", content: "" }],
    }));
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestionContent((prev) => ({
      question: prev.question.filter((_, i) => i !== index),
    }));
  };

  const handleEditButton = () => {
    if (editing) {
      setEditing(!editing);
      //저장기능
    } else if (!editing && !completed) {
      setEditing(!editing);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  const JDtoggleContainer = () => {
    if (!active) {
      setActive(!active);
      setActivebutton("JD");
    } else if (active && activebutton === "JD") {
      setActive(!active);
      setActivebutton("");
    } else if (active && activebutton === "Exp") {
      setActivebutton("JD");
    }
  };

  const ExptoggleContainer = () => {
    if (!active) {
      setActive(!active);
      setActivebutton("Exp");
    } else if (active && activebutton === "Exp") {
      setActive(!active);
      setActivebutton("");
    } else if (active && activebutton === "JD") {
      setActivebutton("Exp");
    }
  };

  return (
    <StyledDivContainer className="page">
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
            <AirplaneToggle step={3} />
          </ToggleContainer>
          <TopTitleBar>
            <Title>자기소개서 작성</Title>
          </TopTitleBar>
          <EditContainer>
            <TopWrapper>
              <ToggleWrapper>
                작성완료
                <Toggle
                  isActive={completed}
                  onClick={() => (!editing ? setCompleted(!completed) : null)}
                />
              </ToggleWrapper>
              <TopButton isEdit={editing} onClick={handleEditButton}>
                {editing ? "저장" : "수정"}
              </TopButton>
            </TopWrapper>
            <ScrollDiv>
              {editing ? (
                <QuestionsWrapper>
                  {questionContent.question.map((item, index) => (
                    <div key={index}>
                      <HeaderInput
                        content={item.header}
                        onChange={(value) => handleHeaderChange(index, value)}
                      />
                      <ContentInput
                        content={item.content}
                        isEdit={editing}
                        onChange={(value) => handleContentChange(index, value)}
                      />
                      {/* <button onClick={() => handleRemoveQuestion(index)}>
                  Remove
                </button> */}
                    </div>
                  ))}
                  <button onClick={handleAddQuestions}>문항추가</button>
                </QuestionsWrapper>
              ) : (
                <AnswersWrapper>
                  {questionContent.question.map((item, index) => (
                    <Answer key={index}>
                      <AnswerHeader>
                        {`${index + 1}` + `. ` + item.header}
                      </AnswerHeader>
                      <AnswerContent>{item.content}</AnswerContent>
                    </Answer>
                  ))}
                </AnswersWrapper>
              )}
            </ScrollDiv>
          </EditContainer>
        </CenteredContainer>
        <AnimatePresence>
          <ActiveContainer
            initial={{ x: "100%", width: "45%" }}
            animate={{ x: !active ? "110%" : "5%", width: "45%" }}
            exit={{
              x: "0%",
              transition: { delay: 0.5, stiffness: 50, damping: 20 },
            }}
            transition={{ type: "spring", stiffness: 40 }}
          >
            <JDButton
              onClick={JDtoggleContainer}
              active={activebutton === "JD"}
            >
              <ButtonText active={activebutton === "JD"}>공고보기</ButtonText>
            </JDButton>
            <ExperienceButton
              onClick={ExptoggleContainer}
              active={activebutton === "Exp"}
            >
              <ButtonText active={activebutton === "Exp"}>경험분석</ButtonText>
            </ExperienceButton>
            {activebutton === "Exp" ? (
              <ScrollDiv>
                <ExpContainer>
                  <ExperienceList />
                </ExpContainer>
              </ScrollDiv>
            ) : (
              <ScrollDiv>
                <JobContainer>
                  <div>{activebutton}</div>
                </JobContainer>
              </ScrollDiv>
            )}
          </ActiveContainer>
        </AnimatePresence>
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
  height: 35rem;
  display: flex;
  padding: 2rem;
  margin-right: 1rem;
  flex-direction: column;
  /* overflow-y: scroll;
  overflow-x: hidden; */
`;

const JobContainer = styled.div`
  width: 100%;
  height: 35rem;
  display: flex;
  padding: 2rem;
  margin-right: 1rem;
  flex-direction: column;
  /* overflow-y: scroll;
  overflow-x: hidden; */
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

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  padding-bottom: 1rem;
  justify-content: space-between;
`;

const TopButton = styled.button<{ isEdit: boolean }>`
    display: inline-flex;
    padding: 0.625rem 4rem;
    justify-content: center;
    align-items: center;
    color:#A6AAC0;
    gap: 0.625rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    border-radius: 0.5rem;
    border: 1px solid #D9DBE6;
    background-color: white;
  ${(props) =>
    props.isEdit &&
    css`
        border: 1px solid transparent;
        color:var(--white);
        background: var(--main-500, #7D82FF);
    `}
`;

const ToggleWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    color: var(--neutral-700, #343A5D);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; 
    letter-spacing: -0.02rem;
    gap: 0.75rem;
    align-items: center;
`;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: center;
  overflow: hidden;
  background-color: #FBFBFD;
`;

const CenteredContainer = styled(motion.div)`
    /* width: 100%; 
    border-radius: 10px;
    background: transparent;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    min-height: 30rem;
    margin: 0.5rem 0.25rem 0.5rem 0.5rem;   */
    width: 100%; 
    border-radius: 10px;
    background: transparent;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    //min-height: 100rem;
`;

const ScrollDiv = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
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

const EditContainer = styled.div`
    width: 100%;
    align-items: flex-start;
    min-height: 15rem;
    padding: 2rem 0rem;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
`;

const ActiveContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  padding: 1rem;
  padding-right: 0rem;
  margin: 0 3.5rem; 
  margin-top : 10rem;
  background: #F7F7FB;
  //background: red;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 38rem;
`;

const buttonActiveStyle = css`
  background: #7D82FF; 
`;

interface ButtonProps {
  active: boolean;
}

const JDButton = styled.button<ButtonProps>`
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

const ExperienceButton = styled.button<ButtonProps>`
  position: absolute;
  left: -2rem;
  top: 8.5rem;
  width: 2rem;
  height: 7rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.66019rem 0rem 0rem 0.66019rem;
  background: var(--neutral-300, #EAEBF3);
  ${({ active }) => active && buttonActiveStyle}
`;

const QuestionsWrapper = styled.div`
    height: 28rem;
    color: var(--neutral-700, #343A5D);
    padding: 0 2rem;
    //overflow-y: scroll;
`;

const AnswersWrapper = styled.div`
    height: 28rem;
    color: var(--neutral-700, #343A5D);
    padding: 0 2rem;
    //overflow-y: scroll;
`;

const Answer = styled.div`
    margin-bottom: 1.75rem;
`;

const AnswerHeader = styled.h3`
    color: var(--neutral-700, #343A5D);
    /* subtitle 3 (semibold 16pt) */
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const AnswerContent = styled.p`
    color: var(--neutral-700, #343A5D);
    /* body 5 (regular 13pt) */
    font-size: 0.8em;
    font-style: normal;
    font-weight: 400;
    border-top: 1px solid #EAEBF3;
    padding: 1.25rem;
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
