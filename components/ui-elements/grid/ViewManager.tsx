'use client'

import { MutableRefObject, useEffect } from 'react'
import { GridApi } from 'ag-grid-community'
import { createView, deleteView, fetchViews, updateView } from '@/lib/api/views'
import { useViewsStore } from '@/store/views.store'
import { Button } from '@/components/ui/Button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'

type Props = {
	table: 'invoices' | 'orders'
	gridApiRef: MutableRefObject<GridApi | null>
}

export const ViewManager = ({ table, gridApiRef }: Props) => {
	const { views, activeView, hasUnsavedChanges, setViews, setActiveView, setUnsavedChanges } =
		useViewsStore()

	const getGridState = () => {
		const api = gridApiRef.current
		if (!api) return null

		return {
			column_state: api.getColumnState(),
			filter_model: api.getFilterModel(),
			// sort_model: api.getSortModel()
		}
	}

	const handleSaveView = async () => {
		if (!activeView) return

		const state = getGridState()
		if (!state) return

		const updated = await updateView(activeView.id, state)

		setActiveView(updated)
		setUnsavedChanges(false)
	}

	const handleSaveAsNew = async () => {
		const name = prompt('View name')
		if (!name) return

		const state = getGridState()
		console.log('state', state)
		if (!state) return

		const newView = await createView({
			name,
			table_name: table,
			...state
		})

		setViews([...views, newView])
		setActiveView(newView)
		setUnsavedChanges(false)
	}

	const handleDelete = async () => {
		if (!activeView) return

		await deleteView(activeView.id)

		const newViews = views.filter((v) => v.id !== activeView.id)
		setViews(newViews)
		setActiveView(newViews[0] || null)
	}

	const handleResetDefault = () => {
		const api = gridApiRef.current
		if (!api) return

		api.setFilterModel(null)
		// api.setSortModel(null)
		api.resetColumnState()

		setUnsavedChanges(false)
	}

	useEffect(() => {
		fetchViews(table).then((data) => {
			setViews(data)
			if (data.length) setActiveView(data[0])
		})
	}, [table])

	return (
		<div className='mb-4 flex items-center gap-3'>
			<Select
				value={activeView?.id}
				onValueChange={(id) => setActiveView(views.find((v) => v.id === id)!)}
			>
				<SelectTrigger className='w-[220px]'>
					<SelectValue placeholder='Select view' />
				</SelectTrigger>

				<SelectContent>
					{views.length ? (
						views.map((view) => (
							<SelectItem key={view.id} value={view.id}>
								{view.name}
							</SelectItem>
						))
					) : (
						<span className='text-sm'>No data</span>
					)}
				</SelectContent>
			</Select>

			<Button onClick={handleSaveView} disabled={!hasUnsavedChanges}>
				Save View
			</Button>

			<Button variant='secondary' onClick={handleSaveAsNew}>
				Save As New View
			</Button>

			<Button variant='destructive' onClick={handleDelete}>
				Delete
			</Button>

			<Button variant='outline' onClick={handleResetDefault}>
				Reset to Default
			</Button>

			{hasUnsavedChanges && <span className='text-orange-500 text-sm'>● Unsaved changes</span>}
		</div>
	)
}
