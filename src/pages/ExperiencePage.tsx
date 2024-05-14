import styled from "styled-components";
import YearListContainer from "../components/Experience/YearList";
import { AnimatePresence, motion } from "framer-motion";
import useComponentSize from "../components/hooks/useComponentSize";
import { useRecoilState } from "recoil";
import { yearState } from "../store/selectedStore";
import backgroundImg from "../assets/images/background.jpg";
import RoundButton from "../components/common/RoundButton";
import { Plus } from "../assets";
import KeywordTab from "../components/Experience/KeywordTab";

const ExperiencePage = () => {
  const [componentRef, size] = useComponentSize();
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);

  const name = "사용자";

  /**
   * 연도별 리스트 컨테이너
   */
  const renderCentralContainer = () => {
    return (
      <CenteredContainer
        ref={componentRef}
        initial={{ width: "100%" }}
        animate={{
          width: selectedYear ? "40%" : "100%",
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
        animate={{ width: selectedYear ? "60%" : "0%" }}
        exit={{
          transition: { delay: 0.5, stiffness: 50, damping: 20 },
        }}
        transition={{ type: "spring", stiffness: 40 }}
      >
        {selectedYear ? <KeywordTab /> : null}
      </ActiveContainer>
    );
  };

  //
  //
  //
  return (
    <MainContainer>
      {/* <NoExperience /> */}
      {selectedYear ? null : (
        <Description>
          <span className="user">{name}</span>
          님의 여정을
          <br />
          시작해볼까요?
        </Description>
      )}
      {renderCentralContainer()}
      <AnimatePresence>{renderActiveContainer()}</AnimatePresence>
      <RoundButton
        style={{
          position: "absolute",
          right: selectedYear ? "52%" : 30,
          bottom: 30,
        }}
      >
        <Plus /> 경험 추가하기
      </RoundButton>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // background-color: #fbfbfd;
  position: relative;
  background: url(${backgroundImg});
  background-size: cover;
`;

const Description = styled.div`
  position: absolute;
  top: 140px;
  left: 80px;
  ${(props) => props.theme.fonts.headline1};
  color: #343a5d;
  .user {
    color: var(--main-500, #7d82ff);
    font-weight: 700;
  }
`;

const ActiveContainer = styled(motion.div)`
  margin-top: 100px;
  border-radius: 10px;
  background: #f7f7fb;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
  height: 600px;
`;

const CenteredContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 720px;
  overflow: scroll;
  overflow-y: hidden;
  background: transparent;
  /* 스크롤 커스텀 */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background: ${(props) => props.theme.colors.neutral300};
  }
  &::-webkit-scrollbar-thumb {
    width: 60%;
    transform: rotate(90deg);
    flex-shrink: 0;
    border-radius: 50px;
    background: ${(props) => props.theme.colors.neutral400};
  }
`;

export default ExperiencePage;
