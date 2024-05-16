import React, { useState } from "react";
import ExpData from "../../services/JD/ExpData";
import Experience from "./Experience";
import styled from "styled-components";
import FillfilterIcon from "../../assets/icons/icon_filter_fill.svg";
import BlankfilterIcon from "../../assets/icons/icon_filter_blank.svg";
import SearchIcon from "../../assets/icons/icon_search_grey500.svg";

const ExperienceList = () => {
  const [selectedTab, setSelectedTab] = useState<string>("경험검색");
  const filteredData = ExpData.filter((post) => post.bookmark); // 북마크된 데이터들
  const [showDetail, setshowDetail] = useState(false); //경험 상세 보여주기

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
            <SearchBar />
            <IconContainer>
              <img src={BlankfilterIcon} alt="filter" />
              <img src={SearchIcon} alt="filter" />
            </IconContainer>
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
