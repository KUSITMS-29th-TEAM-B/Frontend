import { useQuery } from "@tanstack/react-query";
import { getPrimeTagSubTags } from "../services/Experience/tagApi";
import { TagMenuType } from "../types/experience";
import { AxiosError, AxiosResponse } from "axios";

interface PrimeTagSubTagsResType {
  totalExperienceCount: number;
  tagInfos: TagMenuType[];
}

export const useSubTagsQuery = (
  year: number | null,
  primeTagId: string | undefined,
  token: string
) => {
  const queryKey = ["primeTagSubTags", year, primeTagId, token];

  const queryFn = async (): Promise<PrimeTagSubTagsResType> => {
    if (year && primeTagId && token) {
      const response: AxiosResponse<PrimeTagSubTagsResType> =
        await getPrimeTagSubTags(year, primeTagId, token);
      return response.data;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    PrimeTagSubTagsResType,
    AxiosError
  >({
    queryKey,
    queryFn,
    enabled: !!(year && primeTagId && token),
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
