import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #FBFBFD;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
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
  background: #FFF;
  padding: 2rem;
  min-height: 30rem;
  margin: 0.5rem 0.25rem 0.5rem 0.5rem;  
`;

const ActiveContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  padding: 2rem;
  margin: 0 3.5rem; 
  background: #F7F7FB;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const JDButton = styled.button`
  position: absolute;          
  left: -2rem;      
  top: 1rem;                    
  width: 2rem;
  height: 7rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.66019rem 0rem 0rem 0.66019rem;
  background: var(--neutral-300, #EAEBF3);     
`;

const ExperienceButton = styled.button`
  position: absolute;          
  left: -2rem;      
  top: 8.5rem;                    
  width: 2rem;
  height: 7rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.66019rem 0rem 0rem 0.66019rem;
  background: var(--neutral-300, #EAEBF3);                     
`;

const ButtonText = styled.div`
    display: flex;
    width: 1rem;
    height: 5rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #63698D;
    text-align: center;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const JDPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [activebutton, setActivebutton] = useState(""); //JD 혹은 Exp

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
      <TopTitleBar>
        <Title>JD분석</Title>
        <TopButton>저장</TopButton>
      </TopTitleBar>
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
          JD공고가 보여집니다.
        </CenteredContainer>
        <AnimatePresence>
          <ActiveContainer
            initial={{ x: "45%", width: "45%" }}
            animate={{ x: !active ? "120%" : "0%" }}
            exit={{
              x: "0%",
              transition: { delay: 0.5, stiffness: 50, damping: 20 },
            }}
            transition={{ type: "spring", stiffness: 40 }}
          >
            <JDButton onClick={JDtoggleContainer}>
              <ButtonText>JD분석</ButtonText>
            </JDButton>
            <ExperienceButton onClick={ExptoggleContainer}>
              <ButtonText>경험분석</ButtonText>
            </ExperienceButton>
            {activebutton}
          </ActiveContainer>
        </AnimatePresence>
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDPage;
