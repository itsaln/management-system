import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')

	if (!code) {
		return NextResponse.redirect(`${origin}/auth`)
	}

	const supabase = await createClient()

	const { error } = await supabase.auth.exchangeCodeForSession(code)

	if (error) {
		console.error('Auth callback error:', error.message)
		return NextResponse.redirect(`${origin}/auth`)
	}

	// после подтверждения ведём в dashboard
	return NextResponse.redirect(`${origin}/dashboard`)
}
