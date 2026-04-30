# Productify — Personal Task & Notes Manager

A minimal, intentional productivity tool built with Next.js 15, Supabase, and Tailwind CSS v4.

## 🚀 Features

- **Authentication**: Secure login and signup via Supabase Auth.
- **Tasks**: Create, track, and manage your daily objectives with priority levels and due dates.
- **Notes**: Capture thoughts and ideas in a clean, card-based interface.
- **Dashboard**: High-level overview of your productivity with dynamic stats and activity feeds.
- **Settings**: Manage your profile and security preferences.
- **Minimal Design**: Inspired by Linear and Vercel, focusing on whitespace, typography, and focus.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd Productify
   ```

2. **Set up Environment Variables**:
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

3. **Set up Database**:
   Copy and paste the contents of `supabase_schema.sql` into your Supabase SQL Editor to create the necessary tables and RLS policies.

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License.
