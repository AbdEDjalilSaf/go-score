export interface ApiResponse<T = any> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

export interface UpdateStudentRequest {
  firstName: string
  lastName: string
  whatsUpNumber: string
}

export interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  whatsUpNumber: string
}
