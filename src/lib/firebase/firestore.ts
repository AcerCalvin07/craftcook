import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'
import type { Recipe } from '@/types'

// ── Save a recipe to user's journal ─────────────────────
export const saveRecipe = async (
  userId: string,
  recipe: Recipe,
  notes: string = ''
) => {
  const ref = doc(db, 'users', userId, 'saved_recipes', recipe.id)
  await setDoc(ref, {
    recipeId:   recipe.id,
    recipeName: recipe.name,
    imageUrl:   recipe.imageUrl,
    category:   recipe.category,
    area:       recipe.area,
    notes,
    savedAt:    serverTimestamp(),
  })
}

// ── Get all saved recipes for a user ─────────────────────
export const getSavedRecipes = async (userId: string) => {
  const ref  = collection(db, 'users', userId, 'saved_recipes')
  const snap = await getDocs(ref)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Update notes on a saved recipe ──────────────────────
export const updateRecipeNotes = async (
  userId: string,
  recipeId: string,
  notes: string
) => {
  const ref = doc(db, 'users', userId, 'saved_recipes', recipeId)
  await setDoc(ref, { notes }, { merge: true })
}

// ── Delete a saved recipe ────────────────────────────────
export const unsaveRecipe = async (userId: string, recipeId: string) => {
  const ref = doc(db, 'users', userId, 'saved_recipes', recipeId)
  await deleteDoc(ref)
}

// ── Check if a recipe is already saved ──────────────────
export const isRecipeSaved = async (userId: string, recipeId: string) => {
  const ref  = doc(db, 'users', userId, 'saved_recipes', recipeId)
  const snap = await getDoc(ref)
  return snap.exists()
}

// ── Get notes for a specific saved recipe ───────────────
export const getRecipeNotes = async (userId: string, recipeId: string) => {
  const ref  = doc(db, 'users', userId, 'saved_recipes', recipeId)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data().notes as string) ?? '' : ''
}