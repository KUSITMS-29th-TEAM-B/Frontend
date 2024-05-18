import { RegisterDataType } from "../types/user";
import client from "./client";

// 로그인
export const login = async (loginType: string, accessToken: string) => {
  return await client.post(`/api/auth/login/${loginType}`, {
    accessToken: accessToken,
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
