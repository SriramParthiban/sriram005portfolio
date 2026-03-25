
CREATE TABLE public.content_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_idea text NOT NULL,
  platform text,
  tone text,
  posting_day text,
  subject text,
  content_angle text,
  content text,
  keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  hashtags jsonb NOT NULL DEFAULT '[]'::jsonb,
  hook text,
  main_idea text,
  key_insight text,
  call_to_action text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.content_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public reads on content_plans" ON public.content_plans FOR SELECT TO public USING (false);
CREATE POLICY "No public inserts on content_plans" ON public.content_plans FOR INSERT TO public WITH CHECK (false);
