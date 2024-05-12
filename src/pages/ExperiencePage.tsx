import styled from "styled-components";
import YearListContainer from "../components/Experience/YearList";
import { AnimatePresence, motion } from "framer-motion";
import useComponentSize from "../components/hooks/useComponentSize";
import { useRecoilState } from "recoil";
import { yearState } from "../store/selectedStore";
import backgroundImg from "../assets/images/background.jpg";
import RoundButton from "../components/common/RoundButton";
import { Plus } from "../assets";

const ExperiencePage = () => {
  const [componentRef, size] = useComponentSize();
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);

  /**
   * 연도별 리스트 컨테이너
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
    <>
      <MainContainer>
        {/* <NoExperience /> */}
        {renderCentralContainer()}
        <AnimatePresence>{renderActiveContainer()}</AnimatePresence>
      </MainContainer>
      {selectedYear ? null : (
        <RoundButton style={{ position: "fixed", bottom: 30, right: 30 }}>
          <Plus /> 경험 추가하기
        </RoundButton>
      )}
    </>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // background: url(${backgroundImg});
  background-color: #fbfbfd;
`;

const ActiveContainer = styled(motion.div)`
  border-radius: 10px;
  background: #f7f7fb;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 700px;
`;

const CenteredContainer = styled(motion.div)`
  width: 100%;
  height: 700px;
  padding-top: 100px;
  border-box: box-sizing;
  border: 1px solid black;
  overflow: scroll;
  overflow-y: hidden;
`;

export default ExperiencePage;
