
import React from 'react'

function colorFor(r) {
  if (r <= 3) return '#E90000'
  if (r <= 5) return '#E97E00'
  if (r <= 7) return '#E9D100'
  return '#66E900'
}

export default function RatingCircle({ rating }) {
  const value = (Number(rating) || 0).toFixed(1)
  const bg = colorFor(Number(value))

  return (
    <div className="rating-circle" style={{ background: bg }} aria-label={`Rating ${value}`}>
      {value}
    </div>
  )
}
