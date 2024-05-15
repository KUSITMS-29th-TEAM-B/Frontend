import React, { useState } from "react";
import styled from "styled-components";

interface ExpProps {
  title: string;
  content: string;
  tags: string[];
}

const StyledContainer = styled.div`
    width: 90%;
    background-color: white;
    border-radius: 20px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    min-width: 250px;
    min-height: 12rem;
    justify-content: center;
    margin: 1.25rem;
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Title = styled.div`
    color: var(--neutral-700, #343A5D);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.8rem;
`;

const Tag = styled.div`
    display: flex;
    padding: 0.25rem 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.6875rem;
    border: 1px solid var(--main-500, #7D82FF);
    color: var(--main-500, #7D82FF);
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.875rem; 
    letter-spacing: -0.0225rem;
    margin-right:0.5rem;
`;

const ContentContainer = styled.div`
    word-wrap: break-word; 
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 5; 
    -webkit-box-orient: vertical;
`;

const Experience: React.FC<ExpProps> = ({ title, content, tags }) => {
  return (
    <StyledContainer>
      <TopContainer>
        <Title>{title}</Title>
      </TopContainer>
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <ContentContainer>
        <p>{content}</p>
      </ContentContainer>
    </StyledContainer>
  );
};

export default Experience;
