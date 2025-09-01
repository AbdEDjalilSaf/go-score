// export type ExamType = "full" | "partial"

// export interface ExamInfo {
//   quantitative: string
//   verbal: string
//   questionCount: number
//   expectedTime: string
// }

export interface ExamData {
  id: number
  name: string
  title: string,
  description: string,
  instructions:string,
  remainingAttempts: number
  examInfo: {
    quantitative: string
    verbal: string
    questionCount: number
    expectedTime: string
  }
  skills?: Skill[]
}

export interface Skill {
  id: number
  name: string
  category: "quantitative" | "verbal"
  selected: boolean
}

export type ExamType = "quantitative" | "verbal" | "mixed"

export interface StartTestRequest {
  skillIds: number[]
  count: number
}




export interface Choice {
  id: string
  value: string
}

export interface Question {
  id: string
  value: string
  answer: string
  skillId: number
  choices: Choice[]
}

export interface QuestionsApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: Question[]
}

// export interface ExamData {
//   id: number
//   name: string
//   remainingAttempts: number
//   examInfo: {
//     quantitative: string
//     verbal: string
//     questionCount: string
//     expectedTime: string
//   }
// }



export interface StartTestRequest {
  skillIds: number[]
  count: number
}

export interface StartTestResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: number
}



export interface ExamInfo {
  quantitative: string
  verbal: string
  questionCount: string
  expectedTime: string
}


