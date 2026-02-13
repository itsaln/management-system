import { IGetRowsParams } from 'ag-grid-community'
import { createClient } from '@/lib/supabase/server'
import { applyFilters, applySorting } from './buildSupabaseQuery'

export async function fetchGridData(table: 'invoices' | 'orders', body: IGetRowsParams) {
	const supabase = await createClient()

	const { startRow, endRow, sortModel, filterModel } = body

	let query = supabase.from(table).select('*', { count: 'exact' })

	query = applySorting(query, sortModel)
	query = applyFilters(query, filterModel)

	query = query.range(startRow, endRow - 1)

	const { data, count, error } = await query

	if (error) throw error

	return {
		rows: data,
		lastRow: count
	}
}
