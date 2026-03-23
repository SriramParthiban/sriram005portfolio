import { useState, useEffect } from "react";
import {
  Lock, LogOut, Search, MessageCircle, Mail, Phone, User, Tag, Clock,
  ChevronDown, ChevronUp, Eye, Users, CalendarCheck,
  TrendingUp, BarChart3, MessageSquare, UserCheck, RefreshCw, FileText, ClipboardList, PenLine,
  Trash2, MoreVertical, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceGenerator from "@/components/admin/InvoiceGenerator";
import ProjectPlanGenerator from "@/components/admin/ProjectPlanGenerator";
import ContentPlanner from "@/components/admin/ContentPlanner";
import PerformanceMonitor from "@/components/admin/PerformanceMonitor";

const VERIFY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin`;
const LEADS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;

/*
 * Admin palette — Mediterranean Citrus (used ONLY on this page):
 * --admin-citrus:   #FFA62B  hsl(37, 100%, 58%)
 * --admin-sea:      #86C5FF  hsl(211, 100%, 76%)
 * --admin-tile:     #2E5AA7  hsl(220, 57%, 42%)
 * --admin-cream:    #F8E6A0  hsl(46, 88%, 80%)
 */

const ADM = {
  bg: "hsl(220, 50%, 8%)",                // deep navy-black
  bgGradient: "radial-gradient(ellipse at 50% 0%, hsl(220, 45%, 14%), hsl(220, 50%, 5%))",
  surface: "hsl(220, 35%, 12%)",           // card bg
  surfaceBorder: "hsl(220, 25%, 20%)",     // card border
  surfaceHover: "hsl(220, 25%, 16%)",
  accent: "#FFA62B",                       // citrus zest
  accentHsl: "hsl(37, 100%, 58%)",
  cream: "#F8E6A0",                        // cream gelato — main text
  creamHsl: "hsl(46, 88%, 80%)",
  midGreen: "#86C5FF",                     // sea breeze
  darkGreen: "#2E5AA7",                    // amalfi tile
  mutedText: "hsl(46, 40%, 60%)",          // warm muted
  inputBg: "hsl(220, 30%, 9%)",
  inputBorder: "hsl(220, 22%, 22%)",
};

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  summary: string | null;
  ai_response_summary: string | null;
  tag: string | null;
  full_conversation: { role: string; content: string }[] | null;
  created_at: string;
};

type Booking = {
  id: string;
  name: string;
  email: string;
  booking_date: string;
  booking_time: string;
  status: string;
  message: string | null;
  created_at: string;
};

type Stats = {
  totalViews: number;
  todayViews: number;
  uniqueVisitors: number;
  totalLeads: number;
  leadsWithContact: number;
  totalBookings: number;
  confirmedBookings: number;
  chatConversations: number;
  tagCounts: Record<string, number>;
  dailyViews: Record<string, number>;
};

type KPICardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  subtitle?: string;
};

const KPICard = ({ label, value, icon, gradient, subtitle }: KPICardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-gradient-to-br ${gradient} rounded-xl p-4 relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-x-4 -translate-y-4" />
    <div className="flex items-start justify-between mb-3">
      <span className="text-white text-xs font-bold uppercase tracking-wide">{label}</span>
      <div className="text-white/70">{icon}</div>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {subtitle && <p className="text-[11px] text-white/80 font-medium mt-1">{subtitle}</p>}
  </motion.div>
);

const LEAD_CATEGORIES = [
  "Website Project",
  "Appointment / Booking",
  "Service Inquiry",
  "AI & Automation",
  "Data & Analytics",
  "E-commerce",
  "General Inquiry",
  "Other",
] as const;

function categoriseLead(tag: string | null): string {
  if (!tag) return "Other";
  const t = tag.toLowerCase();
  if (t.includes("website") || t.includes("web") || t.includes("landing")) return "Website Project";
  if (t.includes("appointment") || t.includes("book")) return "Appointment / Booking";
  if (t.includes("service") || t.includes("consult")) return "Service Inquiry";
  if (t.includes("ai") || t.includes("automat") || t.includes("workflow")) return "AI & Automation";
  if (t.includes("data") || t.includes("analyt") || t.includes("dashboard") || t.includes("report")) return "Data & Analytics";
  if (t.includes("ecommerce") || t.includes("e-commerce") || t.includes("shop") || t.includes("store")) return "E-commerce";
  if (t.includes("inquiry") || t.includes("question") || t.includes("info")) return "General Inquiry";
  return "Other";
}

const CategoryCard = ({ category, leads }: { category: string; leads: Lead[] }) => {
  const [expanded, setExpanded] = useState(false);
  const cardStyle = {
    background: ADM.surface,
    border: `1px solid ${ADM.surfaceBorder}`,
  };

  return (
    <div className="rounded-xl overflow-hidden" style={cardStyle}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-3.5 transition-colors flex items-center gap-4"
        style={{ background: expanded ? ADM.surfaceHover : ADM.surface }}
        onMouseEnter={(e) => { if (!expanded) e.currentTarget.style.background = ADM.surfaceHover; }}
        onMouseLeave={(e) => { if (!expanded) e.currentTarget.style.background = ADM.surface; }}
      >
        <Tag className="h-4 w-4 shrink-0" style={{ color: ADM.accent }} />
        <span className="text-sm font-semibold flex-1 truncate" style={{ color: ADM.cream }}>{category}</span>
        <span className="text-lg font-bold mr-2" style={{ color: ADM.accent }}>{leads.length}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 shrink-0" style={{ color: ADM.mutedText }} />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0" style={{ color: ADM.mutedText }} />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2 space-y-2 max-h-64 overflow-y-auto"
              style={{ borderTop: `1px solid ${ADM.surfaceBorder}` }}
            >
              {leads.length === 0 ? (
                <p className="text-xs py-2 text-center" style={{ color: ADM.mutedText }}>No leads yet</p>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-lg px-3 py-2.5 text-xs"
                    style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold truncate" style={{ color: ADM.cream }}>
                        {lead.name || "Anonymous"}
                      </span>
                      <span className="text-[10px] whitespace-nowrap" style={{ color: ADM.mutedText }}>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {(lead.email || lead.phone) && (
                      <p className="mt-1 truncate" style={{ color: ADM.midGreen }}>
                        {lead.email || lead.phone}
                      </p>
                    )}
                    {lead.summary && (
                      <p className="mt-1 line-clamp-2" style={{ color: ADM.mutedText }}>
                        {lead.summary}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"stats" | "leads" | "bookings" | "invoice" | "plan" | "content" | "performance">("stats");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const resp = await fetch(VERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await resp.json();
      if (data.valid) {
        setAuthenticated(true);
        setStoredPassword(password);
        setPassword("");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    if (!authenticated) return;
    setLoading(true);
    fetch(LEADS_URL, { headers: { "x-admin-password": storedPassword } })
      .then((r) => r.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
        if (data.bookings) setBookings(data.bookings);
        if (data.stats) setStats(data.stats);
      })
      .catch(() => setError("Connection failed"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [authenticated, storedPassword]);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.tag?.toLowerCase().includes(q) ||
      l.summary?.toLowerCase().includes(q)
    );
  });

  const handleLogout = () => {
    setAuthenticated(false);
    setStoredPassword("");
    setLeads([]);
    setBookings([]);
    setStats(null);
  };

  // ─── Login screen ─────────────────────────────────────
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: ADM.bgGradient }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div
            className="rounded-2xl p-8"
            style={{
              background: ADM.surface,
              border: `1px solid ${ADM.surfaceBorder}`,
              boxShadow: `0 0 60px -15px ${ADM.darkGreen}80`,
            }}
          >
            <div className="flex items-center justify-center mb-6">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{ background: `${ADM.midGreen}25`, boxShadow: `0 0 0 2px ${ADM.midGreen}40` }}
              >
                <Lock className="h-6 w-6" style={{ color: ADM.accent }} />
              </div>
            </div>
            <h1 className="text-xl font-bold text-center mb-1" style={{ color: ADM.cream }}>
              Admin Dashboard
            </h1>
            <p className="text-sm text-center mb-6" style={{ color: ADM.mutedText }}>
              Enter password to continue
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{
                  background: ADM.inputBg,
                  border: `1px solid ${ADM.inputBorder}`,
                  color: ADM.cream,
                }}
                autoFocus
              />
              {error && <p className="text-sm text-red-400 text-center font-medium">{error}</p>}
              <button
                type="submit"
                disabled={!password || loading}
                className="w-full rounded-xl py-3 text-sm font-bold hover:brightness-110 disabled:opacity-40 transition-all"
                style={{ background: ADM.darkGreen, color: ADM.cream }}
              >
                {loading ? "Verifying..." : "Log In"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const conversionRate = stats
    ? stats.totalLeads > 0
      ? ((stats.leadsWithContact / stats.totalLeads) * 100).toFixed(1)
      : "0.0"
    : "—";

  const bookingRate = stats
    ? stats.totalLeads > 0
      ? ((stats.totalBookings / stats.totalLeads) * 100).toFixed(1)
      : "0.0"
    : "—";

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
  const maxDailyView = Math.max(1, ...last7Days.map((d) => stats?.dailyViews[d] || 0));

  // Card / input style helpers
  const cardStyle = {
    background: ADM.surface,
    border: `1px solid ${ADM.surfaceBorder}`,
  };
  const inputStyle = {
    background: ADM.inputBg,
    border: `1px solid ${ADM.inputBorder}`,
    color: ADM.cream,
  };

  return (
    <div className="min-h-screen" style={{ background: ADM.bgGradient }}>
      {/* Header */}
      <div
        className="backdrop-blur-md sticky top-0 z-10"
        style={{
          borderBottom: `1px solid ${ADM.surfaceBorder}`,
          background: `${ADM.surface}ee`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold" style={{ color: ADM.cream }}>Dashboard</h1>
            <p className="text-xs font-medium" style={{ color: ADM.accent }}>Portfolio Analytics & Leads</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${ADM.surfaceBorder}` }}
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} style={{ color: ADM.mutedText }} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm transition-colors hover:brightness-125"
              style={{ color: ADM.mutedText }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-xl w-fit flex-wrap"
          style={{ background: ADM.inputBg, border: `1px solid ${ADM.surfaceBorder}` }}
        >
          {(["stats", "leads", "bookings", "invoice", "plan", "content", "performance"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
              style={
                activeTab === tab
                  ? { background: ADM.darkGreen, color: ADM.cream, boxShadow: `0 4px 12px ${ADM.darkGreen}60` }
                  : { color: ADM.mutedText }
              }
              onMouseEnter={(e) => { if (activeTab !== tab) e.currentTarget.style.color = ADM.cream; }}
              onMouseLeave={(e) => { if (activeTab !== tab) e.currentTarget.style.color = ADM.mutedText; }}
            >
              {tab === "stats" && <BarChart3 className="h-4 w-4" />}
              {tab === "leads" && <MessageSquare className="h-4 w-4" />}
              {tab === "bookings" && <CalendarCheck className="h-4 w-4" />}
              {tab === "invoice" && <FileText className="h-4 w-4" />}
              {tab === "plan" && <ClipboardList className="h-4 w-4" />}
              {tab === "content" && <PenLine className="h-4 w-4" />}
              {tab === "performance" && <Zap className="h-4 w-4" />}
              {tab === "performance" ? "Performance" : tab === "content" ? "Content" : tab === "plan" ? "Plan" : tab === "invoice" ? "Invoice" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ─── Stats Tab ──────────────────────────────────── */}
        {activeTab === "stats" && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <KPICard label="Total Views" value={stats.totalViews} icon={<Eye className="h-4 w-4" />} gradient="from-[#2E5AA7] to-[#1a3a70]" />
              <KPICard label="Today" value={stats.todayViews} icon={<TrendingUp className="h-4 w-4" />} gradient="from-[#3a6db8] to-[#2E5AA7]" subtitle="Page views today" />
              <KPICard label="Unique Visitors" value={stats.uniqueVisitors} icon={<Users className="h-4 w-4" />} gradient="from-[#4a7dc0] to-[#2a4f90]" />
              <KPICard label="Chat Leads" value={stats.totalLeads} icon={<MessageCircle className="h-4 w-4" />} gradient="from-[#2E5AA7] to-[#86C5FF]/60" />
              <KPICard label="Contact Rate" value={`${conversionRate}%`} icon={<UserCheck className="h-4 w-4" />} gradient="from-[#c48a1a] to-[#8a6010]" subtitle={`${stats.leadsWithContact} with info`} />
              <KPICard label="Bookings" value={stats.totalBookings} icon={<CalendarCheck className="h-4 w-4" />} gradient="from-[#b07818] to-[#6e4c10]" subtitle={`${bookingRate}% booking rate`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Chart */}
              <div className="lg:col-span-2 rounded-xl p-5" style={cardStyle}>
                <h3 className="text-sm font-bold mb-4" style={{ color: ADM.cream }}>
                  Page Views — Last 7 Days
                </h3>
                <div className="flex items-end gap-2 h-32">
                  {last7Days.map((day) => {
                    const count = stats.dailyViews[day] || 0;
                    const height = Math.max(4, (count / maxDailyView) * 100);
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold" style={{ color: ADM.accent }}>{count}</span>
                        <div
                          className="w-full rounded-t-md transition-all"
                          style={{ height: `${height}%`, background: `linear-gradient(to top, ${ADM.darkGreen}, ${ADM.midGreen})` }}
                        />
                        <span className="text-[10px] font-medium" style={{ color: ADM.mutedText }}>
                          {new Date(day + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Categories count - small card */}
              <div className="rounded-xl p-5" style={cardStyle}>
                <h3 className="text-sm font-bold mb-4" style={{ color: ADM.cream }}>Lead Categories</h3>
                <div className="space-y-2.5">
                  {LEAD_CATEGORIES.map((cat) => {
                    const count = leads.filter((l) => categoriseLead(l.tag) === cat).length;
                    return (
                      <div key={cat} className="flex items-center justify-between text-sm">
                        <span className="truncate flex items-center gap-2 font-medium" style={{ color: ADM.mutedText }}>
                          <Tag className="h-3 w-3" style={{ color: ADM.accent }} />
                          {cat}
                        </span>
                        <span className="font-bold ml-2" style={{ color: ADM.cream }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category Cards — each category is its own card */}
            <div className="flex flex-col gap-3">
              {LEAD_CATEGORIES.map((cat) => {
                const catLeads = leads.filter((l) => categoriseLead(l.tag) === cat);
                return (
                  <CategoryCard key={cat} category={cat} leads={catLeads} />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Leads Tab ──────────────────────────────────── */}
        {activeTab === "leads" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: ADM.mutedText }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone, tag..."
                className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                style={{ ...inputStyle, borderColor: ADM.inputBorder }}
              />
            </div>

            {loading ? (
              <div className="text-center py-12 font-medium" style={{ color: ADM.mutedText }}>Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 font-medium" style={{ color: ADM.mutedText }}>No leads found</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((lead) => (
                  <motion.div key={lead.id} layout className="rounded-xl overflow-hidden" style={cardStyle}>
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className="font-bold text-sm" style={{ color: ADM.cream }}>
                            {lead.name || "Anonymous"}
                          </span>
                          {lead.tag && (
                            <span
                              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold"
                              style={{ background: `${ADM.darkGreen}30`, color: ADM.accent, border: `1px solid ${ADM.darkGreen}60` }}
                            >
                              <Tag className="h-3 w-3" />
                              {lead.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs flex-wrap font-medium" style={{ color: ADM.mutedText }}>
                          {lead.email && (
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>
                          )}
                          {lead.phone && (
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(lead.created_at).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (!confirm("Delete this lead?")) return;
                            try {
                              const resp = await fetch(LEADS_URL, {
                                method: "DELETE",
                                headers: { "x-admin-password": storedPassword, "Content-Type": "application/json" },
                                body: JSON.stringify({ type: "lead", id: lead.id }),
                              });
                              if (resp.ok) {
                                setLeads(leads.filter((l) => l.id !== lead.id));
                              }
                            } catch {}
                          }}
                          className="h-7 w-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/20"
                          style={{ border: `1px solid ${ADM.surfaceBorder}` }}
                          title="Delete lead"
                        >
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </button>
                        {expandedId === lead.id ? (
                          <ChevronUp className="h-4 w-4" style={{ color: ADM.accent }} />
                        ) : (
                          <ChevronDown className="h-4 w-4" style={{ color: ADM.mutedText }} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedId === lead.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-4 pt-4" style={{ borderTop: `1px solid ${ADM.surfaceBorder}` }}>
                            {lead.summary && (
                              <div>
                                <p className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: ADM.accent }}>
                                  <User className="h-3 w-3" /> Visitor Summary
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: ADM.cream }}>{lead.summary}</p>
                              </div>
                            )}
                            {lead.ai_response_summary && (
                              <div>
                                <p className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: ADM.accent }}>
                                  <MessageCircle className="h-3 w-3" /> AI Response Summary
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: ADM.cream }}>{lead.ai_response_summary}</p>
                              </div>
                            )}
                            {lead.full_conversation && lead.full_conversation.length > 0 && (
                              <div>
                                <p className="text-xs font-bold mb-2" style={{ color: ADM.accent }}>Full Conversation</p>
                                <div
                                  className="rounded-lg p-3 max-h-64 overflow-y-auto space-y-2"
                                  style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}
                                >
                                  {lead.full_conversation.map((msg, i) => (
                                    <div key={i} className="text-xs font-medium" style={{ color: msg.role === "user" ? ADM.accent : ADM.mutedText }}>
                                      <span className="font-bold">{msg.role === "user" ? "Visitor" : "AI"}:</span>{" "}
                                      {msg.content}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ─── Bookings Tab ──────────────────────────────── */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {bookings.length === 0 ? (
              <div className="text-center py-12 font-medium" style={{ color: ADM.mutedText }}>No bookings yet</div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-xl px-5 py-4" style={cardStyle}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: ADM.cream }}>{b.name}</p>
                        <div className="flex items-center gap-3 text-xs mt-1 flex-wrap font-medium" style={{ color: ADM.mutedText }}>
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{b.email}</span>
                          <span className="flex items-center gap-1">
                            <CalendarCheck className="h-3 w-3" />
                            {new Date(b.booking_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            {" at "}
                            {b.booking_time}
                          </span>
                        </div>
                        {b.message && (
                          <p className="text-xs mt-2 italic font-medium" style={{ color: ADM.mutedText }}>
                            "{b.message}"
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              const resp = await fetch(LEADS_URL, {
                                method: "PATCH",
                                headers: { "x-admin-password": storedPassword, "Content-Type": "application/json" },
                                body: JSON.stringify({ type: "booking", id: b.id, status: newStatus }),
                              });
                              if (resp.ok) {
                                setBookings(bookings.map((bk) => bk.id === b.id ? { ...bk, status: newStatus } : bk));
                              }
                            } catch {}
                          }}
                          className="text-[11px] px-2 py-1 rounded-lg font-bold cursor-pointer focus:outline-none"
                          style={{
                            background: ADM.inputBg,
                            border: `1px solid ${ADM.surfaceBorder}`,
                            color: b.status === "confirmed" ? "#6bdf6e" : ADM.accent,
                          }}
                        >
                          <option value="confirmed">confirmed</option>
                          <option value="pending">pending</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                        <button
                          onClick={async () => {
                            if (!confirm("Delete this booking?")) return;
                            try {
                              const resp = await fetch(LEADS_URL, {
                                method: "DELETE",
                                headers: { "x-admin-password": storedPassword, "Content-Type": "application/json" },
                                body: JSON.stringify({ type: "booking", id: b.id }),
                              });
                              if (resp.ok) {
                                setBookings(bookings.filter((bk) => bk.id !== b.id));
                              }
                            } catch {}
                          }}
                          className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/20"
                          style={{ border: `1px solid ${ADM.surfaceBorder}` }}
                          title="Delete booking"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ─── Invoice Tab ───────────────────────────────── */}
        {activeTab === "invoice" && <InvoiceGenerator />}

        {/* ─── Plan Tab ──────────────────────────────────── */}
        {activeTab === "plan" && <ProjectPlanGenerator />}

        {/* ─── Content Planner Tab ───────────────────────── */}
        {activeTab === "content" && <ContentPlanner />}

        {/* ─── Performance Tab ───────────────────────────── */}
        {activeTab === "performance" && <PerformanceMonitor />}
      </div>
    </div>
  );
};

export default AdminPage;
