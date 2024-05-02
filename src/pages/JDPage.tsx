import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #FBFBFD;
`;

const CenteredContainer = styled(motion.div)`
  width: 35%;
  border-radius: 1.25rem;
  background: #FFF;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem;
  height: 40rem;
`;

const RightContainer = styled(motion.div)`
  width: 35%;
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

  return (
    <StyledDivContainer>
      <CenteredContainer
        animate={{
          x: isVisible ? "-10%" : "0%",
          width: isVisible ? "35%" : "70%",
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          when: "beforeChildren",
        }}
      >
        자기소개 문항을 사용자가 직접 입력하는 창입니다.
      </CenteredContainer>
      <AnimatePresence>
        {isVisible && (
          <RightContainer
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "190%", transition: { delay: 0.2 } }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        )}
      </AnimatePresence>
      <JDButton onClick={toggleVisibility}>경험탐색</JDButton>
    </StyledDivContainer>
  );
};

export default JDPage;
