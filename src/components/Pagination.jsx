
import React from 'react'

export default function Pagination({ page, totalPages, onPage }) {
  return (
    <div className="pagination">
      <button onClick={() => onPage(1)} disabled={page <= 1}>« First</button>
      <button onClick={() => onPage(page - 1)} disabled={page <= 1}>‹ Prev</button>
      <span className="muted" style={{ alignSelf: 'center', padding: '8px 4px' }}>Page {page} / {Math.max(1, totalPages || 1)}</span>
      <button onClick={() => onPage(page + 1)} disabled={page >= totalPages}>Next ›</button>
      <button onClick={() => onPage(totalPages)} disabled={page >= totalPages}>Last »</button>
    </div>
  )
}
