import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TicketContainer from "../assets/images/ticketContainer.svg";
import TicketContent from "../assets/images/ticketContent.svg";
import { GoogleIcon, KakaoIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../services/cookie";
import { getUserInfo } from "../services/user";
import { UserDataType } from "../types/user";
import PlaneLoading from "../components/common/Loading";

interface UserDetail {
  question: string;
  answer: string;
}

const ProfilePage = () => {
  const nav = useNavigate();
  const user = getCookie("user");
  const [userData, setUserData] = React.useState<UserDataType>();
  const userDetailList: UserDetail[] = [
    {
      question: "구직활동 여부",
      answer: userData?.jobSearchStatus || "",
    },
    {
      question: "희망 직무",
      answer: userData?.desiredJob || "",
    },
    {
      question: "역량 탐색",
      answer: userData?.goal || "",
    },
    {
      question: "꿈",
      answer: userData?.dream || "",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);

  const handlelogout = () => {
    removeCookie("user");
    nav(`/sign-in`);
  };

  useEffect(() => {
    if (user?.token) {
      getUserInfo(user?.token).then((res) => {
        console.log(res);
        setUserData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StyledContainer isLoading={isLoading} className="page">
        <Title>마이페이지</Title>
        <TicketWrapper>
          <img src={TicketContainer} alt="ticketContainer" />
          <LogoutWrapper onClick={handlelogout}>로그아웃</LogoutWrapper>
          <ProfileWrapper>
            <div className="profile_username">{userData?.nickName}</div>
            <div className="profile_email">
              {userData?.provider === "GOOGLE" ? <GoogleIcon /> : <KakaoIcon />}
              {userData?.email}
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
      {isLoading && (
        <LoadingContainer>
          <PlaneLoading />
        </LoadingContainer>
      )}
    </>
  );
};

export default ProfilePage;

const StyledContainer = styled.div<{ isLoading: boolean }>`
  display: ${(props) => (props.isLoading ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 15%;
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
  .profile_username {
    ${(props) => props.theme.fonts.title3};
  }
  .profile_email {
    display: flex;
    gap: 0.3rem;
    ${(props) => props.theme.fonts.cap3};
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    align-items: center;
  }
  .profile_edit_btn {
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
