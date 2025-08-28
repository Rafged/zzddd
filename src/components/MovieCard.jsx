
import React from 'react'
import { Rate } from 'antd'
import RatingCircle from './RatingCircle'
import { imgUrl } from '../api/tmdb'
import { useGenres } from '../context/GenresContext'
import { useFavorites } from '../context/FavoritesContext'

function Heart({ active }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? '#ef476f' : 'none'} stroke={active ? '#ef476f' : '#9aa0a6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  )
}

export default function MovieCard({ movie, onRate, userRating }) {
  const { byId } = useGenres()
  const { has, toggle } = useFavorites()

  const genres = (movie.genre_ids || movie.genres?.map(g => g.id) || [])
    .map(id => byId[id])
    .filter(Boolean)
    .slice(0, 4)

  const poster = imgUrl(movie.poster_path)
  const isFav = has(movie.id)

  return (
    <div className="card">
      <RatingCircle rating={movie.vote_average} />
      <img className="poster" src={poster || ''} alt={movie.title} loading="lazy" />
      <div className="content">
        <div className="row-between">
          <div className="title-line">{movie.title}</div>
          <div className="heart" onClick={() => toggle(movie.id)} title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
            <Heart active={isFav} />
          </div>
        </div>
        <div className="muted">{(movie.release_date || '').slice(0, 4) || '—'}</div>
        <div className="genres">
          {genres.map(name => <span key={name} className="chip">{name}</span>)}
          {genres.length === 0 && <span className="chip">No genres</span>}
        </div>
        <div className="row-between">
          <div className="muted">Your rating:</div>
          <Rate allowHalf value={(userRating || 0) / 2} onChange={(v) => onRate(Math.round(v * 2) / 2)} />
        </div>
      </div>
    </div>
  )
}
