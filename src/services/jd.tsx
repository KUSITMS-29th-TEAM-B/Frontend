import client from "./client";

export const jobpost = async (
  enterpriseName: string,
  title: string,
  content: string,
  link: string,
  startAt: Date,
  endedAt: Date
) => {
  return await client.post(`/api/job-description`, {
    enterpriseName: enterpriseName,
    title: title,
    content: content,
    link: link,
    startedAt: startAt,
    endedAt: endedAt,
  });
};
