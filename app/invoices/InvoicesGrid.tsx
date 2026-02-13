'use client'

import { useRef } from 'react'
import { GridApi } from 'ag-grid-community'
import { AGGridTable } from '@/components/ui-elements/grid/AGGridTable'
import { ViewManager } from '@/components/ui-elements/grid/ViewManager'
import { columns } from './invoices.columns'

export const InvoicesGrid = () => {
	const gridApiRef = useRef<GridApi | null>(null)

	return (
		<div>
			<ViewManager table='invoices' gridApiRef={gridApiRef} />
			
			<AGGridTable table='invoices' columnDefs={columns} gridApiRef={gridApiRef} />
		</div>
	)
}
