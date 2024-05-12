import styled from "styled-components";
import YearListContainer from "../components/Experience/YearList";
import { AnimatePresence, motion } from "framer-motion";
import useComponentSize from "../components/hooks/useComponentSize";
import { useRecoilState } from "recoil";
import { yearState } from "../store/selectedStore";

const ExperiencePage = () => {
  const [componentRef, size] = useComponentSize();
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);

  /**
   */
  const renderCentralContainer = () => {
    return (
      <CenteredContainer
        ref={componentRef}
        initial={{ width: "100%" }}
        animate={{
          width: selectedYear ? "50%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          when: "beforeChildren",
        }}
      >
        <YearListContainer width={size.width} />
      </CenteredContainer>
    );
  };

  /**
   * 사이드 탭
   */
  const renderActiveContainer = () => {
    return (
      <ActiveContainer
        initial={{ width: "0%" }}
        animate={{ width: selectedYear ? "50%" : "0%" }}
        exit={{
          transition: { delay: 0.5, stiffness: 50, damping: 20 },
        }}
        transition={{ type: "spring", stiffness: 40 }}
      >
        {selectedYear ? "활동 상세 사이드 탭" : null}
      </ActiveContainer>
    );
  };

  //
  //
  //
  return (
    <MainContainer>
      {renderCentralContainer()}
      <AnimatePresence>{renderActiveContainer()}</AnimatePresence>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10rem;
`;

const ActiveContainer = styled(motion.div)`
  border-radius: 10px;
  background: #f7f7fb;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 35rem;
`;

const CenteredContainer = styled(motion.div)`
  width: 100%;
  border-box: box-sizing;
  border: 1px solid black;
  height: 500px;
  overflow: scroll;
`;

export default ExperiencePage;
