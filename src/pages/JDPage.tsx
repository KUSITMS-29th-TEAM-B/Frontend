import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import BundledEditor from "../components/editor/BundleEditor";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #FBFBFD;
  //margin-top: 6.5rem;
`;

const CenteredContainer = styled(motion.div)`
  width: 45%; 
  border-radius: 1.25rem;
  background: #FFF;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem;
  height: 40rem;
`;

const StyledHeader = styled.h2`
  font-size: 20;
  font-weight: bold;
`;

const RightContainer = styled(motion.div)`
  width: 45%;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem;
  border-radius: 1.25rem;
  background: #F7F7FB;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const JDButton = styled.button`
  position: absolute;          
  right: 1rem;                  
  top: 5rem;                      
  transform: translateY(-50%);    
`;

const JDPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [content, setContent] = useState("<p>이곳에 내용을 입력하세요</p>");

  const handleEditorChange = (newContent: string) => {
    console.log("Content was updated:", newContent);
    setContent(newContent);
  };

  return (
    <StyledDivContainer className="page">
      <CenteredContainer
        initial={{ width: "45%" }}
        animate={{
          x: isVisible ? "-10%" : "0%",
          width: isVisible ? "45%" : "70%",
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          when: "beforeChildren",
        }}
      >
        <StyledHeader>1. 지원동기</StyledHeader>
        <div>
          <BundledEditor
            content={content}
            onContentChange={handleEditorChange}
          />
        </div>
      </CenteredContainer>
      <AnimatePresence>
        {isVisible && (
          <RightContainer
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "200%", transition: { delay: 0.3 } }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            경험 분석이 보여지는 창입니다.
          </RightContainer>
        )}
      </AnimatePresence>
      <JDButton onClick={toggleVisibility}>경험탐색</JDButton>
    </StyledDivContainer>
  );
};

export default JDPage;
