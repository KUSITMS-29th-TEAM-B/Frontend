import React from "react";
import styled, { useTheme } from "styled-components";
import MainButton from "../components/common/MainButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Popper,
} from "@mui/material";
import { ArrowDown, ArrowLeft, Plus2 } from "../assets";
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
import Tag from "../components/common/Tag";

type TabType = "basic" | "my";

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

  const [keywordTabOption, setKeywordTabOption] =
    React.useState<TabType>("basic");
  const [myKeywords, setMyKeywords] = React.useState<string[]>([]);
  const [newKeywords, setNewKeywords] = React.useState("");

  const handleMyKeywords = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setMyKeywords([...myKeywords, newKeywords]);
      setNewKeywords("");
    }
  };

  // 상위, 하위 태그 페이지네이션
  const [currentTagPage, setCurrentTagPage] = React.useState(1);
  const tagsPerPage = 9;
  const firstTagIndex = (currentTagPage - 1) * tagsPerPage;
  const lastTagIndex = firstTagIndex + tagsPerPage;
  const currentTags = basicKeywords.slice(firstTagIndex, lastTagIndex);

  // 키워드 선택 페이지네이션
  const [currentKeywordPage, setCurrentKeywordPage] = React.useState(1);
  const keywordsPerPage = 12;
  const firstKeywordIndex = (currentKeywordPage - 1) * keywordsPerPage;
  const lastKeywordIndex = firstKeywordIndex + keywordsPerPage;
  const currentKeywords = basicKeywords.slice(
    firstKeywordIndex,
    lastKeywordIndex
  );

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
                          {currentTags.map((item) => (
                            <Checkbox label={item} />
                          ))}
                        </div>
                        <div className="pagination">
                          <PopperPagination
                            postsNum={basicKeywords.length}
                            postsPerPage={tagsPerPage}
                            setCurrentPage={setCurrentTagPage}
                            currentPage={currentTagPage}
                          />
                        </div>
                      </>
                    ) : null}
                  </TagPopperBox>
                </Popper>
              </div>
            </div>
          </div>
          <div className="form-item">
            <div className="label">역량 키워드 선택</div>
            <Accordion
              sx={{
                maxWidth: "800px",
                background: theme.colors.neutral0,
                borderRadius: "12px",
                border: `1px solid ${theme.colors.neutral200}`,
                boxShadow: "none",
                "&:first-of-type": {
                  borderRadius: "12px",
                },
                "&:last-of-type": {
                  borderRadius: "12px",
                },
                "&::before": {
                  backgroundColor: "transparent",
                },
                "&.Mui-expanded": {
                  margin: "0px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDown />}
                aria-controls="basic-info"
                id="basic-info"
                sx={{
                  "&.Mui-expanded": {
                    minHeight: 0,
                  },
                  ".MuiAccordionSummary-content": {
                    "&.Mui-expanded": {
                      margin: "12px 0px",
                    },
                  },
                  minHeight: 0,
                  borderBottom: `1px solid ${theme.colors.neutral200}`,
                }}
              >
                <KeywordInput>
                  최대 5개까지 추가 가능 (ex. 커뮤니케이션, 협업 등)
                </KeywordInput>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0px" }}>
                <KeywordSelect>
                  <div className="top-container">
                    <div className="tab-list">
                      <div
                        className={
                          keywordTabOption === "basic"
                            ? "tab-item active"
                            : "tab-item"
                        }
                        onClick={() => setKeywordTabOption("basic")}
                      >
                        기본
                      </div>
                      <div
                        className={
                          keywordTabOption === "my"
                            ? "tab-item active"
                            : "tab-item"
                        }
                        onClick={() => setKeywordTabOption("my")}
                      >
                        MY
                      </div>
                    </div>
                    {keywordTabOption === "basic" ? (
                      <PopperPagination
                        postsNum={basicKeywords.length}
                        postsPerPage={keywordsPerPage}
                        setCurrentPage={setCurrentKeywordPage}
                        currentPage={currentKeywordPage}
                      />
                    ) : null}
                  </div>
                  {keywordTabOption === "basic" ? (
                    <div className="checkbox-list">
                      {currentKeywords.map((item) => (
                        <Checkbox label={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="my-keyword">
                      <MyKeywordInput>
                        <Plus2 />
                        <input
                          value={newKeywords}
                          placeholder="직접 역량 태그를 생성할 수 있어요"
                          onChange={(e) => setNewKeywords(e.target.value)}
                          onKeyDown={(e) => handleMyKeywords(e)}
                        />
                      </MyKeywordInput>
                      <div className="keyword-list">
                        {myKeywords.map((item) => (
                          <Tag text={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </KeywordSelect>
              </AccordionDetails>
            </Accordion>
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

const KeywordSelect = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 32px;
  gap: 20px;
  .top-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--neutral-50, #f7f7fb);
  }
  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => props.theme.fonts.body4};
    color: ${(props) => props.theme.colors.neutral500};
    width: 72px;
    height: 27px;
    flex-shrink: 0;
    &:hover,
    &.active {
      ${(props) => props.theme.fonts.subtitle5};
      color: ${(props) => props.theme.colors.neutral600};
      border-radius: 4px;
      background: var(--neutral-0, #fff);
    }
  }
  .checkbox-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  .my-keyword {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .keyword-list {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const KeywordInput = styled.div`
  ${(props) => props.theme.fonts.body3};
  color: ${(props) => props.theme.colors.neutral500};
`;

const MyKeywordInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  padding: 10px 15px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.neutral50};
  input {
    ${(props) => props.theme.fonts.cap3};
    color: ${(props) => props.theme.colors.neutral600};
    border: none;
    background: none;
    outline: none;
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
