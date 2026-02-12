import { SupabaseClient } from '@supabase/supabase-js'

type AGGridFilter =
	| { type: 'contains'; filter: string }
	| { type: 'equals'; filter: string | number }
	| { type: 'startsWith'; filter: string }
	| { type: 'endsWith'; filter: string }
	| { type: 'greaterThan'; filter: number }
	| { type: 'lessThan'; filter: number }

type AGGridRequest = {
	startRow: number
	endRow: number
	sortModel: { colId: string; sort: 'asc' | 'desc' }[]
	filterModel?: Record<string, AGGridFilter>
}

export async function buildSupabaseQuery(
	supabase: SupabaseClient,
	table: 'orders' | 'invoices',
	request: AGGridRequest
) {
	let query = supabase.from(table).select('*', { count: 'exact' })

	// pagination
	query = query.range(request.startRow, request.endRow - 1)

	// sorting
	request.sortModel?.forEach((sort) => {
		query = query.order(sort.colId, { ascending: sort.sort === 'asc' })
	})

	// filtering
	Object.entries(request.filterModel || {}).forEach(([field, filter]) => {
		const { type, filter: value } = filter

		switch (type) {
			case 'contains':
				query = query.ilike(field, `%${value}%`)
				break
			case 'equals':
				query = query.eq(field, value)
				break
			case 'startsWith':
				query = query.ilike(field, `${value}%`)
				break
			case 'endsWith':
				query = query.ilike(field, `%${value}`)
				break
			case 'greaterThan':
				query = query.gt(field, value)
				break
			case 'lessThan':
				query = query.lt(field, value)
				break
		}
	})

	return query
}
