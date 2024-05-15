import React from "react";
import styled, { css } from "styled-components";

interface ContentInputProps {
  content: string;
  onChange: (value: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, onChange }) => {
  return (
    <ContentContainer hasContent={content.trim().length > 0}>
      <Content
        placeholder={`문항에 해당하는 답변을 작성해 주세요.
        \n이 문항에서 어필하고 싶은 나의 강점이 있다면, 위의 ‘역량 키워드’ 추가 (+) 버튼을 눌러 등록해 보세요.`}
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </ContentContainer>
  );
};

const ContentContainer = styled.div<{ hasContent: boolean }>`
  display: flex;
  height: 8rem;
  flex-direction: column;
  border-radius: 0.75rem;
  background: var(--neutral-50, #fbfbfd);
  margin: 1rem 0;
  padding: 1rem;

  ${(props) =>
    props.hasContent &&
    css`
      border: 1px solid #D9DBE6;
      background-color: white;
      height: 15rem;
    `}
`;

const Content = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    padding: 0.5rem;
    font-size: 1rem;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; 
    letter-spacing: 0.00463rem;
  background: transparent;
  &::placeholder {
    color: ${(props) => props.theme.colors.neutral500}; 
  }
`;

export default ContentInput;