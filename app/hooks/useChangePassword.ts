"use client"

import { useState } from "react"

// Define the response type from changePassword function
interface ChangePasswordResponse {
  succeeded: boolean
  data?: {
    message?: string
  }
  error?: string
}

// Assuming this function exists or will be created in your API
import { changePassword } from "@/app/api/auth"

export const useChangePassword = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    setError(null)
    setLoading(true)
    setChanged(false)

    console.log("updatePassword started", "oldPassword and newPassword provided")

    try {
      const {
        succeeded,
        data,
        error: changePasswordError,
      }: ChangePasswordResponse = await changePassword(oldPassword, newPassword)

      if (succeeded && data) {
        setChanged(true)
        // Optionally redirect or show succeeded message
      } else {
        setError(changePasswordError || "Failed to change password")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { updatePassword, error, loading, changed }
}
