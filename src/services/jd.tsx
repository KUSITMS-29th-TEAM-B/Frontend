import { JobAPI } from "../types/type";
import client from "./client";

export const jobpost = async (job: JobAPI, token: string) => {
  return await client.post(
    `/api/job-description`,
    {
      enterpriseName: job.enterpriseName,
      title: job.title,
      content: job.content,
      link: job.link,
      startedAt: job.startAt,
      endedAt: job.endedAt,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
