# Office Resource Manager System

- Device Manager
- Project Resource Manager

## Overview

This project using the following stack:

- Framework - [Next.js 13](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - Docker + Mysql8.0
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)
- Schema validation - [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/get-started/)
- Internationalization (i18n) - [next-intl](https://next-intl-docs.vercel.app/docs/next-13)

## Getting Started

#### First Installation

_I will be using pnpm as the default option. However, you still have the choice to use either npm or yarn._

```bash
pnpm install
```

#### Database

Edit database config in .env file

Optional: Installation with docker

```bash
docker-compose up --build -d
```

```sql
-- On development
-- Access DB & GRANT all permissions to user
GRANT ALL PRIVILEGES ON *.* TO 'redine'@'%';
-- Or just change user to root
```

Generate the Prisma Client

```bash
pnpm prisma generate
```

Run migrate:

```bash
# On development
pnpm prisma migrate dev

# Or on production:
pnpm prisma migrate deploy
```

_On development: Should be use root user of database or [shadow database](https://pris.ly/d/migrate-shadow)_

#### Application

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Learn More

### Next.js 13 - App Route

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API

### Prisma

Prisma is an open source next-generation ORM

- [Prisma docs](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [Prisma schema reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

- When update database schema

```bash
# Run migrate on development
pnpm prisma migrate dev --name added_somethings
# Reads schema and generates code
pnpm prisma generate
```

- Soft delete: Set the target models in [src/lib/db.ts](src/lib/db.ts)

### Design - UI/UX

- [Tailwindcss](https://tailwindcss.com/docs/) - A utility-first CSS framework packed with classes
- [Shadcn UI](https://ui.shadcn.com/docs) - [Radix UI](https://www.radix-ui.com/) - A Tailwindcss components library
- [Lucide Icon](https://lucide.dev/) - Icon components

### Schema validation, Form

- Zod:
  - Docs: [Zod](https://zod.dev/)
  - validations in [src/lib/validations](src/lib/validations)
- [React Hook Form](https://react-hook-form.com/get-started/)
