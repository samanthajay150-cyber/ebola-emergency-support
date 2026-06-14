# Admin Dashboard - Approval Workflow Documentation

## 🎯 System Overview

The Ebola Emergency Support admin dashboard provides a complete approval workflow for managing financial assistance applications from Ebola victims and affected families.

---

## 🔐 Default Admin Credentials

**Login URL**: `/admin/login`  
**Username**: `admin`  
**Password**: `ebola2026admin`

## Status Definitions

| Status | Label | Color | Description |
|--------|-------|-------|-------------|
| `pending` | Pending Review | Yellow | New application awaiting initial review |
| `under_review` | Under Review | Blue | Application being reviewed by admin |
| `approved` | Approved | Green | Application approved for assistance |
| `rejected` | Rejected | Red | Application denied with reason |

---

## API Endpoints Reference

### Authentication

#### POST /api/admin/login
Admin authentication endpoint.

**Request Body:**
```json
{
  "username": "admin",
  "password": "ebola2026admin"
}
```

**Response:**
```json
{
  "success": true,
  "token": "hex-token-string",
  "user": {
    "username": "admin"
  }
}
```

---

### Dashboard & Statistics

#### GET /api/admin/stats
Get application statistics.

**Response:**
```json
{
  "total": 4,
  "pending": 0,
  "underReview": 2,
  "approved": 1,
  "rejected": 1,
  "recent": [...]
}
```

---

### Applications Management

#### GET /api/admin/applications
List all applications with optional filters.

**Query Parameters:**
- `status` - Filter by status (pending, under_review, approved, rejected)
- `search` - Search by name, application ID, email, or phone
- `limit` - Results per page (default: 50)
- `offset` - Pagination offset

**Response:**  
```json
{
  "applications": [...],
  "total": 4,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/admin/applications/:id
Get single application details.

**Response:**
```json
{
  "application": {
    "id": 1,
    "application_id": "EBM-2026-E281EF",
    "full_name": "John Kofi Mensah",
    "age": 34,
    "email": "john@example.com",
    "phone_number": "+233501234567",
    "country": "Ghana",
    "state": "Greater Accra",
    "town": "Accra",
    "occupation": "Healthcare Worker",
    "status": "approved",
    "notes": "Application approved...",
    "created_at": "2026-06-14T13:59:48.021Z"
  }
}
```

#### PUT /api/admin/applications/:id/status
Update application status.

**Request Body:**
```json
{
  "status": "approved",
  "notes": "All documents verified.",
  "reviewedBy": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "application": {...}
}
```

---

## PostgreSQL Database Schema

**Database**: Neon PostgreSQL  
**Connection**: Configured via `DATABASE_URL` env var

### Applications Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| application_id | VARCHAR(20) | Unique ID (EBM-YYYY-XXXXXX) |
| full_name | VARCHAR(255) | Applicant name |
| age | INTEGER | Applicant age |
| email | VARCHAR(255) | Email address |
| phone_number | VARCHAR(50) | Phone number |
| country | VARCHAR(100) | Country |
| state | VARCHAR(100) | State/Region |
| town | VARCHAR(100) | Town/City |
| occupation | VARCHAR(100) | Occupation |
| status | VARCHAR(50) | Application status |
| notes | TEXT | Admin notes |
| reviewed_by | VARCHAR(100) | Reviewer username |
| reviewed_at | TIMESTAMP | Review timestamp |
| created_at | TIMESTAMP | Application timestamp |

---
