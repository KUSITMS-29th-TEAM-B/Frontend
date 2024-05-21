import { ApplyAPI, JobAPI } from "../../types/type";
import client from "../client";

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

export const jobpatch = async (job: JobAPI, jdId: string, token: string) => {
  return await client.patch(
    `/api/job-description/${jdId}`,
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

export const jobget = async (page: string, token: string) => {
  return await client.get(`/api/job-description?page=${page}&size=9`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const filteredjobget = async (
  page: string,
  writeStatus: string,
  sortType: string,
  token: string
) => {
  if (writeStatus !== "ALL") {
    return await client.get(
      `/api/job-description?page=${page}&size=9&writeStatus=${writeStatus}&sortType=${sortType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return await client.get(
      `/api/job-description?page=${page}&size=9&sortType=${sortType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

export const jobdelete = async (jdId: string, token: string) => {
  return await client.delete(`/api/job-description/${jdId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const jobdescriptionget = async (jdId: string, token: string) => {
  return await client.get(`/api/job-description/${jdId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const applypost = async (
  applyData: ApplyAPI[],
  token: string,
  jobId: string
) => {
  return await client.post(
    `/api/job-description/apply/${jobId}`,
    {
      contents: applyData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const applypatch = async (
  applyData: ApplyAPI[],
  token: string,
  jobId: string
) => {
  return await client.put(
    `/api/job-description/apply/${jobId}`,
    {
      contents: applyData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const applyget = async (jobId: string, token: string) => {
  return await client.get(`/api/job-description/apply/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const statuspatch = async (jobId: string, token: string) => {
  return await client.patch(
    `/api/job-description/status/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
