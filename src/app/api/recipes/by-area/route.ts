import { NextResponse } from 'next/server'
import { filterByArea } from '@/lib/api/mealdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const area = searchParams.get('a') ?? ''

  if (!area) {
    return NextResponse.json({ error: 'Missing area' }, { status: 400 })
  }

  try {
    const meals = await filterByArea(area)
    return NextResponse.json({ meals })
  } catch (err) {
    console.error(`[by-area] ${area}:`, err)
    return NextResponse.json(
      { error: 'Failed to filter recipes' },
      { status: 502 }
    )
  }
}
