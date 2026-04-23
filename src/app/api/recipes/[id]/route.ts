import { NextResponse } from 'next/server'
import { getRecipeById } from '@/lib/api/mealdb'
import { FILIPINO_RECIPES } from '@/lib/recipes/filipino'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Local Filipino dataset IDs are prefixed "fil-" and never hit TheMealDB.
  if (id.startsWith('fil-')) {
    const recipe = FILIPINO_RECIPES.find(r => r.id === id)
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }
    return NextResponse.json({ recipe })
  }

  try {
    const recipe = await getRecipeById(id)
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }
    return NextResponse.json({ recipe })
  } catch (err) {
    console.error(`[recipe:${id}]`, err)
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 502 }
    )
  }
}
