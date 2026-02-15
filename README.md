#  Amora - Valentine's Letter Builder

Amora is a web app that lets you create customizable love letters and share them with someone special. Recipients can tap to open the letter with a smooth animation reveal.

##  Features

-  **Authentication** - Sign up and log in with email or username
-  **Create Letters** - Write heartfelt messages with custom colors, stickers, and backgrounds
-  **Letter Preview** - See exactly how your letter looks before sending
-  **Shareable Links** - Copy and share your letter with anyone
-  **Opening Animation** - Recipients tap to reveal the letter with a smooth animation
-  **Edit & Delete** - Update or remove your letters anytime
-  **Responsive** - Works on mobile and desktop

##  Tech Stack

- **Framework** - Next.js 15 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS
- **Backend/Auth** - Supabase
- **Deployment** - Vercel

##  Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account
- A Vercel account (for deployment)

### Installation

1. Clone the repository
```bash
git clone https://github.com/shanaczane/amora.git
cd amora
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables - create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Set up the database - run these in your Supabase SQL Editor:
```sql
-- Letters table
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  background_color TEXT DEFAULT '#fff5f7',
  text_color TEXT DEFAULT '#1f2937',
  icon TEXT DEFAULT '💕',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

##  Project Structure
```
amora/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── create/
│   │   └── edit/[id]/
│   ├── api/letters/
│   ├── auth/callback/
│   └── letter/[id]/
├── components/
│   └── letter/
│       ├── LetterAnimation.tsx
│       ├── LetterEditor.tsx
│       ├── LetterEditEditor.tsx
│       └── ShareButton.tsx
├── lib/
│   ├── auth/actions.ts
│   ├── letter/actions.ts
│   ├── supabase/
│   ├── db.ts
│   ├── utils.ts
│   └── validations.ts
├── hooks/
│   └── useLetters.ts
└── types/
    ├── letter.ts
    └── user.ts
```

##  Deployment

The app is deployed on Vercel. To deploy your own:

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL)
4. Deploy!

##  Live Demo

[https://amora-orcin.vercel.app](https://amora-orcin.vercel.app)

##  Author

Made with <3 by Shana Czane Cruzat
