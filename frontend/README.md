# Frontend — React + Vite

## Stack
- **React 18** with hooks
- **React Router v6** for routing
- **Axios** with interceptors for API calls
- **Vite** for bundling and dev server

## Key Files

| File | Purpose |
|------|---------|
| `src/services/api.js` | Axios instance + all API methods |
| `src/hooks/useApi.js` | `useApi` (fetching) + `useMutation` (create/update/delete) |
| `src/context/AppContext.jsx` | Global state: user session + toast notifications |
| `src/index.css` | Full design system — edit variables at the top |

## Design System

All design tokens live in CSS variables at the top of `index.css`:

```css
:root {
  --ink:   #111111;   /* primary text */
  --ink-m: #555555;   /* muted text */
  --line:  #e8e8e8;   /* borders */
  --fh: 'Playfair Display', serif;  /* headings */
  --fb: 'Lora', serif;              /* body */
  --fc: 'Courier Prime', monospace; /* labels, code */
}
```

Change the fonts and colours here and everything updates automatically.

## Commands

```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build
```
