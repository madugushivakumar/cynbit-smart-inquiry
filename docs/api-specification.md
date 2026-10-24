# Cynbit Smart Project Brief Builder — REST API Specification
**Version:** 1.0.0  
**Format:** RESTful JSON  
**Base Path:** `/api`

---

## 1. Global Standards

### 1.1 Content Types & Headers
All mutation and retrieval requests must transmit and accept JSON:
```http
Content-Type: application/json
Accept: application/json
```

### 1.2 Unified Response Schema
All API responses adhere to the following envelope structure:

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Human readable confirmation message"
}
```

#### Error Response
```json
{
  "success": false,
  "message": "High-level error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

## 2. Endpoints

### 2.1 Health & Service Verification
Checks backend liveness and database connectivity state.

- **Method:** `GET`
- **Route:** `/api/health`
- **Authentication:** None
- **Rate Limit:** 100 requests per 15 minutes

#### Response (200 OK)
```json
{
  "status": "ok",
  "service": "cynbit-smart-inquiry-api",
  "timestamp": "2026-10-24T11:30:00.000Z",
  "version": "1.0.0"
}
```

---

### 2.2 Submit Smart Project Brief
Creates and records a new structured project inquiry, validates requirements against domain schemas, saves to PostgreSQL, and issues a collision-resistant tracking reference.

- **Method:** `POST`
- **Route:** `/api/inquiries`
- **Authentication:** None (Public Client Submission)
- **Rate Limit:** 10 requests per 15 minutes per IP

#### Request Payload Specification
| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | Min 2, Max 100 chars | Full name of contact person |
| `email` | `string` | **Yes** | Valid email, Max 254 chars | Business email for follow-up |
| `companyName` | `string` | No | Max 100 chars | Company or organization |
| `serviceType` | `enum` | **Yes** | `AI_AUTOMATION`, `WEB_APPLICATION`, `MOBILE_APPLICATION`, `BACKEND_CLOUD`, `DIGITAL_MARKETING`, `CUSTOM_SOFTWARE` | Selected primary service |
| `projectTitle` | `string` | **Yes** | Min 3, Max 120 chars | Concise title for the project |
| `projectDescription`| `string` | **Yes** | Min 20, Max 2000 chars | Detailed functional description |
| `problemStatement` | `string` | **Yes** | Min 10, Max 1000 chars | Business problem to solve |
| `desiredOutcomes` | `string` | **Yes** | Min 10, Max 1000 chars | Quantifiable business goals |
| `technicalRequirements` | `string` | No | Max 800 chars | Preferred tech stack / frameworks |
| `existingSystemDetails` | `string` | No | Max 800 chars | Existing infrastructure / APIs |
| `budgetRange` | `enum` | No | `NOT_DECIDED`, `UNDER_25K`, `FROM_25K_TO_75K`, `FROM_75K_TO_200K`, `ABOVE_200K` | Expected budget bracket |
| `timeline` | `enum` | No | `ASAP`, `WITHIN_ONE_MONTH`, `ONE_TO_THREE_MONTHS`, `MORE_THAN_THREE_MONTHS`, `FLEXIBLE` | Expected delivery timeframe |
| `projectStage` | `enum` | No | `IDEA`, `REQUIREMENTS_DEFINED`, `DESIGN_COMPLETED`, `DEVELOPMENT_STARTED`, `EXISTING_IMPROVEMENT` | Current project maturity |
| `consentGiven` | `boolean` | **Yes** | Must evaluate to `true` | Data processing authorization |

#### Example cURL Request
```bash
curl -X POST http://localhost:3001/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Mercer",
    "email": "alex.mercer@enterprise.io",
    "companyName": "Mercer Global",
    "serviceType": "AI_AUTOMATION",
    "projectTitle": "Intelligent Document Processing Pipeline",
    "projectDescription": "We need an automated machine learning pipeline to ingest, extract, and categorize enterprise PDF invoices into our ERP.",
    "problemStatement": "Manual data entry takes 350 staff hours each month and causes a 4% error rate in invoice balancing.",
    "desiredOutcomes": "Automate 90% of invoice data extraction with sub-minute turnaround and ERP synchronization.",
    "technicalRequirements": "Python, FastAPI, LangChain or LlamaIndex, PostgreSQL, AWS S3",
    "budgetRange": "FROM_75K_TO_200K",
    "timeline": "ONE_TO_THREE_MONTHS",
    "projectStage": "REQUIREMENTS_DEFINED",
    "consentGiven": true
  }'
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": {
    "referenceCode": "CBQ-A9F2-4B2E810C",
    "name": "Alex Mercer",
    "serviceType": "AI_AUTOMATION",
    "projectTitle": "Intelligent Document Processing Pipeline",
    "status": "NEW",
    "createdAt": "2026-10-24T11:32:00.000Z"
  }
}
```

#### Response (400 Bad Request — Validation Error)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "projectDescription",
      "message": "Please describe your project in at least 20 characters"
    }
  ]
}
```

---

### 2.3 Retrieve Inquiry by Reference Code
Retrieves sanitized confirmation details using the issued inquiry reference code.

- **Method:** `GET`
- **Route:** `/api/inquiries/:referenceCode`
- **Parameters:**
  - `referenceCode` (Path Parameter, format: `CBQ-[A-Z0-9]{4}-[A-F0-9]{8}`)
- **Authentication:** None
- **Rate Limit:** 30 requests per 15 minutes per IP

#### Example Request
```bash
curl -X GET http://localhost:3001/api/inquiries/CBQ-A9F2-4B2E810C
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "referenceCode": "CBQ-A9F2-4B2E810C",
    "name": "Alex Mercer",
    "serviceType": "AI_AUTOMATION",
    "projectTitle": "Intelligent Document Processing Pipeline",
    "status": "NEW",
    "createdAt": "2026-10-24T11:32:00.000Z"
  }
}
```

#### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Inquiry not found"
}
```

#### Response (400 Bad Request — Malformed Reference Code)
```json
{
  "success": false,
  "message": "Invalid reference code format"
}
```
