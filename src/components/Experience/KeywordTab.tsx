import React from "react";
import { useRecoilState } from "recoil";
import styled, { useTheme } from "styled-components";
import {
  deleteState,
  keywordState,
  yearState,
} from "../../store/selectedStore";
import { questions } from "../../assets/data/questions";
import Select from "../common/Select";
import {
  ArrowDown,
  ArrowDownThin,
  ArrowRight,
  ArrowUpThin,
  CircleArrow,
  DeleteIcon,
  Options,
} from "../../assets";
import YearSelect from "./YearSelect";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Popper,
} from "@mui/material";
import Checkbox from "../common/Checkbox";
import PopperPagination from "./PopperPagination";
import { basicKeywords } from "../../assets/data/keywords";
import Experience from "../JD/Experience";
import ExpData from "../../services/JD/ExpData";
import editIcon from "../../assets/images/editIcon.png";

interface KeywordTabProp {
  openDeleteModal: () => void;
}

const KeywordTab = ({ openDeleteModal }: KeywordTabProp) => {
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useRecoilState(yearState);
  const [isDelete, setIsDelete] = useRecoilState(deleteState);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [selectedQ, setSelectedQ] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "tag-popper" : undefined;

  // 역량 키워드 페이지네이션
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 9;
  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = basicKeywords.slice(firstPostIndex, lastPostIndex);

  // 임시 데이터
  const years = [2000, 2005, 2010, 2015, 2020];
  const menus = [
    { title: "전체", num: 60 },
    { title: "기업프로젝트", num: 60 },
    { title: "밋업데이", num: 60 },
    { title: "대외홍보팀", num: 60 },
  ];

  // 역량 키워드 클릭 함수
  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // 질문 아코디언 관리
  const [expanded, setExpanded] = React.useState(false);

  const handleBackButton = () => {
    setIsDelete(false);
    setKeyword(null);
  }

  const handleQuestionChange = () => {
    if (expanded) {
      setSelectedQ(0);
    }
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  /**
   * 사이드 메뉴 컨테이너
   */
  const renderLeftContainer = () => {
    return (
      <>
        <LeftContainer>
          <button
            style={{
              textAlign: "center",
              width: "50px",
              background: "transparent",
              border: "none",
            }}
            onClick={handleBackButton}
          >
            <ArrowRight />
          </button>
          <KeywordText>{keyword}</KeywordText>
          <YearSelect
            value={selectedYear}
            options={years}
            onChange={setSelectedYear}
          />
          <MenuList>
            {menus.map((item, index) => (
              <MenuItem>
                <div className="text">{item.title}</div>
                <div className="text">{item.num}</div>
                {isDelete && index !== 0 ? (
                  <DeleteIcon
                    width={"20px"}
                    style={{ position: "absolute", left: -10 }}
                    onClick={openDeleteModal}
                  />
                ) : null}
              </MenuItem>
            ))}
          </MenuList>
          {keyword && isDelete ? (
            <div
              className="edit-end"
              style={{ marginTop: "40px", marginLeft: "auto", padding: "5px" }}
              onClick={handleDelete}
            >
              완료
            </div>
          ) : (
            <img
              src={editIcon}
              alt="edit-icon"
              width={"32px"}
              style={{ marginTop: "40px", marginLeft: "auto" }}
              onClick={handleDelete}
            />
          )}
        </LeftContainer>
      </>
    );
  };

  /**
   * 콘텐츠 컨테이너 (질문선택 + 경험 리스트)
   */
  const renderContentContainer = () => {
    return (
      <ContentContainer>
        {/* 질문과 함께보기 컨테이너 */}
        <Accordion
          expanded={expanded}
          onChange={handleQuestionChange}
          sx={{
            background: theme.colors.main50,
            borderRadius: "12px",
            boxShadow: "none",
            "&:first-of-type": {
              borderRadius: "12px",
            },
            "&::before": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AccordionSummary
            // expandIcon={<ArrowDown />}
            aria-controls="basic-info"
            id="basic-info"
            sx={{
              "&.Mui-expanded": {
                minHeight: 0,
              },
              ".MuiAccordionSummary-content": {
                "&.Mui-expanded": {
                  margin: "12px 0px",
                },
              },
              minHeight: 0,
              borderRadius: "12px",
              background: theme.colors.main50,
            }}
          >
            <QuestionContainer>
              <CircleArrow />
              <QuestionSelect>
                <div className="label">질문과 함께보기</div>
              </QuestionSelect>
            </QuestionContainer>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0px 23px 20px 72px" }}>
            <Select
              value={selectedQ}
              options={questions.map((item) => item.question)}
              onChange={(e) => setSelectedQ(Number(e.target.value))}
            ></Select>{" "}
          </AccordionDetails>
        </Accordion>

        {/* 역량 키워드 선택 컨테이너 */}
        <KeywordSelect>
          <Options /> 역량 키워드
          <button aria-describedby={id} onClick={handleTagPopper}>
            {open ? <ArrowUpThin /> : <ArrowDownThin />}
          </button>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <TagPopperBox>
              <div className="top-container">
                <div className="tab-list">
                  <div className="tab-item">기본</div>
                  <div className="tab-item">MY</div>
                </div>
                <PopperPagination
                  postsNum={basicKeywords.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
              <div
                className="checkbox-list"
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {currentPosts.map((item) => (
                  <Checkbox label={item} />
                ))}
              </div>
              <div className="checkbox-num">
                총&nbsp;<div className="accent">{basicKeywords.length}개</div>의
                결과가 표시돼요
              </div>
            </TagPopperBox>
          </Popper>
        </KeywordSelect>
        {/* 경험 카드 리스트 */}
        <ExperienceList>
          {ExpData.map((post, index: number) => (
            <Experience
              id={post.id}
              key={index}
              title={post.title}
              tags={post.tags}
              maintag={post.mainTag}
              subtag={post.subTag}
              period={post.period}
              bookmark={post.bookmark}
              question={selectedQ}
              detail={post.detail}
            />
          ))}
        </ExperienceList>
      </ContentContainer>
    );
  };

  //
  //
  //
  return (
    <MainContainer>
      {renderLeftContainer()}
      {renderContentContainer()}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.neutral20};
`;

const LeftContainer = styled.div`
  border-radius: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 24px;
  width: 226px;
  height: 100%;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.neutral100};
`;

const KeywordText = styled.div`
  ${(props) => props.theme.fonts.headline3};
  color: ${(props) => props.theme.colors.neutral700};
  padding: 19px;
`;

const MenuList = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  width: 189px;
`;

const MenuItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 16px 29px;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.fonts.subtitle4};
  .text {
    color: ${(props) => props.theme.colors.neutral500};
  }
  &:hover {
    border-radius: 4px;
    background: #fff;
    .text {
      color: ${(props) => props.theme.colors.neutral700};
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px 40px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  border-radius: 12px;
  // padding: 10px 20px;
  background: ${(props) => props.theme.colors.main50};
`;

const QuestionSelect = styled.div`
  width: 100%;
  margin: 9px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .label {
    ${(props) => props.theme.fonts.subtitle4};
    color: ${(props) => props.theme.colors.main500};
  }
`;

const KeywordSelect = styled.div`
  margin-top: 28px;
  ${(props) => props.theme.fonts.cap1};
  color: ${(props) => props.theme.colors.neutral600};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  button {
    border: none;
    background: none;
  }
`;

const TagPopperBox = styled.div`
  display: flex;
  width: 355px;
  flex-direction: column;
  padding: 21px 22px 21px 20px;
  border-radius: 8px;
  border: 1px solid var(--main-200, #e5e6ff);
  background: #fff;
  gap: 25px;
  .top-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--neutral-50, #f7f7fb);
  }
  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => props.theme.fonts.body4};
    color: ${(props) => props.theme.colors.neutral500};
    width: 72px;
    height: 27px;
    flex-shrink: 0;
    &:hover {
      ${(props) => props.theme.fonts.subtitle5};
      color: ${(props) => props.theme.colors.neutral600};
      border-radius: 4px;
      background: var(--neutral-0, #fff);
    }
  }
  .checkbox-num {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    ${(props) => props.theme.fonts.cap2};
    color: ${(props) => props.theme.colors.neutral500};
    .accent {
      color: ${(props) => props.theme.colors.main500};
    }
  }
`;

const ExperienceList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
  ::-webkit-scrollbar-track {
  }
`;

export default KeywordTab;
