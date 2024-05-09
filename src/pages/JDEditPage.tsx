import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import BundledEditor from "../components/editor/BundleEditor";
import HeaderInput from "../components/JD/HeaderInput";

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
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: #FBFBFD;
`;

const CenteredContainer = styled(motion.div)`
  width: 45%; 
  border-radius: 10px;
  background: #FFF;
  padding: 2rem;
  margin: 0.5rem;
`;

const ExperienceContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  padding: 2rem;
  margin: 0.5rem;
  background: #F7F7FB;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const JDContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  padding: 2rem;
  margin: 0.5rem;
  background: #F7F7FB;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const JDButton = styled.button`
  position: absolute;          
  right: 0;      
  top: 6rem;                      
  transform: translateY(-50%);    
`;

const ExperienceButton = styled.button`
  position: absolute;          
  right: 0;                  
  top: 7rem;                      
  transform: translateY(-50%);    
`;

const JDEditPage: React.FC = () => {
  const [activeContainer, setActiveContainer] = useState<null | "JD" | "Exp">(
    null
  );

  const toggleContainer = (container: "JD" | "Exp") => {
    if (activeContainer === container) {
      setActiveContainer(null);
    } else {
      setActiveContainer(container);
    }
  };

  const [content, setContent] = useState("<p></p>");

  const handleEditorChange = (newContent: string) => {
    console.log("Content was updated:", newContent);
    setContent(newContent);
  };

  return (
    <StyledDivContainer className="page">
      <TopTitleBar>
        <Title>자기소개서 작성</Title>
        <TopButton>저장</TopButton>
      </TopTitleBar>
      <MainContainer>
        <CenteredContainer
          initial={{ width: "45%" }}
          animate={{
            x: activeContainer ? "-10%" : "0%",
            width: activeContainer ? "45%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            when: "beforeChildren",
          }}
        >
          <HeaderInput />
          <div>
            <BundledEditor
              content={content}
              onContentChange={handleEditorChange}
            />
          </div>
          <HeaderInput />
          <div>
            <BundledEditor content="" onContentChange={handleEditorChange} />
          </div>
        </CenteredContainer>
        <AnimatePresence>
          {activeContainer === "JD" && (
            <JDContainer
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "200%", transition: { delay: 0.3 } }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              JD공고가 보여지는 창입니다.
            </JDContainer>
          )}
          {activeContainer === "Exp" && (
            <ExperienceContainer
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "200%", transition: { delay: 0.3 } }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              경험 분석이 보여지는 창입니다.
            </ExperienceContainer>
          )}
        </AnimatePresence>
      </MainContainer>
      <JDButton onClick={() => toggleContainer("JD")}>JD분석</JDButton>
      <ExperienceButton onClick={() => toggleContainer("Exp")}>
        경험분석
      </ExperienceButton>
    </StyledDivContainer>
  );
};

export default JDEditPage;
