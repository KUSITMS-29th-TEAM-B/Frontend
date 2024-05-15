import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { detailStore } from "../../store/jdStore";

interface ExpProps {
  id: number;
  title: string;
  tags: string[];
  maintag: string;
  subtag: string;
  period: string;
  bookmark: boolean;
  question: null | string[];
  onClick: () => void;
}

const Experience: React.FC<ExpProps> = ({
  id,
  title,
  tags,
  maintag,
  subtag,
  period,
  bookmark,
  onClick,
}) => {
  const [detailId, setDetailId] = useRecoilState(detailStore);

  const handleClick = () => {
    setDetailId(id);
    onClick();
  };
  return (
    <StyledContainer onClick={handleClick}>
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <TopContainer>
        <Title>{title}</Title>
      </TopContainer>
      <SubContainer>
        <div>{maintag + ">" + subtag}</div>
        <div>|</div>
        <div>{period}</div>
      </SubContainer>
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
`;

const Title = styled.div`
    color: ${(props) => props.theme.colors.neutral700}; 
    ${(props) => props.theme.fonts.subtitle3}; 
`;

const TagContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.38rem;
`;

const Tag = styled.div`
    display: flex;
    padding: 0.25rem 0.75rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.6875rem;
    background: ${(props) => props.theme.colors.main50}; 
    color: var(--main-500, #7D82FF);
    ${(props) => props.theme.fonts.cap2}; 
`;
