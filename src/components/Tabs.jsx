
import React from 'react'

export default function Tabs({ active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Views">
      <button className={`tab-btn ${active === 'search' ? 'active' : ''}`} onClick={() => onChange('search')}>Search</button>
      <button className={`tab-btn ${active === 'rated' ? 'active' : ''}`} onClick={() => onChange('rated')}>Rated</button>
      <button className={`tab-btn ${active === 'favorites' ? 'active' : ''}`} onClick={() => onChange('favorites')}>Favorites</button>
    </div>
  )
}
