import { NextRequest, NextResponse } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

async function createDefaultView(supabase: SupabaseClient, table: string) {
	const defaultState = {
		columnState: [],
		sortModel: [],
		filterModel: {}
	}

	await supabase.from('views').insert({
		name: 'Default View',
		table_type: table,
		grid_state: defaultState,
		is_default: true
	})
}

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const table = req.nextUrl.searchParams.get('table')

	let { data } = await supabase.from('views').select('*').eq('table_type', table)

	if (!data?.length) {
		await createDefaultView(supabase, table!)

		const res = await supabase.from('views').select('*').eq('table_type', table)

		data = res.data
	}

	return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
	const supabase = await createClient()
	const body = await req.json()
	const { tableType, name, gridState } = body

	const { data, error } = await supabase.from('views').insert([
		{
			table_type: tableType,
			name,
			grid_state: gridState
		}
	])

	if (error) return NextResponse.json({ error }, { status: 500 })

	return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
	const supabase = await createClient()
	const { id, gridState, name } = await req.json()

	const { data, error } = await supabase
		.from('views')
		.update({
			grid_state: gridState,
			name,
			updated_at: new Date()
		})
		.eq('id', id)

	if (error) return NextResponse.json({ error }, { status: 500 })

	return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
	const supabase = await createClient()
	const id = req.nextUrl.searchParams.get('id')

	const { error } = await supabase.from('views').delete().eq('id', id)

	if (error) return NextResponse.json({ error }, { status: 500 })

	return NextResponse.json({ success: true })
}
