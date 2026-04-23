import { NextResponse } from 'next/server'
import { searchRecipesByName } from '@/lib/api/mealdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? ''

  try {
    const recipes = await searchRecipesByName(query)
    return NextResponse.json({ recipes })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}