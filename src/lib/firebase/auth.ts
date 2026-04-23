import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './config'

const googleProvider = new GoogleAuthProvider()

// ── Sign Up ──────────────────────────────────────────────
export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

// ── Sign In ──────────────────────────────────────────────
export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

// ── Google Sign In ───────────────────────────────────────
export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider)

// ── Sign Out ─────────────────────────────────────────────
export const logOut = () => signOut(auth)

// ── Auth State Listener ──────────────────────────────────
export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback)