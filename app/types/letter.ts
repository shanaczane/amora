export interface Letter {
  id: string
  user_id: string
  title?: string
  content: string
  background_color: string
  text_color: string
  icon: string
  created_at: string
  updated_at: string
}

export interface CreateLetterData {
  title?: string
  content: string
  background_color?: string
  text_color?: string
  icon?: string
}