export type TComment = {
  Id: number;
  content: string;
  createdAt: string;
};

export enum RecruitmentStatus {
  NotStarted = "작성전",
  InProgress = "작성중",
  Completed = "작성완료",
  End = "마감",
}

export interface JobAnnouncement {
  id: number;
  title: string;
  description: string;
  dday: number;
  recruitmentPeriod: string;
  status: RecruitmentStatus;
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
