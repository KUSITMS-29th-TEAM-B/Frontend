// 공고에 대한 상태를 열거 타입으로 정의
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

export const jobAnnouncements: JobAnnouncement[] = [
  {
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.End,
    dday: 11,
  },
  {
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.InProgress,
    dday: 10,
  },
  {
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.ApplicationsClosed,
    dday: 10,
  },
  {
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.Completed,
    dday: 0,
  },
  {
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.End,
    dday: -1,
  },
  {
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.ApplicationsClosed,
    dday: 10,
  },
  {
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
  {
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.InProgress,
    dday: 10,
  },
  {
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.Completed,
    dday: 30,
  },
];
