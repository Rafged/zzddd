
import React, { useMemo } from 'react'
import MovieCard from './MovieCard'

export default function FavoritesView({ source = [] }) {
  const favs = useMemo(() => source.filter(m => m.__fav), [source])
  if (favs.length === 0) return <div className="empty">No favorites yet. Click the heart on any movie.</div>
  return (
    <div className="grid">
      {favs.map(m => (
        <MovieCard key={m.id} movie={m} userRating={m.rating || m.userRating} onRate={() => {}} />
      ))}
    </div>
  )
}
