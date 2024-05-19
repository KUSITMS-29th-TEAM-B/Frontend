import client from "../client";

// 상위 태그 조회
export const getPrimeTags = async (token: string) => {
  return await client.get(`/api/tags`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 하위 태그 조회
export const getSubTags = async (primeTagId: string, token: string) => {
  return await client.get(`/api/tags/${primeTagId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 상위 태그 등록
export const postPrimeTag = async (name: string, token: string) => {
  return await client.post(
    `/api/tags`,
    {
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 하위 태그 등록
export const postSubTag = async (
  primeTagId: string,
  name: string,
  token: string
) => {
  return await client.post(
    `/api/tags/${primeTagId}`,
    {
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
