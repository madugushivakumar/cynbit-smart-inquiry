# Cynbit Smart Project Brief Builder

> **Full Stack Developer Intern Technical Assessment**  
> **Candidate:** Shiva Kumar Madugu  
> **Target Domain:** [https://www.cynbit.in/](https://www.cynbit.in/)  
> **Live Demo:** [Cynbit Smart Brief Builder](https://cynbit-smart-inquiry.vercel.app) *(or local preview)*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Express 5](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma 6](https://img.shields.io/badge/Prisma_6-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

---

## 📌 Problem Statement & Opportunity

An audit of [Cynbit Technologies' website](https://www.cynbit.in/) revealed that prospective clients submitting inquiries are constrained to a single, generic `message` textarea. This unstructured intake mechanism causes:
1. **Prolonged scoping cycles:** Cynbit leads and engineers spend multiple emails extracting basic technical scope, budget brackets, and timelines.
2. **Ambiguous project briefs:** Clients omit key technical constraints, desired outcomes, and existing system details.
3. **Absence of tracking:** Inquirers receive only an ephemeral confirmation without an inquiry reference number.

### 💡 The Solution: Cynbit Smart Project Brief Builder
A production-grade, 5-step guided wizard that captures structured project specifications upfront, validates schemas in real time, and issues a collision-resistant tracking reference code (`CBQ-XXXX-XXXXXXXX`) stored in a relational PostgreSQL database.

---

## 🚀 Key Features

- **Progressive 5-Step Intake:**
  1. *Service Selection:* Categorized across Cynbit's 6 core service domains.
  2. *Project Details:* Problem statement, desired outcomes, technical requirements, and existing architecture.
  3. *Timeline & Budget:* Budget brackets, target launch timeline, and project maturity stage.
  4. *Contact & Consent:* Contact info with explicit GDPR/DPDP data protection consent.
  5. *Review & Confirm:* Pre-submission audit summary with one-click inline step editing.
- **Dynamic Character Counters & Live Validation:** Real-time feedback via Zod and React Hook Form.
- **Reference Code Generator (`CBQ-XXXX-XXXXXXXX`):** Unique inquiry reference code for client tracking.
- **Enterprise Security:** Hardened with Helmet HTTP headers, CORS whitelisting, express-rate-limit protection, and parameterized SQL queries.
- **Automated Test Coverage:** 100% test pass rate across 23 automated tests (12 backend, 11 frontend).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, React Hook Form, Zod |
| **Backend** | Node.js, Express 5, TypeScript, Zod, Helmet, CORS, Morgan, Nanoid |
| **ORM & Database** | Prisma ORM 6, PostgreSQL (with indexing and domain enums) |
| **Testing** | Vitest, React Testing Library, Supertest, User Event |
| **Documentation** | REST API Spec, Architecture Report, Website Audit & Opportunity Analysis |

---

## 📁 Repository Structure

```
cynbit-smart-inquiry/
├── client/                     # Frontend React 19 application
│   ├── src/
│   │   ├── components/         # Step wizard components, forms, progress bar
│   │   ├── pages/              # LandingPage, InquiryWizardPage
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── services/           # Axios API client
│   │   ├── types/              # TypeScript interface definitions
│   │   └── __tests__/          # Vitest + React Testing Library tests
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                     # Backend Node.js + Express 5 API
│   ├── prisma/
│   │   └── schema.prisma       # Prisma PostgreSQL schema
│   ├── src/
│   │   ├── config/             # Database connection singleton & env
│   │   ├── controllers/        # Request handling & HTTP responses
│   │   ├── middleware/         # Error handler, rate limiter
│   │   ├── routes/             # Express API routes
│   │   ├── services/           # Business logic & reference generator
│   │   ├── validators/         # Zod schemas for backend validation
│   │   └── __tests__/          # Vitest + Supertest integration tests
│   ├── package.json
│   └── tsconfig.json
├── docs/                       # Comprehensive Technical Documentation
│   ├── audit-and-improvement.md# Website audit and opportunity analysis
│   ├── technical-report.md     # Architecture and system documentation
│   ├── api-specification.md    # REST API endpoints & schemas
│   └── deployment-guide.md     # Local setup & cloud deployment guide
└── package.json                # Monorepo task orchestration scripts
```

---

## ⚡ Quickstart (Local Development)

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) running locally or on a cloud provider (e.g. Neon)

### 2. Setup & Install
```bash
# Clone the repository
git clone https://github.com/madugushivakumar/cynbit-smart-inquiry.git
cd cynbit-smart-inquiry

# Install client and server dependencies
cd client && npm install
cd ../server && npm install
```

### 3. Environment Setup
Create `server/.env`:
```ini
PORT=3001
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://postgres:password@localhost:5432/cynbit_inquiry?schema=public"
```

Create `client/.env`:
```ini
VITE_API_URL=http://localhost:3001/api
```

### 4. Database Setup
```bash
cd server
npm run db:generate
npm run db:migrate:dev -- --name init
```

### 5. Run the Application
In separate terminals:
```bash
# Backend (http://localhost:3001)
cd server && npm run dev

# Frontend (http://localhost:5173)
cd client && npm run dev
```

---

## 🧪 Testing

```bash
# Run backend tests (12 tests)
cd server && npm test

# Run frontend tests (11 tests)
cd client && npm test

# Verify production builds
cd server && npm run build
cd ../client && npm run build
```

---

## 📖 Detailed Documentation

- [Website Audit & Opportunity Analysis](docs/audit-and-improvement.md)
- [Complete Technical Report & Architecture](docs/technical-report.md)
- [REST API Specification](docs/api-specification.md)
- [Deployment Guide](docs/deployment-guide.md)

---

## 👨‍💻 Candidate Information

- **Name:** Shiva Kumar Madugu
- **Role:** Full Stack Developer Intern Assessment
- **Company:** Cynbit Technologies
- **Email:** shiva.madugu.dev@gmail.com
- **GitHub:** [github.com/madugushivakumar](https://github.com/madugushivakumar)
