# Cynbit Smart Project Brief Builder — Setup & Deployment Guide
**Candidate:** Shiva Kumar Madugu  
**Date:** October 2026

---

## 1. Prerequisites

Ensure you have the following installed locally:
- **Node.js:** v18.0.0 or later (v20+ or v24+ recommended)
- **npm:** v9.0.0 or later
- **PostgreSQL:** v14+ (Local installation, Docker container, or cloud database like Neon / Supabase / Railway)
- **Git**

---

## 2. Local Development Setup

### 2.1 Clone and Install Dependencies
```bash
git clone https://github.com/shivamvk/cynbit-smart-inquiry.git
cd cynbit-smart-inquiry

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2.2 Configure Environment Variables

#### Backend (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```ini
PORT=3001
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://postgres:password@localhost:5432/cynbit_inquiry?schema=public"
```

#### Frontend (`client/.env`)
Create `client/.env` based on `client/.env.example`:
```ini
VITE_API_URL=http://localhost:3001/api
```

### 2.3 Initialize Database with Prisma
Run database migrations and generate the Prisma Client:
```bash
cd server
npm run db:generate
npm run db:migrate:dev -- --name init
```

### 2.4 Run Development Servers
In two separate terminals:

```bash
# Terminal 1 - Backend Server (runs on http://localhost:3001)
cd server
npm run dev

# Terminal 2 - Frontend Client (runs on http://localhost:5173)
cd client
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to test the application interactively.

---

## 3. Automated Testing & Verification

Run the test suites locally to ensure all functionality behaves as expected:

```bash
# Run server test suite (12 tests)
cd server
npm test

# Run client test suite (11 tests)
cd client
npm test

# Verify production builds
cd server && npm run build
cd ../client && npm run build
```

---

## 4. Production Cloud Deployment Guide

### 4.1 Step 1: Deploy PostgreSQL Database
Choose a managed cloud database provider:
- **Neon (Recommended):** [https://neon.tech](https://neon.tech) (Serverless Postgres, free tier, instant provisioning).
- **Supabase:** [https://supabase.com](https://supabase.com).
- **Railway:** [https://railway.app](https://railway.app).

Copy the pooled or direct connection string:
```
postgresql://neondb_owner:PASSWORD@ep-random-1234.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 4.2 Step 2: Deploy Backend API (e.g. Render / Railway)

#### Using Render Web Service:
1. Connect your GitHub repository.
2. Configure settings:
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run db:generate && npm run build`
   - **Start Command:** `npm start`
3. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: *(Your production Postgres connection string)*
   - `CLIENT_ORIGIN`: *(Your frontend deployed domain, e.g., `https://cynbit-brief-builder.vercel.app`)*
4. Run migrations against production database:
   - Using Render Shell: `npx prisma migrate deploy`
   - Or locally: `DATABASE_URL="..." npx prisma migrate deploy`

### 4.3 Step 3: Deploy Frontend (e.g. Vercel / Netlify)

#### Using Vercel:
1. Import repository on Vercel.
2. Configure project:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add Environment Variables:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com/api`
4. Deploy.

---

## 5. Post-Deployment Verification Checklist

- [ ] `GET /api/health` returns `200 OK` with status `ok`.
- [ ] Frontend loads with glassmorphism theme, responsiveness, and clear typography.
- [ ] Submitting a valid brief creates a row in PostgreSQL and displays the `CBQ-XXXX-XXXXXXXX` confirmation screen.
- [ ] Submitting empty required fields triggers real-time inline alerts and disables progression.
- [ ] CORS permits requests from your frontend domain and blocks arbitrary origins.
- [ ] Rate limiter blocks aggressive submission bursts.
