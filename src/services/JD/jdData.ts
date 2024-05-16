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
    id: 4,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.Completed,
    dday: 0,
  },
  {
    id: 5,
    title: "백엔드 개발자 채용",
    description: "Node.js 및 데이터베이스 경험 필수",
    recruitmentPeriod: "2024-05-10 ~ 2024-07-01",
    status: RecruitmentStatus.End,
    dday: -1,
  },
  {
    id: 6,
    title: "UI/UX 디자이너 모집",
    description: "실무 경험 및 포트폴리오 제출 필수",
    recruitmentPeriod: "2024-04-20 ~ 2024-05-20",
    status: RecruitmentStatus.Completed,
    dday: 10,
  },
  {
    id: 7,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
  {
    id: 8,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
  {
    id: 9,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.NotStarted,
    dday: 10,
  },
];

//더미데이터 공고 상세
export const jobDetails: Job[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 채용",
    description: "React 및 TypeScript 경험자 우대",
    recruitmentPeriod: "2024-05-01 ~ 2024-06-01",
    status: RecruitmentStatus.End,
    dday: 11,
    link: "https://www.linkedin.com/jobs/search/?currentJobId=3879331284",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>
     <div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>
     <div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>
     <div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 2,
    title: "백엔드 개발자 채용",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 3,
    title: "백엔드 개발자 채용3",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 4,
    title: "백엔드 개발자 채용4",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 5,
    title: "백엔드 개발자 채용5",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 6,
    title: "백엔드 개발자 채용6",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 7,
    title: "백엔드 개발자 채용7",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 8,
    title: "백엔드 개발자 채용8",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
  {
    id: 9,
    title: "백엔드 개발자 채용9",
    description: "Node.js 경험자",
    recruitmentPeriod: "2024-05-10 ~ 2024-06-10",
    status: RecruitmentStatus.Completed,
    dday: 30,
    link: "https://www.naver.com/",
    date: "2013.01.10",
    content: `<div>
    <h2>Job Description</h2>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
    <h1>Job Description</h1>
    <p>
      We are looking for a talented frontend developer to join our team. The
      ideal candidate should have experience with HTML, CSS, JavaScript, and
      modern frontend frameworks such as React.
    </p>
     </div>`,
  },
];

export const ExpCase = [
  {
    id: 1,
    upper: "큐시즘",
    lower: ["기업프로젝트", "해커톤"],
  },
  {
    id: 2,
    upper: "봉사",
    lower: ["교육봉사", "해외봉사"],
  },
  {
    id: 3,
    upper: "동아리",
    lower: ["동아리이름1", "동아리이름2", "동아리이름3"],
  },
  {
    id: 4,
    upper: "상위태그",
    lower: ["하위태그1", "하위태그1", "하위태그1"],
  },
];
