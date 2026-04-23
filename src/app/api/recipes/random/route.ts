import { NextResponse } from 'next/server'
import { getRandomRecipe } from '@/lib/api/mealdb'

export async function GET() {
  try {
    const recipe = await getRandomRecipe()
    return NextResponse.json({ recipe })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch random recipe' },
      { status: 500 }
    )
  }
}