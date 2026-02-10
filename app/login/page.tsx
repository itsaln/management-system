'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
	const supabase = createClient()
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const signIn = async () => {
		await supabase.auth.signInWithPassword({ email, password })
		router.push('/dashboard')
	}

	const signUp = async () => {
		await supabase.auth.signUp({ email, password })
		alert('Check your email for confirmation')
	}

	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='flex w-80 flex-col gap-3'>
				<input
					className='border p-2'
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='border p-2'
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className='bg-black p-2 text-white' onClick={signIn}>
					Sign In
				</button>

				<button className='border p-2' onClick={signUp}>
					Sign Up
				</button>
			</div>
		</div>
	)
}
