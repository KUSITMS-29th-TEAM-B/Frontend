import { ExperienceType } from "../../types/experience";
import client from "../client";

// 경험 등록
export const postExperience = async (
  expData: ExperienceType,
  token: string
) => {
  return await client.post(`/api/experiences`, expData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 상세 조회
export const getExperience = async (expId: string, token: string) => {
  return await client.get(`/api/experiences/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 수정
export const patchExperience = async (
  expId: string,
  expData: ExperienceType,
  token: string
) => {
  return await client.patch(`/api/experiences/${expId}`, expData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 삭제
export const deleteExperience = async (expId: string, token: string) => {
  return await client.delete(`/api/experiences/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
