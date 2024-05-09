import styled from "styled-components";
import searchIcon from "../../assets/icons/search.png";

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput placeholder="검색하기" />
      <SearchButton>
        <img src={searchIcon} alt="검색아이콘" />
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  background: var(--neutral-20, #fbfbfd);
`;
const SearchInput = styled.input`
  ${(props) => props.theme.fonts.body5};
  color: ${(props) => props.theme.colors.neutral500};
  border: none;
  background-color: transparent;
  outline: none;
  padding: 12px 24px;
`;
const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--neutral-300, #eaebf3);
`;

export default Search;
