"use client"

import { useState } from "react"
// import { useRouter } from "next/navigation"
import { sendConfirmCode } from "@/app/api/auth"

// Define the response type from sendConfirmationCode function
interface ConfirmCodeResponse {
  succeeded: boolean
  data?: {
    message?: string
    expiresIn?: number
  }
  error?: string
}

export const useSendConfirmCode = () => {
//   const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)

  const sendCode = async (email: string): Promise<void> => {
    setError(null)
    setLoading(true)  
    setSent(false)

    console.log("sendCode started",  email );

    try {
      const { succeeded, data, error: sendCodeError }: ConfirmCodeResponse = await sendConfirmCode( email );
      console.log("Form submission started", succeeded);

      if (succeeded && data) {
        setSent(true)
        // Optionally redirect or just stay on the same page
      } else {
        setError(sendCodeError || "Failed to send confirmation code")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { sendCode, error, loading, sent }
}

