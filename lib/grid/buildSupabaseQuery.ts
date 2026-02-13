import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

type SortModel = {
	colId: string
	sort: 'asc' | 'desc'
}

type FilterModel = Record<string, unknown>

export function applySorting(
	query: PostgrestFilterBuilder<unknown, unknown, unknown>,
	sortModel: SortModel[]
) {
	if (!sortModel?.length) return query

	sortModel.forEach((sort) => {
		query = query.order(sort.colId, { ascending: sort.sort === 'asc' })
	})

	return query
}

export function applyFilters(
	query: PostgrestFilterBuilder<unknown, unknown, unknown>,
	filterModel: FilterModel
) {
	if (!filterModel) return query

	Object.entries(filterModel).forEach(([field, filter]: unknown) => {
		if (filter.filterType === 'text') {
			if (filter.type === 'contains') {
				query = query.ilike(field, `%${filter.filter}%`)
			}
			if (filter.type === 'equals') {
				query = query.eq(field, filter.filter)
			}
		}

		if (filter.filterType === 'number') {
			if (filter.type === 'equals') {
				query = query.eq(field, filter.filter)
			}
			if (filter.type === 'greaterThan') {
				query = query.gt(field, filter.filter)
			}
			if (filter.type === 'lessThan') {
				query = query.lt(field, filter.filter)
			}
		}
		if (filter.filterType === 'set') {
			query = query.in(field, filter.values)
		}
	})

	return query
}
