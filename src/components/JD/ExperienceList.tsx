import React, { useState } from "react";
import ExpData from "../../services/JD/ExpData";
import Experience from "./Experience";
import styled from "styled-components";
import FillfilterIcon from "../../assets/icons/icon_filter_fill.svg";
import BlankfilterIcon from "../../assets/icons/icon_filter_blank.svg";
import SearchIcon from "../../assets/icons/icon_search_grey500.svg";
import { TagList } from "../../services/JD/TagData";
import ArrowIcon_net from "../../assets/icons/icon_arrow_right_net500.svg";
import ArrowIcon_main from "../../assets/icons/icon_arrow_right_main500.svg";
import FilterRemoveIcon from "../../assets/icons/icon_filter_remove.svg";

const ExperienceList = () => {
  const [selectedTab, setSelectedTab] = useState<string>("경험검색");
  const [showDetail, setshowDetail] = useState(false); //경험 상세 보여주기
  const [showTagPopup, setShowTagPopup] = useState(false); // 태그 필터링
  const [searchText, setSearchText] = useState(""); //검색 입력
  const [mainTag, setMainTag] = useState<string>(""); // 선택된 상위태그
  const [subTag, setSubTag] = useState<string>(""); //선택된 하위태그
  const filteredData = ExpData.filter((post) => post.bookmark); // 북마크된 데이터들

  const handleTagSelection = (
    selectedmainTag: string,
    selectedsubTag?: string
  ): void => {
    setSearchText("");
    setMainTag(selectedmainTag);
    if (selectedsubTag) {
      setSubTag(selectedsubTag);
      setShowTagPopup(false);
    } else {
      setSubTag("");
    }
  };

  return (
    <StyledContainer>
      {!showDetail ? (
        <>
          <TabContainer>
            <Tab
              isSelected={selectedTab === "경험검색"}
              onClick={() => setSelectedTab("경험검색")}
            >
              경험 검색
            </Tab>
            <Tab
              isSelected={selectedTab === "북마크"}
              onClick={() => setSelectedTab("북마크")}
            >
              북마크
            </Tab>
          </TabContainer>
          <SearchContainer>
            {mainTag ? (
              <SearchBar value="" readOnly />
            ) : (
              <SearchBar
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            )}
            <FilterContainer>
              {mainTag}
              {subTag && <img src={ArrowIcon_main} alt="Arrow" />}
              {subTag && subTag}
              {mainTag && (
                <img
                  src={FilterRemoveIcon}
                  alt="remove"
                  className="deletebtn"
                  onClick={() => {
                    setMainTag("");
                    setSubTag("");
                  }}
                />
              )}
            </FilterContainer>
            <IconContainer>
              <img
                src={mainTag ? FillfilterIcon : BlankfilterIcon}
                alt="filter"
                onClick={() => {
                  setShowTagPopup(!showTagPopup);
                  setMainTag("");
                  setSubTag("");
                }}
              />
              <img src={SearchIcon} alt="filter" />
            </IconContainer>
            {showTagPopup && <TagPopup onSelect={handleTagSelection} />}
          </SearchContainer>
          {selectedTab === "경험검색" ? (
            <>
              <ScrollDiv>
                {ExpData.map((post, index: number) => (
                  <Experience
                    id={post.id}
                    key={index}
                    title={post.title}
                    tags={post.tags}
                    maintag={post.mainTag}
                    subtag={post.subTag}
                    period={post.period}
                    bookmark={post.bookmark}
                    onClick={() => setshowDetail(true)}
                  />
                ))}
              </ScrollDiv>
            </>
          ) : (
            <ScrollDiv>
              {filteredData.map((post, index: number) => (
                <Experience
                  id={post.id}
                  key={index}
                  title={post.title}
                  maintag={post.mainTag}
                  subtag={post.subTag}
                  tags={post.tags}
                  period={post.period}
                  bookmark={post.bookmark}
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
  onSelect: (mainTag: string, subTag?: string) => void;
}

const TagPopup: React.FC<TagPopupProps> = ({ onSelect }) => {
  const [visibleSubTag, setVisibleSubTag] = useState<number | null>(null);

  const toggleSubTags = (id: number, mainTag: string) => {
    onSelect(mainTag);
    if (visibleSubTag === id) {
      setVisibleSubTag(null);
    } else {
      setVisibleSubTag(id);
    }
  };
  return (
    <PopupContainer>
      {TagList.map((tag) => (
        <div key={tag.id}>
          <Tag onClick={() => toggleSubTags(tag.id, tag.mainTag)}>
            <img src={ArrowIcon_net} alt="arrow" />
            {tag.mainTag}
          </Tag>
          {visibleSubTag === tag.id &&
            tag.subTag.map((sub) => (
              <SubTag key={sub} onClick={() => onSelect(tag.mainTag, sub)}>
                <img src={ArrowIcon_net} alt="arrow" />
                {sub}
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

const Tag = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.75rem 0.5rem;
  align-items: center;
  ${(props) => props.theme.fonts.body4};
  &:hover {
    background: ${(props) => props.theme.colors.neutral300}
  }
`;

const SubTag = styled(Tag)`
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
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  ${(props) => props.theme.fonts.body4};
  color:  ${(props) => props.theme.colors.main500};
  .deletebtn{
    margin-left: 0.5rem;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  align-items: center;
  right: 1rem;
  top: 40%;
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
