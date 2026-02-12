# Next.js + Supabase AG-Grid Views Management

## Tech Stack
- Next.js App Router
- Supabase (Auth + Postgres + RLS)
- AG-Grid (Server-Side Row Model)
- Zustand
- shadcn/ui

## Features
- Supabase authentication (email/password)
- Row Level Security per user for saved views
- Generic reusable AG-Grid component
- Server-side filtering, sorting and pagination
- View management system (CRUD)
- Default view auto creation
- SSR initial data fetch

## Pages
/auth
/dashboard
/invoices
/orders

## How to run
1. Create Supabase project
2. Run SQL scripts from /supabase folder
3. Add env variables:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

4. npm install
5. npm run dev
