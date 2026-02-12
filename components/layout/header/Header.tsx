'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { menu } from './menu.data'

export const Header = () => {
	return (
		<>
			<header className='py-md'>
				<div className='container'>
					<div className='flex flex-nowrap items-center justify-between'>
						<Link href='/'>
							<Image src='/logo.svg' alt='Logo' width={120} height={54} />
						</Link>
						<nav>
							<ul className='flex flex-wrap items-center gap-x-2xl'>
								{menu.map((item, index) => (
									<li key={`${item.link}_${index}`}>
										<Link href={item.link}>{item.name}</Link>
									</li>
								))}
							</ul>
						</nav>
						
						<Link href='/auth'>
							<Button>Start</Button>
						</Link>
					</div>
				</div>
			</header>
		</>
	)
}
