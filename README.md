
# Movie Search App (Vite + React)

Features:
- Search movies (TMDB)
- Favorites (localStorage)
- Star ratings with `antd` Rate (0.5 steps)
- "Rated" tab shows only movies you've rated (via TMDB guest session)
- Genre chips via TMDB Genres API (loaded once using React Context)
- Rating circle with color scale:
  - 0–3: `#E90000`
  - 3–5: `#E97E00`
  - 5–7: `#E9D100`
  - >7: `#66E900`

## Quick Start

1. **Unzip** the project.
2. Create `.env` from `.env.example` and set your TMDB API key:
   ```bash
   cp .env.example .env
   # edit .env and set VITE_TMDB_API_KEY
   ```
3. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed in your terminal.

## Notes
- Guest session is created automatically on first run and stored in `localStorage`.
- Your own ratings are shown in the "Rated" tab (TMDB returns a `rating` field for each movie).
- Favorites are stored locally (heart icon on each card). You can extend the Favorites tab to persist full objects.
- This project uses Vite. If port `5173` is busy, change it in `vite.config.js`.
