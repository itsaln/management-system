'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export const ToastProvider = () => {
	const { theme } = useTheme()
	
	return (
		<Toaster
			position='top-center'
			reverseOrder={false}
			toastOptions={{
				duration: 4000,
				style: {
					background: theme === 'dark' ? '#222' : '#fff',
					color: theme === 'dark' ? '#fff' : '#222',
					borderRadius: '12px'
				}
			}}
		/>
	)
}
