
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  referrer text,
  user_agent text,
  session_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on page_views"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public reads on page_views"
  ON public.page_views FOR SELECT
  USING (false);
