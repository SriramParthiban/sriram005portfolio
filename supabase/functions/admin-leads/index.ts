import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    // Handle DELETE requests
    if (req.method === "DELETE") {
      const { type, id } = await req.json();
      if (!type || !id) {
        return new Response(JSON.stringify({ error: "type and id required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const table = type === "booking" ? "bookings" : type === "lead" ? "chat_leads" : null;
      if (!table) {
        return new Response(JSON.stringify({ error: "Invalid type" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle PATCH requests (update booking status)
    if (req.method === "PATCH") {
      const { type, id, status } = await req.json();
      if (type === "booking" && id && status) {
        const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET: Fetch all data
    const [leadsRes, bookingsRes, viewsRes, viewsTodayRes, uniqueSessionsRes] = await Promise.all([
      supabase.from("chat_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("page_views").select("id", { count: "exact", head: true }),
      supabase.from("page_views").select("id", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
      supabase.from("page_views").select("session_id"),
    ]);

    const leads = leadsRes.data || [];
    const bookings = bookingsRes.data || [];
    const totalViews = viewsRes.count || 0;
    const todayViews = viewsTodayRes.count || 0;
    
    const uniqueSessions = new Set(
      (uniqueSessionsRes.data || []).map((r: any) => r.session_id).filter(Boolean)
    ).size;

    const leadsWithContact = leads.filter(
      (l: any) => l.email || l.phone
    ).length;
    const confirmedBookings = bookings.filter((b: any) => b.status === "confirmed").length;

    const tagCounts: Record<string, number> = {};
    leads.forEach((l: any) => {
      const tag = l.tag || "Untagged";
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentViewsRes = await supabase
      .from("page_views")
      .select("created_at")
      .gte("created_at", sevenDaysAgo.toISOString());
    
    const dailyViews: Record<string, number> = {};
    (recentViewsRes.data || []).forEach((v: any) => {
      const day = new Date(v.created_at).toISOString().split("T")[0];
      dailyViews[day] = (dailyViews[day] || 0) + 1;
    });

    return new Response(
      JSON.stringify({
        leads,
        bookings,
        stats: {
          totalViews,
          todayViews,
          uniqueVisitors: uniqueSessions,
          totalLeads: leads.length,
          leadsWithContact,
          totalBookings: bookings.length,
          confirmedBookings,
          chatConversations: leads.length,
          tagCounts,
          dailyViews,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
