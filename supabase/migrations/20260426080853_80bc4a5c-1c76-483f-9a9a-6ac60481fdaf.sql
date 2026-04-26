-- Personal admin modules: budget, savings goals, tasks, time tracking
-- All locked down via RLS (no public access). Admin reads/writes via verified edge functions or service role.

-- 1. Budget transactions (income & expenses)
CREATE TABLE public.budget_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  note TEXT,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.budget_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public reads on budget_transactions" ON public.budget_transactions FOR SELECT USING (false);
CREATE POLICY "No public inserts on budget_transactions" ON public.budget_transactions FOR INSERT WITH CHECK (false);
CREATE POLICY "No public updates on budget_transactions" ON public.budget_transactions FOR UPDATE USING (false);
CREATE POLICY "No public deletes on budget_transactions" ON public.budget_transactions FOR DELETE USING (false);

-- 2. Savings goals
CREATE TABLE public.savings_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  saved_amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  deadline DATE,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public reads on savings_goals" ON public.savings_goals FOR SELECT USING (false);
CREATE POLICY "No public inserts on savings_goals" ON public.savings_goals FOR INSERT WITH CHECK (false);
CREATE POLICY "No public updates on savings_goals" ON public.savings_goals FOR UPDATE USING (false);
CREATE POLICY "No public deletes on savings_goals" ON public.savings_goals FOR DELETE USING (false);

-- 3. Personal tasks
CREATE TABLE public.personal_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.personal_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public reads on personal_tasks" ON public.personal_tasks FOR SELECT USING (false);
CREATE POLICY "No public inserts on personal_tasks" ON public.personal_tasks FOR INSERT WITH CHECK (false);
CREATE POLICY "No public updates on personal_tasks" ON public.personal_tasks FOR UPDATE USING (false);
CREATE POLICY "No public deletes on personal_tasks" ON public.personal_tasks FOR DELETE USING (false);

-- 4. Time tracking entries
CREATE TABLE public.time_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project TEXT NOT NULL,
  client TEXT,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  billable BOOLEAN NOT NULL DEFAULT true,
  hourly_rate NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public reads on time_entries" ON public.time_entries FOR SELECT USING (false);
CREATE POLICY "No public inserts on time_entries" ON public.time_entries FOR INSERT WITH CHECK (false);
CREATE POLICY "No public updates on time_entries" ON public.time_entries FOR UPDATE USING (false);
CREATE POLICY "No public deletes on time_entries" ON public.time_entries FOR DELETE USING (false);

-- Shared updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON public.savings_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_personal_tasks_updated_at BEFORE UPDATE ON public.personal_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();