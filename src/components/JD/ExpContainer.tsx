import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExpData from "../../services/JD/ExpData";
import { useRecoilState } from "recoil";
import { detailStore } from "../../store/jdStore";
import { questions } from "../../assets/data/questions";
import ArrowIcon from "../../assets/icons/icon_arrow_right_main500.svg";
import { getCookie } from "../../services/cookie";
import { getExperience } from "../../services/Experience/experienceApi";
import Chip from "../common/Chip";

interface JobContainerProps {
  expId: number | string;
}

interface ApiData {
  id: string;
  title: string;
  parentTag: string;
  childTag: string;
  strongPoints: { id: string; name: string }[];
  contents: { question: string; answer: string }[];
}

const ExperienceBox: React.FC<JobContainerProps> = ({ expId }) => {
  const expData = ExpData[0];
  const user = getCookie("user");
  const [apiData, setapiData] = useState<ApiData>({
    id: "",
    title: "",
    parentTag: "",
    childTag: "",
    strongPoints: [],
    contents: [],
  });

  useEffect(() => {
    getExperienceData(expId.toString(), user.token);
  }, []);

  const [detailId, setDetailId] = useRecoilState<number | string>(detailStore);

  const getExperienceData = async (expId: string, token: string) => {
    try {
      const response = await getExperience(expId, token);
      setapiData({
        id: response.data.id,
        title: response.data.title,
        parentTag: response.data.parentTag.name,
        childTag: response.data.childTag.name,
        strongPoints: response.data.strongPoints,
        contents: response.data.contents,
      });
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  };

  return (
    <ExpContainer>
      <TopContainer>
        <Topbar>
          <TagContainer>
            {apiData.strongPoints.map((point, index) => (
              <Tag key={index}>{point.name}</Tag>
            ))}
          </TagContainer>
          <ButtonContainer onClick={() => setDetailId(0)}>
            <div>이전으로</div>
            <img src={ArrowIcon} alt="arrow" />
          </ButtonContainer>
        </Topbar>
        <Title>{apiData.title}</Title>
        <SubContainer>
          <div>{apiData.parentTag + ">" + apiData.childTag}</div>
          <div>|</div>
          <div>{expData.period}</div>
        </SubContainer>
      </TopContainer>
      <ScrollDiv>
        <ExpBottomBox>
          {apiData.contents.map((item, index) => (
            <QuestionsWrapper>
              <ChipWrapper>
                <Chip text={questions[index].type} />
              </ChipWrapper>
              <div className="question-title">
                {`${index + 1}. ` + item.question}
              </div>
              <AnswerWrapper>
                <AnswerText isEmpty={item.answer === ""}>
                  {item.answer ? item.answer : "작성한 답변이 없습니다."}
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
  border: 1px solid var(--neutral-200, #eeeff7);
  background: var(--neutral-0, #fff);
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
  div {
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
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral300};
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
  color: var(--neutral-700, #343a5d);
  //overflow-y: scroll;
  margin: 0rem 0rem 2rem 2rem;
`;

const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 8px;
`;

const QuestionsWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-right: 1.5rem;
  flex-direction: column;
  justify-content: start;
  margin-top: 1.25rem;
  .question-title {
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
