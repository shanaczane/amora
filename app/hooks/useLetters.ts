'use client'

import { useState } from 'react'
import { Letter } from '@/app/types/letter'

export function useLetters() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createLetter = async (data: {
    title?: string
    content: string
    background_color?: string
    text_color?: string
    icon?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create letter')
      }

      const letter = await response.json()
      return letter as Letter
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateLetter = async (id: string, data: Partial<Letter>) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/letters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update letter')
      }

      const letter = await response.json()
      return letter as Letter
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteLetter = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/letters/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete letter')
      }

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createLetter,
    updateLetter,
    deleteLetter,
    loading,
    error,
  }
}