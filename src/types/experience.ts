export interface QuestionType {
  question: string;
  answer: string;
}

export interface ExperienceType {
  title: string;
  parentTagId: string;
  childTagId: string;
  strongPointIds: KeywordType[];
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
