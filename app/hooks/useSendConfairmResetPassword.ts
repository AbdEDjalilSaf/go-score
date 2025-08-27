"use client"

import { useState } from "react"
import { sendConfairmResetPassword } from "@/app/api/auth"

// Define the response type
interface SendConfirmResetPasswordResponse {
  succeeded: boolean
  data?: {
    message?: string
    expiresIn?: number
  }
  error?: string
}

export const useSendConfirmResetPassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)

  const sendResetCode = async (email: string): Promise<void> => {
    setError(null)
    setLoading(true)
    setSent(false)

    console.log("sendResetCode started", email)

    try {
      const {
        succeeded,
        data,
        error: sendCodeError,
      }: SendConfirmResetPasswordResponse = await sendConfairmResetPassword(email)

      if (succeeded && data) {
        setSent(true)
        // Optionally redirect to reset password page or show succeeded message
      } else {
        setError(sendCodeError || "Failed to send reset password code")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { sendResetCode, error, loading, sent }
}
