import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import backgroundImg from "../assets/images/background2.png";
import { AirplaneWindow, Bubble, GoogleIcon, KakaoIcon } from "../assets";
import logoImg from "../assets/images/logo.png";
import { login } from "../services/user";
import { useRecoilState } from "recoil";
import { userInfo } from "../store/userInfo";
import { useNavigate } from "react-router-dom";
declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

const SignInPage = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const navigate = useNavigate();

  const handleKakoLogin = () => {
    Kakao.Auth.login({
      success: (auth: any) => {
        let accessToken = auth.access_token;
        login("KAKAO", accessToken)
          .then((res) => {
            console.log(res);
            if (res.data?.registrationToken) {
              setUser({
                ...userInfo,
                name: res.data.nickName,
                token: res.data.registrationToken,
              });
              navigate("/sign-up");
            } else {
              setUser({
                ...userInfo,
                name: res.data.nickName,
                token: res.data.accessToken,
              });
              navigate("/experience");
            }
          })
          .catch((err) => console.log(err));
      },
      fail: (error: any) => {
        alert(JSON.stringify(error));
      },
    });
  };

  // 구글 로그인
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      const getToken = async () => {
        const payload = {
          code: codeResponse.code,
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:3000",
          grant_type: "authorization_code",
        };
        axios
          .post("https://oauth2.googleapis.com/token", payload)
          .then((res) => {
            let accessToken = res.data.access_token;
            login("GOOGLE", accessToken)
              .then((res) => {
                console.log(res);
                if (res.data?.registrationToken) {
                  setUser({
                    ...userInfo,
                    name: res.data.nickName,
                    token: res.data.registrationToken,
                  });
                  navigate("/sign-up");
                } else {
                  setUser({
                    ...userInfo,
                    name: res.data.nickName,
                    token: res.data.accessToken,
                  });
                  navigate("/experience");
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      };
      return getToken();
    },
    flow: "auth-code",
  });

  return (
    <MainContainer>
      <ContentContainer>
        <Line>
          <Bubble style={{ position: "absolute", top: "-100px", left: "0%" }} />
          <AirplaneWindow
            style={{ position: "absolute", top: "-200px", left: "25%" }}
          />
          <LoginButtonContainer>
            <img src={logoImg} alt="logo" width="100px" />
            <div className="description">
              '나'를 알아가는 <span className="accent">여정</span>을
              시작해보세요!
            </div>
            <div className="buttons">
              <LoginButton className="kakao" onClick={handleKakoLogin}>
                <KakaoIcon />
                <div className="label">카카오 계정으로 계속하기</div>
              </LoginButton>
              <LoginButton className="google" onClick={handleGoogleLogin}>
                <GoogleIcon />
                <div className="label">Google 계정으로 계속하기</div>
              </LoginButton>
            </div>
          </LoginButtonContainer>
        </Line>
      </ContentContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding-top: 6.125rem;
  width: 100vw;
  height: 100vh;
  background: url(${backgroundImg});
  background-size: cover;
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Line = styled.div`
  width: 70%;
  height: 4px;
  background-color: grey;
  position: relative;
  top: 45%;
  display: flex;
  flex-direction: row;
  background-color: var(--sub-secondary-300, #c2ccff);
`;

const LoginButtonContainer = styled.div`
  width: 480px;
  height: 336px;
  position: absolute;
  left: 100%;
  transform: translate(-50%, -50%);
  padding: 40px 44px;
  border-radius: 14px;
  border: 4px solid var(--sub-secondary-300, #c2ccff);
  background: var(--main-bg, #fafaff);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  ${(props) => props.theme.fonts.title4};
  .description {
    color: ${(props) => props.theme.colors.neutral600};
  }
  .accent {
    color: ${(props) => props.theme.colors.main500};
  }
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px;
  gap: 18px;
  border-radius: 12px;
  .label {
    ${(props) => props.theme.fonts.subtitle3};
  }
  &.kakao {
    background: #fee500;
    border: none;
  }
  &.google {
    border: 1px solid var(--neutral-300, #eaebf3);
    background: var(--neutral-0, #fff);
  }
`;

export default SignInPage;
