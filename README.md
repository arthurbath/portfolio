# Manifest-driven Portfolio (Vanilla TS + Vite)

## Dev

- npm install
- npm run dev

Drop raw images in `public/images/<project>/...` while developing.

## Content

- Edit `src/manifest.json` to add header and projects.
- Each project:
  - `title`, `subtitle`, `description`
  - `images`: array of `{ src, alt }` where `src` points to `/images/...` under `public/images`.

## Build

- npm run build
- Prebuild compresses images from `public/images` to `dist/images` using Sharp (1920x1080 max, quality ~72).
- npm run preview

## Deploy (Apache)

- Upload the `dist/` directory to your document root (e.g., `/var/www/html/portfolio`).
- Ensure the directory `/dist/images` is included; image paths are root-relative `/images/...`.

## Notes

- Minimal black-and-white design, Helvetica Neue.
- Carousel: fade, 3s autoplay, pause on hover, thumbnails, keyboard arrows.
- Respects `prefers-reduced-motion`.
