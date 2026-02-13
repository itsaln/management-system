'use client'

import { MutableRefObject, useEffect, useRef } from 'react'
import {
	AllCommunityModule,
	ClientSideRowModelModule,
	ColDef,
	GridApi,
	GridReadyEvent,
	IGetRowsParams,
	InfiniteRowModelModule,
	ModuleRegistry,
	RowSelectionModule} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useViewsStore } from '@/store/views.store'

ModuleRegistry.registerModules([
	AllCommunityModule,
	InfiniteRowModelModule,
	ClientSideRowModelModule,
	RowSelectionModule
])

type Props = {
	table: 'invoices' | 'orders'
	columnDefs: ColDef[]
	gridApiRef: MutableRefObject<GridApi | null>
}

export const AGGridTable = ({ table, columnDefs, gridApiRef }: Props) => {
	const gridApi = useRef<GridApi | null>(null)

	const { activeView, setUnsavedChanges } = useViewsStore()

	const createDatasource = () => ({
		getRows: async (params: IGetRowsParams) => {
			const res = await fetch(`/api/${table}`, {
				method: 'POST',
				body: JSON.stringify({
					startRow: params.startRow,
					endRow: params.endRow,
					sortModel: params.sortModel,
					filterModel: params.filterModel
				})
			})

			const data = await res.json()

			params.successCallback(data.rows, data.lastRow)
		}
	})

	const onGridReady = (params: GridReadyEvent) => {
		gridApi.current = params.api
		gridApiRef.current = params.api
		params.api.setGridOption('datasource', createDatasource())
	}

	const markDirty = () => {
		if (!gridApi.current || !activeView) return

		const columnState = gridApi.current.getColumnState()
		const filterModel = gridApi.current.getFilterModel()
		// const sortModel = gridApi.current.getSortModel()

		const changed =
			JSON.stringify(columnState) !== JSON.stringify(activeView.column_state) ||
			JSON.stringify(filterModel) !== JSON.stringify(activeView.filter_model)
			// JSON.stringify(sortModel) !== JSON.stringify(activeView.sort_model)

		setUnsavedChanges(changed)
	}

	const onStateChanged = () => {
		markDirty()
	}

	useEffect(() => {
		if (!gridApi.current || !activeView) return

		gridApi.current.applyColumnState({
			state: activeView.column_state,
			applyOrder: true
		})

		gridApi.current.setFilterModel(activeView.filter_model)
		// gridApi.current.setSortModel(activeView.sort_model)
	}, [activeView])

	return (
		<div className='ag-theme-alpine h-[75vh] w-full'>
			<AgGridReact
				columnDefs={columnDefs}
				rowModelType='infinite'
				rowSelection={{
					mode: 'multiRow',
					headerCheckbox: true,
					checkboxes: true
				}}
				cacheBlockSize={20}
				paginationPageSize={20}
				maxBlocksInCache={2}
				onGridReady={onGridReady}
				onColumnMoved={onStateChanged}
				onColumnVisible={onStateChanged}
				onSortChanged={onStateChanged}
				onFilterChanged={onStateChanged}
			/>
		</div>
	)
}
