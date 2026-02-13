import { NextRequest, NextResponse } from 'next/server'
import { fetchGridData } from '@/lib/grid/fetchGridData'

export async function POST(req: NextRequest) {
	const body = await req.json()

	try {
		const result = await fetchGridData('orders', body)
		return NextResponse.json(result)
	} catch (e) {
		return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
	}
}
