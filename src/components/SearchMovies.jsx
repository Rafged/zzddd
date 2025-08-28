
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { searchMovies, rateMovie } from '../api/tmdb'
import MovieCard from './MovieCard'
import Pagination from './Pagination'

const LS_RATINGS = 'userRatings:v1'

function useStoredRatings() {
  const [map, setMap] = useState(() => {
    try { return new Map(Object.entries(JSON.parse(localStorage.getItem(LS_RATINGS) || '{}')).map(([k, v]) => [Number(k), v])) } catch { return new Map() }
  })
  useEffect(() => {
    const obj = Object.fromEntries(map.entries())
    localStorage.setItem(LS_RATINGS, JSON.stringify(obj))
  }, [map])
  return [map, setMap]
}

export default function SearchMovies({ guestSessionId }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [results, setResults] = useState([])
  const [ratings, setRatings] = useStoredRatings()

  const debRef = useRef()

  useEffect(() => {
    if (!query) { setResults([]); setTotalPages(1); setPage(1); return }
    if (debRef.current) clearTimeout(debRef.current)
    debRef.current = setTimeout(async () => {
      const data = await searchMovies({ query, page })
      setResults(data.results || [])
      setTotalPages(Math.min(data.total_pages || 1, 500))
    }, 350)
    return () => clearTimeout(debRef.current)
  }, [query, page])

  const onRate = async (movieId, value) => {
    if (!guestSessionId) return
    // TMDB expects 0.5–10 in 0.5 steps; we pass value * 2 since UI is out of 5
    const v10 = Math.max(0.5, Math.min(10, value * 2))
    await rateMovie({ movieId, value: v10, guestSessionId })
    setRatings(prev => new Map(prev).set(movieId, v10))
  }

  return (
    <div>
      <div className="searchbar">
        <input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1) }}
          aria-label="Search movies"
        />
      </div>

      {results.length === 0 && query && <div className="empty">No results</div>}
      {results.length === 0 && !query && <div className="empty">Start typing to search for movies</div>}

      <div className="grid">
        {results.map(m => (
          <MovieCard
            key={m.id}
            movie={m}
            userRating={ratings.get(m.id)}
            onRate={(val) => onRate(m.id, val)}
          />
        ))}
      </div>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPage={setPage} />}
    </div>
  )
}
