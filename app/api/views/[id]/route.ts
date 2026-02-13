import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const supabase = await createClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const body = await req.json()

	const { data, error } = await supabase
		.from('views')
		.update(body)
		.eq('id', params.id)
		.select()
		.single()

	if (error) {
		return NextResponse.json({ error }, { status: 500 })
	}

	return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const supabase = await createClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { error } = await supabase.from('views').delete().eq('id', params.id)

	if (error) {
		return NextResponse.json({ error }, { status: 500 })
	}

	return NextResponse.json({ success: true })
}
