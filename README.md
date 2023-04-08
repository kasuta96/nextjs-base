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
npx prisma generate
```

Run migrate on development:
Should be use root user or use [shadow database](https://pris.ly/d/migrate-shadow)

```bash
npx prisma migrate dev
# or
pnpx prisma migrate dev
```

Run migrate on production:

```bash
npx prisma migrate deploy
# or
pnpx prisma migrate deploy
```

#### Application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
