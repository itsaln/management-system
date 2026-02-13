import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/getUser'
import { LogoutButton } from '@/components/ui-elements/LogoutButton'

export default async function OrdersPage() {
	const user = await getUser()
	if (!user) redirect('/auth')

	return (
		<div className='py-lg'>
			<div className='container'>
				<div className='mb-lg flex flex-nowrap items-center justify-between gap-x-md'>
					<h1 className='text-2xl font-bold'>Orders</h1>
					<LogoutButton />
				</div>

				{/*OrdersGrid*/}
			</div>
		</div>
	)
}
