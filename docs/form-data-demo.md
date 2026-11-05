# React + .NET: repeated form fields

This isolated, stateless demo accompanies the Material UI multiple-select
`FormData` discussion: <https://github.com/mui/material-ui/issues/48678>.
It does not change the catalog, place orders, or store preferences.

## What it demonstrates

The controlled MUI `Select` has no `name`. One hidden input named `categories`
is rendered for each selected category. `new FormData(form).getAll('categories')`
therefore returns distinct values instead of a comma-joined string.

The value `home,garden` deliberately contains a comma. It is one stable demo ID,
not two categories. It must never be reconstructed by splitting a string.
Clearing the selection removes the hidden inputs, so no stale values are sent.

The .NET `[FromForm]` model binder receives the repeated values as `string[]`.
The API accepts an empty selection, and returns HTTP 400 validation details for
unknown or duplicate IDs. It rejects JSON with HTTP 415 because this endpoint
exists to demonstrate form encoding. Allowed categories come from
`GET /api/form-data-demo/options`; `POST /api/form-data-demo` validates and echoes
the selection. The request body limit is 16 KiB.

## Run locally

Requirements: .NET SDK/runtime 9 and Node.js 22 or later. The application target
remains `net9.0`. Use local test data only.

From the repository root in PowerShell:

```powershell
dotnet restore FormDataDemo.sln
./scripts/Start-FormDataDemo.ps1
```

The script starts only the local API at `http://127.0.0.1:5037`. The explicit
`FormDataDemo` environment skips the existing store database/user seeding. It
supplies an in-memory connection configuration and a clearly marked local-only
JWT setting needed by the existing authentication setup. The demo endpoint does
not use authentication or the database. Other store routes need the normal
application configuration and are not part of this demo.

In another terminal:

```powershell
cd client
npm ci
npm run dev -- --host 127.0.0.1
```

Open <http://127.0.0.1:3000/form-data-demo>. Vite proxies only this demo's API
requests to the local API. The demo is outside the store layout to avoid starting
cart/account requests or depending on a store database.

## Verify

```powershell
dotnet test tests/API.Tests/API.Tests.csproj
cd client
npm run build
npx eslint src/features/form-data-demo/FormDataDemo.tsx e2e/form-data-demo.spec.ts playwright.config.ts
npx playwright install chromium --no-shell
npm run test:e2e
```

Keep the API running for the browser tests. Playwright starts Vite automatically.
HTTP integration tests start their own in-process host with test-only
configuration and never connect to the store database.

If managed Windows policies prevent the downloaded Chromium from starting, use
an installed Chrome or Edge: set `$env:PLAYWRIGHT_CHANNEL = 'chrome'` or `'msedge'`
before `npm run test:e2e`.

The tests cover real multipart binding, a comma-containing value, clearing,
unknown/duplicate IDs, an incorrect content type, keyboard selection, and API
load failures. Browser tests use a real .NET endpoint for successful submissions.
An oversized multipart request is rejected by ASP.NET's form reader with HTTP
400 validation details describing the 16 KiB limit.

## Portfolio evidence

Keep the issue/PR link, the commit tested, test results, and a brief explanation
of the data path: controlled React state -> repeated HTML fields -> multipart
request -> .NET array binding -> allowlist validation -> API response.
Describe an upstream contribution as submitted or merged only after that state
actually exists. This repository example by itself is not an upstream MUI fix.
