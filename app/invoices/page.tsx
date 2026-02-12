import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/getUser'
import { LogoutButton } from '@/components/ui-elements/LogoutButton'
import { InvoicesGrid } from './InvoicesGrid'

export default async function InvoicesPage() {
	const user = await getUser()
	if (!user) redirect('/auth')

	return (
		<div className='py-lg'>
			<div className='container'>
				<div className='mb-lg flex flex-nowrap items-center justify-between gap-x-md'>
					<h1 className='text-2xl font-bold'>Invoices</h1>
					<LogoutButton />
				</div>
				
				<InvoicesGrid />
			</div>
		</div>
	)
}
