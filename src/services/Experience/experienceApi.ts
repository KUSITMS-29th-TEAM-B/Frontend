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

// 경험 수정
export const patchExperience = async (
  expId: string,
  expData: ExperienceType,
  token: string
) => {
  return await client.patch(`/api/experiences/${expId}}`, expData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
