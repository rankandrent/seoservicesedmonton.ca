-- Contact form leads. Run once in the Supabase SQL editor for project nlxcidsyswgzsrtnrxyu.
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 200),
  website text check (char_length(website) <= 300),
  phone text check (char_length(phone) <= 40),
  service text check (char_length(service) <= 80),
  message text check (char_length(message) <= 5000),
  page text,
  user_agent text
);

-- The website (anon key) can add leads but never read, change or delete them.
alter table public.leads enable row level security;
drop policy if exists "Website can insert leads" on public.leads;
create policy "Website can insert leads" on public.leads for insert to anon with check (true);
