import { ReactNode } from 'react'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='block'>
			<Header />
			
			<main className='content'>{children}</main>
			
			<Footer />
		</div>
	)
}
