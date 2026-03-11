import { useState, useEffect } from "react";
import {
  Lock, LogOut, Search, MessageCircle, Mail, Phone, User, Tag, Clock,
  ChevronDown, ChevronUp, Eye, Users, CalendarCheck, MousePointerClick,
  TrendingUp, BarChart3, MessageSquare, UserCheck, RefreshCw, FileText, ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceGenerator from "@/components/admin/InvoiceGenerator";
import ProjectPlanGenerator from "@/components/admin/ProjectPlanGenerator";
const VERIFY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin`;
const LEADS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;

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
  color: "purple" | "green" | "blue" | "amber" | "red" | "cyan";
  subtitle?: string;
};

const colorMap = {
  purple: "from-[hsl(270,70%,50%)] to-[hsl(270,60%,35%)]",
  green: "from-[hsl(145,65%,42%)] to-[hsl(145,55%,30%)]",
  blue: "from-[hsl(215,70%,50%)] to-[hsl(215,60%,35%)]",
  amber: "from-[hsl(35,90%,50%)] to-[hsl(35,80%,38%)]",
  red: "from-[hsl(0,70%,50%)] to-[hsl(0,60%,35%)]",
  cyan: "from-[hsl(185,65%,45%)] to-[hsl(185,55%,32%)]",
};

const KPICard = ({ label, value, icon, color, subtitle }: KPICardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-4 relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-x-4 -translate-y-4" />
    <div className="flex items-start justify-between mb-3">
      <span className="text-white text-xs font-bold uppercase tracking-wide">{label}</span>
      <div className="text-white/60">{icon}</div>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {subtitle && <p className="text-[11px] text-white/70 font-medium mt-1">{subtitle}</p>}
  </motion.div>
);

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
  const [activeTab, setActiveTab] = useState<"stats" | "leads" | "bookings" | "invoice" | "plan">("stats");

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

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(270 50% 15% / 0.5), hsl(0 0% 4%))" }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="bg-[hsl(270,20%,8%)] border border-[hsl(270,30%,20%)] rounded-2xl p-8 shadow-[0_0_60px_-15px_hsl(270,70%,50%/0.15)]">
            <div className="flex items-center justify-center mb-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-center text-foreground mb-1">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground text-center mb-6">Enter password to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[hsl(270,15%,12%)] border border-[hsl(270,20%,20%)] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                autoFocus
              />
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
              <button
                type="submit"
                disabled={!password || loading}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium hover:brightness-110 disabled:opacity-40 transition-all"
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

  // Get last 7 days labels
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
  const maxDailyView = Math.max(1, ...last7Days.map((d) => stats?.dailyViews[d] || 0));

  return (
    <div className="min-h-screen"
      style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(270 50% 10% / 0.6), hsl(0 0% 3%))" }}
    >
      {/* Header */}
      <div className="border-b border-[hsl(270,20%,18%)] bg-[hsl(270,15%,5%/0.95)] backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <p className="text-xs text-[hsl(270,60%,70%)]">Portfolio Analytics & Leads</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="h-9 w-9 rounded-lg border border-[hsl(270,20%,20%)] flex items-center justify-center hover:bg-primary/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-[hsl(270,12%,8%)] p-1 rounded-xl w-fit border border-[hsl(270,20%,18%)] flex-wrap">
          {(["stats", "leads", "bookings", "invoice", "plan"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-[hsl(270,30%,65%)] hover:text-white"
              }`}
            >
              {tab === "stats" && <BarChart3 className="h-4 w-4" />}
              {tab === "leads" && <MessageSquare className="h-4 w-4" />}
              {tab === "bookings" && <CalendarCheck className="h-4 w-4" />}
              {tab === "invoice" && <FileText className="h-4 w-4" />}
              {tab === "plan" && <ClipboardList className="h-4 w-4" />}
              {tab === "plan" ? "Plan" : tab === "invoice" ? "Invoice" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <KPICard label="Total Views" value={stats.totalViews} icon={<Eye className="h-4 w-4" />} color="purple" />
              <KPICard label="Today" value={stats.todayViews} icon={<TrendingUp className="h-4 w-4" />} color="blue" subtitle="Page views today" />
              <KPICard label="Unique Visitors" value={stats.uniqueVisitors} icon={<Users className="h-4 w-4" />} color="cyan" />
              <KPICard label="Chat Leads" value={stats.totalLeads} icon={<MessageCircle className="h-4 w-4" />} color="green" />
              <KPICard label="Contact Rate" value={`${conversionRate}%`} icon={<UserCheck className="h-4 w-4" />} color="amber" subtitle={`${stats.leadsWithContact} with info`} />
              <KPICard label="Bookings" value={stats.totalBookings} icon={<CalendarCheck className="h-4 w-4" />} color="red" subtitle={`${bookingRate}% booking rate`} />
            </div>

            {/* Chart + Tag breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Mini bar chart - last 7 days */}
              <div className="lg:col-span-2 bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Page Views — Last 7 Days</h3>
                <div className="flex items-end gap-2 h-32">
                  {last7Days.map((day) => {
                    const count = stats.dailyViews[day] || 0;
                    const height = Math.max(4, (count / maxDailyView) * 100);
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">{count}</span>
                        <div
                          className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-t-md transition-all"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(day + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tag breakdown */}
              <div className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Lead Tags</h3>
                <div className="space-y-2">
                  {Object.entries(stats.tagCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 8)
                    .map(([tag, count]) => (
                      <div key={tag} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground truncate flex items-center gap-2">
                          <Tag className="h-3 w-3 text-primary" />
                          {tag}
                        </span>
                        <span className="text-foreground font-medium ml-2">{count}</span>
                      </div>
                    ))}
                  {Object.keys(stats.tagCounts).length === 0 && (
                    <p className="text-xs text-muted-foreground">No tags yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone, tag..."
                className="w-full bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,15%)] rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No leads found</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className="font-semibold text-foreground text-sm">
                            {lead.name || "Anonymous"}
                          </span>
                          {lead.tag && (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              <Tag className="h-3 w-3" />
                              {lead.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
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
                      {expandedId === lead.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      )}
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
                          <div className="px-5 pb-5 space-y-4 border-t border-[hsl(270,20%,15%)] pt-4">
                            {lead.summary && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                  <User className="h-3 w-3" /> Visitor Summary
                                </p>
                                <p className="text-sm text-foreground leading-relaxed">{lead.summary}</p>
                              </div>
                            )}
                            {lead.ai_response_summary && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                  <MessageCircle className="h-3 w-3" /> AI Response Summary
                                </p>
                                <p className="text-sm text-foreground leading-relaxed">{lead.ai_response_summary}</p>
                              </div>
                            )}
                            {lead.full_conversation && lead.full_conversation.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Full Conversation</p>
                                <div className="bg-[hsl(270,10%,6%)] rounded-lg p-3 max-h-64 overflow-y-auto space-y-2 border border-[hsl(270,15%,12%)]">
                                  {lead.full_conversation.map((msg, i) => (
                                    <div key={i} className={`text-xs ${msg.role === "user" ? "text-primary" : "text-muted-foreground"}`}>
                                      <span className="font-medium">{msg.role === "user" ? "Visitor" : "AI"}:</span>{" "}
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

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No bookings yet</div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{b.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{b.email}</span>
                          <span className="flex items-center gap-1">
                            <CalendarCheck className="h-3 w-3" />
                            {new Date(b.booking_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            {" at "}
                            {b.booking_time}
                          </span>
                        </div>
                        {b.message && <p className="text-xs text-muted-foreground mt-2 italic">"{b.message}"</p>}
                      </div>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                        b.status === "confirmed"
                          ? "bg-[hsl(145,65%,42%/0.15)] text-[hsl(145,65%,55%)] border border-[hsl(145,65%,42%/0.3)]"
                          : "bg-[hsl(35,90%,50%/0.15)] text-[hsl(35,90%,60%)] border border-[hsl(35,90%,50%/0.3)]"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Invoice Tab */}
        {activeTab === "invoice" && <InvoiceGenerator />}
      </div>
    </div>
  );
};

export default AdminPage;
