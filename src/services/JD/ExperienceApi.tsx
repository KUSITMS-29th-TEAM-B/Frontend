import client from "../client";

// 북마크 된 경험 목록 조회
export const getAllExperienceList = async (jdId: string, token: string) => {
  return await client.get(`/api/experiences/bookmark/${jdId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 목록 검색 - 텍스트 검색
export const searchTextExperienceList = async (
  jdId: string,
  searchText: string,
  token: string
) => {
  return await client.get(
    `/api/experiences/bookmark/${jdId}?search=${searchText}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 경험 목록 검색 - 태그필터링
export const searchTagExperienceList = async (
  jdId: string,
  parentTag: string,
  childTag: string | null,
  token: string
) => {
  if (childTag) {
    return await client.get(
      `/api/experiences/bookmark/${jdId}?parent-tag=${parentTag}&child-tag=${childTag}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return await client.get(
      `/api/experiences/bookmark/${jdId}?parent-tag=${parentTag}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
