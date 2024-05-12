export type TComment = {
  Id: number;
  content: string;
  createdAt: string;
};

export enum RecruitmentStatus {
  NotStarted = "작성전",
  InProgress = "작성중",
  Completed = "작성완료",
  ApplicationsClosed = "지원완료",
  End = "마감",
}

export interface JobAnnouncement {
  title: string;
  description: string;
  dday: number;
  recruitmentPeriod: string;
  status: RecruitmentStatus;
}
