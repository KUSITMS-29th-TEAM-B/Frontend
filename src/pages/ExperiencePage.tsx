import styled from "styled-components";
import YearListContainer from "../components/Experience/YearList";
import { AnimatePresence, motion } from "framer-motion";
import useComponentSize from "../components/hooks/useComponentSize";
import { useRecoilState } from "recoil";
import { primeTagState, yearState } from "../store/selectedStore";
import backgroundImg from "../assets/images/background.jpg";
import MainButton from "../components/common/MainButton";
import { Plus } from "../assets";
import KeywordTab from "../components/Experience/KeywordTab";
import { useNavigate } from "react-router-dom";
import MoreTab from "../components/Experience/MoreTab";
import Modal from "../components/common/Modal";
import React from "react";
import warningImg from "../assets/images/warningIcon.png";
import { getCookie } from "../services/cookie";

const ExperiencePage = () => {
  const user = getCookie("user");
  const [componentRef, size] = useComponentSize();
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);
  const [selectedPrimeTag, setSelectedPrimeTag] = useRecoilState(primeTagState);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // 모달 관리
  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log("삭제 api");
    closeDeleteModal();
  };

  /**
   * 연도별 리스트 컨테이너
   */
  const renderCenterContainer = () => {
    return (
      <CenteredContainer
        ref={componentRef}
        initial={{ width: "100%" }}
        animate={{
          width: selectedPrimeTag ? "40%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          when: "beforeChildren",
        }}
      >
        <YearListContainer
          width={size.width}
          openDeleteModal={openDeleteModal}
        />
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
        animate={{ width: selectedPrimeTag ? "60%" : "0%" }}
        exit={{
          transition: { delay: 0.5, stiffness: 50, damping: 20 },
        }}
        transition={{ type: "spring", stiffness: 40 }}
      >
        {selectedPrimeTag &&
          (selectedPrimeTag.id === "더보기" ? (
            <MoreTab />
          ) : (
            <KeywordTab openDeleteModal={openDeleteModal} />
          ))}
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
        {selectedPrimeTag ? null : (
          <Description>
            <span className="user">{user?.nickName || "사용자"}</span>
            님의 여정을
            <br />
            시작해볼까요?
          </Description>
        )}
        {renderCenterContainer()}
        <AnimatePresence>{renderActiveContainer()}</AnimatePresence>
        <MainButton
          style={{
            position: "absolute",
            right: selectedPrimeTag ? "62%" : 30,
            bottom: 30,
          }}
          onClick={() => navigate(`/experience/write`)}
        >
          <Plus /> 경험 추가하기
        </MainButton>
      </MainContainer>
      <Modal
        image={<img src={warningImg} alt="warning" />}
        title={"해당 태그를 삭제하시겠어요?"}
        description={
          <>
            태그를 삭제하면 해당 태그에 속해 있는
            <br />
            경험들이 모두 삭제돼요.
          </>
        }
        buttons={["취소", "네, 삭제할게요"]}
        onConfirm={handleDelete}
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
      />
    </>
  );
};

const MainContainer = styled.div`
  height: 100vh;
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
  height: 100vh;
  padding-top: 15vh;
  border-radius: 10px;
  // background: #f7f7fb;
  box-shadow: 5px 5px 10px 0px rgba(166, 170, 192, 0.09);
`;

const CenteredContainer = styled(motion.div)`
  height: 100%;
  position: relative;
  width: 100%;
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
