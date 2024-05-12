import React, { useEffect, useState } from "react";
import styled from "styled-components";
import JobAnnouncementCard from "../components/JD/Announcement";
import { jobAnnouncements } from "../services/JD/jdData";

const JDListPage: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("전체"); // "전체", "작성전", "작성중", "작성완료", "지원완료"
  const [showClosed, setShowClosed] = useState(false); // 지원 마감 공고 함께 보기
  const [selectedSort, setSelectedSort] = useState<string>("등록순"); // 등록순 or 마감순 , 초기값은 등록순

  const Filterbuttons = ["전체", "작성전", "작성중", "작성완료", "지원완료"];
  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const handleSortChange = (sortType: string) => {
    setSelectedSort(sortType);
  };

  useEffect(() => {
    console.log(showClosed, activeButton, selectedSort);
  }, [showClosed, activeButton, selectedSort]);

  return (
    <StyledDivContainer className="page">
      <TopTitleBar>
        <Title>등록한 공고 목록</Title>
      </TopTitleBar>
      <MiddleContainer>
        <LeftFilterBox>
          {Filterbuttons.map((button) => (
            <FilterButton
              key={button}
              active={activeButton === button}
              onClick={() => handleClick(button)}
            >
              {button.toUpperCase()}
            </FilterButton>
          ))}
        </LeftFilterBox>
        <RightFilterBox>
          <ClosedFiltetContainer>
            지원 마감 공고 함께 보기
            <input
              type="checkbox"
              checked={showClosed}
              onChange={() => setShowClosed(!showClosed)}
            />
          </ClosedFiltetContainer>
          <SortContainer>
            <SelectableDiv
              isSelected={selectedSort === "등록순"}
              onClick={() => handleSortChange("등록순")}
            >
              등록순
            </SelectableDiv>
            <DivideLine>|</DivideLine>
            <SelectableDiv
              isSelected={selectedSort === "마감순"}
              onClick={() => handleSortChange("마감순")}
            >
              마감순
            </SelectableDiv>
          </SortContainer>
        </RightFilterBox>
      </MiddleContainer>
      <MainContainer>
        {jobAnnouncements.map((announcement, index) => (
          <JobAnnouncementCard key={index} announcement={announcement} />
        ))}
      </MainContainer>
    </StyledDivContainer>
  );
};

export default JDListPage;

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #FBFBFD;
  overflow-x: hidden;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-gap: 1rem; 
  margin-top: 1rem;
  box-sizing: border-box;
  /* @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  } */
`;

const LeftFilterBox = styled.div`
    width: 100%;
    flex: 1;
`;

const RightFilterBox = styled.div`
    width: 100%;
    flex: 1;
    justify-content: end;
    display: flex;
    flex-direction: row;
`;

const Title = styled.h1`
  color:#343A5D;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#63698D" : "#EEEFF7")};
  color:  ${(props) => (props.active ? "#FFF" : "#343A5D")};
  margin-right: 5px;
  border: none;
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  
  &:focus {
    outline: none;
  }
`;

const SortContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
`;

const SelectableDiv = styled.div<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#7D82FF" : "#343A5D")};
  background-color: "transparent";
  padding: 0.25rem;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const DivideLine = styled.div`
  display: flex;
  color:var(--neutral-500, #A6AAC0);
  font-size: 1.1rem;
  padding-bottom: 0.25rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ClosedFiltetContainer = styled.div`
  display: flex;
  color: var(--neutral-600, #63698D);
  font-size: 1rem;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; 
  letter-spacing: -0.02rem;
  margin-right: 1.37rem;
`;
