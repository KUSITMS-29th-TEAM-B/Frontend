import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { Delete } from "../../assets";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  deleteOption?: boolean;
  onDelete?: () => void;
}

const Tag = ({ text, deleteOption, onDelete }: TagProps) => {
  return (
    <TagContainer>
      {text}
      {deleteOption ? <Delete onClick={onDelete} /> : null}
    </TagContainer>
  );
};

export default Tag;

const TagContainer = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.6875rem;
  background: ${(props) => props.theme.colors.main50};
  color: var(--main-500, #7d82ff);
  ${(props) => props.theme.fonts.cap1};
`;
