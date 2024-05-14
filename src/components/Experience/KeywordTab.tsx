import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { keywordState } from "../../store/selectedStore";
import { questions } from "../../assets/data/questions";
import Select from "../common/Select";
import { ArrowRight, CircleArrow } from "../../assets";

const KeywordTab = () => {
  const [selectedQ, setSelectedQ] = React.useState(1);
  const [keyword, setKeyword] = useRecoilState(keywordState);

  // 임시 데이터
  const menus = [
    { title: "전체", num: 60 },
    { title: "기업프로젝트", num: 60 },
    { title: "밋업데이", num: 60 },
    { title: "대외홍보팀", num: 60 },
  ];

  return (
    <MainContainer>
      <LeftContainer>
        <ArrowRight />
        <KeywordText>{keyword}</KeywordText>
        <MenuList>
          {menus.map((item) => (
            <MenuItem>
              <div className="text">{item.title}</div>
              <div className="text">{item.num}</div>
            </MenuItem>
          ))}
        </MenuList>
      </LeftContainer>
      <ContentContainer>
        <QuestionContainer>
          <CircleArrow />
          <QuestionSelect>
            <div className="label">질문과 함께보기</div>
            <Select
              value={selectedQ}
              options={questions}
              onChange={(e) => setSelectedQ(questions.indexOf(e.target.value))}
            ></Select>
          </QuestionSelect>
        </QuestionContainer>
      </ContentContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.neutral20};
`;

const LeftContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 24px;
  width: 226px;
  height: 100%;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.neutral100};
`;

const KeywordText = styled.div`
  ${(props) => props.theme.fonts.headline3};
  color: ${(props) => props.theme.colors.neutral700};
  padding: 19px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 189px;
`;

const MenuItem = styled.div`
  width: 100%;
  display: flex;
  padding: 16px 29px;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.fonts.subtitle4};
  .text {
    color: ${(props) => props.theme.colors.neutral500};
  }
  &:hover {
    border-radius: 4px;
    background: #fff;
    .text {
      color: ${(props) => props.theme.colors.neutral700};
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 40px;
  background: ${(props) => props.theme.colors.neutral100};
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  border-radius: 12px;
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.main50};
`;

const QuestionSelect = styled.div`
  margin: 9px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .label {
    ${(props) => props.theme.fonts.subtitle4};
    color: ${(props) => props.theme.colors.main500};
  }
`;

export default KeywordTab;
