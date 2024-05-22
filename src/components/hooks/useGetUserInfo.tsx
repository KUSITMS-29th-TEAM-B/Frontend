import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UserDataType } from "../../types/user";
import { getUserInfo } from "../../services/user";

export const useGetUserInfo = (token: string) => {
  const queryKey = ["userInfo", token];

  const queryFn = async (): Promise<UserDataType> => {
    if (token) {
      const response: AxiosResponse<UserDataType> = await getUserInfo(token);
      return response.data;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    UserDataType,
    AxiosError
  >({
    queryKey,
    queryFn,
    enabled: !!token,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
