# Next.js Authentication Template

A modern authentication template built with Next.js 14, featuring email verification, password reset, and user management.

## Features

### Authentication

- 🔐 Login and registration
- ✉️ Email verification
- 🔑 Password reset/change
- 🍪 HTTP-only cookie auth
- 🛡️ Protected routes

### User Features

- 👤 User dashboard
- 📊 Profile management
- 📧 Verification status
- 🔄 Resend verification

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- JWT Authentication

## Project Structure

```
src/
├── app/
│   ├── auth/                 # Auth pages
│   │   ├── login
│   │   ├── register
│   │   ├── forgot-password
│   │   └── reset-password
│   ├── dashboard/           # Protected pages
│   │   ├── profile
│   │   └── change-password
│   └── verify-email/        # Email verification
├── components/              # Shared components
├── services/               # API services
└── middleware.ts          # Auth protection
```

## Authentication Flow

1. **Registration**:

   - Submit registration form
   - Receive verification email
   - Redirect to login

2. **Email Verification**:

   - Click verification link
   - Validate token
   - Mark email as verified

3. **Login**:

   - Submit credentials
   - Store JWT in HTTP-only cookie
   - Access dashboard

4. **Password Reset**:
   - Request reset link
   - Set new password
   - Return to login

## Quick Start

1. Clone and install:

```bash
git clone [repo-url]
npm install
```

2. Set environment:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

3. Run development server:

```bash
npm run dev
```

## API Endpoints

```typescript
POST / auth / register;
POST / auth / login;
POST / auth / forgot - password;
POST / auth / reset - password / { token };
GET / auth / verify / { token };
POST / auth / change - password;
GET / users / me;
POST / auth / resend - verification;
```

## Security

- HTTP-only cookies
- Protected routes
- Server validation
- CSRF protection
- Rate limiting

## License

MIT
