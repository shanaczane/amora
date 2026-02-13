import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { Letter, CreateLetterData } from '@/app/types/letter'

export async function createLetter(data: CreateLetterData) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: letter, error } = await supabase
    .from('letters')
    .insert({
      user_id: user.id,
      ...data,
    })
    .select()
    .single()

  if (error) throw error
  return letter as Letter
}

export async function getUserLetters() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: letters, error } = await supabase
    .from('letters')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return letters as Letter[]
}

export async function getLetterById(id: string) {
  const supabase = await createServerSupabaseClient()

  const { data: letter, error } = await supabase
    .from('letters')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return letter as Letter
}

export async function updateLetter(id: string, data: Partial<CreateLetterData>) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: letter, error } = await supabase
    .from('letters')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return letter as Letter
}

export async function deleteLetter(id: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('letters')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
}