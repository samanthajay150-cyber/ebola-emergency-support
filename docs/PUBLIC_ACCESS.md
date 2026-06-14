# 🌐 Public Access Information

## Live Application URL

**Main Application:**  
https://ebola-emergency-support-jakemore.zocomputer.io

**Admin Dashboard:**  
https://ebola-emergency-support-jakemore.zocomputer.io/admin/login

---

## Quick Access Credentials

### Admin Login
- **Username:** `admin`
- **Password:** `ebola2026admin`

⚠️ **Security Note:** Change these credentials in production! See `/server.ts` line 64.

---

## API Endpoints (Publicly Accessible)

### Base URL
```
https://ebola-emergency-support-jakemore.zocomputer.io/api
```

### Available Endpoints

#### 1. Submit Application
```bash
POST /api/applications
Content-Type: application/json
```

#### 2. Admin Login
```bash
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "ebola2026admin"
}
```

#### 3. Get Dashboard Stats
```bash
GET /api/admin/stats
```

#### 4. List Applications
```bash
GET /api/admin/applications
GET /api/admin/applications?status=pending
GET /api/admin/applications?search=john
```

#### 5. Get Application Details
```bash
GET /api/admin/applications/:id
```

#### 6. Update Application Status
```bash
PUT /api/admin/applications/:id/status
Content-Type: application/json

{
  "status": "approved",
  "notes": "Application approved",
  "reviewedBy": "admin"
}
```

---

## Status Values

- `pending` - New application awaiting review
- `under_review` - Application being reviewed
- `approved` - Application approved
- `rejected` - Application rejected

---

## Database

**Type:** PostgreSQL (Neon)  
**Connection:** Configured via `DATABASE_URL` environment variable  
**Tables:**
- `applications` - Stores all applications
- `admin_users` - Stores admin credentials (for future use)

---

## Architecture

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Bun + Hono
- **Database:** PostgreSQL (Neon)
- **Runtime:** Bun
- **Hosting:** Zo Computer (public URL)

---

## Features

### Public Pages
- ✅ Homepage with information
- ✅ Application submission form
- ✅ Application status tracking

### Admin Features
- ✅ Secure admin login
- ✅ Dashboard with statistics
- ✅ Application list with filtering
- ✅ Application detail view
- ✅ Status update workflow
- ✅ Search functionality
- ✅ Notes and review tracking

---

## Testing the Live Site

```bash
# Check if site is live
curl https://ebola-emergency-support-jakemore.zocomputer.io/

# Get dashboard stats
curl https://ebola-emergency-support-jakemore.zocomputer.io/api/admin/stats

# Admin login
curl -X POST https://ebola-emergency-support-jakemore.zocomputer.io/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ebola2026admin"}'
```

---

## Support

For issues or questions, check the logs:
```bash
tail -50 /dev/shm/ebola-emergency-support.log
tail -50 /dev/shm/ebola-emergency-support_err.log
```

---

**Last Updated:** 2026-06-14  
**Status:** ✅ LIVE and publicly accessible