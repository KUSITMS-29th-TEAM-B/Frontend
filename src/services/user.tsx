import { RegisterDataType, UserDataType } from "../types/user";
import client from "./client";

// 로그인
export const login = async (loginType: string, accessToken: string) => {
  return await client.post(`/api/auth/login/${loginType}`, {
    accessToken: accessToken,
  });
};

// 로그아웃
export const logout = async (token: string, refreshToken: string) => {
  return await client.delete(`/api/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
      RefreshToken: `Bearer ${refreshToken}`,
      withCredentials: true,
    },
  });
};

// 회원가입
export const register = async ({
  registrationToken,
  profileImgUrl,
  provider,
  nickName,
  jobSearchStatus,
  desiredJob,
  goal,
  dream,
}: RegisterDataType) => {
  return await client.post(`/api/user/register`, {
    registrationToken: registrationToken,
    profileImgUrl: profileImgUrl,
    provider: provider,
    nickName: nickName,
    jobSearchStatus: jobSearchStatus,
    desiredJob: desiredJob,
    goal: goal,
    dream: dream,
  });
};

// 사용자 정보 조회
export const getUserInfo = async (token: string) => {
  return await client.get(`/api/user/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });
};

// 사용자 정보 수정
export const patchUserInfo = async (
  {
    profileImgUrl,
    nickName,
    jobSearchStatus,
    desiredJob,
    goal,
    dream,
  }: Omit<UserDataType, "provider" | "email">,
  token: string
) => {
  return await client.patch(
    `/api/user/user-info-update`,
    {
      profileImgUrl: profileImgUrl,
      nickName: nickName,
      jobSearchStatus: jobSearchStatus,
      desiredJob: desiredJob,
      goal: goal,
      dream: dream,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    }
  );
};
