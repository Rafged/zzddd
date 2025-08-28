
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchGenres } from '../api/tmdb'

const GenresContext = createContext({ byId: {}, list: [] })
export const useGenres = () => useContext(GenresContext)

export function GenresProvider({ children }) {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const genres = await fetchGenres()
        setList(genres)
      } catch (e) {
        console.error('Failed to load genres', e)
      }
    })()
  }, [])

  const value = useMemo(() => ({
    list,
    byId: Object.fromEntries(list.map(g => [g.id, g.name]))
  }), [list])

  return <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
}
