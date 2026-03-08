import { useState, useEffect } from "react";
import { Lock, LogOut, Search, MessageCircle, Mail, Phone, User, Tag, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch(LEADS_URL, {
      headers: { "x-admin-password": storedPassword },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
        else setError("Failed to fetch leads");
      })
      .catch(() => setError("Connection failed"))
      .finally(() => setLoading(false));
  }, [authenticated, storedPassword]);

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
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
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
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                autoFocus
              />
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
              <button
                type="submit"
                disabled={!password || loading}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-all"
              >
                {loading ? "Verifying..." : "Log In"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Chat Leads</h1>
            <p className="text-xs text-muted-foreground">{leads.length} total leads</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, tag..."
            className="w-full bg-muted border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
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
                className="bg-card border border-border rounded-xl overflow-hidden"
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
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                      <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
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
                            <div className="bg-muted/50 rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
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
      </div>
    </div>
  );
};

export default AdminPage;
