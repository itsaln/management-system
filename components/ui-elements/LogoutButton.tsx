'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const LogoutButton = () => {
	const supabase = createClient()
	const router = useRouter()

	const logout = async () => {
		await supabase.auth.signOut()
		router.push('/auth')
	}

	return <button onClick={logout} className='font-medium text-danger uppercase'>Logout</button>
}
