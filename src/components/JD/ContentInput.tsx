import styled from "styled-components";

const ContentInput = () => {
  return (
    <ContentContainer>
      <Content placeholder="문항에 해당하는 답변을 작성해 주세요." />
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 15rem;
  border-radius: 0.75rem;
  background: var(--neutral-50, #fbfbfd);
  margin: 1rem 0;
  padding: 1rem;
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
  /* &:focus {
    border: none;
  } */
`;

export default ContentInput;
