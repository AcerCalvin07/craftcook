import { NextResponse } from 'next/server'
import { getAllIngredients } from '@/lib/api/mealdb'

export async function GET() {
  try {
    const ingredients = await getAllIngredients()
    return NextResponse.json({ ingredients })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 }
    )
  }
}