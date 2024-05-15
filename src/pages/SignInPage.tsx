import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

const SignInPage = () => {
  const handleKakoLogin = () => {
    Kakao.Auth.login({
      success: (auth: any) => {
        let accessToken = auth.access_token;
        console.log("kakao", accessToken);
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
            console.log(res);
            let accessToken = res.data.access_token;
            console.log("google", accessToken);
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
    <div className="page">
      <button onClick={handleKakoLogin}>카카오 로그인</button>
      <button onClick={handleGoogleLogin}>구글 로그인</button>
    </div>
  );
};

export default SignInPage;
