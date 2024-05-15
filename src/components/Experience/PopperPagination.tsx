import { forwardRef } from "react";
import styled from "styled-components";

export interface PaginationHandles {
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

interface PaginationProp {
  postsNum: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

//
//
//

const PopperPagination = forwardRef<PaginationHandles, PaginationProp>(
  ({ postsNum, postsPerPage, setCurrentPage, currentPage }, ref) => {
    // 페이지 개수 (버튼 개수)
    const pageList = [];
    const totalPages = Math.ceil(postsNum / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i);
    }

    const goToNextPage = () => {
      setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
      setCurrentPage(currentPage - 1);
    };

    return (
      <Container>
        <button onClick={() => goToPrevPage()} disabled={currentPage === 1}>
          {"<"}
        </button>
        <div className="current">{currentPage}</div>
        <div className="total">
          &nbsp;/&nbsp;
          {totalPages}
        </div>
        <button
          onClick={() => goToNextPage()}
          disabled={currentPage === pageList.length}
        >
          {">"}
        </button>
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .current {
    ${(props) => props.theme.fonts.cap2};
    color: ${(props) => props.theme.colors.main500};
  }
  .total {
    ${(props) => props.theme.fonts.cap2};
    color: ${(props) => props.theme.colors.neutral500};
  }
  button {
    border: none;
    background: none;
    color: ${(props) => props.theme.colors.neutral500};
    &:hover {
      color: ${(props) => props.theme.colors.main500};
    }
  }
`;

export default PopperPagination;
