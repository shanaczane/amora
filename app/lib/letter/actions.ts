'use server'

import { createLetter, updateLetter, deleteLetter } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createLetterAction(formData: FormData) {
  const content = formData.get('content') as string
  const title = formData.get('title') as string
  const backgroundColor = formData.get('background_color') as string
  const textColor = formData.get('text_color') as string
  const icon = formData.get('icon') as string

  try {
    const letter = await createLetter({
      content,
      title: title || undefined,
      background_color: backgroundColor || '#fff5f7',
      text_color: textColor || '#1f2937',
      icon: icon || '💕',
    })

    revalidatePath('/dashboard')
    return { success: true, id: letter.id }  
  } catch (error) {
    console.error('Error creating letter:', error)
    return { error: 'Failed to create letter' }
  }
}

export async function updateLetterAction(id: string, formData: FormData) {
  const content = formData.get('content') as string
  const title = formData.get('title') as string
  const backgroundColor = formData.get('background_color') as string
  const textColor = formData.get('text_color') as string
  const icon = formData.get('icon') as string

  try {
    await updateLetter(id, {
      content,
      title: title || undefined,
      background_color: backgroundColor,
      text_color: textColor,
      icon,
    })

    revalidatePath('/dashboard')
    revalidatePath(`/letter/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating letter:', error)
    return { error: 'Failed to update letter' }
  }
}

export async function deleteLetterAction(id: string) {
  try {
    await deleteLetter(id)
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error deleting letter:', error)
    return { error: 'Failed to delete letter' }
  }
}