# Let’s Cover Distance

A one-page site for LCD, a social running and hiking club in Riga. The page recreates the approved October poster layout from `reference/`.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes a production bundle to `dist/`. `npm run preview` serves that bundle locally.

## Contents

- `src/` — React + TypeScript app (Vite, plain CSS)
- `src/data/october.ts` — October outing and calendar dates
- `public/images/` — original poster and Instagram doodle sheet
- `reference/` — static HTML/CSS source of truth, kept for comparison
