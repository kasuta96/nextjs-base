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
npm install
# or
yarn
# or
pnpm install
```

#### Database

Edit database config in .env file

Optional: Installation with docker

```
docker-compose up --build -d
```

Generate the Prisma Client

```bash
pnpm prisma generate
```

Run migrate on development:
Should be use root user or use [shadow database](https://pris.ly/d/migrate-shadow)

```bash
pnpm prisma migrate dev
```

Run migrate on production:

```bash
pnpm prisma migrate deploy
```

#### Application

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

### Next.js 13 - App Route

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API

### Prisma

Prisma is an open source next-generation ORM

- [Prisma docs](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [Prisma schema reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

When update database schema

```bash
# Run migrate on development
pnpm prisma migrate dev --name added_somethings
# Reads schema and generates code
pnpm prisma generate
```

### Design - UI/UX

- [Tailwindcss](https://tailwindcss.com/docs/) - A utility-first CSS framework packed with classes
- [Shadcn UI](https://ui.shadcn.com/docs) - [Radix UI](https://www.radix-ui.com/) - A Tailwindcss components library
- [Lucide Icon](https://lucide.dev/) - Icon components
- [react-hot-toast](https://react-hot-toast.com/) - Notification

### Schema validation, Form

- Zod:
  - Docs: [Zod](https://zod.dev/)
  - validations in `src/lib/validations`
- [React Hook Form](https://react-hook-form.com/get-started/)
