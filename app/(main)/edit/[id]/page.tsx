import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { getLetterById } from '@/app/lib/db'
import { redirect, notFound } from 'next/navigation'
import LetterEditEditor from '@/app/components/letter/LetterEditEditor'

export default async function EditLetterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params

  let letter
  try {
    letter = await getLetterById(id)

    if (!letter || letter.user_id !== user.id) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 to-purple-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LetterEditEditor letter={letter} />
      </div>
    </div>
  )
}