'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { validEmail } from '@/lib/regex'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Field, FieldGroup } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'

type FormModel = {
	email: string
	password: string
}

export default function AuthPage() {
	const supabase = createClient()
	const router = useRouter()

	const [mode, setMode] = useState<'login' | 'register'>('login')

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		reset
	} = useForm<FormModel>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FormModel> = async (data) => {
		const { email, password } = data

		if (mode === 'login') {
			const res = await supabase.auth.signInWithPassword({ email, password })
			if (res && res.error) {
				toast.error(res.error.message || 'Invalid email or password')
				return
			}
			router.push('/dashboard')
		} else if (mode === 'register') {
			const res = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`
				}
			})
			if (res.error) {
				toast.error(res.error.message || 'Registration failed')
				return
			}
			toast.success('Check your email for confirmation')
		}

		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mx-auto mt-3xl w-full max-w-[400px] rounded-lg bg-gray-100 p-xl'
		>
			<h3 className='mb-lg'>{mode === 'login' ? 'Sign in' : 'Sign up'}</h3>
			<FieldGroup className='gap-y-lg'>
				<Controller
					control={control}
					name={'email'}
					render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
						<Field>
							<Label>Email</Label>
							<Input ref={ref} value={value} onChange={onChange} placeholder='example@gmail.com' />
							{error?.message && (
								<div role='alert' className='text-sm text-danger'>
									{error.message}
								</div>
							)}
						</Field>
					)}
					rules={{
						required: 'Field is required',
						pattern: {
							value: validEmail,
							message: 'Email is invalid'
						}
					}}
				/>

				<Controller
					control={control}
					name={'password'}
					render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
						<Field>
							<Label>Password</Label>
							<Input ref={ref} value={value} onChange={onChange} type='password' />
							{error?.message && (
								<div role='alert' className='text-sm text-danger'>
									{error.message}
								</div>
							)}
						</Field>
					)}
					rules={{
						required: 'Field is required',
						minLength: {
							value: 6,
							message: 'Minimum 6 chapters'
						}
					}}
				/>
			</FieldGroup>

			<div className='mt-lg flex flex-nowrap items-center justify-between gap-x-md'>
				<Button type='submit' disabled={isSubmitting}>
					{mode === 'login' ? 'Sign in' : 'Sign up'}
				</Button>

				<button
					type='button'
					onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
					className='text-primary transition-opacity hover:opacity-70'
				>
					{mode === 'login' ? 'I have not account' : 'I have an account'}
				</button>
			</div>
		</form>
	)
}
