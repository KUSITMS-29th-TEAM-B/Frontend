import { useQuery } from "@tanstack/react-query";
import { TagType } from "../types/experience";
import { AxiosError, AxiosResponse } from "axios";
import { getExperienceYears } from "../services/Experience/experienceApi";

interface ExperienceYearsResType {
  years: number[];
  yearTagInfos: { year: number; tags: TagType[] }[];
}

export const useExperienceYearsQuery = (token: string) => {
  const queryKey = ["experienceYears", token];

  const queryFn = async (): Promise<ExperienceYearsResType> => {
    if (token) {
      const response: AxiosResponse<ExperienceYearsResType> =
        await getExperienceYears(token);
      return response.data;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    ExperienceYearsResType,
    AxiosError
  >({
    queryKey,
    queryFn,
    enabled: !!token,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
