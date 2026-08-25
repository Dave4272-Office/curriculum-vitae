# Curriculum Vitae

Personal CV site built with [Next.js](https://nextjs.org) (App Router) and
[pnpm](https://pnpm.io) (see `packageManager` in `package.json`).
Enable Corepack (`corepack enable`) or install pnpm 10.34.5, then run
`pnpm install`.

## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `pnpm test`

Runs the Vitest suite once (CI-friendly). Use `pnpm test:watch` for watch
mode.

### `pnpm build`

Creates a production Next.js build. Vercel runs this automatically on deploy.

### `pnpm start`

Serves the production build locally (`next start`). Vercel runs the Next.js
server for you in production.

### `pnpm lint`

Runs ESLint with `eslint-config-next`.

## Hosting (Vercel)

Production hosting is **Vercel**. This repo is a standard Next.js app (no
`output: 'export'`, no `vercel.json`), so connecting GitHub is enough:

1. In [Vercel](https://vercel.com), import
   `Dave4272-Office/curriculum-vitae`.
2. Leave the Next.js preset. Vercel detects pnpm from `packageManager`.
3. Set optional environment variables (Production / Preview / Development)
   under Project Settings → Environment Variables:
   - `NEXT_PUBLIC_GTM_ID` — GTM container (defaults to `GTM-57TRFSCL` if
     unset).
   - `NEXT_PUBLIC_BASE_PATH` — only if the site is not served from `/`.
4. Deploy. Custom domains are configured in the Vercel project, not in this
   repo.

Security headers (CSP, Referrer-Policy, etc.) that previously lived in Apache
`.htaccess` are now set in `next.config.ts` and applied by the Next.js server
on Vercel. GTM and the Web Vitals reporter still load in the root layout.

## Google Tag Manager

The app measures Core Web Vitals with the npm `web-vitals` package and pushes
each metric to `window.dataLayer` as `{ event: "web_vitals", name, value,
rating, id, delta, navigationType? }`. It does not load a script from unpkg.
`entries` is omitted because GTM cannot serialize it.

Git cannot pause tags in the GTM UI. In the container
(`GTM-57TRFSCL` unless `NEXT_PUBLIC_GTM_ID` is set):

1. Pause or delete tag **web-vitals GA4** (demirj, “Load library from unpkg.com”).
2. Add a **GA4 Event** tag, trigger Custom Event `web_vitals`, and map metric
   fields to GA4 params.
3. Keep the existing Google Tag (Initialization – All Pages).
4. Publish the container.

## Learn More

See the [Next.js documentation](https://nextjs.org/docs) and
[Vercel Next.js guide](https://vercel.com/docs/frameworks/nextjs).
