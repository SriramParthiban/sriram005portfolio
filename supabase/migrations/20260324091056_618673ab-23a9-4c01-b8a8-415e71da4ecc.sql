
CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_email text,
  client_phone text,
  client_address text,
  currency text NOT NULL DEFAULT 'INR',
  invoice_date date NOT NULL,
  due_date date,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL DEFAULT 0,
  notes text,
  custom_role text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public reads on invoices" ON public.invoices FOR SELECT TO public USING (false);
CREATE POLICY "No public inserts on invoices" ON public.invoices FOR INSERT TO public WITH CHECK (false);
