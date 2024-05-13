import { Job, JobAnnouncement, RecruitmentStatus } from "../../types/type";

//더미데이터 공고 조회
export const jobAnnouncements: JobAnnouncement[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.End,
    dday: 11,
  },
  {
    id: 2,
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.InProgress,
    dday: 10,
  },
  {
    id: 3,
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.End,
    dday: 20,
  },
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.Completed,
    dday: 0,
  },
  {
    id: 1,
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.End,
    dday: -1,
  },
  {
    id: 1,
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.ApplicationsClosed,
    dday: 10,
  },
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
];

//더미데이터 공고 상세
const jobDetails: Job[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.End,
    dday: 11,
    content:
      "<p>우리 팀과 함께 혁신적인 프로젝트를 만들어 갈 프론트엔드 개발자를 찾습니다.</p>",
  },
  {
    id: 2,
    title: "백엔드 개발자 채용",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    content: "<p>고성능 백엔드 시스템 구축 경험이 있는 개발자를 찾습니다.</p>",
  },
];
