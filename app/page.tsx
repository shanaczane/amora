import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If logged in → go to dashboard
  // If not logged in → go to signup
  if (user) {
    redirect('/dashboard')
  } else {
    redirect('/signup')
  }
}