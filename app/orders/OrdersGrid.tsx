'use client'

import { useRef } from 'react'
import { GridApi } from 'ag-grid-community'
import { AGGridTable } from '@/components/ui-elements/grid/AGGridTable'
import { ViewManager } from '@/components/ui-elements/grid/ViewManager'
import { columns } from './orders.columns'

export const OrdersGrid = () => {
	const gridApiRef = useRef<GridApi | null>(null)

	return (
		<div>
			<ViewManager table='orders' gridApiRef={gridApiRef} />
			
			<AGGridTable table='orders' columnDefs={columns} gridApiRef={gridApiRef} />
		</div>
	)
}
