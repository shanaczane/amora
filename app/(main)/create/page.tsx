import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import LetterEditor from '@/app/components/letter/LetterEditor'

export default async function CreatePage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LetterEditor />
      </div>
    </div>
  )
}