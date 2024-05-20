import client from "../client";

// 상위 태그 조회
export const getPrimeTags = async (token: string) => {
  return await client.get(`/api/tags/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 하위 태그 조회
export const getSubTags = async (primeTagId: string, token: string) => {
  return await client.get(`/api/tags/my/${primeTagId}`, {
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

// 연도 내 상위 태그 조회
export const getYearPrimeTags = async (
  year: number,
  limit: number,
  token: string
) => {
  return await client.get(`/api/tags/top-rank?year=${year}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 상위 태그 내 연도 목록 조회
export const getPrimeTagYears = async (primeTagId: string, token: string) => {
  return await client.get(`/api/tags/${primeTagId}/all-years`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 상위 태그 내 하위 태그 목록 조회
export const getPrimeTagSubTags = async (year: number, primeTagId: string, token: string) => {
  return await client.get(`/api/tags/${primeTagId}?year=${year}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
