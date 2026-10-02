# LadeStudio Commerce

**Built by [Girish Lade](https://ladestack.in)** — part of the [LadeStack](https://ladestack.in) family of free, open tools.

LadeStudio Commerce is a full-featured e-commerce storefront built with **Next.js 16 (App Router), React, Tailwind CSS, and TypeScript**. It runs **without a traditional database**: products and orders are stored in **Google Sheets**, and product images live in **Google Drive** — so it can be managed entirely from a spreadsheet. Checkout supports **UPI payments** and **WhatsApp order flow**, tailored for Indian sellers.

## Features

- **Storefront** — homepage, shop listing, product detail pages, category browsing.
- **Cart & checkout** — cart drawer/page, multi-step checkout, wishlist.
- **UPI checkout** — order placement via UPI ID / QR (`NEXT_PUBLIC_UPI_ID`, `NEXT_PUBLIC_UPI_QR_URL`).
- **WhatsApp ordering** — handoff to WhatsApp with the order summary (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- **Google Sheets backend** — products, orders, and catalog read/written via the Sheets API (`/api/products`, `/api/orders`, `/api/submit-order`).
- **Google Drive images** — product images served from Google Drive (`GOOGLE_DRIVE_FOLDER_ID`).
- **Auth pages** — sign-in / sign-up UI.
- **Content pages** — about, contact, FAQ, shipping, refunds, terms, privacy (SEO-ready with sitemap + robots).
- **SEO utilities** — dynamic sitemap/robots, metadata helpers.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React, Tailwind CSS |
| Backend | Next.js API routes + Google Sheets / Google Drive (service account) |
| Payments | UPI (manual/QR), WhatsApp order flow |
| Type safety | TypeScript |

## Getting started

Prerequisites: Node.js 20+ and a Google Cloud service account with Sheets + Drive access.

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production:

```bash
npm run build
npm run start
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GOOGLE_SHEETS_ID` / `GOOGLE_SHEET_ID` | Yes | Sheet holding the product catalog / orders |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | Service-account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Yes | Service-account private key |
| `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` | Alternative | Full credentials JSON |
| `GOOGLE_DRIVE_FOLDER_ID` | Yes | Drive folder with product images |
| `NEXT_PUBLIC_UPI_ID` | Yes | Seller UPI ID shown at checkout |
| `NEXT_PUBLIC_UPI_QR_URL` | No | QR image URL for UPI payment |
| `NEXT_PUBLIC_PHONE_NUMBER` | No | Seller contact number |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp number for order handoff |

Share the Google Sheet and Drive folder with the service-account email.

## Project structure

```
app/            # App Router pages (shop, cart, checkout, products, orders, auth)
  api/          # API routes: /api/products, /api/orders, /api/submit-order
services/       # Google Sheets, Drive, catalog, orders logic
components/     # layout, products, seo, ui components
hooks/          # useCart, useWishlist, ...
utils/          # env, validators, formatters, security, seo helpers
types/          # shared TypeScript types
data/           # static data
public/         # static assets
```

## Deployment

This app needs a **Node.js server** (Next.js API routes for Sheets/Drive writes), so it deploys to Node hosts — `vercel.json` targets **Vercel (region blr1)**. It cannot be statically exported without removing the server-side order flow.

---

*Built by Girish Lade — free tools at [ladestack.in](https://ladestack.in)*
