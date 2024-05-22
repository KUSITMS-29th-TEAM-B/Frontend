import React, { useEffect, useState } from "react";
import Experience from "./Experience";
import styled from "styled-components";
import FillfilterIcon from "../../assets/icons/icon_filter_fill.svg";
import BlankfilterIcon from "../../assets/icons/icon_filter_blank.svg";
import SearchIcon from "../../assets/icons/icon_search_grey500.svg";
import ArrowIcon_net from "../../assets/icons/icon_arrow_right_net500.svg";
import ArrowIcon_main from "../../assets/icons/icon_arrow_right_main500.svg";
import FilterRemoveIcon from "../../assets/icons/icon_filter_remove.svg";
import { ArrowDownThin, ArrowUpThin, Options } from "../../assets";
import { Popper } from "@mui/material";
import PopperPagination from "../Experience/PopperPagination";
import { basicKeywords } from "../../assets/data/keywords";
import Checkbox from "../common/Checkbox";
import {
  getAllExperienceList,
  searchTagExperienceList,
  searchTextExperienceList,
} from "../../services/JD/ExperienceApi";
import { getCookie } from "../../services/cookie";
import { getAllTags } from "../../services/JD/tagApi";
import { useParams } from "react-router-dom";
import { formatDateRange } from "../../pages/JDListPage";
import { KeywordType } from "../../types/experience";
import { getKeywords } from "../../services/Experience/keywordApi";

type TabType = "basic" | "my";

interface ExperienceListProps {
  showBookmarksOnly: boolean;
}

type StrongPointAPI = {
  id: string;
  name: string;
};

type ExpTagAPI = {
  id: string;
  name: string;
};

type MyTagAPI = {
  id: string;
  name: string | null;
};

type ContentAPI = {
  question: string;
  answer: string;
};

type ExperienceAPI = {
  id: string;
  title: string;
  parentTag: ExpTagAPI;
  childTag: ExpTagAPI;
  strongPoints: StrongPointAPI[];
  contents: ContentAPI[];
  startedAt: string;
  endedAt: string;
  bookmarked: "ON" | "OFF";
};

type Experiences = ExperienceAPI[];

const ExperienceList: React.FC<ExperienceListProps> = ({
  showBookmarksOnly,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    showBookmarksOnly ? "북마크" : "경험검색"
  );
  const [showDetail, setshowDetail] = useState(false); //경험 상세 보여주기
  const [showTagPopup, setShowTagPopup] = useState(false); // 태그 필터링
  const [searchText, setSearchText] = useState(""); //검색 입력
  const [mainTag, setMainTag] = useState<MyTagAPI>({ id: "", name: "" }); // 선택된 상위태그
  const [subTag, setSubTag] = useState<MyTagAPI>({ id: "", name: "" }); //선택된 하위태그
  const [filterCount, setfilterCount] = useState<number>(-1); //검색된 경험의 숫자, 검색 안된 상태에서는 -1
  const [keywordTabOption, setKeywordTabOption] =
    React.useState<TabType>("basic");
  const user = getCookie("user");
  const [experienceData, setExperienceData] = useState<Experiences>([]);
  const jdId = useParams().jdId;
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (jdId) {
      getExperienceList(jdId, user.token);
    }
  }, []);

  //모든 경험리스트 불러오기
  const getExperienceList = async (jdId: string, token: string) => {
    try {
      const response = await getAllExperienceList(jdId, token);
      console.log(response);
      setExperienceData(response.data.experiences);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  const getSearchedExperienceList = async (
    jdId: string,
    searchText: string,
    token: string
  ) => {
    try {
      setSearching(true);
      const response = await searchTextExperienceList(jdId, searchText, token);
      console.log(response);
      setExperienceData(response.data.experiences);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  const getFilteredExperienceList = async (
    jdId: string,
    parenttag: string,
    childtag: string | null,
    token: string
  ) => {
    try {
      const response = await searchTagExperienceList(
        jdId,
        parenttag,
        childtag,
        token
      );
      console.log(response);
      setExperienceData(response.data.experiences);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  //상위태그 하위태그 필터링
  const handleTagSelection = (
    selectedmainTag: MyTagAPI,
    selectedsubTag?: MyTagAPI
  ): void => {
    setSearchText("");
    setMainTag({ id: selectedmainTag.id, name: selectedmainTag.name });
    if (selectedsubTag) {
      setSubTag({ id: selectedsubTag.id, name: selectedsubTag.name });
      setShowTagPopup(false);
    } else {
      setSubTag({ id: "", name: "" });
    }
  };

  useEffect(() => {
    if (mainTag.id !== "") {
      if (jdId) {
        getFilteredExperienceList(jdId, mainTag.id, null, user.token);
      }
    }
  }, [mainTag]);

  useEffect(() => {
    if (subTag.id !== "") {
      if (jdId) {
        getFilteredExperienceList(jdId, mainTag.id, subTag.id, user.token);
      }
    }
  }, [subTag]);

  //역량키워드 관련 팝업
  const [myKeywordList, setMyKeywordList] = React.useState<KeywordType[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "tag-popper" : undefined;

  // 기본 역량 키워드 페이지네이션
  const keywordsPerPage = 9;
  const [currentBasicKeywordPage, setCurrentBasicKeywordPage] =
    React.useState(1);
  const firstBasicKeywordIndex =
    (currentBasicKeywordPage - 1) * keywordsPerPage;
  const lastBasicKeywordIndex = firstBasicKeywordIndex + keywordsPerPage;
  const currentBasicKeywords = basicKeywords.slice(
    firstBasicKeywordIndex,
    lastBasicKeywordIndex
  );
  // My 역량 키워드 페이지네이션
  const [currentMyKeywordPage, setCurrentMyKeywordPage] = React.useState(1);
  const firstMyKeywordIndex = (currentMyKeywordPage - 1) * keywordsPerPage;
  const lastMyKeywordIndex = firstMyKeywordIndex + keywordsPerPage;
  const currentMyKeywords = myKeywordList.slice(
    firstMyKeywordIndex,
    lastMyKeywordIndex
  );

  // 체크된 역량 키워드 리스트
  const [checkedKeywords, setCheckedKeywords] = useState<KeywordType[]>([]);

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

  useEffect(() => {
    if (selectedTab === "경험검색" && (searching || mainTag.id !== "")) {
      if (checkedKeywords.length !== 0) {
        setfilterCount(filteredExpData.length);
      } else {
        setfilterCount(experienceData.length);
      }
    } else if (selectedTab === "북마크" && (searching || mainTag.id !== "")) {
      if (checkedKeywords.length !== 0) {
        setfilterCount(filteredBookedData.length);
      } else {
        setfilterCount(bookedData.length);
      }
    } else if (searchText === "" && mainTag.id === "") {
      setfilterCount(-1);
    }
  }, [
    searching,
    mainTag,
    subTag,
    selectedTab,
    experienceData,
    checkedKeywords,
  ]);

  useEffect(() => {
    if (searchText === "") {
      setSearching(false);
    }
  }, [searchText]);

  // My 역량 키워드 조회
  useEffect(() => {
    if (user?.token) {
      getKeywords(user?.token)
        .then((res) => setMyKeywordList(res.data.strongPoints))
        .catch((err) => console.log(err));
    }
  }, [user?.token]);

  // 역량 키워드 클릭 함수
  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // 역량 키워드 필터된 경험 데이터, 북마크
  const filteredExpData = experienceData.filter((experience) =>
    experience.strongPoints.some((item: KeywordType) => isKeywordChecked(item))
  );

  const bookedData = experienceData.filter((experience) => {
    return experience.bookmarked === "ON";
  });

  const filteredBookedData = bookedData.filter((experience) =>
    experience.strongPoints.some((item: KeywordType) => isKeywordChecked(item))
  );

  return (
    <StyledContainer>
      {!showDetail ? (
        <>
          <TabContainer>
            {!showBookmarksOnly && (
              <Tab
                isSelected={selectedTab === "경험검색"}
                onClick={() => setSelectedTab("경험검색")}
              >
                경험 검색
              </Tab>
            )}
            <Tab
              isSelected={selectedTab === "북마크"}
              onClick={() => setSelectedTab("북마크")}
            >
              북마크
            </Tab>
          </TabContainer>
          <SearchContainer>
            {mainTag.id !== "" ? (
              <SearchBar value="" readOnly />
            ) : (
              <SearchBar
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            )}
            <FilterContainer>
              {mainTag.name}
              {subTag.name && <img src={ArrowIcon_main} alt="Arrow" />}
              {subTag.name && subTag.name}
              {mainTag.id && (
                <img
                  src={FilterRemoveIcon}
                  alt="remove"
                  className="deletebtn"
                  onClick={() => {
                    setMainTag({ id: "", name: "" });
                    setSubTag({ id: "", name: "" });
                  }}
                />
              )}
            </FilterContainer>
            <IconContainer>
              <img
                src={mainTag.id !== "" ? FillfilterIcon : BlankfilterIcon}
                alt="filter"
                onClick={() => {
                  setShowTagPopup(!showTagPopup);
                  setMainTag({ id: "", name: "" });
                  setSubTag({ id: "", name: "" });
                }}
              />
              <img
                src={SearchIcon}
                alt="filter"
                onClick={() => {
                  getSearchedExperienceList(jdId!, searchText, user.token);
                }}
              />{" "}
              {/* 클릭시 검색 api 호출 */}
            </IconContainer>
            {showTagPopup && <TagPopup onSelect={handleTagSelection} />}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {filterCount >= 0 && (
                <FilteredTextWrapper>
                  총 <p>{filterCount}</p>개의 검색 결과가 있습니다
                </FilteredTextWrapper>
              )}
              {/* 역량 키워드 선택 컨테이너 */}
              <KeywordSelect>
                <Options /> 역량 키워드
                <div className="keyword-count">
                  {checkedKeywords.length > 0 && `(${checkedKeywords.length})`}
                </div>
                <button aria-describedby={id} onClick={handleTagPopper}>
                  {open ? <ArrowUpThin /> : <ArrowDownThin />}
                </button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <TagPopperBox>
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
                        <PopperPagination
                          postsNum={myKeywordList.length}
                          postsPerPage={keywordsPerPage}
                          setCurrentPage={setCurrentMyKeywordPage}
                          currentPage={currentMyKeywordPage}
                        />
                      )}
                    </div>
                    <div
                      className="checkbox-list"
                      style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                      }}
                    >
                      {keywordTabOption === "basic"
                        ? currentBasicKeywords.map((item) => (
                            <Checkbox
                              value={item.id}
                              label={item.name}
                              checked={isKeywordChecked(item)}
                              onChange={(e) => handleKeywordChange(e, "basic")}
                            />
                          ))
                        : currentMyKeywords.map((item) => (
                            <Checkbox
                              value={item.id}
                              label={item.name}
                              checked={isKeywordChecked(item)}
                              onChange={(e) => handleKeywordChange(e, "my")}
                            />
                          ))}
                    </div>
                    <div className="checkbox-num">
                      총&nbsp;
                      <div className="accent">
                        {checkedKeywords.length === 0
                          ? experienceData?.length
                          : filteredExpData.length}
                        개
                      </div>
                      의 결과가 표시돼요
                    </div>
                  </TagPopperBox>
                </Popper>
              </KeywordSelect>
            </div>
          </SearchContainer>
          {selectedTab === "경험검색" ? (
            <>
              <ScrollDiv>
                {(checkedKeywords.length === 0
                  ? experienceData
                  : filteredExpData
                ).map((post, index: number) => (
                  <Experience
                    id={post.id}
                    key={index}
                    title={post.title}
                    maintag={post.parentTag.name}
                    subtag={post.childTag.name}
                    tags={post.strongPoints.map((point) => point.name)}
                    period={formatDateRange(post.startedAt, post.endedAt)}
                    bookmark={post.bookmarked === "ON" ? true : false}
                    checkedKeywords={checkedKeywords.map(
                      (item: KeywordType) => item.name
                    )}
                    onClick={() => setshowDetail(true)}
                    handleApi={getExperienceList}
                  />
                ))}
              </ScrollDiv>
            </>
          ) : (
            <ScrollDiv>
              {(checkedKeywords.length === 0
                ? bookedData
                : filteredBookedData
              ).map((post, index: number) => (
                <Experience
                  id={post.id}
                  key={index}
                  title={post.title}
                  maintag={post.parentTag.name}
                  subtag={post.childTag.name}
                  tags={post.strongPoints.map((point) => point.name)}
                  period={formatDateRange(post.startedAt, post.endedAt)}
                  bookmark={post.bookmarked === "ON" ? true : false}
                  checkedKeywords={checkedKeywords.map(
                    (item: KeywordType) => item.name
                  )}
                  onClick={() => setshowDetail(true)}
                />
              ))}
            </ScrollDiv>
          )}
        </>
      ) : (
        <div>showdetail</div>
      )}
    </StyledContainer>
  );
};

export default ExperienceList;

interface TagPopupProps {
  onSelect: (mainTag: MyTagAPI, subTag?: MyTagAPI) => void;
}

interface ChildTag {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
  childTags: ChildTag[];
}

const TagPopup: React.FC<TagPopupProps> = ({ onSelect }) => {
  const [visibleSubTag, setVisibleSubTag] = useState<string | null>(null);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const user = getCookie("user");

  const getTagList = async (token: string) => {
    try {
      const response = await getAllTags(token);
      console.log(response);
      const list = response.data.tags.map((tag: Tag) => ({
        id: tag.id,
        name: tag.name,
        childTags: tag.childTags,
      }));
      setTagList(list);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getTagList(user.token);
  }, []);

  const toggleSubTags = (id: string) => {
    if (visibleSubTag === id) {
      setVisibleSubTag(null);
    } else {
      setVisibleSubTag(id);
    }
  };

  return (
    <PopupContainer>
      {tagList.map((tag) => (
        <div key={tag.id}>
          <TagWrapper
            onClick={() => {
              toggleSubTags(tag.id);
              onSelect({ id: tag.id, name: tag.name });
            }}
          >
            <img src={ArrowIcon_net} alt="arrow" />
            {tag.name}
          </TagWrapper>
          {visibleSubTag === tag.id &&
            tag.childTags.map((child) => (
              <SubTag
                key={child.id}
                onClick={() =>
                  onSelect(
                    { id: tag.id, name: tag.name },
                    { id: child.id, name: child.name }
                  )
                }
              >
                <img src={ArrowIcon_net} alt="arrow" />
                {child.name}
              </SubTag>
            ))}
        </div>
      ))}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: absolute;
  background: #FFF;
  border: 1px solid #ccc;
  right: 0.5rem;
  top: 3.5rem;
  z-index: 10;
  width: 11rem; 
  max-height: 20rem;
  overflow: auto;
  border-radius: 0.5rem;
  color:  ${(props) => props.theme.colors.neutral700};
  border: 1px solid ${(props) => props.theme.colors.neutral200};
`;

const TagWrapper = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.75rem 0.5rem;
  align-items: center;
  ${(props) => props.theme.fonts.body4};
  &:hover {
    background: ${(props) => props.theme.colors.neutral300}
  }
`;

const SubTag = styled(TagWrapper)`
  padding-left: 20px;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  padding: 1rem;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  width: 4rem;
  padding: 0.5rem 0;
  text-align: center;
  ${(props) => props.theme.fonts.body4};
  border-bottom: ${({ isSelected }) =>
    isSelected ? "3px solid #9AAAFF" : "3px solid #D9DBE6"};
  color:${({ isSelected }) => (isSelected ? "#343A5D" : "#A6AAC0")};
  
`;

const SearchContainer = styled.div`
  position: relative;
  width: 95%;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  width: 100%;
  border-radius: 0.9rem;
  background: #fff;
  height: 3rem;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  position: absolute;
  align-items: center;
  left: 1rem;
  top: 30%;
  transform: translateY(-50%);
  display: flex;
  ${(props) => props.theme.fonts.body4};
  color:  ${(props) => props.theme.colors.main500};
  .deletebtn{
    margin-left: 0.5rem;
  }
`;

const FilteredTextWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-left: 1rem;
    align-items: center;
    ${(props) => props.theme.fonts.body4};
    color:  ${(props) => props.theme.colors.neutral600};
    p{
        margin: 0.25rem;
        color:  ${(props) => props.theme.colors.main500};
    }
`;

const IconContainer = styled.div`
  position: absolute;
  align-items: center;
  right: 1rem;
  top: 30%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;
`;

const ScrollDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 1rem;
  gap: 1rem;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
  ::-webkit-scrollbar-track {
  }
`;

const KeywordSelect = styled.div`
  ${(props) => props.theme.fonts.cap1};
  color: ${(props) => props.theme.colors.neutral600};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  button {
    border: none;
    background: none;
  }
  .keyword-count {
    color: ${(props) => props.theme.colors.main500};
  }
`;

const TagPopperBox = styled.div`
  display: flex;
  width: 355px;
  margin-right: 2rem;
  flex-direction: column;
  padding: 21px 22px 21px 20px;
  border-radius: 8px;
  border: 1px solid var(--main-200, #e5e6ff);
  background: #fff;
  gap: 25px;
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
    &:hover {
      ${(props) => props.theme.fonts.subtitle5};
      color: ${(props) => props.theme.colors.neutral600};
      border-radius: 4px;
      background: var(--neutral-0, #fff);
    }
  }
  .checkbox-num {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    ${(props) => props.theme.fonts.cap2};
    color: ${(props) => props.theme.colors.neutral500};
    .accent {
      color: ${(props) => props.theme.colors.main500};
    }
  }
`;
