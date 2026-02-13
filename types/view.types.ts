import { ColumnState, FilterModel } from 'ag-grid-community'

export type GridView = {
	id: string
	name: string
	table_name: 'invoices' | 'orders'
	is_default: boolean

	column_state: ColumnState[]
	filter_model: FilterModel
	// sort_model: SortModelItem[]

	created_at: string
	updated_at: string
}
