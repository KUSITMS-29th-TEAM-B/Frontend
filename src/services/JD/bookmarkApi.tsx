import client from "../client";

export const bookmarkpatch = async (
  token: string,
  jobId: string,
  expId: string
) => {
  return await client.patch(
    `/api/bookmark/${jobId}/${expId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
