import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { createAdminClient, QUOTE_REQUESTS_TABLE } from '@/lib/supabase/server'

function getCronSecret(): string | null {
  const secret = process.env.CRON_SECRET?.trim()
  return secret || null
}

function isAuthorized(request: Request): boolean {
  const expected = getCronSecret()
  if (!expected) {
    return false
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.slice('Bearer '.length).trim()
  if (!token) {
    return false
  }

  try {
    const expectedBuffer = Buffer.from(expected)
    const tokenBuffer = Buffer.from(token)

    if (expectedBuffer.length !== tokenBuffer.length) {
      return false
    }

    return timingSafeEqual(expectedBuffer, tokenBuffer)
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from(QUOTE_REQUESTS_TABLE)
      .select('id')
      .limit(1)

    if (error) {
      console.error('[Health/Supabase] Query failed:', error.message)

      return NextResponse.json(
        { ok: false, error: 'Supabase health check failed.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Health/Supabase] Unexpected error:', error)

    return NextResponse.json(
      { ok: false, error: 'Supabase health check failed.' },
      { status: 500 },
    )
  }
}
