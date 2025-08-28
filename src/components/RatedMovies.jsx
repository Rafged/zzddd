
import React, { useEffect, useState } from 'react'
import { fetchRatedMovies, rateMovie } from '../api/tmdb'
import MovieCard from './MovieCard'
import Pagination from './Pagination'

export default function RatedMovies({ guestSessionId }) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!guestSessionId) return
    (async () => {
      const data = await fetchRatedMovies({ guestSessionId, page })
      setResults(data.results || [])
      setTotalPages(Math.min(data.total_pages || 1, 500))
    })()
  }, [guestSessionId, page])

  const onRate = async (movieId, value) => {
    if (!guestSessionId) return
    const v10 = Math.max(0.5, Math.min(10, value * 2))
    await rateMovie({ movieId, value: v10, guestSessionId })
    // refresh current page
    const data = await fetchRatedMovies({ guestSessionId, page })
    setResults(data.results || [])
  }

  return (
    <div>
      <div className="grid">
        {results.map(m => (
          <MovieCard
            key={m.id}
            movie={m}
            userRating={m.rating} // TMDB returns 'rating' for user rating
            onRate={(val) => onRate(m.id, val)}
          />
        ))}
      </div>
      {results.length === 0 && <div className="empty">You haven't rated any movies yet</div>}
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPage={setPage} />}
    </div>
  )
}
