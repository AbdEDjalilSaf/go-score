export type ExamType = "full" | "partial"

export interface ExamInfo {
  quantitative: string
  verbal: string
  questionCount: number
  expectedTime: string
}

export interface ExamData {
  title: string
  description: string
  instructions: string
  remainingAttempts: number
  examInfo: ExamInfo
}
