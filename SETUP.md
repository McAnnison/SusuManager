# Susu Manager - Detailed Setup Guide

This guide will walk you through setting up the Susu Manager full-stack application from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Running the Application](#running-the-application)
7. [Testing the API](#testing-the-api)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A **Supabase account** - [Sign up here](https://supabase.com/)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/McAnnison/SusuManager.git
cd SusuManager
```

### 2. Install All Dependencies

The easiest way is to use the provided script that installs dependencies for root, client, and server:

```bash
npm run install:all
```

**Or install individually:**

```bash
# Root dependencies (for concurrent execution)
npm install

# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

## Supabase Configuration

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Susu Manager
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest to your location
4. Click "Create new project"
5. Wait for the project to be provisioned (1-2 minutes)

### 2. Get Your Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. You'll need these values:
   - **Project URL** (found under "Project URL")
   - **anon/public key** (found under "Project API keys" → "anon public")
   - **service_role key** (found under "Project API keys" → "service_role") - ⚠️ Keep this secret!

3. Go to **Settings** → **Database**
4. Copy the **Connection string** under "Connection string" → "URI"
   - It looks like: `postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres`
   - Replace `[YOUR-PASSWORD]` with your database password

## Database Setup

### 1. Configure Environment Variables

#### Server Environment Variables

Create `server/.env`:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and fill in your Supabase credentials:

```env
PORT=5000
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
NODE_ENV=development
```

#### Client Environment Variables

Create `client/.env.local`:

```bash
cd ../client
cp .env.example .env.local
```

Edit `client/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Generate Prisma Client

```bash
cd ../server
npm run prisma:generate
```

This creates the Prisma Client based on your schema.

### 3. Run Database Migrations

```bash
npm run prisma:migrate
```

You'll be prompted to name the migration. Enter something like:

```
initial_schema
```

This will:
- Create the database tables (User, Member, Payment)
- Apply all indexes and relationships
- Generate SQL migration files in `prisma/migrations/`

### 4. (Optional) View Your Database with Prisma Studio

```bash
npm run prisma:studio
```

This opens a browser-based database GUI at `http://localhost:5555`

## Environment Configuration

### ⚠️ Important Security Notes

- **Never commit `.env` or `.env.local` files** to version control
- The `.gitignore` file already excludes these
- Use `.env.example` files as templates
- Keep your `service_role` key secret - it has full database access

### Environment Variables Explained

**Server (.env):**

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | See Supabase setup |
| `SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Service role key (for admin operations) | `eyJhbG...` |
| `NODE_ENV` | Environment mode | `development` or `production` |

**Client (.env.local):**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public) | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous key (public) | `eyJhbG...` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## Running the Application

### Development Mode (Recommended)

Run both client and server concurrently from the root directory:

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### Run Client and Server Separately

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev:client
```

### Production Build

**Build everything:**
```bash
npm run build
```

**Build individually:**
```bash
# Build client
npm run build:client

# Build server
npm run build:server
```

**Run in production mode:**
```bash
# Start server
cd server
npm start

# Start client (in another terminal)
cd client
npm start
```

## Testing the API

### 1. Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Susu Manager API is running",
  "timestamp": "2026-02-14T..."
}
```

### 2. Create a Test User (via Prisma Studio)

1. Open Prisma Studio: `cd server && npm run prisma:studio`
2. Navigate to the `User` table
3. Click "Add record"
4. Fill in:
   - `authId`: Any UUID (e.g., `123e4567-e89b-12d3-a456-426614174000`)
   - `email`: Your email
   - `name`: Your name
   - `role`: `collector`
5. Click "Save 1 change"

### 3. Create a Member

```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+233201234567",
    "dailyContribution": 10.00,
    "collectorId": "YOUR_USER_ID_HERE"
  }'
```

### 4. Get All Members

```bash
curl http://localhost:5000/api/members
```

### 5. Create a Payment

```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10.00,
    "memberId": "MEMBER_ID_HERE",
    "collectorId": "YOUR_USER_ID_HERE",
    "notes": "Daily collection"
  }'
```

### 6. Get Dashboard Summary

```bash
curl "http://localhost:5000/api/dashboard/summary?collectorId=YOUR_USER_ID_HERE"
```

## Troubleshooting

### Common Issues

#### 1. "Cannot find module '@prisma/client'"

**Solution:**
```bash
cd server
npm run prisma:generate
```

#### 2. "P1001: Can't reach database server"

**Causes:**
- Wrong DATABASE_URL
- Firewall blocking connection
- Supabase project paused

**Solution:**
- Verify DATABASE_URL in `server/.env`
- Check Supabase project is active
- Test connection from Supabase dashboard

#### 3. "Port 5000 already in use"

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

#### 4. Next.js build fails with font errors

**Solution:** Already fixed in the layout. If you encounter this, remove Google Font imports from `app/layout.tsx`.

#### 5. TypeScript errors in controllers

**Solution:**
```bash
cd server
npm run build
```

If errors persist, check that Prisma Client is generated:
```bash
npm run prisma:generate
```

### Getting Help

- Check the main [README.md](README.md) for documentation
- Review the API endpoints section
- Examine the Prisma schema at `server/prisma/schema.prisma`
- Check server logs for detailed error messages

## Next Steps

1. **Set up authentication**: Implement Supabase Auth in the frontend
2. **Add Row Level Security (RLS)**: Secure your database with Supabase RLS policies
3. **Create more pages**: Build member management, payment recording interfaces
4. **Deploy**: Deploy frontend to Vercel and backend to Railway/Render
5. **Add features**: Implement reports, member search, payment history, etc.

## Development Tips

### Hot Reload

Both client and server support hot reload:
- Client: Edit any file in `client/app/` and see changes immediately
- Server: Edit any file in `server/src/` and the server restarts automatically

### Database Changes

When you modify `server/prisma/schema.prisma`:

1. Create a new migration:
   ```bash
   cd server
   npm run prisma:migrate
   ```

2. The Prisma Client updates automatically

### Code Organization

- **Client routes**: Add new pages in `client/app/`
- **Server routes**: Add new routes in `server/src/routes/`
- **Controllers**: Add business logic in `server/src/controllers/`
- **Prisma models**: Edit `server/prisma/schema.prisma`

## Summary

You now have a fully functional Susu Manager application with:

✅ Next.js frontend with Tailwind CSS  
✅ Express backend with TypeScript  
✅ Prisma ORM connected to Supabase PostgreSQL  
✅ RESTful API endpoints  
✅ Development environment with hot reload  
✅ Production-ready build configuration  

Happy coding! 🚀
