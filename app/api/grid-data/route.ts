import { NextRequest, NextResponse } from 'next/server'
import { buildSupabaseQuery } from '@/lib/aggrid/buildSupabaseQuery'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
	const supabase = await createClient()
	const body = await req.json()

	const { table, request } = body

	const query = await buildSupabaseQuery(supabase, table, request)
	const { data, count, error } = query

	if (error) {
		return NextResponse.json({ error }, { status: 500 })
	}

	return NextResponse.json({
		rows: data,
		lastRow: count
	})
}
