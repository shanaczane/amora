import { getLetterById } from '@/app/lib/db'
import { notFound } from 'next/navigation'
import LetterAnimation from '@/app/components/letter/LetterAnimation'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export default async function LetterViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  let letter
  try {
    letter = await getLetterById(id)

    if (!letter) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <LetterAnimation letter={letter} isLoggedIn={!!user} />
    </div>
  )
}