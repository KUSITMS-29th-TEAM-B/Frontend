import React from "react";
import styled from "styled-components";
import { ArrowRight } from "../../assets";

interface PrimeTagCardProp {
  key: number;
  title: string;
  tagNum: number;
  expNum: number;
}

const PrimeTagCard = ({ key, title, tagNum, expNum }: PrimeTagCardProp) => {
  return (
    <CardContainer key={key}>
      <CardTitle>
        <div className="title">{title}</div>
        <ArrowRight />
      </CardTitle>
      <CardContent>
        <ContentItem>
          <div className="title">역량 태그</div>
          <div className="num">{tagNum}개</div>
        </ContentItem>
        <ContentItem>
          <div className="title">경험</div>
          <div className="num">{expNum}개</div>
        </ContentItem>
        <ContentItem></ContentItem>
      </CardContent>
    </CardContainer>
  );
};

export default PrimeTagCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 36px 40px;
  border-radius: 8px;
  border: 1px solid #eeeff7;
  background: #fff;
`;

const CardTitle = styled.div`
  display: flex;
  flex-direciton: row;
  gap: 4px;
  align-items: center;
  .title {
    ${(props) => props.theme.fonts.title3};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: var(--main-bg, #fafaff);
  padding: 14px 20px;
  gap: 5px;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title {
    ${(props) => props.theme.fonts.cap1};
    color: #a6aac0;
  }
  .num {
    ${(props) => props.theme.fonts.body4};
    color: #7d82ff;
  }
`;
