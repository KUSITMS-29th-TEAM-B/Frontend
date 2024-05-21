import client from "../client";

// 태그 리스트 전체 조회
export const getAllTags = async (token: string) => {
  return await client.get(`/api/tags/all-tags`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
