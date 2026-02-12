'use client'

import { ColDef } from 'ag-grid-community'
import { AGGridTable } from '@/components/ui-elements/ag-grid/AGGridTable'
import { Order } from './types'

const columnDefs: ColDef<Order>[] = [
	{ field: 'order_id', headerName: 'ID' },
	{ field: 'customer_name', headerName: 'Customer Name' },
	{ field: 'order_date', headerName: 'Order Date' },
	{ field: 'items_count', headerName: 'Items Count' },
	{
		field: 'total',
		headerName: 'Total',
		valueFormatter: (p) => `$${p.value}`
	},
	{ field: 'status', headerName: 'Status' },
	{ field: 'tracking_number', headerName: 'Tracking' }
]

export const OrdersGrid = () => {
	return <AGGridTable table='orders' columnDefs={columnDefs} />
}
