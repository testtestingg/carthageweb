# Carthage — Cosmetic & Pigmentation Storefront

E-commerce storefront for professional PMU (permanent makeup) products, built with Next.js 16, React 19, Tailwind CSS 4 and Supabase.

## Features

- **Product catalog** with category filtering, live header search (title, keywords, all languages), sorting and per-product pages
- **Multi-language**: English, French and German across the whole storefront; language switcher in the header
- **Cart & checkout** with client-side validation, persistent cart (localStorage), free-shipping threshold and VAT display
- **Hidden admin panel** at `/admin` — product CRUD, image upload, category management, formations, per-language content editing, password management
- **Contact page** with validated form
- **Stone paper division** at `/stone-paper` — Golden Bridge industrial packaging line (stone paper bags, PP woven bags, notebooks) under the same roof
- **Supabase backend** (PostgreSQL + Storage) with automatic fallback to a local JSON store for zero-setup development

## Getting started

```bash
pnpm install
pnpm dev
```

With no configuration the app runs on the local JSON store in `data/` (seeded automatically on first run).

## Supabase setup (production backend)

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** in the dashboard, paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it once. This creates all tables, row-level-security policies, the `product-images` storage bucket and seeds the catalog.
3. Copy `.env.example` to `.env.local` and fill in (Settings → API):
   - `NEXT_PUBLIC_SUPABASE_URL` — the project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — the `service_role` secret key
4. Restart the dev server. That's it — products, categories, formations, contact messages, the admin account and image uploads now live in Supabase.

The `service_role` key is only ever used server-side (API routes / server components). Do not expose it in client code.

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

**With Supabase configured**: everything is stored in Postgres (`products`, `categories`, `formations`, `contact_messages`, `admin_users`) and uploaded images go to the public `product-images` storage bucket. Nothing below applies.

**Without Supabase** (local fallback), content lives in flat JSON files under `data/` (created on demand):

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
