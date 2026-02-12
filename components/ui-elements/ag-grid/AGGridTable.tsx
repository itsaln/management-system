'use client'

import { useMemo, useRef } from 'react'
import { AllCommunityModule, ColDef, IDatasource, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

type AGGridTableProps<T> = {
	table: 'orders' | 'invoices'
	columnDefs: ColDef<T>[]
}

ModuleRegistry.registerModules([AllCommunityModule])

export function AGGridTable<T>({ table, columnDefs }: AGGridTableProps<T>) {
	const gridRef = useRef<AgGridReact<T>>(null)

	const defaultColDef = useMemo<ColDef>(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			flex: 1
		}),
		[]
	)

	const datasource: IDatasource = {
		getRows: async (params) => {
			const res = await fetch('/api/grid-data', {
				method: 'POST',
				body: JSON.stringify({
					table,
					request: {
						startRow: params.startRow,
						endRow: params.endRow,
						sortModel: params.sortModel,
						filterModel: params.filterModel
					}
				})
			})

			const data = await res.json()
			params.successCallback(data.rows, data.total)
		}
	}

	return (
		<div className='ag-theme-alpine h-[70vh] w-full'>
			<AgGridReact
				ref={gridRef}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowModelType='infinite'
				paginationPageSize={20}
				cacheBlockSize={20}
				datasource={datasource}
			/>
		</div>
	)
}
