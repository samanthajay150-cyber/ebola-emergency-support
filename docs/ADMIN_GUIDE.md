# Admin Dashboard Guide

## Access

**Admin Login URL**: `/admin/login`

**Default Credentials**:
- Username: `admin`
- Password: `ebola2026admin`

⚠️ **Important**: Change these credentials in a production environment!

---

## Dashboard Overview

The admin dashboard provides a comprehensive view of all applications and their statuses.

### Key Metrics Displayed:
- **Total Applications**: All submitted applications
- **Pending Review**: Applications awaiting review
- **Under Review**: Applications currently being reviewed
- **Approved**: Successfully approved applications
- **Rejected**: Declined applications

---

## Application Workflow

### Status Flow

```
PENDING → UNDER_REVIEW → APPROVED
                      ↘ REJECTED
```

### Status Definitions

| Status | Description | Color Code |
|--------|-------------|------------|
| **Pending** | New application, not yet reviewed | Yellow |
| **Under Review** | Being actively reviewed by admin | Blue |
| **Approved** | Application approved, eligible for assistance | Green |
| **Rejected** | Application declined | Red |

---

## Managing Applications

### Viewing Applications List

1. Navigate to **Applications** from the sidebar
2. Use filters to narrow down by status:
   - All
   - Pending
   - Under Review
   - Approved
   - Rejected
3. Search by:
   - Name
   - Application ID
   - Country
   - Email

### Application Details

Click on an application to view full details:

**Personal Information**:
- Full name, age, contact details
- Country, state, town
- Occupation

**Application Information**:
- Application ID
- Submission date
- How they heard about the fund
- First-time applicant status

**Review Information**:
- Current status
- Review notes
- Reviewed by
- Review date

### Approving/Rejecting Applications

1. Open an application from the list
2. Review all details carefully
3. Add review notes (required)
4. Click the appropriate action button:
   - **Approve**: Mark as approved
   - **Reject**: Mark as rejected
5. Add notes explaining the decision
6. Click **Confirm**

### Bulk Actions

Use the applications list to perform bulk operations:
- Filter by status
- Export filtered applications to CSV
- Batch status updates

---

## Dashboard Analytics

### Monthly Trends
View application submissions over time with line charts showing:
- Total applications per day/week/month
- Approval rates
- Geographic distribution

### Geographic Distribution
See applications breakdown by:
- Country
- State/Region
- Most affected areas

### Top Occupations
Track which occupations are most represented:
- Healthcare Workers
- Survivors
- Family Members
- Community Health Workers
- Other categories

---

## Security Features

### Authentication
- Token-based authentication
- Session management
- Auto-logout on inactivity

### Authorization
- Protected routes
- Role-based access control (future)
- Audit trail for all actions

### Data Protection
- Secure data transmission
- Encrypted sensitive fields
- Regular backups

---

## Best Practices

### Review Process

1. **Review all information carefully** before making a decision
2. **Verify contact information** can be reached
3. **Check for completeness** - all required fields filled
4. **Document decisions** - always add notes explaining approval/rejection
5. **Be consistent** - apply criteria uniformly

### Common Review Criteria

✅ **Approve if**:
- All information is complete and verifiable
- Applicant meets eligibility criteria
- Contact information is valid
- Clear connection to Ebola impact

❌ **Reject if**:
- Information is incomplete or unverifiable
- Applicant doesn't meet criteria
- Contact information is invalid
- No clear connection to Ebola impact

🔄 **Request More Info** (set to Under Review):
- Missing documentation
- Unclear details
- Need verification
- Special circumstances

---

## API Endpoints

### Authentication
```
POST /api/admin/login
Body: { username, password }
Response: { success, token, user }
```

### Applications
```
GET /api/admin/applications?status=pending&search=john
GET /api/admin/applications/:id
PUT /api/admin/applications/:id/status
Body: { status, notes, reviewedBy }
```

### Statistics
```
GET /api/admin/stats
Response: { total, pending, underReview, approved, rejected, recent }
```

---

## Troubleshooting

### Can't Login
- Check username and password
- Clear browser cache
- Try incognito mode
- Contact system administrator

### Application Not Loading
- Check internet connection
- Refresh the page
- Check console for errors
- Try a different browser

### Status Update Failed
- Ensure you have a valid token
- Check if application ID is correct
- Verify required fields are provided
- Check server logs

---

## Support

For technical support:
- Email: support@ebola-emergency.org
- Internal: Contact your system administrator
- Documentation: `/docs`

---

## Changelog

### v1.0.0 (2026-06-14)
- Initial admin dashboard release
- Application approval workflow
- Status management
- Analytics dashboard
- Search and filter capabilities
