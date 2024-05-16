import client from "./client";

// 카카오 로그인
export const login = async (loginType: string, accessToken: string) => {
  return await client.post(`/api/auth/login/${loginType}`, {
    accessToken: accessToken,
  });
};
