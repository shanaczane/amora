import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/lib/auth/actions'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Welcome, {user.email}! 💕</p>
          
          <form action={signOut}>
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}