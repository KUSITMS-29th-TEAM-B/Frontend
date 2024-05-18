import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import HeaderInput from "../components/JD/HeaderInput";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import ContentInput from "../components/JD/ContentInput";
import Toggle from "../components/JD/Toggle";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { detailStore } from "../store/jdStore";
import arrowLeft from "../assets/icons/icon_arrow_left.svg";
import plusBtn from "../assets/icons/icon_plus_btn_question.svg";
import { useNavigate, useParams } from "react-router-dom";
import QuestionModal from "../components/JD/QuestionModal";
import DiscardModal from "../components/JD/DiscardModal";
import JDContainer from "../components/JD/JDContainer";
import ExperienceBox from "../components/JD/ExpContainer";
import { ApplyAPI } from "../types/type";
import { applypost } from "../services/jd";
import { userInfo } from "../store/userInfo";
import { getCookie } from "../services/cookie";

const JDEditPage: React.FC = () => {
  const [active, setActive] = useState(false); // 오른쪽 슬라이드 팝업 여부
  const [activebutton, setActivebutton] = useState(""); // 경험 분석 or 공고 보기
  const [applyData, setApplyData] = useState<ApplyAPI[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]); //문항 데이터
  const [editing, setEditing] = useState(true); //수정중 여부
  const [completed, setCompleted] = useState(false); //작성 완료
  const [isAllFilled, setIsAllFilled] = useState(false); // 문항이 빈칸이 없는지 검사

  const [detailId, setDetailId] = useRecoilState<number>(detailStore); //경험의 고유 id(0이 아니여야함)
  const [isModalOpen, setIsModalOpen] = useState(false); // 문항 삭제 모달
  const [discardModal, setdiscardModal] = useState(false); // 작성내용 버리기 모달
  const [deleteIdx, setDeleteIdx] = useState<number>(-1); //modal 열기전 삭제할 index 저장
  const nav = useNavigate();
  const jdId: string = useParams().jdId!; //공고 id
  const user = getCookie("user"); //토큰 받아오기용

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    // console.log("token", user.token);
  }, []);

  //모든 질문이 다 채워졌는지 검사
  useEffect(() => {
    const isAnyQuestionEmpty = applyData.some(
      (question) => question.question === "" || question.answer === ""
    );

    setIsAllFilled(!isAnyQuestionEmpty);
  }, [applyData]);

  //자기소개서 작성 내용 버리기
  const openDiscardModal = () => {
    setdiscardModal(true);
  };

  const closeDiscardModal = () => {
    setdiscardModal(false);
  };

  //자기소개서 문항 삭제하기
  const openModal = (index: number) => {
    if (applyData.length > 1) {
      setDeleteIdx(index);
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  //자기소개서 문항 삭제시
  const closeModal = () => {
    setIsModalOpen(false);
    if (deleteIdx >= 0) {
      handleRemoveQuestion(deleteIdx);
      setDeleteIdx(-1);
    }
    document.body.style.overflow = "auto";
  };

  //자기소개서 문항 삭제하지 않을 시
  const cancelModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleHeaderChange = (index: number, value: string) => {
    const newData = [...applyData];
    newData[index].question = value;
    setApplyData(newData);
  };

  const handleContentChange = (index: number, value: string) => {
    const newData = [...applyData];
    newData[index].answer = value;
    setApplyData(newData);
  };

  const handleAddQuestions = () => {
    const newData = {
      question: "",
      answer: "",
    };
    setApplyData([...applyData, newData]);
  };

  const handleRemoveQuestion = (index: number) => {
    const filteredData = applyData.filter((item, idx) => idx !== index);
    setApplyData(filteredData);
  };

  const handleEditButton = () => {
    if (editing) {
      setEditing(!editing);
      //저장기능
    } else if (!editing && !completed) {
      setEditing(!editing);
    }
  };

  const handleSaveButton = () => {
    if (isAllFilled) {
      setEditing(false);
      //api post 요청
    }
  };

  //자기소개서 post api 요청
  const handleApplyPost = async (
    applyData: ApplyAPI[],
    token: string,
    jobId: string
  ) => {
    if (isAllFilled) {
      setEditing(false);
      try {
        const response = await applypost(applyData, token, jobId);
        console.log(response);
        nav(`jd/${jdId}`);
      } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
      }
    } else {
      alert("모든 항목을 다 입력하세요.");
    }
  };

  //activecontainer 변경사항 있을 시 detailId 초기화
  useEffect(() => {
    if (!active) {
      setDetailId(0);
    }
  }, [active]);

  const JDtoggleContainer = () => {
    if (!active) {
      setActive(!active);
      setActivebutton("JD");
    } else if (active && activebutton === "JD") {
      setActive(!active);
      setActivebutton("");
    } else if (active && activebutton === "Exp") {
      setActivebutton("JD");
      setDetailId(0);
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
      <QuestionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCancel={cancelModal}
      />
      <DiscardModal isOpen={discardModal} onClose={closeDiscardModal} />
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
            <Title>
              <img
                src={arrowLeft}
                alt="arrowicon"
                onClick={() => (editing ? openDiscardModal() : nav(-1))}
              />
              자기소개서 작성
            </Title>
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
              {editing ? (
                <SaveButton isNotNull={isAllFilled} onClick={handleSaveButton}>
                  저장
                </SaveButton>
              ) : (
                <EditButton iscanEdit={completed} onClick={handleEditButton}>
                  수정
                </EditButton>
              )}
            </TopWrapper>
            <ScrollDiv>
              {editing ? (
                <QuestionsWrapper>
                  {applyData.map((item, index) => (
                    <div key={index}>
                      <HeaderInput
                        content={item.question}
                        onChange={(value) => handleHeaderChange(index, value)}
                        onRemove={() => openModal(index)}
                      />
                      <ContentInput
                        content={item.answer}
                        isEdit={editing}
                        onChange={(value) => handleContentChange(index, value)}
                      />
                      <TextCountWrapper>
                        <div>{item.answer.length + "자(공백 포함)"}</div>
                      </TextCountWrapper>
                    </div>
                  ))}
                  <div className="img_box">
                    <img
                      width={44}
                      height={44}
                      src={plusBtn}
                      alt="plusbtn"
                      onClick={handleAddQuestions}
                    />
                  </div>
                </QuestionsWrapper>
              ) : (
                <AnswersWrapper>
                  {applyData.map((item, index) => (
                    <Answer key={index}>
                      <AnswerHeader>
                        {`${index + 1}. ${item.question}`}
                      </AnswerHeader>
                      <AnswerContent>{item.answer}</AnswerContent>
                      <TextCountWrapper>
                        <div>{item.answer.length + "자(공백 포함)"}</div>
                      </TextCountWrapper>
                    </Answer>
                  ))}
                </AnswersWrapper>
              )}
            </ScrollDiv>
          </EditContainer>
        </CenteredContainer>
        <AnimatePresence>
          <ActiveContainer
            isActive={detailId !== 0}
            initial={{ x: "100%", width: "45%" }}
            animate={{ x: !active ? "110%" : "5%", width: "45%" }}
            exit={{
              x: "0%",
              transition: { stiffness: 50, damping: 20 },
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
              <>
                {detailId !== 0 ? (
                  <ExpDetailWrapper>
                    <ExperienceBox expId={detailId} />
                  </ExpDetailWrapper>
                ) : (
                  <ExpContainer>
                    <ExperienceList showBookmarksOnly={true} />
                  </ExpContainer>
                )}
              </>
            ) : (
              <JobContainer>
                {jdId ? <JDContainer jdId={jdId} /> : null}
              </JobContainer>
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
  height: 38rem;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll;
  overflow-x: hidden; */
`;

const JobContainer = styled.div`
  width: 100%;
  height: 38rem;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll;
  overflow-x: hidden; */
`;

const ExpDetailWrapper = styled.div`
  width: 100%;
  height: 38rem;
  display: flex;
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
  display: flex;
  flex-direction: row;
  color:#343A5D;
  align-items: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  padding-bottom: 1rem;
  justify-content: space-between;
`;

const TextCountWrapper = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    color: ${(props) => props.theme.colors.neutral500};
    ${(props) => props.theme.fonts.cap3}
`;

const SaveButton = styled.button<{ isNotNull: boolean }>`
    display: inline-flex;
    padding: 0.625rem 4rem;
    justify-content: center;
    align-items: center;
    color:#FFF;
    gap: 0.625rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    background:  ${(props) => props.theme.colors.neutral500};
  ${(props) =>
    props.isNotNull &&
    css`
        background: ${(props) => props.theme.colors.main500};
    `}
`;

const EditButton = styled.button<{ iscanEdit: boolean }>`
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
    border: 1px solid ${(props) => props.theme.colors.main500};
    background: #FFF;
    ${(props) => props.theme.fonts.button2}
    color: ${(props) => props.theme.colors.main500};
  ${(props) =>
    props.iscanEdit &&
    css`
        border: 1px solid var(--neutral-500, #A6AAC0);
        color: ${(props) => props.theme.colors.neutral500};
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

const ActiveContainer = styled(motion.div)<{ isActive: boolean }>`
  width: 45%;
  border-radius: 10px;
  margin: 0 3.5rem; 
  margin-top : 10rem;
  background: ${(props) => (props.isActive ? "#FFF" : "#F7F7FB")};
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
    height: 30rem;
    color: var(--neutral-700, #343A5D);
    padding: 0 2rem;
    .img_box {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    //overflow-y: scroll;
`;

const AnswersWrapper = styled.div`
    height: 30rem;
    color: var(--neutral-700, #343A5D);
    padding: 0 2rem;
    //overflow-y: scroll;
`;

const Answer = styled.div`
    margin-bottom: 1.75rem;
    ${(props) => props.theme.fonts.body5};
`;

const AnswerHeader = styled.h3`
    color: var(--neutral-700, #343A5D);
    /* subtitle 3 (semibold 16pt) */
    ${(props) => props.theme.fonts.subtitle3}
    margin-bottom: 1rem;
`;

const AnswerContent = styled.p`
    color: var(--neutral-700, #343A5D);
    /* body 5 (regular 13pt) */
    border-top: 1px solid #EAEBF3;
    padding: 1.25rem;
    ${(props) => props.theme.fonts.body5};
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
