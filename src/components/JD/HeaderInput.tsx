import styled from "styled-components";

interface HeaderInputProps {
  content: string;
  onChange: (value: string) => void;
}

const HeaderInput: React.FC<HeaderInputProps> = ({ content, onChange }) => {
  return (
    <HeaderContainer>
      <Header
        placeholder="자기소개서 문항을 입력하세요."
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--neutral-50, #fbfbfd);
  margin: 1rem 0rem;
`;
const Header = styled.input`
  width: 100%;
  ${(props) => props.theme.fonts.subtitle1};
  color: ${(props) => props.theme.colors.neutral700};
  border: none;
  background-color: transparent;
  outline: none;
  padding: 12px 24px;

  &::placeholder {
    color: ${(props) => props.theme.colors.neutral500}; 
  }
`;

export default HeaderInput;
