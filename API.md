# Susu Manager API Documentation

Base URL: `http://localhost:5000`

## Table of Contents

- [Health Check](#health-check)
- [Members API](#members-api)
- [Payments API](#payments-api)
- [Dashboard API](#dashboard-api)
- [Response Codes](#response-codes)
- [Error Handling](#error-handling)

## Health Check

### GET /health

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Susu Manager API is running",
  "timestamp": "2026-02-14T22:00:00.000Z"
}
```

---

## Members API

### POST /api/members

Create a new member.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+233201234567",
  "dailyContribution": 10.00,
  "collectorId": "uuid-of-collector"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "John Doe",
  "phone": "+233201234567",
  "dailyContribution": 10.00,
  "collectorId": "uuid-of-collector",
  "active": true,
  "createdAt": "2026-02-14T22:00:00.000Z",
  "updatedAt": "2026-02-14T22:00:00.000Z"
}
```

### GET /api/members

Get all members with optional filters.

**Query Parameters:**
- `collectorId` (optional): Filter by collector ID
- `active` (optional): Filter by active status (`true` or `false`)

**Example:**
```
GET /api/members?collectorId=uuid&active=true
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "phone": "+233201234567",
    "dailyContribution": 10.00,
    "collectorId": "uuid-of-collector",
    "active": true,
    "createdAt": "2026-02-14T22:00:00.000Z",
    "updatedAt": "2026-02-14T22:00:00.000Z",
    "collector": {
      "id": "uuid",
      "name": "Collector Name",
      "email": "collector@example.com"
    },
    "payments": [
      {
        "id": "uuid",
        "amount": 10.00,
        "date": "2026-02-14T22:00:00.000Z"
      }
    ]
  }
]
```

### GET /api/members/:id

Get a specific member by ID.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "John Doe",
  "phone": "+233201234567",
  "dailyContribution": 10.00,
  "collectorId": "uuid-of-collector",
  "active": true,
  "createdAt": "2026-02-14T22:00:00.000Z",
  "updatedAt": "2026-02-14T22:00:00.000Z",
  "collector": {
    "id": "uuid",
    "name": "Collector Name",
    "email": "collector@example.com"
  },
  "payments": [...]
}
```

### PUT /api/members/:id

Update a member.

**Request Body:** (all fields optional)
```json
{
  "name": "Jane Doe",
  "phone": "+233209876543",
  "dailyContribution": 15.00,
  "active": false
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "phone": "+233209876543",
  "dailyContribution": 15.00,
  "collectorId": "uuid-of-collector",
  "active": false,
  "createdAt": "2026-02-14T22:00:00.000Z",
  "updatedAt": "2026-02-14T22:00:00.000Z"
}
```

### DELETE /api/members/:id

Delete a member (and all associated payments via cascade).

**Response:** `200 OK`
```json
{
  "message": "Member deleted successfully"
}
```

---

## Payments API

### POST /api/payments

Create a new payment record.

**Request Body:**
```json
{
  "amount": 10.00,
  "memberId": "uuid-of-member",
  "collectorId": "uuid-of-collector",
  "notes": "Daily collection",
  "date": "2026-02-14T22:00:00.000Z"  // optional, defaults to now
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "amount": 10.00,
  "date": "2026-02-14T22:00:00.000Z",
  "memberId": "uuid-of-member",
  "collectorId": "uuid-of-collector",
  "notes": "Daily collection",
  "createdAt": "2026-02-14T22:00:00.000Z",
  "updatedAt": "2026-02-14T22:00:00.000Z",
  "member": {
    "id": "uuid",
    "name": "John Doe"
  }
}
```

### GET /api/payments

Get all payments with optional filters.

**Query Parameters:**
- `memberId` (optional): Filter by member ID
- `collectorId` (optional): Filter by collector ID
- `startDate` (optional): Filter payments from this date (ISO 8601)
- `endDate` (optional): Filter payments until this date (ISO 8601)

**Example:**
```
GET /api/payments?collectorId=uuid&startDate=2026-02-01T00:00:00.000Z&endDate=2026-02-14T23:59:59.999Z
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "amount": 10.00,
    "date": "2026-02-14T22:00:00.000Z",
    "memberId": "uuid-of-member",
    "collectorId": "uuid-of-collector",
    "notes": "Daily collection",
    "createdAt": "2026-02-14T22:00:00.000Z",
    "updatedAt": "2026-02-14T22:00:00.000Z",
    "member": {
      "id": "uuid",
      "name": "John Doe",
      "phone": "+233201234567"
    },
    "collector": {
      "id": "uuid",
      "name": "Collector Name",
      "email": "collector@example.com"
    }
  }
]
```

### GET /api/payments/:id

Get a specific payment by ID.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "amount": 10.00,
  "date": "2026-02-14T22:00:00.000Z",
  "memberId": "uuid-of-member",
  "collectorId": "uuid-of-collector",
  "notes": "Daily collection",
  "createdAt": "2026-02-14T22:00:00.000Z",
  "updatedAt": "2026-02-14T22:00:00.000Z",
  "member": {...},
  "collector": {...}
}
```

### DELETE /api/payments/:id

Delete a payment record.

**Response:** `200 OK`
```json
{
  "message": "Payment deleted successfully"
}
```

---

## Dashboard API

### GET /api/dashboard/summary

Get dashboard summary with today's and monthly statistics.

**Query Parameters:**
- `collectorId` (required): The collector's user ID

**Example:**
```
GET /api/dashboard/summary?collectorId=uuid-of-collector
```

**Response:** `200 OK`
```json
{
  "today": {
    "totalCollection": 150.00,
    "paymentCount": 15,
    "activeMembersCount": 15
  },
  "monthly": {
    "totalCollection": 3000.00,
    "paymentCount": 300
  },
  "members": {
    "total": 20,
    "topContributors": [
      {
        "id": "uuid",
        "name": "John Doe",
        "totalContributions": 300.00,
        "paymentCount": 30
      },
      {
        "id": "uuid",
        "name": "Jane Smith",
        "totalContributions": 280.00,
        "paymentCount": 28
      }
    ]
  },
  "period": {
    "today": "2026-02-14T00:00:00.000Z",
    "monthStart": "2026-02-01T00:00:00.000Z",
    "monthEnd": "2026-02-28T23:59:59.000Z"
  }
}
```

---

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (missing or invalid parameters) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Internal Server Error |

---

## Error Handling

All errors return a JSON response with an `error` field:

**Example Error Response:**
```json
{
  "error": "Member not found"
}
```

**Example Validation Error:**
```json
{
  "error": "Name, daily contribution, and collector ID are required"
}
```

**Example Server Error (Development):**
```json
{
  "error": "Internal server error",
  "message": "Detailed error message (only in development)"
}
```

---

## Data Types

### User
```typescript
{
  id: string (UUID)
  authId: string (Supabase Auth UID)
  email: string
  name: string | null
  role: string (default: "collector")
  createdAt: Date
  updatedAt: Date
}
```

### Member
```typescript
{
  id: string (UUID)
  name: string
  phone: string | null
  dailyContribution: number (float)
  collectorId: string (UUID - references User)
  active: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Payment
```typescript
{
  id: string (UUID)
  amount: number (float)
  date: Date (default: now)
  memberId: string (UUID - references Member)
  collectorId: string (UUID - references User)
  notes: string | null
  createdAt: Date
  updatedAt: Date
}
```

---

## Testing with cURL

### Create Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Member",
    "phone": "+233201234567",
    "dailyContribution": 10.00,
    "collectorId": "your-collector-id"
  }'
```

### Create Payment
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10.00,
    "memberId": "member-id",
    "collectorId": "collector-id",
    "notes": "Test payment"
  }'
```

### Get Dashboard
```bash
curl "http://localhost:5000/api/dashboard/summary?collectorId=your-collector-id" | python3 -m json.tool
```

---

## Notes

- All UUIDs are version 4 (random)
- All dates are in ISO 8601 format
- Amounts are stored as floats (be mindful of floating-point precision)
- Deleting a member cascades to delete all their payments
- Deleting a user (collector) cascades to delete all their members and payments
