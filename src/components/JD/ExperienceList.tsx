import React, { useState } from "react";
import ExpData from "../../services/JD/ExpData";
import Experience from "./Experience";
import styled from "styled-components";

const ExperienceList = () => {
  const [selectedTab, setSelectedTab] = useState<string>("경험검색");
  const filteredData = ExpData.filter((post) => post.bookmark);
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
          {selectedTab === "경험검색" ? (
            <>
              <SearchBar />
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
  justify-content: center;
  margin: 1rem 0;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  padding: 1rem 2rem;
  cursor: pointer;
  border-bottom: ${({ isSelected }) =>
    isSelected ? "2px solid #000" : "none"};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;

const SearchBar = styled.input`
  width: 90%;
  border-radius: 0.9rem;
  margin: 2rem;
  background: #fff;
  height: 3rem;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem;
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
