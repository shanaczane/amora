import { createServerSupabaseClient } from "@/app/lib/supabase/server";
import { getUserLetters } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { signOut } from "@/app/lib/auth/actions";
import Link from "next/link";
import ShareButton from "@/app/components/letter/ShareButton";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const letters = await getUserLetters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">Amora</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Letters</h2>
            <p className="text-gray-600 mt-1">Welcome back, {user.email}! 💕</p>
          </div>
          <Link
            href="/create"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition duration-200 shadow-lg"
          >
            + Create New Letter
          </Link>
        </div>

        {/* Letters Grid */}
        {letters.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">💌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No letters yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first letter and share it with someone special!
            </p>
            <Link
              href="/create"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition duration-200"
            >
              Create Your First Letter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {letters.map((letter) => (
              <div
                key={letter.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <Link href={`/letter/${letter.id}`} className="block">
                  <div
                    className="p-6 h-48 flex flex-col justify-between"
                    style={{ backgroundColor: letter.background_color }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-4xl">{letter.icon}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(letter.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      {letter.title && (
                        <h3
                          className="font-semibold text-lg mb-2 truncate"
                          style={{ color: letter.text_color }}
                        >
                          {letter.title}
                        </h3>
                      )}
                      <p
                        className="text-sm line-clamp-3"
                        style={{ color: letter.text_color }}
                      >
                        {letter.content}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                  <Link
                    href={`/edit/${letter.id}`}
                    className="text-sm text-gray-600 hover:text-pink-600 transition"
                  >
                    Edit letter
                  </Link>
                  <ShareButton letterId={letter.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
