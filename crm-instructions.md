You are tasked with transforming this repository into a Next.js Personal Job Hunting CRM and CV portfolio for Ivan Tretyakov.

**Step 1: Next.js Setup**
- Initialize a Next.js (App Router) app in the current directory (`cv-project`), avoiding destructive overwrites of the `.git` folder.
- Install necessary dependencies (`next`, `react`, `react-dom`, `tailwindcss`, `@supabase/supabase-js`, `lucide-react`).

**Step 2: CV Migration**
- Convert the existing `index.html` into a React page at `app/cv/page.tsx`.
- Refactor the vanilla JS toggles (Persona and Language) into React `useState` hooks.
- Ensure the print functionality and Tailwind styles are perfectly preserved.

**Step 3: Supabase Database Setup**
- Use your Supabase MCP to create a table named `job_targets`.
- Schema: `id` (uuid), `name` (text), `firm` (text), `role` (text), `location` (text), `linkedin_url` (text), `target_type` (text - e.g., 'Headhunter', 'C-Suite'), `status` (text - e.g., 'To Contact', 'Message Sent', 'Meeting'), `notes` (text), `created_at` (timestamp).
- Enable RLS and create appropriate policies (or disable RLS if this is a purely private local/Vercel instance with hardcoded anon keys for now, prioritize getting it working).
- Read the 10 targets from `TARGETS.md` and insert them into the `job_targets` table via MCP.

**Step 4: CRM Dashboard**
- Build the CRM UI at `app/page.tsx`.
- Connect to Supabase using env variables (assume they will be provided via Vercel/local `.env.local`).
- Create a clean, executive-styled dashboard (Deep Navy, Slate) showing a data table or simple Kanban board of the targets.

Please execute this step-by-step.
