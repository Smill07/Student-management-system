/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'

const AuthContext = createContext(null)
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.refresh().then(setSession).catch(() => {}).finally(() => setLoading(false)) }, [])
  const signIn = async (credentials) => { const next = await api.login(credentials); setSession(next); return next }
  const signUp = async (credentials) => { const next = await api.signup(credentials); setSession(next); return next }
  const signOut = async () => { await api.logout(); setSession(null) }
  return <AuthContext.Provider value={{ ...session, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
