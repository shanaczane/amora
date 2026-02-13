import { getLetterById } from '@/app/lib/db'
import { notFound } from 'next/navigation'
import LetterAnimation from '@/app/components/letter/LetterAnimation'

export default async function LetterViewPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  let letter

  try {
    const { id } = await params  // ← await params!
    letter = await getLetterById(id)

    if (!letter) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <LetterAnimation letter={letter} />
    </div>
  )
}