import React from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

const MyPage = () => {
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
  return (
    <div className="page">
      <button onClick={handleKakoLogin}>카카오 로그인</button>
    </div>
  );
};

export default MyPage;
