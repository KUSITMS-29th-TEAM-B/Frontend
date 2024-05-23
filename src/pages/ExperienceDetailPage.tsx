import React from "react";
import styled, { useTheme } from "styled-components";
import { ArrowLeft } from "../assets";
import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../components/common/MainButton";
import Experience from "../components/JD/Experience";
import ExpData from "../services/JD/ExpData";
import { questions } from "../assets/data/questions";
import Chip from "../components/common/Chip";
import Textarea from "../components/common/Textarea";
import {
  deleteExperience,
  getExperience,
} from "../services/Experience/experienceApi";
import { ExperienceDetailType } from "../types/experience";
import { getCookie } from "../services/cookie";
import Modal from "../components/common/Modal";
import warningImg from "../assets/images/warningIcon.png";

const ExperienceDetailPage = () => {
  const user = getCookie("user");
  const { id: expId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [expData, setExpData] = React.useState<ExperienceDetailType>();
  const primeTag = expData?.parentTag.name || "상위태그값없음";
  const subTag = expData?.childTag.name || "하위태그값없음";
  const expKeywords = expData?.strongPoints?.map((item) => item.name) || [];

  // 삭제 모달
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // 모달 관리
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (expId) {
      deleteExperience(expId, user?.token).then((res) => {
        console.log(res);
        navigate(`/experience`);
      });
    }
  };

  React.useEffect(() => {
    if (expId) {
      getExperience(expId, user?.token).then((res) => {
        console.log(res);
        setExpData(res.data);
      });
    }
  }, [expId, user?.token]);

  return (
    <>
      <MainContainer className="page">
        <TopContainer>
          <div className="title">
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: 0,
                background: "none",
                border: "none",
              }}
            >
              <ArrowLeft />
            </button>
            나의 경험 상세보기
          </div>
          <div className="button-list">
            <DeleteButton onClick={openModal}>삭제하기</DeleteButton>
            <EditButton onClick={() => navigate("edit")}>수정하기</EditButton>
          </div>
        </TopContainer>
        <ContentContainer>
          <Experience
            type="section"
            id={expData?.id || ExpData[0].id}
            title={expData?.title || ""}
            tags={expKeywords}
            maintag={primeTag}
            subtag={subTag}
            startedAt={expData?.startedAt}
            endedAt={expData?.endedAt}
          />
          <hr style={{ width: "100%", color: theme.colors.neutral300 }} />
          <AnswerList>
            {expData?.contents?.map((item, index) => (
              <AnswerItem>
                <div style={{ display: "flex" }}>
                  <Chip text={questions[index].type} />
                </div>
                <Textarea
                  value={item.answer}
                  label={`${index + 1}. ${item.question}`}
                  rows={8}
                  labelStyle={
                    theme.fonts.title4 + `color: ${theme.colors.neutral700}`
                  }
                  style={{
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "12px",
                    background: `${theme.colors.neutral50}`,
                    padding: "24px 30px",
                  }}
                  readOnly
                />
              </AnswerItem>
            ))}
          </AnswerList>
        </ContentContainer>
      </MainContainer>
      <Modal
        image={<img src={warningImg} alt="warning" />}
        title={"이 경험을 삭제하시겠어요?"}
        description={
          <>
            삭제한 경험은 복구할 수 없어요. <br />
            신중히 생각해주세요.
          </>
        }
        buttons={["취소", "네 삭제할게요."]}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${(props) => props.theme.colors.neutral20};
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${(props) => props.theme.fonts.title1};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .button-list {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;

const EditButton = styled(MainButton)`
  padding: 10px 64px;
  border-radius: 8px;
  ${(props) => props.theme.fonts.button2};
`;

const DeleteButton = styled(MainButton)`
  padding: 10px 32px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.main500};
  background: ${(props) => props.theme.colors.neutral0};
  color: ${(props) => props.theme.colors.main500};
  ${(props) => props.theme.fonts.button2};
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 80px;
  border-radius: 15px;
  border: 1px solid var(--neutral-200, #eeeff7);
  background: var(--neutral-0, #fff);
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const AnswerList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ExperienceDetailPage;
