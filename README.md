
# Smart Bookmark App

## Live Demo
https://smart-bookmark-app-johu.vercel.app

## GitHub Repository
https://github.com/Lekyasree/smart-bookmark-app

##  Overview

Smart Bookmark App is a real-time bookmark manager built using Next.js (App Router) and Supabase.
Users can securely log in using Google OAuth and manage their personal bookmarks.  
Each user's bookmarks are private and update in real-time across multiple tabs.

##  Features
- Google OAuth authentication (Supabase Auth)
- Add bookmarks (Title + URL)
- Delete bookmarks
- Private bookmarks per user (Row Level Security enabled)
- Real-time updates without refreshing
- Fully deployed on Vercel

##  Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)
- GitHub (Version Control)

##Authentication
- Only Google OAuth login is enabled.
- No email/password authentication.
- Session is stored securely via Supabase.

##  Database Structure

Table: `bookmarks`

Columns:
- id (uuid, primary key)
- title (text)
- url (text)
- user_id (uuid, references auth.users)
- created_at (timestamp)

Row Level Security (RLS) ensures:
- Users can only see their own bookmarks.
- Users can only insert/delete their own bookmarks.

## Real-Time Functionality

Supabase Realtime is enabled on the `bookmarks` table.

If a bookmark is added in one browser tab,
it appears automatically in another tab without refreshing.

##  Challenges Faced & Solutions

### Google OAuth Redirect Issue
Problem: After deployment, login redirected back to login page.  
Solution: Configured correct Site URL and Redirect URLs in Supabase Authentication settings.

### Supabase Environment Variables Missing During Build
Problem: Vercel build failed due to undefined environment variables.  
Solution: Added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Environment Variables settings.

##  How to Run Locally
git clone https://github.com/Lekyasree/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev
