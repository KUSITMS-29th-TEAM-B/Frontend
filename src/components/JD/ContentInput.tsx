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
        placeholder="문항에 해당하는 답변을 작성해 주세요."
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </ContentContainer>
  );
};

const ContentContainer = styled.div<{ hasContent: boolean }>`
  display: flex;
  flex-direction: column;
  height: 15rem;
  border-radius: 0.75rem;
  background: var(--neutral-50, #fbfbfd);
  margin: 1rem 0;
  padding: 1rem;

  ${(props) =>
    props.hasContent &&
    css`
      border: 1px solid #D9DBE6;
      background-color: white;
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
  line-height: 1.5;
  background: transparent;
`;

export default ContentInput;
