import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/getUser'
import { LogoutButton } from '@/components/ui-elements/LogoutButton'

export default async function Dashboard() {
	const user = await getUser()
	if (!user) redirect('/auth')

	return (
		<div className='py-lg'>
			<div className='container'>
				<div className='flex flex-nowrap items-center justify-between gap-x-md mb-lg'>
					<h1 className='text-3xl font-bold'>Welcome to dashboard</h1>
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}
