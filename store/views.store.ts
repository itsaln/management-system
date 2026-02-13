import { create } from 'zustand'
import { GridView } from '@/types/view.types'

type ViewsState = {
	views: GridView[]
	activeView: GridView | null
	hasUnsavedChanges: boolean

	setViews: (views: GridView[]) => void
	setActiveView: (view: GridView | null) => void
	setUnsavedChanges: (value: boolean) => void
}

export const useViewsStore = create<ViewsState>((set) => ({
	views: [],
	activeView: null,
	hasUnsavedChanges: false,

	setViews: (views) => set({ views }),
	setActiveView: (view) => set({ activeView: view }),
	setUnsavedChanges: (value) => set({ hasUnsavedChanges: value })
}))
