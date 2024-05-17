import React from "react";
import styled, { useTheme } from "styled-components";
import { ArrowLeft } from "../assets";
import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../components/common/MainButton";
import Experience from "../components/JD/Experience";
import ExpData from "../services/JD/ExpData";
import { questions } from "../assets/data/questions";
import Chip from "../components/common/Chip";
import Textarea from "../components/common/Textarea";

const ExperienceDetailPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <MainContainer className="page">
      <TopContainer>
        <div className="title">
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <ArrowLeft />
          </button>
          나의 경험 상세보기
        </div>
        <CustomButton>수정하기</CustomButton>
      </TopContainer>
      <ContentContainer>
        <Experience
          type="section"
          id={ExpData[0].id}
          key={0}
          title={ExpData[0].title}
          tags={ExpData[0].tags}
          maintag={ExpData[0].mainTag}
          subtag={ExpData[0].subTag}
          period={ExpData[0].period}
        />
        <hr style={{ width: "100%", color: theme.colors.neutral300 }} />
        <AnswerList>
          {questions.map((item, index) => (
            <AnswerItem>
              <div style={{ display: "flex" }}>
                <Chip text={item.type} />
              </div>
              <Textarea
                label={`${index + 1}. ${item.question}`}
                rows={8}
                labelStyle={
                  theme.fonts.title4 + `color: ${theme.colors.neutral700}`
                }
                style={{
                  border: "none",
                  borderRadius: "12px",
                  background: `${theme.colors.neutral50}`,
                  padding: "24px 30px",
                }}
              />
            </AnswerItem>
          ))}
        </AnswerList>
      </ContentContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${(props) => props.theme.colors.neutral20};
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${(props) => props.theme.fonts.title1};
    color: ${(props) => props.theme.colors.neutral700};
  }
`;

const CustomButton = styled(MainButton)`
  padding: 10px 64px;
  border-radius: 8px;
  ${(props) => props.theme.fonts.button2};
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 80px;
  border-radius: 15px;
  border: 1px solid var(--neutral-200, #eeeff7);
  background: var(--neutral-0, #fff);
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const AnswerList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ExperienceDetailPage;
