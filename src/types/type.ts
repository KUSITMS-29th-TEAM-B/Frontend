export type TComment = {
  Id: number;
  content: string;
  createdAt: string;
};

export enum RecruitmentStatus {
  NotStarted = "NOT_APPLIED",
  InProgress = "WRITING",
  Completed = "WRITTEN",
  End = "CLOSED",
}

export interface JobAnnouncement {
  id: number;
  title: string;
  description: string;
  dday: number;
  recruitmentPeriod: string;
  status: RecruitmentStatus;
  createdAt?: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  dday: number;
  recruitmentPeriod: string;
  date: string;
  link: string;
  status: RecruitmentStatus;
  content: string;
}

export interface Question {
  num: number;
  content: string;
}

export type TagType = {
  id: number;
  mainTag: string;
  subTag: string[];
};

//api 용

export type JobAPI = {
  enterpriseName: string;
  title: string;
  content: string;
  link: string;
  startAt: Date | null;
  endedAt: Date | null;
};

export type ApplyAPI = {
  question: string;
  answer: string;
};

export type JobDescriptionAPI = {
  enterpriseName: string;
  title: string;
  remainingDate: string;
  content: string;
  writeStatus: string;
  link: string;
  createdAt: string;
  startAt: Date | null;
  endedAt: Date | null;
};

export type ExperienceSimpleAPI = {
  id: string;
  title: string;
  strongPoints: [];
};
