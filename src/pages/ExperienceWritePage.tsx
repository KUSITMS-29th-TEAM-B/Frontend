import React from "react";
import styled, { useTheme } from "styled-components";
import MainButton from "../components/common/MainButton";
import { Popper } from "@mui/material";
import { ArrowLeft } from "../assets";
import Textarea from "../components/common/Textarea";
import { questions } from "../assets/data/questions";
import { useNavigate } from "react-router-dom";
import Chip from "../components/common/Chip";
import OneDatePick from "../components/common/DatePicker";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import { basicKeywords } from "../assets/data/keywords";
import PopperPagination from "../components/Experience/PopperPagination";
import Modal from "../components/common/Modal";
import airplaneImg from "../assets/images/airplane.png";

const ExperienceWritePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  // 저장 모달
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [popperInfo, setPopperInfo] = React.useState("prime-tag");

  // 상위, 하위 태그 페이지네이션
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 9;
  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = basicKeywords.slice(firstPostIndex, lastPostIndex);

  // 모달 관리
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // 경험 분류 클릭 함수
  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPopperInfo(event.currentTarget.id);
  };

  /**
   * 경험 기본 정보
   */
  const renderExperienceBasicInfo = () => {
    return (
      <SectionContainer>
        <SectionTitle>경험 기본 정보</SectionTitle>
        <BasicFormContainer>
          <div className="top">
            <div className="form-item">
              <div className="label">경험 기간</div>
              <div className="input">
                <OneDatePick
                  date={startDate}
                  setDate={(date: Date) => setStartDate(date)}
                  style={customDatePickerCss}
                />
                &nbsp;-&nbsp;
                <OneDatePick
                  date={endDate}
                  setDate={(date: Date) => setEndDate(date)}
                  style={customDatePickerCss}
                />
              </div>
            </div>
            <div className="form-item">
              <div className="label">경험 분류</div>
              <div className="input">
                <Input
                  id="prime-tag"
                  style={customInputCss}
                  onClick={handleTagPopper}
                />
                &nbsp;{">"}&nbsp;
                <Input
                  id="sub-tag"
                  style={customInputCss}
                  onClick={handleTagPopper}
                />
                <Popper open={open} anchorEl={anchorEl}>
                  <TagPopperBox>
                    {popperInfo === "prime-tag" ? (
                      <>
                        <div className="checkbox-list">
                          {currentPosts.map((item) => (
                            <Checkbox label={item} />
                          ))}
                        </div>
                        <div className="pagination">
                          <PopperPagination
                            postsNum={basicKeywords.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                          />
                        </div>
                      </>
                    ) : null}
                  </TagPopperBox>
                </Popper>
              </div>
            </div>
          </div>
          <div className="tag">
            <div className="label">역량 키워드 선택</div>
          </div>
        </BasicFormContainer>
      </SectionContainer>
    );
  };

  /**
   *
   */
  const renderQuestionForm = () => {
    return (
      <SectionContainer>
        <SectionTitle>경험 질문</SectionTitle>
        <QuestionList>
          {questions.map((item, index) => (
            <div className="question-item">
              <div style={{ display: "flex" }}>
                <Chip text={item.type} />
              </div>
              <Textarea
                label={`${index + 1}. ${item.question}`}
                rows={8}
                labelStyle={
                  theme.fonts.title4 + `color: ${theme.colors.neutral700}`
                }
                style={{
                  borderRadius: "12px",
                  border: `1px solid ${theme.colors.neutral400}`,
                  background: `${theme.colors.neutral0}`,
                  padding: "24px 30px",
                }}
              />
            </div>
          ))}
        </QuestionList>
      </SectionContainer>
    );
  };

  //
  //
  //
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
            경험 작성
          </div>
          <CustomButton onClick={() => openModal()}>저장</CustomButton>
        </TopContainer>
        <ContentContainer>
          <TitleInput placeholder="경험의 제목을 입력해주세요"></TitleInput>
          {renderExperienceBasicInfo()}
          {renderQuestionForm()}
        </ContentContainer>
      </MainContainer>
      <Modal
        image={<img src={airplaneImg} alt="airplane" />}
        title={
          <>
            새로운 경험 작성이
            <br />
            완료되었어요!
          </>
        }
        buttons={["작성된 경험 확인하기"]}
        onConfirm={() => navigate(`/experience/detail/1`)}
        isOpen={isModalOpen}
        onClose={closeModal}
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

const CustomButton = styled(MainButton)`
  padding: 10px 64px;
  border-radius: 8px;
  ${(props) => props.theme.fonts.button2};
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  padding: 24px 0px;
  border-bottom: 0.775px solid ${(props) => props.theme.colors.neutral300};
  outline: none;
  ${(props) => props.theme.fonts.title1};
  &::placeholder {
    color: ${(props) => props.theme.colors.neutral500};
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  margin-bottom: 32px;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.main50};
  padding: 15px 30px;
  ${(props) => props.theme.fonts.title3};
  color: ${(props) => props.theme.colors.neutral600};
`;

const BasicFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0px 20px;
  .top {
    display: flex;
    flex-direction: row;
    gap: 64px;
  }
  .form-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .label {
    ${(props) => props.theme.fonts.subtitle2};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .input {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .question-item {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

const customDatePickerCss = `
  margin: 0px;
  padding: 9px 35px;
  background: #FFF;
  border-radius: 5px;
  border: 1px solid var(--neutral-400, #D9DBE6);
  text-align: center;
`;

const customInputCss = {
  gap: "0px",
  padding: "9px 22px",
  background: "none",
  borderRadius: "5px",
  border: `1px solid var(--neutral-400, #D9DBE6)`,
  maxWidth: "131px",
};

const TagPopperBox = styled.div`
  display: flex;
  width: 355px;
  flex-direction: column;
  padding: 21px 22px 21px 20px;
  border-radius: 8px;
  border: 1px solid var(--main-200, #e5e6ff);
  background: #fff;
  gap: 25px;
  .checkbox-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

export default ExperienceWritePage;
