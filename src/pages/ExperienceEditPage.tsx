import React from "react";
import styled, { useTheme } from "styled-components";
import MainButton from "../components/common/MainButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Popper,
} from "@mui/material";
import { ArrowDown, ArrowLeft, Plus2, Search } from "../assets";
import Textarea from "../components/common/Textarea";
import { questions } from "../assets/data/questions";
import { useNavigate, useParams } from "react-router-dom";
import Chip from "../components/common/Chip";
import OneDatePick from "../components/common/DatePicker";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import { basicKeywords } from "../assets/data/keywords";
import PopperPagination from "../components/Experience/PopperPagination";
import Modal from "../components/common/Modal";
import airplaneImg from "../assets/images/airplane.png";
import Tag from "../components/common/Tag";
import RadioGroup from "../components/common/RadioGroup";
import { myKeywords } from "../services/Experience/myKeywords";
import {
  getExperience,
  patchExperience,
} from "../services/Experience/experienceApi";
import {
  ExperienceDetailType,
  ExperienceType,
  KeywordType,
  TagType,
} from "../types/experience";
import { getKeywords, postKeyword } from "../services/Experience/keywordApi";
import { getCookie } from "../services/cookie";
import {
  getPrimeTags,
  getSubTags,
  postPrimeTag,
  postSubTag,
} from "../services/Experience/tagApi";

type TabType = "basic" | "my";
type TagPopperType = "prime" | "sub" | null;

const ExperienceEditPage = () => {
  const user = getCookie("user");
  const { id: expId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [expData, setExpData] = React.useState<ExperienceType>({
    title: "",
    parentTagId: "",
    childTagId: "",
    strongPointIds: [],
    contents: questions.map((item) => ({
      question: item.question,
      answer: "",
    })),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
  });
  const [primeTagItem, setPrimeTagItem] = React.useState<TagType>({
    id: "",
    name: "",
  });
  const [subTagItem, setSubTagItem] = React.useState<TagType>({
    id: "",
    name: "",
  });
  // 저장 모달
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [popperInfo, setPopperInfo] = React.useState<TagPopperType>(null);

  const [keywordTabOption, setKeywordTabOption] =
    React.useState<TabType>("basic");
  const [newTag, setNewTag] = React.useState("");
  const [primeTagList, setPrimeTagList] = React.useState<TagType[]>([]);
  const [subTagList, setSubTagList] = React.useState<TagType[]>([]);
  const [checkedKeywords, setCheckedKeywords] = React.useState<KeywordType[]>(
    []
  );
  const [newKeyword, setNewKeyword] = React.useState("");
  const [myKeywordList, setMyKeywordList] = React.useState<KeywordType[]>([]);
  // 키워드 아코디언 관리
  const [expanded, setExpanded] = React.useState(false);
  const [resultKeywords, setResultKeywords] = React.useState<KeywordType[]>([]);

  // 상위 태그 페이지네이션
  const tagsPerPage = 9;
  const [currentPrimeTagPage, setCurrentPrimeTagPage] = React.useState(1);
  const firstPrimeTagIndex = (currentPrimeTagPage - 1) * tagsPerPage;
  const lastPrimeTagIndex = firstPrimeTagIndex + tagsPerPage;
  const currentPrimeTags = primeTagList.slice(
    firstPrimeTagIndex,
    lastPrimeTagIndex
  );

  // 하위 태그 페이지네이션
  const [currentSubTagPage, setCurrentSubTagPage] = React.useState(1);
  const firstSubTagIndex = (currentSubTagPage - 1) * tagsPerPage;
  const lastSubTagIndex = firstSubTagIndex + tagsPerPage;
  const currentSubTags = subTagList.slice(firstSubTagIndex, lastSubTagIndex);

  // 기본 키워드 선택 페이지네이션
  const keywordsPerPage = 12;
  const [currentBasicKeywordPage, setCurrentBasicKeywordPage] =
    React.useState(1);
  const firstBasicKeywordIndex =
    (currentBasicKeywordPage - 1) * keywordsPerPage;
  const lastBasicKeywordIndex = firstBasicKeywordIndex + keywordsPerPage;
  const currentBasicKeywords = basicKeywords.slice(
    firstBasicKeywordIndex,
    lastBasicKeywordIndex
  );
  // My 키워드 선택 페이지네이션
  const [currentMyKeywordPage, setCurrentMyKeywordPage] = React.useState(1);
  const firstMyKeywordIndex = (currentMyKeywordPage - 1) * keywordsPerPage;
  const lastMyKeywordIndex = firstMyKeywordIndex + keywordsPerPage;
  const currentMyKeywords = myKeywordList.slice(
    firstMyKeywordIndex,
    lastMyKeywordIndex
  );

  const handleSaveExperience = async () => {
    let experienceData = { ...expData };
    // 상위 태그 생성 후 하위 태그 생성한 경우
    if (primeTagItem.id === primeTagItem.name) {
      const primeTagRes = await postPrimeTag(primeTagItem.name, user?.token);
      const primeTagId = primeTagRes.data.id;

      const subTagRes = await postSubTag(
        primeTagId,
        subTagItem.name,
        user?.token
      );
      const subTagId = subTagRes.data.id;

      experienceData = {
        ...expData,
        parentTagId: primeTagId,
        childTagId: subTagId,
      };
    }
    // 하위 태그만 생성한 경우
    else if (subTagItem.id === subTagItem.name) {
      const subTagRes = await postSubTag(
        primeTagItem.id,
        subTagItem.name,
        user?.token
      );
      const subTagId = subTagRes.data.id;
      experienceData = {
        ...expData,
        childTagId: subTagId,
      };
    }
    // 새로운 역량 키워드 있을 경우
    const newKeywordsNames = checkedKeywords
      .filter((item) => item.id === item.name)
      .map((item) => ({ name: item.name }));
    if (newKeywordsNames.length !== 0) {
      const originStrongPointIds = checkedKeywords
        .filter((item) => item.id !== item.name)
        .map((item) => item.id);

      const newStrongPointsRes = await postKeyword(
        newKeywordsNames,
        user?.token
      );
      const newStrongPointIds = newStrongPointsRes.data.map(
        (item: KeywordType) => item.id
      );
      const totalStrongPointIds = [
        ...originStrongPointIds,
        ...newStrongPointIds,
      ];
      experienceData = {
        ...expData,
        strongPointIds: totalStrongPointIds,
      };
    }
    // 질문 수정
    if (expId) {
      patchExperience(expId, experienceData, user?.token)
        .then((res) => {
          openModal();
        })
        .catch((err) => console.log(err));
    }
  };

  // 질문 답변 핸들러
  const handleAnswerChange = (index: number, value: string) => {
    const newContents = [...expData.contents];
    newContents[index] = { ...newContents[index], answer: value };
    setExpData({ ...expData, contents: newContents });
  };

  // 상위 태그 라디오 버튼 클릭 함수
  const handlePrimeRadioChange = (item: TagType) => {
    // 기존 상위 태그 선택한 경우
    if (item.id !== item.name) {
      setPrimeTagItem(item);
      setExpData({ ...expData, parentTagId: item.id });
      getSubTags(item.id, user?.token).then((res) => {
        setSubTagList(res.data.tags);
      });
    }
    // 새로 생성한 상위 태그 선택한 경우
    else {
      setPrimeTagItem(item);
      setExpData({ ...expData, parentTagId: "" });
      setSubTagList([]);
    }
    setPopperInfo(null);
  };

  // 하위 태그 라디오 버튼 클릭 함수
  const handleSubRadioChange = (item: TagType) => {
    // 기존 하위 태그 선택한 경우
    if (item.id !== item.name) {
      setSubTagItem(item);
      setExpData({ ...expData, childTagId: item.id });
    }
    // 새로 생성한 하위 태그 선택한 경우
    else {
      setSubTagItem(item);
      setExpData({ ...expData, childTagId: "" });
    }
    setPopperInfo(null);
  };

  // 태그 생성 및 검색
  const handleTagSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (popperInfo === "prime") {
        const primeTagNames = primeTagList.map((item) => item.name);
        if (primeTagNames.includes(newTag)) {
          const tagIndex = primeTagNames.indexOf(newTag);
          const primeTagPage =
            Math.floor((tagIndex + 1) / (tagsPerPage + 1)) + 1;
          setCurrentPrimeTagPage(primeTagPage);
        } else {
          setPrimeTagList([...primeTagList, { id: newTag, name: newTag }]);
          const lastPrimePage =
            Math.floor((primeTagList.length + 1) / (tagsPerPage + 1)) + 1;
          setCurrentPrimeTagPage(lastPrimePage);
        }
      }
      if (popperInfo === "sub") {
        const subTagNames = subTagList.map((item) => item.name);
        if (subTagNames.includes(newTag)) {
          const tagIndex = subTagNames.indexOf(newTag);
          const subTagPage = Math.floor((tagIndex + 1) / (tagsPerPage + 1)) + 1;
          setCurrentSubTagPage(subTagPage);
        } else {
          setSubTagList([...subTagList, { id: newTag, name: newTag }]);
          const lastSubPage =
            Math.floor((subTagList.length + 1) / tagsPerPage) + 1;
          setCurrentSubTagPage(lastSubPage);
        }
      }
      setNewTag("");
    }
  };

  // 키워드 체크박스 체크 여부
  const isKeywordChecked = (item: KeywordType) => {
    return checkedKeywords.some(
      (keyword) => keyword.id === item.id && keyword.name === item.name
    );
  };

  // 키워드 체크박스 핸들러
  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: TabType
  ) => {
    if (e.target) {
      if (e.target.checked) {
        const keywordId = e.target.value;
        const selectedKeyword = (
          type === "basic" ? basicKeywords : myKeywordList
        ).find((item) => item.id === keywordId);
        setCheckedKeywords([
          ...checkedKeywords,
          { id: keywordId, name: selectedKeyword?.name || "" },
        ]);
      } else {
        setCheckedKeywords(
          checkedKeywords.filter((item) => item.id !== e.target.value)
        );
      }
    }
  };

  // 키워드 생성 로직 (1. my에 이미 있는 키워드, 2. basic에 이미 있는 키워드, 3. 새로운 키워드)
  const handleMyKeywords = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const myKeywordNames = myKeywordList.map((item) => item.name);
      const basicKeywordNames = basicKeywords.map((item) => item.name);
      if (myKeywordNames.includes(newKeyword)) {
        const keywordIndex = myKeywordNames.indexOf(newKeyword);
        const keywordPage =
          Math.floor((keywordIndex + 1) / (keywordsPerPage + 1)) + 1;
        setCurrentMyKeywordPage(keywordPage);
      } else if (basicKeywordNames.includes(newKeyword)) {
        const keywordIndex = basicKeywordNames.indexOf(newKeyword);
        const keywordPage =
          Math.floor((keywordIndex + 1) / (keywordsPerPage + 1)) + 1;
        setKeywordTabOption("basic");
        setCurrentBasicKeywordPage(keywordPage);
      } else {
        setMyKeywordList([
          ...myKeywordList,
          { id: newKeyword, name: newKeyword },
        ]);
        const lastKeywordPage =
          Math.floor((myKeywordList.length + 1) / (keywordsPerPage + 1)) + 1;
        setCurrentMyKeywordPage(lastKeywordPage);
      }
      setNewKeyword("");
    }
  };

  // 키워드 삭제
  const handleDeleteTag = (item: string) => {
    setCheckedKeywords(checkedKeywords.filter((choice) => choice.id !== item));
  };

  // 모달 관리
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = () => {
    if (expanded) {
      setResultKeywords([...checkedKeywords]);
    }
    setExpanded(!expanded);
  };

  // 경험 분류 클릭 함수
  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    if (popperInfo === event.currentTarget.id) {
      setPopperInfo(null);
    } else {
      setAnchorEl(event.currentTarget);
      setPopperInfo(event.currentTarget.id as TagPopperType);
    }
  };

  //
  //
  //
  React.useEffect(() => {
    // 경험 데이터 조회
    if (expId) {
      getExperience(expId, user?.token).then((res) => {
        console.log(res);
        // 상위태그, 하위태그 객체 형태로 저장
        // 역량 키워드 => 객체 리스트로 저장
        const { id, parentTag, childTag, strongPoints, ...rest } = res.data;
        setExpData({
          ...rest,
          parentTagId: parentTag.id,
          childTagId: childTag.id,
          strongPointIds: strongPoints.map((item: KeywordType) => item.id),
        });
        setPrimeTagItem(parentTag);
        setSubTagItem(childTag);
        setCheckedKeywords(strongPoints);
        setResultKeywords(strongPoints);
      });
    }
    // 상위 태그 조회
    getPrimeTags(user?.token)
      .then((res) => {
        setPrimeTagList(res.data.tags);
      })
      .catch((err) => console.log(err));

    // My 역량 키워드 조회
    getKeywords(user?.token)
      .then((res) => setMyKeywordList(res.data.strongPoints))
      .catch((err) => console.log(err));
  }, [user?.token]);

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
                  date={new Date(expData.startedAt)}
                  setDate={(date: Date) =>
                    setExpData({ ...expData, startedAt: date.toISOString() })
                  }
                  style={customDatePickerCss}
                />
                &nbsp;-&nbsp;
                <OneDatePick
                  date={new Date(expData.endedAt)}
                  setDate={(date: Date) =>
                    setExpData({ ...expData, endedAt: date.toISOString() })
                  }
                  style={customDatePickerCss}
                />
              </div>
            </div>
            <div className="form-item">
              <div className="label">경험 분류</div>
              <div className="input">
                <Input
                  readOnly
                  id="prime"
                  value={primeTagItem.name}
                  style={customInputCss}
                  onClick={handleTagPopper}
                  placeholder="상위 경험 분류"
                />
                &nbsp;{">"}&nbsp;
                <Input
                  readOnly
                  id="sub"
                  value={subTagItem.name}
                  style={customInputCss}
                  onClick={handleTagPopper}
                  placeholder="하위 경험 분류"
                />
                {popperInfo && (
                  <Popper
                    open={open}
                    anchorEl={anchorEl}
                    sx={{ paddingTop: "8px" }}
                  >
                    <TagPopperBox>
                      <TagSearchBox>
                        <input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={handleTagSearch}
                        />
                        <Search />
                      </TagSearchBox>
                      {popperInfo === "prime" ? (
                        <>
                          <RadioGroup
                            value={primeTagItem.id}
                            name="prime-tag"
                            options={currentPrimeTags}
                            onChange={handlePrimeRadioChange}
                          />
                          {primeTagList.length !== 0 && (
                            <div className="pagination">
                              <PopperPagination
                                postsNum={primeTagList.length}
                                postsPerPage={tagsPerPage}
                                setCurrentPage={setCurrentPrimeTagPage}
                                currentPage={currentPrimeTagPage}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <RadioGroup
                            value={subTagItem.id}
                            name="sub-tag"
                            options={currentSubTags}
                            onChange={handleSubRadioChange}
                          />
                          {subTagList.length !== 0 && (
                            <div className="pagination">
                              <PopperPagination
                                postsNum={subTagList.length}
                                postsPerPage={tagsPerPage}
                                setCurrentPage={setCurrentSubTagPage}
                                currentPage={currentSubTagPage}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </TagPopperBox>
                  </Popper>
                )}
              </div>
            </div>
          </div>
          <div className="form-item">
            <div className="label">역량 키워드 선택</div>
            <Accordion
              expanded={expanded}
              onChange={handleChange}
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
                  {resultKeywords.length > 0 ? (
                    <div className="tag-list">
                      {resultKeywords.map((item) => (
                        <Tag text={item.name} />
                      ))}
                    </div>
                  ) : (
                    "최대 5개까지 추가 가능 (ex) 커뮤니케이션, 협업 등)"
                  )}
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
                        setCurrentPage={setCurrentBasicKeywordPage}
                        currentPage={currentBasicKeywordPage}
                      />
                    ) : (
                      myKeywordList.length !== 0 && (
                        <PopperPagination
                          postsNum={myKeywordList.length}
                          postsPerPage={keywordsPerPage}
                          setCurrentPage={setCurrentMyKeywordPage}
                          currentPage={currentMyKeywordPage}
                        />
                      )
                    )}
                  </div>
                  {keywordTabOption === "basic" ? (
                    <div className="checkbox-list">
                      {currentBasicKeywords.map((item) => (
                        <Checkbox
                          value={item.id}
                          label={item.name}
                          checked={isKeywordChecked(item)}
                          onChange={(e) => handleKeywordChange(e, "basic")}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="my-keyword">
                      <MyKeywordInput>
                        <Plus2 />
                        <input
                          value={newKeyword}
                          placeholder="직접 역량 태그를 생성할 수 있어요"
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyDown={(e) => handleMyKeywords(e)}
                        />
                      </MyKeywordInput>
                      <div className="checkbox-list">
                        {currentMyKeywords.map((item) => (
                          <Checkbox
                            value={item.id}
                            label={item.name}
                            checked={isKeywordChecked(item)}
                            onChange={(e) => handleKeywordChange(e, "my")}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="keyword-list">
                    {checkedKeywords.map((item) => (
                      <Tag
                        text={item.name}
                        deleteOption={true}
                        onDelete={() => handleDeleteTag(item.id)}
                      />
                    ))}
                  </div>
                </KeywordSelect>
              </AccordionDetails>
            </Accordion>
          </div>
        </BasicFormContainer>
      </SectionContainer>
    );
  };

  /**
   * 질문과 답변폼
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
                value={expData.contents[index].answer}
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
                onChange={(e) => handleAnswerChange(index, e.target.value)}
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
          <CustomButton onClick={handleSaveExperience}>저장</CustomButton>
        </TopContainer>
        <ContentContainer>
          <TitleInput
            value={expData.title}
            placeholder="경험의 제목을 입력해주세요"
            onChange={(e) => setExpData({ ...expData, title: e.target.value })}
          ></TitleInput>
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
        onConfirm={() => navigate(`/experience/detail/${expId}`)}
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
  .tag-list {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const MyKeywordInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  padding: 10px 15px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.neutral50};
  input {
    width: 100%;
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
  color: `var(--main-500, #7D82FF)`,
};

const TagPopperBox = styled.div`
  width: 355px;
  display: flex;
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

const TagSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: var(--neutral-50, #f7f7fb);
  padding: 8px 12px;
  input {
    width: 100%;
    border: none;
    background: none;
    outline: none;
  }
`;

export default ExperienceEditPage;
