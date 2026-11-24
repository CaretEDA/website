# CaretEDA website

Source for [careteda.com](https://careteda.com): an Angular 21 single-page site styled with Tailwind CSS, hosted on GitHub Pages.

## Requirements

- Node.js 20.19+, 22.12+ or 24+
- npm (the project pins npm 11)

## Run it locally

```bash
npm install
npm start          # http://localhost:4200, reloads on save
```

## Test

```bash
npm test           # Vitest unit tests (src/app/app.spec.ts)
```

## Deploy

```bash
npm run deploy
```

This builds for production, runs `scripts/inject-og.mjs` to write a static page with its own
LinkedIn/Twitter preview tags for each route, then publishes `dist/corporate-website/browser`
to the `gh-pages` branch, which GitHub Pages serves at careteda.com (`src/CNAME`).
Do not edit `gh-pages` by hand. Develop on `main` or a feature branch.

When you add a blog post or a news page, also add an entry to the `routes` list in
`scripts/inject-og.mjs` so shared links get a preview card.

## Where things live

| Path | What |
|---|---|
| `src/app/home/` | The single long homepage. Sections are the components below |
| `src/app/about`, `blog`, `news`, `team`, `ifaq`, `startup-program`, `careers` | One component per homepage section |
| `src/app/blog/blog-list.component.ts` | Blog cards (newest first) |
| `src/app/blog/blog-detail.component.ts` | Full text of every blog post, keyed by URL slug |
| `src/app/news/*` | One component per press release |
| `src/app/shared/navbar.component.ts` | Header, menu and back-to-top button |
| `src/styles.css`, `tailwind.config.js` | Design tokens (colors, type) and global styles |
| `src/assets/` | Images. Keep photos as JPEG/WebP, roughly 2x their display size |
| `src/404.html` | GitHub Pages fallback that hands deep links back to the Angular router |

Old URLs such as `/team`, `/blogs` and `/about` redirect to their section on the homepage.
