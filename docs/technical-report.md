# Cynbit Smart Project Brief Builder — Full Technical Report
**Assessment:** Full Stack Developer Intern Technical Assessment  
**Candidate:** Shiva Kumar Madugu  
**Date:** October 2026  
**Repository:** `cynbit-smart-inquiry`

---

## 1. System Architecture Overview

The Cynbit Smart Project Brief Builder is architected as a modern, decoupled full-stack system emphasizing reliability, type safety, security, and exceptional user experience.

```
                    +-------------------------------------------------------+
                    |                      Client Tier                      |
                    |   React 19 + TypeScript + Vite + Tailwind CSS + Zod   |
                    +---------------------------+---------------------------+
                                                |
                                      REST HTTPS Requests
                                                |
                                                v
                    +-------------------------------------------------------+
                    |                      Server Tier                      |
                    |           Node.js + Express 5 + TypeScript            |
                    |                                                       |
                    |   [Helmet] -> [CORS] -> [Rate Limiter] -> [Morgan]    |
                    |                           |                           |
                    |                 [Routing Layer]                       |
                    |                           |                           |
                    |           [Zod Schema Validation Layer]               |
                    |                           |                           |
                    |                 [Controller Layer]                    |
                    |                           |                           |
                    |                  [Service Layer]                      |
                    +---------------------------+---------------------------+
                                                |
                                    Prisma ORM (Parameterized)
                                                |
                                                v
                    +-------------------------------------------------------+
                    |                     Database Tier                     |
                    |          PostgreSQL 15+ (Relational Database)         |
                    |        Indexed by email, status, service, date        |
                    +-------------------------------------------------------+
```

---

## 2. Frontend Engineering (Client Tier)

### 2.1 Technology Stack & Decisions
- **React 19 & TypeScript:** Strict typing ensures contract alignment between frontend models and backend DTOs.
- **Vite:** High-speed bundling, hot module replacement, and optimized tree-shaking for production distribution.
- **Tailwind CSS:** Custom dark-mode design system with curated gradients, glassmorphism (`backdrop-blur-lg`, translucent glass cards), and fluid micro-animations.
- **React Hook Form + Zod (`@hookform/resolvers/zod`):** Uncontrolled input performance with declarative schema validation and zero-lag form state updates.
- **Accessibility (a11y):** Form fields employ explicit `htmlFor`/`id` bindings, `aria-invalid`, `aria-describedby` pointing to error alerts, keyboard navigation, and semantic progress indicators.

### 2.2 User Journey & Wizard Workflow
The brief builder follows a progressive disclosure pattern across 5 distinct steps:
1. **Service Selection (`Step1Service`):** High-level categorization into Cynbit's 6 core service domains (AI Automation, Web Application, Mobile Application, Cloud/Backend, Digital Marketing, Custom Software).
2. **Project Specification (`Step2Details`):** Captures Project Title, in-depth Project Description, Problem Statement, Desired Outcomes, Technical Requirements, and Existing Systems with live character counters.
3. **Timeline & Budget Alignment (`Step3Budget`):** Project Stage (Idea through Existing Improvement), Budget Brackets (Under 25k to Above 200k), and Delivery Timelines.
4. **Identity & Data Consent (`Step4Contact`):** Full Name, Work Email, Company Name, and explicit, GDPR/DPDP-aligned consent authorization.
5. **Review & Confirmation (`Step5Review`):** Comprehensive pre-submission audit summary with one-click jump-to-step editing, submitting directly to the API and rendering the generated inquiry reference code.

---

## 3. Backend Engineering (Server Tier)

### 3.1 Technology Stack & Decisions
- **Node.js & Express 5:** High-performance asynchronous HTTP engine configured with strict TypeScript compiler options (`noImplicitAny`, `strictNullChecks`).
- **Layered Clean Architecture:**
  - `routes/`: Routing declarations and endpoint bindings.
  - `controllers/`: HTTP protocol translation, status codes, parameter parsing.
  - `validators/`: Zod schemas validating type, length, enum membership, and email patterns.
  - `services/`: Business logic, reference code generation, database persistence.
  - `middleware/`: Centralized error handling, security middleware, and request logging.
  - `config/`: Environment configuration and singleton database client management.

### 3.2 Reference Code Generation Strategy
Inquiries are assigned a standardized, human-readable yet collision-resistant reference identifier:
`CBQ-[4 CHAR SERVICE HASH]-[8 CHAR CRYPTOGRAPHIC TIMESTAMP/NANOID]`  
*Example:* `CBQ-W8K1-9F2D84A1`

This ensures that prospective clients can reference their submission in support calls, while internal teams can instantly identify the origin service category and creation timeframe.

---

## 4. Database Schema & Data Modeling

The relational PostgreSQL schema is declared and managed through **Prisma ORM**:

```prisma
enum ServiceType {
  AI_AUTOMATION
  WEB_APPLICATION
  MOBILE_APPLICATION
  BACKEND_CLOUD
  DIGITAL_MARKETING
  CUSTOM_SOFTWARE
}

enum BudgetRange {
  NOT_DECIDED
  UNDER_25K
  FROM_25K_TO_75K
  FROM_75K_TO_200K
  ABOVE_200K
}

enum Timeline {
  ASAP
  WITHIN_ONE_MONTH
  ONE_TO_THREE_MONTHS
  MORE_THAN_THREE_MONTHS
  FLEXIBLE
}

enum ProjectStage {
  IDEA
  REQUIREMENTS_DEFINED
  DESIGN_COMPLETED
  DEVELOPMENT_STARTED
  EXISTING_IMPROVEMENT
}

enum InquiryStatus {
  NEW
  REVIEWING
  CONTACTED
  CLOSED
}

model Inquiry {
  id                    Int           @id @default(autoincrement())
  referenceCode         String        @unique
  name                  String        @db.VarChar(100)
  email                 String        @db.VarChar(254)
  companyName           String?       @db.VarChar(100)
  serviceType           ServiceType
  projectTitle          String        @db.VarChar(120)
  projectDescription    String        @db.VarChar(2000)
  problemStatement      String        @db.VarChar(1000)
  desiredOutcomes       String        @db.VarChar(1000)
  technicalRequirements String?       @db.VarChar(800)
  existingSystemDetails String?       @db.VarChar(800)
  budgetRange           BudgetRange?
  timeline              Timeline?
  projectStage          ProjectStage?
  consentRecordedAt     DateTime
  status                InquiryStatus @default(NEW)
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  @@index([email])
  @@index([status])
  @@index([serviceType])
  @@index([createdAt])
}
```

### Database Optimization:
- **Indexing:** B-Tree indexes on `email`, `status`, `serviceType`, and `createdAt` enable instantaneous triage queries and status lookups.
- **Data Integrity:** Native Postgres `ENUM` types enforce domain integrity at the database engine level, rejecting invalid categories before persistence.

---

## 5. Security & Defensive Engineering

1. **Helmet HTTP Header Hardening:** Protects against XSS, clickjacking, MIME-sniffing, and cross-site tracking (`helmet()`).
2. **Strict CORS Policy:** Configured to whitelist authorized client origins (`CLIENT_ORIGIN`), rejecting cross-origin requests from untrusted domains.
3. **Rate Limiting:** IP-based rate limiting via `express-rate-limit` prevents spam bot submissions and Denial of Service (DoS) attacks on inquiry endpoints.
4. **Strict Input Sanitization & Validation:** Zod schemas enforce string trimming, email normalization to lowercase, character length boundaries, and strict enum checking.
5. **SQL Injection Immunity:** All database queries utilize Prisma's strongly-typed parameterized driver, ensuring zero risk of SQL injection vulnerabilities.

---

## 6. Verification & Automated Testing

### 6.1 Backend API Tests (`server/src/__tests__/inquiry.test.ts`)
12 automated tests using **Vitest** and **Supertest** covering:
- Health check verification (`GET /api/health`).
- Valid inquiry submission and 201 response with generated reference code.
- Validation failures (missing required fields, malformed email, invalid service enum, ungranted consent, short descriptions, invalid budget).
- Graceful database error handling returning standard 500 JSON without exposing internal stack traces.
- Reference code lookup (`GET /api/inquiries/:referenceCode`) with 200, 404 (non-existent), and 400 (malformed code) assertions.

### 6.2 Frontend Component Tests (`client/src/__tests__/components.test.tsx`)
11 automated tests using **Vitest**, **React Testing Library**, and **User Event** covering:
- `Step1Service`: Option rendering, radio selection, validation upon empty submission, state preservation.
- `Step4Contact`: Required field validation, email format checking, explicit consent enforcement, back button navigation.
- `ConfirmationScreen`: Rendering of unique reference code, confirmation messaging, and "Start Another Brief" callback handling.

### 6.3 Test Execution Summary
- **Server Test Suite:** 12 passed / 12 total (100% pass rate).
- **Client Test Suite:** 11 passed / 11 total (100% pass rate).
- **TypeScript Typecheck:** 0 errors across frontend and backend builds.
