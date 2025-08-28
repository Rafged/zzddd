
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext({ ids: new Set(), toggle: () => {}, has: () => false })
export const useFavorites = () => useContext(FavoritesContext)

const LS_KEY = 'favorites:v1'

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const arr = JSON.parse(raw)
        setIds(new Set(arr))
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(ids)))
  }, [ids])

  const value = useMemo(() => ({
    ids,
    has: (id) => ids.has(id),
    toggle: (id) => setIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }), [ids])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
