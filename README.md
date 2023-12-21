# Career Canvas

**An AI-assisted, full-stack career platform that unifies resume building, job discovery, and cover-letter generation into a single guided workflow.**

Live demo: https://career-canvas.theharshdeepsingh.com

---

## Overview

Career Canvas is a React + Express/MongoDB application that brings three normally-disconnected job-search tasks under one roof: a template-driven resume builder with server-side PDF export, a job-discovery feed sourced from live LinkedIn listings, and an AI cover-letter generator that writes from a pasted job description plus the user's own profile data. The frontend (Create React App) and the REST API (Express) live in a single repository and are run together in development.

## Problem statement

Job seekers juggle three disconnected tasks — building a resume, finding relevant roles, and tailoring a cover letter to each one. Each lives in a different tool, and the context (your skills, your experience, the role you're applying to) has to be re-entered every time. Career Canvas keeps that context in one place: the profile that powers your resume also feeds the cover-letter generator, and a built-in job feed helps you find the roles you're tailoring for — so going from "found a role" to "tailored application" is a guided few minutes rather than hours of copy-paste busywork.

## Goals

- Build the platform end-to-end — data models, REST API, and UI — as one cohesive product rather than three separate tools.
- Let users compose a resume from structured profile data (skills, work experience, education, projects, trainings) and export a clean, print-ready PDF.
- Generate a personalized cover letter from a real job description combined with the user's stored skills and experience.
- Provide a job-discovery feed so role context can flow directly into the rest of the workflow.
- Keep all user content in MongoDB so the same profile drives every feature.

## Key features

- **Structured profile / resume data model** — Basic information, skills, work experience, education, projects, and trainings are each modeled as Mongoose schemas and exposed through CRUD REST endpoints under `/api/v1/user`.
- **Template-driven resume builder** — Users create and update named resume templates (`/api/v1/resumeTemplate`); a server-side template generator renders the selected template, with an optional theme color.
- **Server-side PDF generation via Puppeteer** — A headless-Chrome service (`services/puppeteer.service.js`) renders the resume HTML to a US-Letter PDF (`printBackground` enabled) and serves it for inline viewing or download.
- **AI cover-letter generation (streamed)** — The cover-letter endpoint pulls the user's stored skills and work experience, combines them with a submitted job description, and streams the generated letter back to the client token-by-token as it is produced.
- **Job discovery from live listings** — A scraping service queries LinkedIn's guest job-search endpoint and parses results with Cheerio into structured job objects (position, company, location, posting date, salary, logo, URL), with filters for keyword, location, date posted, and remote/on-site.
- **JWT authentication with rate limiting** — Registration and login issue JWTs; protected routes require a bearer token, and sensitive endpoints (auth, job search, cover letter, PDF) are wrapped in per-route rate limiters.

## Architecture & key decisions

**Single repo, two runtimes.** The Create React App frontend and the Express API share one `package.json`. In development they run concurrently (`concurrently`) with the CRA dev server proxying API calls to the Express server on port `8081`. In production (`MODE=production`) Express serves the built React bundle and falls back to `index.html` for non-API routes, so the whole app ships as one Node process.

**Headless Chrome for print-quality PDFs.** Resume export is done server-side with Puppeteer rather than browser-side print or a PDF-drawing library. Rendering the resume as real HTML/CSS in headless Chrome means the layout engine that designs the template is the same one that prints it, giving consistent, print-ready output (US-Letter, backgrounds preserved). The trade-off is a heavier server dependency (a bundled Chromium) and a single shared `temp/temp.pdf` artifact, which keeps the implementation simple but is single-tenant by design.

**Cover letters built from profile + job description, streamed in real time.** The generator (`services/CohereAI.service.js`) uses Cohere's `command` chat model. Rather than a generic prompt, it assembles a message from the user's stored skills and work experience plus the pasted job description, then instructs the model to return only the cover letter. The response is streamed (`chatStream`) and written to the HTTP response as it arrives, so the user sees the letter appear progressively instead of waiting for the full generation. The controller caps the job description length and the route limits requests per minute to keep generation cost and abuse bounded. *(Note: this build integrates Cohere as the LLM provider; the AI layer is isolated in a single service, so swapping providers is a localized change.)*

**Scraping the public job-search endpoint.** Job discovery hits LinkedIn's guest `seeMoreJobPostings` search API and parses the returned HTML with Cheerio. A `Query` builder maps human-friendly filter values (e.g. "remote", "past week", "senior") to LinkedIn's internal query parameters and paginates in batches of 25 up to a requested limit. This avoids any official-API dependency, at the cost of being tied to LinkedIn's markup and rate behavior — hence the request timeout and per-route rate limiting around it.

**Clean layered API.** Routes wire middleware and delegate to controllers; controllers handle the HTTP boundary (parse request, call a model/service, send JSON) and funnel errors through a single error middleware via a `req.error` convention; models/services hold data access (Mongoose) and external integrations (Cohere, Puppeteer, Cloudinary, scraping). A global middleware rejects non-standard HTTP methods, CORS is restricted to a configurable origin allow-list, and `x-powered-by` is disabled.

## Tech stack

**Frontend:** React 18, React Router 6, React-Bootstrap + Bootstrap 5, styled-components, Sass/SCSS, Axios, react-pdf (PDF viewing), react-quill (rich text), react-infinite-scroller, Font Awesome.

**Backend:** Node.js (>= 18), Express 4, Mongoose 7 (MongoDB), JSON Web Tokens (`jsonwebtoken`), `bcryptjs` for password hashing, Morgan + Winston for logging, CORS, `dotenv`.

**AI / scraping / PDF:** `cohere-ai` (cover-letter LLM), Puppeteer (headless-Chrome PDF generation), Cheerio + Axios (job-listing scraping), `html-to-text`.

**Dev tooling:** Create React App (`react-scripts`), `nodemon`, `concurrently`.

## Getting started

### Prerequisites

- Node.js >= 18
- A MongoDB instance (connection string)
- A Cohere API token (for cover-letter generation)

### 1. Install

```bash
git clone https://github.com/harshdeepsingh13/career-canvas.git
cd career-canvas
npm install
```

> Installing pulls in Puppeteer, which downloads a bundled Chromium build used for PDF generation.

### 2. Configure environment

Create a `.env` file in the project root. The server reads the following variables:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `PRIVATE_KEY` | Secret used to sign/verify JWTs |
| `COHERE_AI_TOKEN` | Cohere API token for cover-letter generation |
| `REGISTRATION_SECRET` | Secret required to authorize new account registration |
| `CLOUDINARY_DEFAULT_RESPONSE_URL` | Base URL for serving user avatar assets |
| `SERVER_PORT` / `PORT` | API port (defaults to `8081`) |
| `MODE` | Set to `production` to have Express serve the built React app |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allow-list of front-end origins (defaults to localhost:3000) |
| `REQUEST_BODY_LIMIT` | Max request body size (defaults to `100kb`) |
| `TRUST_PROXY` | Express `trust proxy` setting when running behind a reverse proxy |

> Optional legacy/token-auth variables (`ALLOW_LEGACY_SECRET_AUTH`, `LEGACY_SECRET_AUTH_SECRET`, `LEGACY_SECRET_AUTH_EXPIRES_AT`, `LEGACY_SECRET_ALLOWED_IPS`, `LEGACY_SECRET_USER_EMAIL`) exist for a deprecated auth path and are not needed for standard use.

### 3. Run in development

Run the Express API and the React dev server together:

```bash
npm run dev_start
```

This uses `concurrently` to start the API (`nodemon index.js`, port `8081`) and the React dev server (port `3000`, which proxies API requests to the server). You can also run them separately:

```bash
npm run server_start   # Express API only (nodemon)
npm run client_start   # React dev server only
```

### 4. Build for production

```bash
npm run build          # builds the React app into ./build
# (npm run build:low-memory is available for constrained environments)
```

Then start the server with `MODE=production` so Express serves the built bundle:

```bash
MODE=production npm run server_start
```

## Future scope

- Persist scraped job listings (currently fetched on demand) to enable saved searches, de-duplication, and per-job application tracking.
- Make resume export multi-tenant — generate per-request PDF artifacts instead of a single shared temp file.
- Add more resume templates (the generator registry currently ships one) and richer theming.
- Harden the job-discovery pipeline against source-markup changes (e.g. fallback parsing, monitoring).
- Abstract the AI layer behind a provider-agnostic interface so the LLM backend can be swapped or compared.

---

*Built by Harshdeep Singh — https://theharshdeepsingh.com*
