import React from "react";
import styled from "styled-components";
import { ArrowRight } from "../../assets";
import { useRecoilState, useSetRecoilState } from "recoil";
import { primeTagState, yearState } from "../../store/selectedStore";
import PrimeTagCard from "./PrimeTagCard";
import { moreData } from "../../services/Experience/moreData";

const MoreTab = () => {
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);
  const setSelectedPrimeTag = useSetRecoilState(primeTagState);

  const totalNum = moreData.length;
  /**
   * 사이드 메뉴 컨테이너
   */
  const renderLeftContainer = () => {
    return (
      <LeftContainer>
        <button
          style={{
            textAlign: "center",
            width: "50px",
            background: "transparent",
            border: "none",
          }}
          onClick={() => setSelectedPrimeTag(null)}
        >
          <ArrowRight />
        </button>
        <YearText>{selectedYear} 활동</YearText>
        <YearInfo>
          <div className="total">총</div>
          <div className="num">{totalNum}개</div>
        </YearInfo>
      </LeftContainer>
    );
  };

  /**
   * 콘텐츠 컨테이너 (상위 태그 카드 리스트)
   */
  const renderContentContainer = () => {
    return (
      <ContentContainer>
        <CardList>
          {moreData.map((item, index) => (
            <PrimeTagCard
              key={index}
              title={item.title}
              tagNum={item.tagNum}
              expNum={item.expNum}
            />
          ))}
        </CardList>
      </ContentContainer>
    );
  };

  //
  //
  //
  return (
    <MainContainer>
      {renderLeftContainer()}
      {renderContentContainer()}
    </MainContainer>
  );
};

export default MoreTab;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.neutral20};
`;

const LeftContainer = styled.div`
  border-radius: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 24px;
  width: 226px;
  height: 100%;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.neutral100};
`;

const YearText = styled.div`
  ${(props) => props.theme.fonts.headline3};
  color: ${(props) => props.theme.colors.neutral700};
  text-align: center;
  padding: 40px 0px 20px;
`;

const YearInfo = styled.div`
  padding: 9px 20px;
  border-top: 1px solid #d9dbe6;
  border-bottom: 1px solid #d9dbe6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .total {
    ${(props) => props.theme.fonts.subtitle4};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .num {
    ${(props) => props.theme.fonts.body4};
    color: #7d82ff;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 60px;
`;

const CardList = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  overflow-y: scroll;
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
