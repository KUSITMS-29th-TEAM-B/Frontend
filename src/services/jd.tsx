import { ApplyAPI, JobAPI } from "../types/type";
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

export const applypost = async (
  applyData: ApplyAPI[],
  token: string,
  jobId: string
) => {
  return await client.post(
    `/api/job-description/apply/${jobId}`,
    {
      content: applyData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
