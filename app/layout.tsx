import type { Metadata } from 'next'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ProgressBarProvider } from '@/providers/ProgressBarProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { Layout } from '@/components/layout'

import './styles/globals.scss'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic']
})

const montserrat_alternates = Montserrat_Alternates({
	variable: '--font-montserrat-alternates',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
	title: {
		default: 'management',
		template: '%s | management'
	},
	description: 'Management system',
	robots: {
		index: false,
		follow: false
	}
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable} ${montserrat_alternates.variable}`}>
				<ProgressBarProvider />
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<Layout>{children}</Layout>
					<ToastProvider />
				</ThemeProvider>
			</body>
		</html>
	)
}
