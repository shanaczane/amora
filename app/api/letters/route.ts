import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Promise
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { id } = await params  // ← await params!

    const { data: letter, error } = await supabase
      .from('letters')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !letter) {
      return NextResponse.json({ error: 'Letter not found' }, { status: 404 })
    }

    return NextResponse.json(letter)
  } catch (error) {
    console.error('Error fetching letter:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Promise
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params  // ← await params!
    const body = await request.json()

    const { data: letter, error } = await supabase
      .from('letters')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error || !letter) {
      return NextResponse.json({ error: 'Failed to update letter' }, { status: 500 })
    }

    return NextResponse.json(letter)
  } catch (error) {
    console.error('Error updating letter:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Promise
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params  // ← await params!

    const { error } = await supabase
      .from('letters')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: 'Failed to delete letter' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting letter:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}