import { type NextRequest,NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: (cookies) =>
					cookies.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
			}
		}
	)

	const {
		data: { user }
	} = await supabase.auth.getUser()

	const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
	const isProtectedPage =
		req.nextUrl.pathname.startsWith('/dashboard') ||
		req.nextUrl.pathname.startsWith('/orders') ||
		req.nextUrl.pathname.startsWith('/invoices')

	if (!user && isProtectedPage) {
		return NextResponse.redirect(new URL('/auth', req.url))
	}

	if (user && isAuthPage) {
		return NextResponse.redirect(new URL('/dashboard', req.url))
	}

	return res
}

export const config = {
	matcher: ['/dashboard/:path*', '/orders/:path*', '/invoices/:path*', '/auth']
}
