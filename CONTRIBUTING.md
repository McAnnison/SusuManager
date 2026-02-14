# Contributing to Susu Manager

Thank you for considering contributing to Susu Manager! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing style
5. Write clear commit messages
6. Submit your pull request!

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

**Quick Start:**

```bash
# Clone the repository
git clone https://github.com/McAnnison/SusuManager.git
cd SusuManager

# Install all dependencies
npm run install:all

# Set up environment variables
cp client/.env.example client/.env.local
cp server/.env.example server/.env

# Configure your Supabase credentials in .env files

# Run database migrations
cd server
npm run prisma:migrate

# Start development servers
cd ..
npm run dev
```

## Pull Request Process

1. **Update Documentation**: Update the README.md, API.md, or other docs with details of changes
2. **Update Dependencies**: If you add dependencies, explain why they're needed
3. **Follow Coding Standards**: Ensure your code follows the project's coding standards
4. **Test Your Changes**: Test your changes thoroughly before submitting
5. **Write Clear Commit Messages**: Use conventional commit format when possible
6. **Link Related Issues**: Reference any related issues in your PR description

### Conventional Commits

We encourage using conventional commit format:

```
feat: add payment search feature
fix: resolve member deletion cascade issue
docs: update API documentation
style: format code with prettier
refactor: restructure dashboard controller
test: add payment controller tests
chore: update dependencies
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces, avoid `any` when possible
- Use async/await instead of callbacks
- Handle errors appropriately

**Example:**
```typescript
// Good
async function getMember(id: string): Promise<Member> {
  try {
    const member = await prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  } catch (error) {
    console.error('Error fetching member:', error);
    throw error;
  }
}

// Bad
function getMember(id: any) {
  return prisma.member.findUnique({ where: { id } });
}
```

### Code Style

#### Frontend (Next.js/React)

- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and component names
- Add prop types/interfaces
- Use Tailwind CSS for styling

**Example:**
```tsx
interface DashboardCardProps {
  title: string;
  value: number;
  description?: string;
}

export function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
    </div>
  );
}
```

#### Backend (Express)

- Keep route handlers in separate controller files
- Use consistent error handling
- Validate input data
- Use Prisma for database operations
- Add proper TypeScript types for request/response

**Example:**
```typescript
export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, dailyContribution, collectorId } = req.body;

    // Validate required fields
    if (!name || !dailyContribution || !collectorId) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Create member
    const member = await prisma.member.create({
      data: { name, dailyContribution, collectorId },
    });

    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
};
```

### Database (Prisma)

- Use meaningful model and field names
- Add proper indexes for frequently queried fields
- Use cascade deletes appropriately
- Add comments for complex relationships

**Example:**
```prisma
model Payment {
  id          String   @id @default(uuid())
  amount      Float
  date        DateTime @default(now())
  memberId    String
  collectorId String
  notes       String?

  member    Member @relation(fields: [memberId], references: [id], onDelete: Cascade)
  collector User   @relation(fields: [collectorId], references: [id], onDelete: Cascade)

  @@map("payments")
  @@index([memberId])
  @@index([collectorId])
  @@index([date])
}
```

## Project Structure

```
SusuManager/
├── client/               # Next.js frontend
│   ├── app/             # App router pages
│   │   ├── dashboard/   # Dashboard page
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   └── lib/            # Utility functions
│
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/      # API route definitions
│   │   ├── lib/         # Utilities (Prisma client)
│   │   └── index.ts     # Server entry point
│   └── prisma/
│       └── schema.prisma # Database schema
│
├── API.md               # API documentation
├── SETUP.md            # Setup instructions
└── README.md           # Project overview
```

### Adding New Features

#### Adding a New API Endpoint

1. **Define the route** in `server/src/routes/`
2. **Create controller** in `server/src/controllers/`
3. **Update Prisma schema** if needed (in `server/prisma/schema.prisma`)
4. **Run migration** if schema changed: `npm run prisma:migrate`
5. **Update API documentation** in `API.md`
6. **Test the endpoint** manually and/or with automated tests

#### Adding a New Page

1. **Create page** in `client/app/[page-name]/page.tsx`
2. **Add navigation** if needed
3. **Create components** in `client/components/` if needed
4. **Style with Tailwind CSS**
5. **Update documentation** if it's a major feature

## Testing

### Manual Testing

1. Start both servers: `npm run dev`
2. Test the API with curl or Postman
3. Test the frontend in the browser
4. Check for console errors
5. Test edge cases and error handling

### Automated Testing (Future)

We plan to add:
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Playwright
- Contributions for test infrastructure welcome!

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
