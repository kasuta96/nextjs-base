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

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://beta.nextjs.org/docs) - learn about Next.js features and API (Beta docs)
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Prisma

Prisma is an open source next-generation ORM

- [Prisma docs](https://www.prisma.io/docs/concepts/overview/what-is-prisma)
- [Prisma schema reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

When update database schema

```bash
# run migrate on development
pnpm prisma migrate dev --name added_somethings
# run
pnpm prisma generate
```

### Design - UI/UX

- [Tailwindcss](https://tailwindcss.com/docs/) - A utility-first CSS framework packed with classes
- [HeadlessUI](https://headlessui.com/react/menu) - A Tailwindcss components library
- [heroicons](https://heroicons.com/) - Icon components
