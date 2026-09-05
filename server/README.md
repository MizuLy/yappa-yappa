# Express Folder Structure

A clean, production-ready **Express.js** API starter template built with a well-organized, layered folder structure. It comes pre-configured with Prisma ORM, JWT authentication, validation, file uploads, email delivery, rate limiting, and more — so you can focus on writing your business logic.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Layers](#project-layers)

## Features

- ✨ **Express 5** with modular route/controller/service architecture
- 🗄️ **Prisma ORM** (PostgreSQL) for type-safe database access
- 🔐 **JWT authentication** (access + refresh tokens)
- 🧠 **Zod** schema validation for request payloads
- 📁 **File uploads** via Multer with Cloudinary storage
- 📧 **Email delivery** via Resend + Nodemailer (with Brevo support in env template)
- 🛡️ **express-rate-limit** for API protection
- 🔓 **CORS** with configurable whitelist
- 🍪 **cookie-parser** for handling cookies
- 📝 **Morgan** request logging
- 🚀 **Nodemon** hot-reload for development
- 🧪 Organized **unit & integration test** folders

## Tech Stack

| Category       | Packages                                                        |
| -------------- | --------------------------------------------------------------- |
| Runtime        | Node.js, Express 5                                              |
| Database       | Prisma ORM, @prisma/client (PostgreSQL)                         |
| Auth           | jsonwebtoken, bcrypt, cookie-parser                             |
| Validation     | zod                                                             |
| File Upload    | multer, cloudinary, multer-storage-cloudinary                   |
| Email          | resend, nodemailer                                              |
| Security       | express-rate-limit, cors, dotenv                                |
| Logging        | morgan                                                          |
| HTTP Client    | axios                                                          |
| Dev Tools      | nodemon, prisma                                                 |

## Folder Structure

```
express-folder-structure/
├── docs/
│   └── api/                    # API documentation
│       └── API.md
├── prisma/
│   ├── migrations/             # Generated Prisma migrations
│   └── schema.prisma           # Database schema definition
├── src/
│   ├── config/                 # App configuration & environment setup
│   ├── controllers/            # Request handlers (route logic)
│   ├── middlewares/            # Custom middleware (auth, error handling, etc.)
│   ├── routes/                 # Express route definitions
│   ├── services/               # Business logic layer
│   ├── utils/                  # Shared helper functions
│   ├── validators/             # Zod schemas for request validation
│   ├── app.js                  # Express app setup (middlewares, routes, errors)
│   └── server.js               # Server bootstrap (listening on PORT)
├── tests/
│   ├── integration/            # End-to-end / API tests
│   └── unit/                   # Unit tests
├── .env                        # Environment variables (not committed)
├── .env.example                # Example environment variables
├── prisma.config.ts            # Prisma configuration
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [PostgreSQL](https://www.postgresql.org/) database (local or cloud)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

### 3. Configure and run the database

```bash
# Generate the Prisma client
npx prisma generate

# Create and apply migrations (or run the existing ones)
npx prisma migrate dev

# (Optional) Seed the database if you have a seed script
# npx prisma db seed
```

### 4. Run the server

```bash
# Development (with nodemon hot-reload)
npm run dev

# Production
npm start
```

The server will start on the port defined in your `.env` (defaults to `PORT`).

## Environment Variables

| Variable                | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`          | Prisma connection string (`postgres://user:pass@host:port/db`)     |
| `FRONTEND_URL`          | Client app origin — used for the CORS whitelist                    |
| `PORT`                  | Port your Express server listens on (e.g. `5000`)                  |
| `NODE_ENV`              | `development` \| `production` \| `test`                            |
| `ACCESS_SECRET`         | Signing secret for short-lived JWT access tokens                   |
| `REFRESH_SECRET`        | Signing secret for long-lived JWT refresh tokens                   |
| `JWT_EXPIRES_IN`        | Access token lifespan, e.g. `15m`                                  |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account identifier — for image/file uploads             |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                                                 |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                                              |
| `BREVO_API_URL`         | Brevo transactional email API base URL                             |
| `BREVO_API_KEY`         | Auth key for sending emails via Brevo                              |
| `BREVO_SENDER_EMAIL`    | "From" address used when sending emails                            |

## Scripts

| Command       | Description                                   |
| ------------- | --------------------------------------------- |
| `npm run dev` | Start the server in development mode (nodemon)|
| `npm start`   | Start the server in production mode           |
| `npm test`    | Run tests (not yet configured)                |

## Project Layers

The `src/` directory follows a layered architecture so each concern has a dedicated place:

| Layer           | Responsibility                                              |
| --------------- | ----------------------------------------------------------- |
| `routes/`       | Map HTTP endpoints to controller methods                     |
| `controllers/`  | Receive requests, call services, send responses              |
| `services/`     | Core business logic, orchestration, data access (incl. Prisma client) |
| `validators/`   | Zod schemas that validate incoming request data              |
| `middlewares/`  | Reusable request pre/post-processing (auth, errors, uploads) |
| `config/`       | App config, env loading, external service clients            |
| `utils/`        | Small shared helper functions                                |
