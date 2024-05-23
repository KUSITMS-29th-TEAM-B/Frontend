import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { detailStore } from "../../store/jdStore";
import { Question } from "../../types/type";
import bookmarkFillIcon from "../../assets/icons/icon_bookmark_fill.svg";
import bookmarkBlankIcon from "../../assets/icons/icon_bookmark_blank.svg";
import dayjs from "dayjs";
import { QuestionType } from "../../types/experience";
import { bookmarkpatch } from "../../services/JD/bookmarkApi";
import { getCookie } from "../../services/cookie";
import { useParams } from "react-router-dom";
import { getAllExperienceList } from "../../services/JD/ExperienceApi";

interface ExpProps {
  type?: "card" | "section";
  id: string | number;
  title: string;
  tags: string[];
  maintag: string;
  subtag: string;
  period?: string;
  bookmark?: boolean;
  question?: number;
  startedAt?: string;
  endedAt?: string;
  detail?: QuestionType[];
  checkedKeywords?: string[];
  onClick?: () => void;
  handleApi?: (jdId: string, token: string) => Promise<void>;
}

const Experience: React.FC<ExpProps> = ({
  type,
  id,
  title,
  tags,
  maintag,
  subtag,
  bookmark,
  startedAt,
  endedAt,
  question,
  detail,
  checkedKeywords,
  onClick,
  handleApi,
}) => {
  const [detailId, setDetailId] = useRecoilState(detailStore);
  const user = getCookie("user");
  const jdId = useParams().jdId;
  // 카드 타입, 섹션 타입 구분
  const isSection = type === "section";

  // 경험의 선택된 질문 답변
  const answer = detail?.[(question || 1) - 1]?.answer;

  const handleClick = () => {
    setDetailId(id);
    if (onClick) {
      onClick();
    }
  };

  const handleBookmarkPost = async (
    token: string,
    jobId: string,
    expId: string
  ) => {
    try {
      await bookmarkpatch(token, jobId, expId);
      if (jdId && user.token) {
        handleApi!(jdId, user.token);
      }
    } catch (error) {
      //   console.error(error);
      //   alert(JSON.stringify(error));
    }
  };

  const handleBookmarkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (id && jdId) {
      handleBookmarkPost(user.token, jdId, id.toString());
    }
  };
  return (
    <StyledContainer
      className={isSection ? "section" : ""}
      onClick={handleClick}
    >
      <Topbar>
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className={
                checkedKeywords && checkedKeywords.includes(tag) ? "active" : ""
              }
            >
              {tag}
            </Tag>
          ))}
        </TagContainer>
        {bookmark !== undefined && (
          <div onClick={handleBookmarkClick}>
            {bookmark ? (
              <img src={bookmarkFillIcon} alt="bookmarkfill" />
            ) : (
              <img src={bookmarkBlankIcon} alt="bookmarkblank" />
            )}
          </div>
        )}
      </Topbar>
      <TopContainer>
        <Title className={isSection ? "section" : ""}>{title}</Title>
      </TopContainer>
      <SubContainer className={isSection ? "section" : ""}>
        <div>{maintag + ">" + subtag}</div>
        <div>|</div>
        <div>
          {dayjs(new Date(startedAt || new Date())).format("YYYY.MM.DD")}~
          {dayjs(new Date(endedAt || new Date())).format("YYYY.MM.DD")}
        </div>
      </SubContainer>
      {question ? (
        <AnswerContainer>
          <div className="label">내가 작성한 답변</div>
          <hr />
          <div className={answer ? "content" : "noContent"}>
            {answer || "작성한 답변이 없습니다"}
          </div>
        </AnswerContainer>
      ) : null}
    </StyledContainer>
  );
};

export default Experience;

const StyledContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 20px;
  min-width: 250px;
  display: flex;
  padding: 1.5625rem 2.75rem 1.5625rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  &.section {
    padding: 0px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.neutral500};
  ${(props) => props.theme.fonts.cap2};
  &.section {
    ${(props) => props.theme.fonts.subtitle4};
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.neutral700};
  ${(props) => props.theme.fonts.subtitle3};
  &.section {
    ${(props) => props.theme.fonts.title1};
  }
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

const Tag = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.6875rem;
  background: ${(props) => props.theme.colors.main50};
  color: var(--main-500, #7d82ff);
  ${(props) => props.theme.fonts.cap2};
  &.active {
    background: ${(props) => props.theme.colors.main500};
    color: ${(props) => props.theme.colors.main50};
  }
`;

const AnswerContainer = styled.div`
  width: 100%;
  padding: 19px 31px;
  border-radius: 8px;
  background: var(--neutral-50, #f7f7fb);
  .label {
    ${(props) => props.theme.fonts.body4};
    color: ${(props) => props.theme.colors.neutral600};
    margin-bottom: 12px;
  }
  .content {
    margin-top: 18px;
    ${(props) => props.theme.fonts.cap1};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .noContent {
    margin-top: 18px;
    ${(props) => props.theme.fonts.cap1};
    color: ${(props) => props.theme.colors.neutral600};
  }
`;
