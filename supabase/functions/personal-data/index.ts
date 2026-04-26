import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
};

const ALLOWED_TABLES = new Set([
  "budget_transactions",
  "savings_goals",
  "personal_tasks",
  "time_entries",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminPassword = req.headers.get("x-admin-password");
    const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    if (!ADMIN_PASSWORD || adminPassword !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // GET — fetch all personal data
    if (req.method === "GET") {
      const [tx, goals, tasks, time] = await Promise.all([
        supabase.from("budget_transactions").select("*").order("transaction_date", { ascending: false }),
        supabase.from("savings_goals").select("*").order("created_at", { ascending: false }),
        supabase.from("personal_tasks").select("*").order("created_at", { ascending: false }),
        supabase.from("time_entries").select("*").order("entry_date", { ascending: false }),
      ]);
      return new Response(
        JSON.stringify({
          transactions: tx.data || [],
          goals: goals.data || [],
          tasks: tasks.data || [],
          timeEntries: time.data || [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { table, payload, id } = body;

    if (!ALLOWED_TABLES.has(table)) {
      return new Response(JSON.stringify({ error: "Invalid table" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST") {
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, record: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "PATCH") {
      if (!id) throw new Error("id required");
      const { data, error } = await supabase.from(table).update(payload).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, record: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "DELETE") {
      if (!id) throw new Error("id required");
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
