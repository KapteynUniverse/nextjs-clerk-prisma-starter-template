# 🚀 Next.js Clerk + Prisma Starter

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)

A minimal full-stack starter template built with:

- 🔐 Clerk Authentication (Sign In / Sign Up)
- 🗄 Prisma ORM
- 🌐 ngrok Webhook Integration
- ⚡ Next.js App Router

Perfect foundation for SaaS apps, dashboards, or authenticated platforms.

---

# 📦 Features

- Clerk authentication (Google, GitHub, Email, Name + Last Name)
- Prisma + PostgreSQL database
- Automatic user creation via Clerk webhooks
- Local webhook development using ngrok
- Clean scalable starter structure

---

# 🛠 Requirements

You need accounts for:

- [Clerk](https://clerk.com/)
- [Prisma](https://www.prisma.io/)
- [ngrok](https://ngrok.com/)

---

# ⚙️ Setup Guide

## 1️⃣ Clone & Install

```bash
git clone https://github.com/KapteynUniverse/nextjs-clerk-prisma-starter-template
cd nextjs-clerk-prisma-starter-template
npm install
```

---

# 🗄 Prisma Setup

## 2️⃣ Initialize Prisma

```bash
npx prisma init --db --output ../app/generated/prisma
```

You’ll be prompted to:

- Choose the region closest to you
- Enter a database name

This creates:

- `prisma/` directory
- `schema.prisma`
- `DATABASE_URL` in `.env`

---

## 3️⃣ Run Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

This will:

- Create database tables
- Generate Prisma Client

---

## 4️⃣ Create a Clerk Application

1. [Sign in to Clerk:](https://dashboard.clerk.com/sign-in)
2. Click **Create Application**
3. Enter a title
4. Select sign-in options:
   - Google
   - GitHub
   - Email
   - Name + Last Name
5. Click **Create Application**

---

## 5️⃣ Add Clerk Keys to `.env`

Create a `.env` file in the root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "<your-publishable-key>"
CLERK_SECRET_KEY= "<your-secret-key>"
```

---

# 🔗 Webhook Setup (Clerk → Local App)

Clerk sends events like `user.created` via webhooks.

FDuring local development, your app must be publicly accessible so Clerk can deliver these events.

---

## 6️⃣ Install & Run ngrok

```bash
npm install --global ngrok
ngrok http 3000
```

Copy the **Forwarding URL** shown in the terminal.

Example:

```
"https://a60b-99-42-62-240.ngrok-free.app"
```

---

## 7️⃣ Add Webhook in Clerk

1. Go to Clerk Dashboard
2. Navigate to:
   **Configure → Developers → Webhooks**
3. Click **Add Endpoint**
4. Paste:

```
"https://your-ngrok-url.ngrok-free.app/api/webhooks/clerk"
```

---

## 8️⃣ Add Webhook Signing Secret

Copy the Signing Secret from Clerk and update `.env`:

```env
# Prisma
DATABASE_URL= "<your-database-url>"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "<your-publishable-key>"
CLERK_SECRET_KEY= "<your-secret-key>"
CLERK_WEBHOOK_SIGNING_SECRET= "<your-signing-secret>"
```

---

# 🧪 Test the Application

Start the dev server:

```bash
npm run dev
```

1. Visit `http://localhost:3000`
2. Click **Sign Up**
3. Create an account

---

## 🗃 Verify Database

Open Prisma Studio:

```bash
npx prisma studio
```

You should see a `User` record in your database.

---

# 🧠 Architecture Overview

- Clerk handles authentication
- Webhooks sync user data into Prisma
- PostgreSQL stores application data
- ngrok enables local webhook development

---

# 📚 Useful Links

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Enable Query Caching with Prisma Postgres (Performance Optimization)](https://www.prisma.io/docs/postgres/database/caching)
