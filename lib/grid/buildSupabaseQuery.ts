type SortModel = {
	colId: string
	sort: 'asc' | 'desc'
}

type FilterModel = Record<string, unknown>

type QueryOps<T> = {
	order(column: string, opts?: { ascending?: boolean }): T
	eq(column: string, value: unknown): T
	ilike(column: string, pattern: string): T
	gt(column: string, value: number): T
	lt(column: string, value: number): T
	in(column: string, values: unknown[]): T
}

export function applySorting<T extends QueryOps<T>>(query: T, sortModel: SortModel[]): T {
	if (!sortModel?.length) return query

	for (const sort of sortModel) {
		query = query.order(sort.colId, { ascending: sort.sort === 'asc' })
	}

	return query
}

export function applyFilters<T extends QueryOps<T>>(query: T, filterModel: FilterModel): T {
	if (!filterModel) return query

	for (const [field, filter] of Object.entries(filterModel)) {
		const f = filter as {
			filterType: 'text' | 'number' | 'set'
			type: string
			filter?: string | number
			values?: unknown[]
		}

		if (f.filterType === 'text') {
			if (f.type === 'contains') {
				query = query.ilike(field, `%${f.filter}%`)
			}
			if (f.type === 'equals') {
				query = query.eq(field, f.filter)
			}
		}

		if (f.filterType === 'number') {
			if (f.type === 'equals') {
				query = query.eq(field, f.filter)
			}
			if (f.type === 'greaterThan') {
				query = query.gt(field, f.filter as number)
			}
			if (f.type === 'lessThan') {
				query = query.lt(field, f.filter as number)
			}
		}

		if (f.filterType === 'set') {
			query = query.in(field, f.values ?? [])
		}
	}

	return query
}
