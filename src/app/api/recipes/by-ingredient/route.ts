import { NextResponse } from 'next/server'
import { filterByIngredient } from '@/lib/api/mealdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ingredient = searchParams.get('i') ?? ''

  if (!ingredient) {
    return NextResponse.json({ error: 'Missing ingredient' }, { status: 400 })
  }

  try {
    const meals = await filterByIngredient(ingredient)
    return NextResponse.json({ meals })
  } catch {
    return NextResponse.json(
      { error: 'Failed to filter recipes' },
      { status: 500 }
    )
  }
}