import client from "../client";

// 경험 목록 조회
export const getAllExperienceList = async (token: string) => {
  return await client.get(`/api/experiences`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
