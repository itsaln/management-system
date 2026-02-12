import { createClient } from '@/lib/supabase/server'

export async function getInitialRows(table: 'orders' | 'invoices') {
	const supabase = await createClient()

	const { data } = await supabase.from(table).select('*').range(0, 49) // первая страница

	return data ?? []
}
