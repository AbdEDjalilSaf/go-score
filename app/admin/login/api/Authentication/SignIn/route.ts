import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const body = await request.json()
    const { email, password } = body

    // Check for the specific credentials
    if (email === "abde20303@gmail.com" && password === "Passw0rd#") {
      // Success response
      return NextResponse.json({
        meta: "Authentication successful",
        succeeded: true,
        message: "Login successful",
        errors: [],
        data: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFiZGUgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          firstName: "Abde",
          lastName: "User",
          whatsUpNumber: "+1234567890",
        },
      })
    } else {
      // Invalid credentials
      return NextResponse.json(
        {
          meta: "Authentication failed",
          succeeded: false,
          message: "Invalid credentials",
          errors: ["Invalid email or password"],
          data: {
            accessToken: "",
            firstName: "",
            lastName: "",
            whatsUpNumber: "",
          },
        },
        { status: 401 },
      )
    }
  } catch (error) {
    // Server error
    return NextResponse.json(
      {
        meta: "Server error",
        succeeded: false,
        message: "Internal server error",
        errors: ["An unexpected error occurred"],
        data: {
          accessToken: "",
          firstName: "",
          lastName: "",
          whatsUpNumber: "",
        },
      },
      { status: 500 },
    )
  }
}
