CREATE TABLE public.chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  summary text,
  ai_response_summary text,
  full_conversation jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from edge functions (anon key)
CREATE POLICY "Allow anonymous inserts" ON public.chat_leads
  FOR INSERT WITH CHECK (true);

-- No public reads - only accessible via backend
CREATE POLICY "No public reads" ON public.chat_leads
  FOR SELECT USING (false);