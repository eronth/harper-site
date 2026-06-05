# harper-site

A personal React + TypeScript site built with Vite, deployed to GitHub Pages.

## Getting Started

Install dependencies:

```bash
npm install
```

## Scripts

### Development

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with HMR |
| `npm run preview` | Preview the production build locally |

### Build & Deploy

| Command | Description |
|---|---|
| `npm run build` | Type-check and build for production (outputs to `dist/`) |
| `npm run deploy` | Build and deploy to GitHub Pages via `gh-pages` |

### Linting

| Command | Description |
|---|---|
| `npm run lint` | Run ESLint across the project |

### Asset Index Generation

These scripts auto-generate `index.ts` files for asset directories. Run them after adding or removing files in the corresponding asset folders.

| Command | Description |
|---|---|
| `npm run generate-mtg-index` | Regenerate the MTG card images index (`src/assets/mtg-cards/index.ts`) |
| `npm run generate-lego-village-index` | Regenerate the Lego Village photo indexes (`src/assets/lego-village/`) |
| `npm run watch-mtg-cards` | Watch the MTG cards directory and auto-regenerate the index on file changes |
