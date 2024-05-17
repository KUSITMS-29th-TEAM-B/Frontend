import React from "react";
import styled from "styled-components";
import ExpData from "../../services/JD/ExpData";
import { useRecoilState } from "recoil";
import { detailStore } from "../../store/jdStore";
import { questions } from "../../assets/data/questions";
import JDChip from "./JDChip";
import ArrowIcon from "../../assets/icons/icon_arrow_right_main500.svg";

interface JobContainerProps {
  expId: number;
}

const ExperienceBox: React.FC<JobContainerProps> = ({ expId }) => {
  const expData = ExpData[expId - 1];
  const [detailId, setDetailId] = useRecoilState<number>(detailStore);

  return (
    <ExpContainer>
      <TopContainer>
        <Topbar>
          <TagContainer>
            {expData.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagContainer>
          <ButtonContainer>
            <div onClick={() => setDetailId(0)}>이전으로</div>
            <img src={ArrowIcon} alt="arrow" />
          </ButtonContainer>
        </Topbar>
        <Title>{expData.title}</Title>
        <SubContainer>
          <div>{expData.mainTag + ">" + expData.subTag}</div>
          <div>|</div>
          <div>{expData.period}</div>
        </SubContainer>
      </TopContainer>
      <ScrollDiv>
        <ExpBottomBox>
          {questions.map((item, index) => (
            <QuestionsWrapper>
              <ChipWrapper>
                <JDChip text={item.type} />
              </ChipWrapper>
              <div className="question-title">
                {`${index + 1}. ` + item.question}
              </div>
              <AnswerWrapper>
                <AnswerText
                  isEmpty={
                    !expData.detail?.find((detail) => detail.num === index)
                      ?.content
                  }
                >
                  {expData.detail?.find((detail) => detail.num === index)
                    ?.content || "작성한 답변이 없습니다."}
                </AnswerText>
              </AnswerWrapper>
            </QuestionsWrapper>
          ))}
        </ExpBottomBox>
      </ScrollDiv>
    </ExpContainer>
  );
};

export default ExperienceBox;

const ScrollDiv = styled.div`
    width: 100%;
    overflow-y: auto;
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

const ExpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40rem;
    align-items: flex-start;
    gap: 0.625rem;
    //padding: 2rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
    //min-height: 100rem;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.38rem;
`;

const Topbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.colors.neutral600};
  div{
    width: 100%;
    ${(props) => props.theme.fonts.cap3};
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  ${(props) => props.theme.fonts.title4};
`;

const Tag = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.6875rem;
  background: ${(props) => props.theme.colors.main50};
  color: var(--main-500, #7d82ff);
  ${(props) => props.theme.fonts.cap2};
`;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.neutral500};
  ${(props) => props.theme.fonts.body4};
  border-bottom: 1px solid  ${(props) => props.theme.colors.neutral300};
  padding-bottom: 1.25rem;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 2rem;
  margin: 0 2rem;
  padding-right: 4rem;
`;

const ExpBottomBox = styled.div`
    height: 27rem;
    color: var(--neutral-700, #343A5D);
    //overflow-y: scroll;
    margin: 0rem 0rem 2rem 2rem;
`;

const ChipWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
`;

const QuestionsWrapper = styled.div`
    width: 100%;
    display: flex;
    padding-right: 1.5rem;
    flex-direction: column;
    justify-content: start;
    margin-top: 1.25rem;
    .question-title{
        margin-top: 0.5rem;
        ${(props) => props.theme.fonts.subtitle3};
        color: ${(props) => props.theme.colors.neutral700};
    }
`;

const AnswerWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 1rem 1.125rem;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.75rem;
    height: 6rem;
    background: ${(props) => props.theme.colors.neutral50};
    margin-top: 0.75rem;
`;

const AnswerText = styled.div<{ isEmpty: boolean }>`
  color: ${(props) => (props.isEmpty ? "#A6AAC0" : "#343A5D")};
`;
