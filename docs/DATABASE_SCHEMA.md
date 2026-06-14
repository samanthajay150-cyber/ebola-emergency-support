# Application Data Schema

## Database: SQLite
**Location**: `/data/applications.db`

---

## Tables

### applications

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | INTEGER | Auto | Primary key, auto-increment |
| application_id | TEXT | Yes | Unique application ID (EBM-YYYY-NNNNNN) |
| ready_to_proceed | BOOLEAN | Yes | Applicant confirmation to proceed |
| first_time_applicant | BOOLEAN | Yes | Is this their first application? |
| heard_about_funds | TEXT | Yes | How they learned about the fund |
| other_source | TEXT | No | Other source (if "Other" selected) |
| occupation | TEXT | Yes | Applicant's occupation category |
| other_occupation | TEXT | No | Other occupation (if "Other" selected) |
| full_name | TEXT | Yes | Applicant's full name |
| age | INTEGER | Yes | Applicant's age (14+) |
| email | TEXT | No | Email address (optional) |
| phone_number | TEXT | No | Phone number (optional) |
| country | TEXT | Yes | Country of residence |
| state | TEXT | Yes | State/Province/Region |
| town | TEXT | Yes | Town/City |
| status | TEXT | Default | Application status (pending, under_review, approved, rejected) |
| notes | TEXT | No | Admin review notes |
| reviewed_at | TEXT | No | Review timestamp (ISO 8601) |
| reviewed_by | TEXT | No | Admin username who reviewed |
| created_at | TEXT | Auto | Submission timestamp (ISO 8601) |

---

## Enum Values

### heard_about_funds
- `Social Media`
- `Healthcare Worker/Organization`
- `Community Leader`
- `Radio/TV`
- `Friend/Family`
- `Government Agency`
- `NGO/International Organization`
- `Other`

### occupation
- `Healthcare Worker`
- `Survivor`
- `Family Member of Victim/Survivor`
- `Community Health Worker`
- `Teacher/Educator`
- `Farmer`
- `Trader/Business Owner`
- `Student`
- `Other`

### status
- `pending` - Initial state
- `under_review` - Being reviewed
- `approved` - Application approved
- `rejected` - Application rejected

---

## Example Record

```json
{
  "id": 1,
  "application_id": "EBM-2026-13C59E",
  "ready_to_proceed": true,
  "first_time_applicant": true,
  "heard_about_funds": "Social Media",
  "other_source": null,
  "occupation": "Healthcare Worker",
  "other_occupation": null,
  "full_name": "John Doe",
  "age": 35,
  "email": "john@example.com",
  "phone_number": "+1234567890",
  "country": "Nigeria",
  "state": "Lagos",
  "town": "Lagos City",
  "status": "approved",
  "notes": "All documents verified. Approved for emergency financial assistance.",
  "reviewed_at": "2026-06-14 13:32:04",
  "reviewed_by": "admin",
  "created_at": "2026-06-14 13:31:08"
}
```

---

## Indexes

Recommended indexes for performance:

```sql
CREATE INDEX idx_status ON applications(status);
CREATE INDEX idx_created_at ON applications(created_at);
CREATE INDEX idx_country ON applications(country);
CREATE INDEX idx_application_id ON applications(application_id);
```

---

## Migrations

### v1.0.0 (Initial)
- Created applications table with all core fields

### Future Updates
- Add applicant_documents table
- Add review_history table
- Add user_accounts table for role-based access
