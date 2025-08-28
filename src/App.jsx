
import React, { useEffect, useMemo, useState } from 'react'
import Tabs from './components/Tabs'
import SearchMovies from './components/SearchMovies'
import RatedMovies from './components/RatedMovies'
import { GenresProvider } from './context/GenresContext'
import { FavoritesProvider, useFavorites } from './context/FavoritesContext'
import { createGuestSession } from './api/tmdb'

const LS_SESSION = 'guestSessionId:v1'

function useGuestSession() {
  const [id, setId] = useState(() => localStorage.getItem(LS_SESSION) || '')
  useEffect(() => {
    (async () => {
      if (!id) {
        try {
          const sid = await createGuestSession()
          setId(sid)
          localStorage.setItem(LS_SESSION, sid)
        } catch (e) {
          console.error('Failed to create guest session', e)
        }
      }
    })()
  }, [])
  return id
}

function Header({ active, onTab }) {
  return (
    <div className="header">
      <div className="title">🎬 Movie Search</div>
      <Tabs active={active} onChange={onTab} />
    </div>
  )
}

function AppShell() {
  const [tab, setTab] = useState('search')
  const guestSessionId = useGuestSession()

  // NOTE: Favorites view will render from last search / rated list in memory.
  // For simplicity we don't persist full movie objects for favorites here,
  // only the ids. Users can "favorite" from search/rated results.
  const [lastResults, setLastResults] = useState([])

  const SearchWithCapture = (props) => (
    <SearchMovies {...props} onResults={setLastResults} />
  )

  return (
    <div className="container">
      <Header active={tab} onTab={setTab} />
      {tab === 'search' && <SearchMovies guestSessionId={guestSessionId} />}
      {tab === 'rated' && <RatedMovies guestSessionId={guestSessionId} />}
    </div>
  )
}

export default function App() {
  return (
    <FavoritesProvider>
      <GenresProvider>
        <AppShell />
      </GenresProvider>
    </FavoritesProvider>
  )
}
