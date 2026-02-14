# Susu Manager

A full-stack platform to manage Susu collection in Ghana, built with Next.js, Express, Prisma, and Supabase.

## 🎯 Overview

Susu Manager is a comprehensive collection management system where collectors can:
- Manage multiple members with daily contribution tracking
- Record and track daily payments
- View real-time dashboard analytics
- Monitor today's collections, monthly totals, and member contributions

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth

## 📁 Project Structure

```
SusuManager/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utility functions
│   │   ├── utils.ts      # Helper utilities
│   │   └── supabase.ts   # Supabase client
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── lib/          # Utilities (Prisma client)
│   │   └── index.ts      # Server entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
└── package.json          # Root package.json for scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/McAnnison/SusuManager.git
cd SusuManager
```

### 2. Install Dependencies

Install all dependencies (root, client, and server):

```bash
npm run install:all
```

Or install individually:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project credentials:
   - Project URL
   - Anon/Public Key
   - Service Role Key (for server)
   - Database connection string

### 4. Configure Environment Variables

#### Client Environment Variables

Create `client/.env.local`:

```bash
cp client/.env.example client/.env.local
```

Edit `client/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Server Environment Variables

Create `server/.env`:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
NODE_ENV=development
```

### 5. Set Up Prisma and Database

Generate Prisma client:

```bash
cd server
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

(Optional) Open Prisma Studio to view/edit data:

```bash
npm run prisma:studio
```

### 6. Run the Application

#### Development Mode (Concurrent)

From the root directory, run both client and server:

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`

#### Run Separately

**Client only:**
```bash
npm run dev:client
```

**Server only:**
```bash
npm run dev:server
```

### 7. Test the API

Health check:
```bash
curl http://localhost:5000/health
```

## 📊 Database Schema

### User
- Linked to Supabase Auth UID
- Contains collector information
- Fields: id, authId, email, name, role

### Member
- Represents Susu members
- Fields: id, name, phone, dailyContribution, collectorId, active

### Payment
- Records daily contributions
- Fields: id, amount, date, memberId, collectorId, notes

## 🔌 API Endpoints

### Members

- `POST /api/members` - Create a new member
- `GET /api/members` - Get all members (with filters)
- `GET /api/members/:id` - Get member by ID
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

**Example: Create Member**
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+233201234567",
    "dailyContribution": 10.00,
    "collectorId": "collector-uuid"
  }'
```

### Payments

- `POST /api/payments` - Create a new payment
- `GET /api/payments` - Get all payments (with filters)
- `GET /api/payments/:id` - Get payment by ID
- `DELETE /api/payments/:id` - Delete payment

**Example: Create Payment**
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10.00,
    "memberId": "member-uuid",
    "collectorId": "collector-uuid",
    "notes": "Daily collection"
  }'
```

### Dashboard

- `GET /api/dashboard/summary?collectorId=xxx` - Get dashboard summary

**Example: Get Dashboard Summary**
```bash
curl http://localhost:5000/api/dashboard/summary?collectorId=collector-uuid
```

**Response:**
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
    "topContributors": [...]
  }
}
```

## 🛠️ Development Scripts

### Root Scripts
```bash
npm run dev              # Run both client and server
npm run dev:client       # Run client only
npm run dev:server       # Run server only
npm run build            # Build both client and server
npm run build:client     # Build client only
npm run build:server     # Build server only
npm run install:all      # Install all dependencies
```

### Client Scripts
```bash
cd client
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Server Scripts
```bash
cd server
npm run dev              # Start development server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🔐 Authentication Setup

The app uses Supabase Auth for authentication. To set it up:

1. Enable Email/Password authentication in your Supabase project
2. Configure email templates (optional)
3. Set up Row Level Security (RLS) policies in Supabase (recommended)

## 📦 Production Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Backend (Railway/Render/Heroku)

1. Connect your repository
2. Set environment variables
3. Ensure `DATABASE_URL` points to your Supabase database
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- shadcn for the beautiful UI components
- Prisma for the excellent ORM
