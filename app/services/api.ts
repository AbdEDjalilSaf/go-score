const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"

export class ApiService {
  private static async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`

    const defaultHeaders = {
      "Content-Type": "application/json",
      // Add authorization header if needed
      // 'Authorization': `Bearer ${getToken()}`
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  static async updateStudent(data: {
    firstName: string
    lastName: string
    whatsUpNumber: string
  }) {
    return this.makeRequest<{
      meta: string
      succeeded: boolean
      message: string
      errors: string[]
      data: string
    }>("/api/Student/Update", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}
