# leventegall.dev

Production Next.js portfolio and software engineering showcase for Levente Gáll (Full-Stack Developer & Brand Strategist). Built with Next.js 16, React 19, TypeScript, and a zero-runtime tokenized Vanilla CSS architecture.

---

## Overview

This repository powers [leventegall.dev](https://leventegall.dev), featuring an interactive cyberpunk/aerospace-inspired telemetry HUD interface, bilingual localized routing (English and Hungarian), secure API endpoints, embedded database persistence, and comprehensive SEO and LLM discoverability layers.

---

## Core Features

- Modern App Router Architecture: Next.js 16 with React 19 Server Components and Client Components where interactivity is required.
- Bilingual Internationalization: Full English (`/`) and Hungarian (`/hu`) localization with semantic hreflang alternate links and zero layout shifts.
- Hardened Security Pipeline:
  - Strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and frame-ancestors restrictions.
  - Contact API with Zod schema validation, CSRF double-submit token verification, client honeypot bot trap, and sliding-window rate limiting.
- SQLite Persistence Layer: Embedded transactional database operating in Write-Ahead Logging (WAL) mode for contact inquiries with telemetry tracking.
- Interactive HUD Components:
  - Audio Player: Expandable console player with frequency visualizer integration and Mixcloud audio streaming.
  - Project Gallery: Responsive screenshot grid with accessible Lightbox modal and keyboard navigation.
  - Client Reviews: Testimonials carousel featuring verified international founder feedback.
  - Telemetry Dashboard: Categorized technical skills matrix with interactive tag filtering.
- Dedicated Case Study: Detailed architectural breakdown for Swaya Media Manager (`/projects/swaya`), highlighting multi-process Electron, Python FastAPI daemons, and MPV IPC streaming.
- SEO & Machine Discovery:
  - Validated Schema.org JSON-LD graph (`ProfilePage`, `Person`, `ProfessionalService` with worldwide service area, `WebSite`).
  - Automated OpenGraph and Twitter social cards generated via `@vercel/og`.
  - RFC 9309 compliant `robots.txt` and deterministic `sitemap.xml`.
  - Structured LLM discovery manifests (`/llms.txt` and `/llms-full.txt`).

---

## Technology Stack

- Framework: Next.js 16 (Standalone Output)
- Library: React 19
- Language: TypeScript 5 (Strict Mode)
- Styling: Token-based Vanilla CSS, CSS Modules, CSS Custom Properties (Zero runtime overhead)
- Database: Embedded SQLite with WAL mode
- Validation: Zod
- Iconography: `@carbon/icons-react`
- Testing Suite:
  - Unit & Integration: Vitest, React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event`
  - End-to-End: Playwright
- Code Quality & Static Analysis:
  - Linter: ESLint 9 (Flat Config, security, jsx-a11y)
  - Style Linter: Stylelint with standard recess property order
  - Spellchecker: CSpell
  - Dead Code / Unused Exports: Knip
  - Secret Scanning: Secretlint
- Containerization: Multi-stage Dockerfile (Node 22 Alpine), Docker Compose

---

## Repository Structure

```text
my-website/
├── public/                     # Static assets, icons, and discovery manifests
│   ├── llms.txt                # Short machine-readable LLM summary
│   ├── llms-full.txt           # Comprehensive LLM architectural knowledge base
│   └── projects/               # Case study and project visual assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (en)/               # English root route group (/, /projects/swaya)
│   │   ├── hu/                 # Hungarian localized route group (/hu)
│   │   ├── api/                # API route handlers (/api/contact, /api/health)
│   │   ├── robots.ts           # Dynamic RFC 9309 robots generator
│   │   ├── sitemap.ts          # Deterministic sitemap generator
│   │   └── not-found.tsx       # Isolated 404 handler with noindex directive
│   ├── components/             # Reusable UI primitives and section components
│   │   ├── ui/                 # Avatar, Lightbox, Tooltip, Select, CardMetaBar
│   │   ├── AudioPlayer.tsx     # HUD audio player with stream integration
│   │   ├── ContactForm.tsx     # Telemetry contact form with CSRF validation
│   │   ├── ProjectGallery.tsx  # Interactive screenshot viewer
│   │   ├── StructuredData.tsx  # Schema.org JSON-LD graph provider
│   │   └── Testimonials.tsx    # Verified client reviews carousel
│   ├── config/                 # Central site metadata and navigation configuration
│   ├── lib/                    # Core server utilities (database, rate limiter, CSRF)
│   └── locales/                # Internationalization dictionaries (en.ts, hu.ts)
├── .dockerignore
├── .lintstagedrc.json          # Pre-commit hook configuration
├── Dockerfile                  # Multi-stage production container definition
├── docker-compose.yml          # Production container orchestration
├── eslint.config.mjs           # ESLint 9 configuration
├── next.config.ts              # Next.js build and security headers configuration
├── package.json
├── tsconfig.json
└── vitest.config.ts            # Vitest configuration and path alias resolution
```

---

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stargate91/my-website.git
   cd my-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the project root:
   ```env
   # Optional: Upstash Redis for distributed rate limiting
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=

   # Application settings
   NODE_ENV=development
   ```

### Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles the production build with standalone output |
| `npm run start` | Launches the compiled production server |
| `npm run test` | Executes the Vitest test suite |
| `npm run test:watch` | Runs Vitest in interactive watch mode |
| `npm run test:coverage`| Generates test coverage reports |
| `npm run test:e2e` | Runs Playwright end-to-end integration tests |
| `npm run lint` | Runs ESLint and Stylelint |
| `npm run lint:fix` | Automatically fixes ESLint and Stylelint issues |
| `npm run lint:spell` | Validates spelling across source files with CSpell |
| `npm run lint:knip` | Detects unused files, dependencies, and exports |
| `npm run lint:secrets` | Scans workspace for exposed credentials and tokens |
| `npm run lint:all` | Executes the complete quality pipeline (lint, spell, knip, test) |

---

## Quality and Testing

The repository maintains an automated test suite covering components, API routes, database operations, security middleware, and SEO standards:

```bash
npm run test
```

Currently active test suites cover:
- Automated SEO verification (robots.txt, sitemap.xml, canonicals, hreflang, OG tags, LLM manifests)
- Schema.org JSON-LD structural compliance
- CSRF validation and rate-limiting enforcement
- SQLite persistence transactions and unique constraint integrity
- Contact form input validation, error handling, and honeypot traps
- UI component accessibility (ARIA attributes, roles, and focus states)

---

## Production Deployment with Docker

Build and run the lightweight standalone production image:

```bash
# Build the Docker image
docker build -t cosmic_portfolio .

# Run container with mapped port
docker run -d -p 3000:3000 --name cosmic_portfolio cosmic_portfolio
```

Or deploy using Docker Compose:

```bash
docker compose up -d --build
```

The container includes a built-in health check probe targeting `/api/health` every 30 seconds.

---

## Author

- Name: Levente Gáll
- Callsign: STARGATE91
- Website: [https://leventegall.dev](https://leventegall.dev)
- GitHub: [@stargate91](https://github.com/stargate91)
- LinkedIn: [in/leventegall](https://www.linkedin.com/in/leventegall)
