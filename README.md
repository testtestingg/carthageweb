# Carthage — Cosmetic & Pigmentation Storefront

E-commerce storefront for professional PMU (permanent makeup) products, built with Next.js 16, React 19 and Tailwind CSS 4.

## Features

- **Product catalog** with category filtering, live header search (title, keywords, all languages), sorting and per-product pages
- **Multi-language**: English, French and German across the whole storefront; language switcher in the header
- **Cart & checkout** with client-side validation, persistent cart (localStorage), free-shipping threshold and VAT display
- **Hidden admin panel** at `/admin` — product CRUD, image upload, category management, per-language content editing, password management
- **Contact page** with validated form; messages are stored in `data/messages.json`

## Getting started

```bash
pnpm install
pnpm dev
```

The JSON data store in `data/` is seeded automatically on first run.

## Admin panel

Open `/admin`. On first run the admin account is created from the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables (see `.env.example`).
If they are not set, the bootstrap credentials are:

- Username: `admin`
- Password: `carthage-admin-2026`

**Change the password immediately** at `/admin/settings` — the panel enforces
scrypt-hashed storage, signed httpOnly session cookies (8 h expiry), login
rate limiting (5 attempts / 15 min / IP) and same-origin checks on all
mutating requests. The admin area sends `noindex` headers and is excluded
from `robots.txt`.

## Data & persistence

All content lives in flat JSON files under `data/` (created on demand):

| File | Contents | Committed? |
|---|---|---|
| `data/products.json` | Product catalog incl. translations | yes |
| `data/categories.json` | Categories incl. translations | yes |
| `data/admin-user.json` | Admin username + scrypt password hash | no (gitignored) |
| `data/.auth-secret` | Generated session-signing secret | no (gitignored) |
| `data/messages.json` | Contact form submissions | no (gitignored) |

Uploaded product images are stored in `public/uploads/` (gitignored).
When deploying, make sure `data/` and `public/uploads/` are on a persistent,
writable volume.

## Production build

```bash
pnpm build
pnpm start
```
