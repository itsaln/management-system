import { ColDef } from 'ag-grid-community'

export const columns: ColDef[] = [
	{ field: 'order_id', headerName: 'Order ID' },
	{ field: 'customer_name', headerName: 'Customer Name' },
	{ field: 'customer_phone' },

	{
		field: 'order_date',
		filter: 'agDateColumnFilter'
	},

	{ field: 'shipping_address' },
	{ field: 'items_count', filter: 'agNumberColumnFilter' },

	{
		field: 'subtotal',
		valueFormatter: (p) => `$${p.value}`
	},
	{
		field: 'shipping_cost',
		valueFormatter: (p) => `$${p.value}`
	},
	{
		field: 'discount',
		valueFormatter: (p) => `${p.value}%`
	},
	{
		field: 'total',
		valueFormatter: (p) => `$${p.value}`,
		filter: 'agNumberColumnFilter'
	},

	{ field: 'status', filter: 'agSetColumnFilter' },
	{ field: 'tracking_number' },
	{ field: 'estimated_delivery' }
]
