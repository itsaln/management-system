import { GridView } from '@/types/view.types'

export async function fetchViews(table: 'invoices' | 'orders') {
	const res = await fetch(`/api/views?table=${table}`)
	return res.json()
}

export async function createView(view: Partial<GridView>) {
	const res = await fetch('/api/views', {
		method: 'POST',
		body: JSON.stringify(view)
	})
	return res.json()
}

export async function updateView(id: string, view: Partial<GridView>) {
	const res = await fetch(`/api/views/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(view)
	})
	return res.json()
}

export async function deleteView(id: string) {
	await fetch(`/api/views/${id}`, { method: 'DELETE' })
}
