# Jetcut

Jetcut is a URL shortener built with Next.js.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Database & ORM:** Postgres & Prisma
- **Authentication:** Auth.js
- **UI Components:** shadcn/ui
- **Package Manager:** pnpm

## Prerequisites

Ensure you have the following installed:

- Node.js (LTS recommended)
- pnpm
- PostgreSQL database

Alternatively, if you are using **Nix**, the environment is pre-configured via the included flake.

## Environment Variables

Create a `.env` file in the root directory. The following keys are required for the application to function:

```bash
# Database Connection
DATABASE_URL=""

# Authentication Security
# Generate a secure secret using: openssl rand -base64 32
AUTH_SECRET=""

# OAuth Provider (Google)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Email Service (Optional - Currently Disabled)
# Required only if testing the email component in the sessions feature.
AUTH_RESEND_KEY=""
```

> Note on Resend: The email service integration via Resend is currently disabled in the main production flow. However, the configuration is ready for development purposes. To test the email component within the sessions feature, provide a valid AUTH_RESEND_KEY.

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/oscar370/jetcut.git
cd jetcut
```

### Development Environment (Nix - Optional)

If you have Nix installed, you can enter the reproducible development environment:

```bash
nix develop
```

### Install Dependencies

```bash
pnpm install
```

### Database Setup

Initialize the database and apply the Prisma schema migrations:

```bash
pnpm prisma migrate dev
```

### Running the Application

```bash
pnpm dev
```

The application will be available at http://localhost:3000.

## License

This project is licensed under the GPL v3.0 License - see the LICENSE file for details.
