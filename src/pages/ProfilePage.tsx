import React, { useEffect } from "react";
import styled from "styled-components";
import TicketContainer from "../assets/images/ticketContainer.svg";
import TicketContent from "../assets/images/ticketContent.svg";
import { GoogleIcon, KakaoIcon } from "../assets";
import { useNavigate } from "react-router-dom";

interface UserDetail {
  question: string;
  answer: string;
}

const ProfilePage = () => {
  const username = "이효원";
  const useremail = "email@gmail.com";
  const userAccount: string = "kakao"; //or google
  const userDetailList: UserDetail[] = [
    {
      question: "구직활동 여부",
      answer:
        "직무공고를 탐색하고, 취업을 위한 적극적 구직 활동을 하고 있어요.",
    },
    {
      question: "희망 직무",
      answer: "서비스 기획자",
    },
    {
      question: "역량 탐색",
      answer:
        "프로젝트 경험은 많은데 실제로 사용자를 받아보거나 서비스를 운영해본 경험은 없다. 한 가지 프로젝트를 깊게 파보면서도 내가 가진 창의력과 아이디어를 최대한 활용해 마케팅이나 브랜딩으로 유저를 끌어모으는 경험을 해보고 싶다.",
    },
    {
      question: "꿈",
      answer:
        "난난꿈이있어요버려지고찢겨남루하여도그래요있어요 블라블라 오찌고 저쭈그",
    },
  ];
  const nav = useNavigate();

  const handlelogout = () => {
    console.log("/logout");
    nav("/");
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <StyledContainer className="page">
      <Title>마이페이지</Title>
      <TicketWrapper>
        <img src={TicketContainer} alt="ticketContainer" />
        <LogoutWrapper onClick={handlelogout}>로그아웃</LogoutWrapper>
        <ProfileWrapper>
          <div className="profile_username">{username}</div>
          <div className="profile_email">
            {userAccount === "google" ? <GoogleIcon /> : <KakaoIcon />}
            {useremail}
          </div>
          <div
            className="profile_edit_btn"
            onClick={() => nav("/profile/edit")}
          >
            프로필 수정
          </div>
        </ProfileWrapper>
      </TicketWrapper>
      <TicketWrapper>
        <img src={TicketContent} alt="ticketContainer" />
        <ContentWrapper>
          {userDetailList.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <SubTitle>{question}</SubTitle>
              <SubContent>{answer}</SubContent>
            </React.Fragment>
          ))}
        </ContentWrapper>
      </TicketWrapper>
    </StyledContainer>
  );
};

export default ProfilePage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.title1};
  color: ${(props) => props.theme.colors.neutral700};
  margin-bottom: 30px;
`;

const SubTitle = styled.div`
  ${(props) => props.theme.fonts.subtitle3};
  color: ${(props) => props.theme.colors.neutral700};
  margin-bottom: 1rem;
`;

const SubContent = styled.div`
  width: 25rem;
  ${(props) => props.theme.fonts.body3};
  color: ${(props) => props.theme.colors.neutral600};
  padding: 1rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.main200};
  margin-bottom: 1rem;
`;

const TicketWrapper = styled.div`
    position: relative;
`;

const LogoutWrapper = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    color: ${(props) => props.theme.colors.neutral500};
    ${(props) => props.theme.fonts.cap3};
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral500};
`;

const ProfileWrapper = styled.div`
    position: absolute;
    top: 35%; 
    right: 20%;
    flex-direction: column;
    display: flex; 
    color: ${(props) => props.theme.colors.neutral600};
    justify-content: center;
    align-items: center;
    .profile_username{
        ${(props) => props.theme.fonts.title3}; 
    }
    .profile_email{
        display: flex;
        gap: 0.3rem;
        ${(props) => props.theme.fonts.cap3}; 
        margin-bottom: 1rem;
        margin-top: 0.5rem;
        align-items: center;
    }
    .profile_edit_btn{
        display: inline-flex;
        padding: 0.375rem 0.75rem;
        gap: 0.625rem;
        border-radius: 0.5rem;
        color: ${(props) => props.theme.colors.neutral500};
        border: 1px solid ${(props) => props.theme.colors.neutral500};
    }
`;
const ContentWrapper = styled.div`
    position: absolute;
    top: 10%;
    left: 8%;
    flex-direction: column;
    display: flex; 
`;
