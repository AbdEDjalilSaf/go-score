"use client"

import { useState, useEffect } from "react"
import { getQuestionsCountPossible } from "../utils/api"

interface UseQuestionsCountResult {
  count: number
  loading: boolean
  error: string | null
  refetch: (skills: number[]) => Promise<void>
}

export function useQuestionsCount(initialSkills: number[] = []): UseQuestionsCountResult {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCount = async (skills: number[]) => {
    if (skills.length === 0) {
      setCount(0)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await getQuestionsCountPossible(skills)
      setCount(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch questions count"
      setError(errorMessage)
      setCount(0)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async (skills: number[]) => {
    await fetchCount(skills)
  }

  useEffect(() => {
    if (initialSkills.length > 0) {
      fetchCount(initialSkills)
    }
  }, []) // Only run on mount

  return {
    count,
    loading,
    error,
    refetch,
  }
}
