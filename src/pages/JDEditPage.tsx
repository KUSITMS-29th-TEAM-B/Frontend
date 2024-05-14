import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import HeaderInput from "../components/JD/HeaderInput";
import AirplaneToggle from "../components/JD/AirplaneToggle";
import ExperienceList from "../components/JD/ExperienceList";
import ContentInput from "../components/JD/ContentInput";
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
  padding: 0.625rem 4rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: none;
  color:var(--white);
  background: var(--main-500, #7D82FF);
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

const EditContainer = styled.div`
    width: 100%;
    align-items: flex-start;
    min-height: 30rem;
    padding: 3rem 1.5rem;
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

const JDEditPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [activebutton, setActivebutton] = useState("");
  //   const [content, setContent] = useState("<p>내용을 입력해주세요. </p>");

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

  //   const handleEditorChange = (newContent: string) => {
  //     console.log("Content was updated:", newContent);
  //     setContent(newContent);
  //   };

  return (
    <StyledDivContainer className="page">
      <MainContainer>
        <CenteredContainer
          initial={{ width: "100%" }}
          animate={{
            x: active ? "-5%" : "10%",
            width: active ? "45%" : "200%",
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
            <TopButton>저장</TopButton>
          </TopTitleBar>
          <EditContainer>
            <HeaderInput />
            <ContentInput />
            <HeaderInput />
            <ContentInput />
          </EditContainer>
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
            <ExpContainer>
              <ExperienceList />
            </ExpContainer>
          </ActiveContainer>
        </AnimatePresence>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDEditPage;
