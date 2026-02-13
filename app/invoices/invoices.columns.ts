import { ColDef } from 'ag-grid-community'

export const columns: ColDef[] = [
	{ field: 'invoice_id', headerName: 'Invoice ID' },
	{ field: 'customer_name', headerName: 'Customer Name' },
	{ field: 'customer_email', headerName: 'Email' },

	{
		field: 'invoice_date',
		headerName: 'Invoice Date',
		filter: 'agDateColumnFilter'
	},
	{
		field: 'due_date',
		headerName: 'Due Date',
		filter: 'agDateColumnFilter'
	},

	{
		field: 'amount',
		valueFormatter: (p) => `$${p.value}`,
		filter: 'agNumberColumnFilter'
	},
	{
		field: 'tax',
		valueFormatter: (p) => `${p.value}%`
	},
	{
		field: 'total',
		headerName: 'Total',
		valueFormatter: (p) => `$${p.value}`,
		filter: 'agNumberColumnFilter'
	},

	{ field: 'status', filter: 'agSetColumnFilter' },
	{ field: 'payment_method' },
	{ field: 'notes' }
]
