export interface QuestionType {
  question: string;
  answer: string;
}

export interface ExperienceType {
  title: string;
  parentTagId: string;
  childTagId: string;
  strongPointIds: string[];
  contents: QuestionType[];
  startedAt: string;
  endedAt: string;
}

export interface ExperienceDetailType extends ExperienceType {
  id: string;
  title: string;
  parentTag: TagType;
  childTag: TagType;
  strongPoints: KeywordType[];
  contents: QuestionType[];
  startedAt: string;
  endedAt: string;
}

export interface KeywordType {
  id: string;
  name: string;
}

export interface TagType {
  id: string;
  name: string;
}

export interface TagMenuType extends TagType {
  experienceCount: number;
}

export interface YearData {
  year: number;
  tags: TagType[];
}

export interface PrimeTagData {
  id: string;
  name: string;
  strongPointCount: number;
  experienceCount: number;
}
