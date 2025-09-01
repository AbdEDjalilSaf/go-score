export interface Assessment {
  category: string;
  questions: number;
  answers: number;
  timeAvg: string;
  timeTotal: string;
  evaluation: string;
  locked?: boolean;
}

export interface AssessmentSection {
  title: string;
  color: string;
  assessments: Assessment[];
  totalQuestions: number;
  totalAnswers: number;
  participants: number;
}

export interface SkillApiResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: {
    id: number;
    value: string;
    testClassId: number;
  }[];
}