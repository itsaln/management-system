'use client'

import { ColDef } from 'ag-grid-community'
import { AGGridTable } from '@/components/ui-elements/ag-grid/AGGridTable'
import { Invoice } from './types'

const columnDefs: ColDef<Invoice>[] = [
	{ field: 'invoice_id', headerName: 'ID' },
	{ field: 'customer_name', headerName: 'Customer Name' },
	{ field: 'invoice_date', headerName: 'Invoice Date' },
	{ field: 'due_date', headerName: 'Due Date' },
	{
		field: 'total',
		headerName: 'Total',
		valueFormatter: (p) => `$${p.value}`
	},
	{ field: 'status', headerName: 'Status' }
]

export const InvoicesGrid = () => {
	return <AGGridTable table='invoices' columnDefs={columnDefs} />
}
