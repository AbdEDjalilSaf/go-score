"use client"

import { useState } from "react"
import { resetForgottenPassword } from "@/app/api/auth"

// Define the response type
interface ResetForgottenPasswordResponse {
  succeeded: boolean
  data?: any
  error?: string
}

export const useResetForgottenPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [resetComplete, setResetComplete] = useState<boolean>(false)

  const resetPassword = async (email: string, newPassword: string, code: string): Promise<void> => {
    setError(null)
    setLoading(true)
    setResetComplete(false)

    console.log("resetPassword started", email, "code provided")

    try {
      const {
        succeeded,
        data,
        error: resetError,
      }: ResetForgottenPasswordResponse = await resetForgottenPassword(email, newPassword, code)

      if (succeeded && data) {
        setResetComplete(true)
        // Optionally redirect to login page or show succeeded message
      } else {
        setError(resetError || "Failed to reset password")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { resetPassword, error, loading, resetComplete }
}
