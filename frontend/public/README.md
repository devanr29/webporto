# Static assets

Files placed here are served from the site root (`/`).

## To finish the portfolio, drop in:

- **`cv.pdf`** — your resume. The Hero "Download CV" button links to `/cv.pdf`.
  Just save your CV as `cv.pdf` in this folder.

- **(optional) a headshot** — e.g. `headshot.jpg`. To use it, replace the `👤`
  emoji placeholders in:
  - `src/components/sections/HeroSection.jsx` (`hero__avatar-placeholder`)
  - `src/components/sections/AboutSection.jsx` (`about__photo-frame`)
  with `<img src="/headshot.jpg" alt="Devan Ramadhana" />`.
