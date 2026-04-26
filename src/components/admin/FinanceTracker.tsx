import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet, Target, ChevronDown, ChevronUp, PiggyBank } from "lucide-react";

const PERSONAL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/personal-data`;

const ADM = {
  surface: "hsl(220, 35%, 12%)",
  surfaceBorder: "hsl(220, 25%, 20%)",
  surfaceHover: "hsl(220, 25%, 16%)",
  accent: "#FFA62B",
  cream: "#F8E6A0",
  midGreen: "#86C5FF",
  darkGreen: "#2E5AA7",
  mutedText: "hsl(46, 40%, 60%)",
  inputBg: "hsl(220, 30%, 9%)",
  inputBorder: "hsl(220, 22%, 22%)",
};

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  currency: string;
  note: string | null;
  transaction_date: string;
};

type Goal = {
  id: string;
  title: string;
  target_amount: number;
  saved_amount: number;
  currency: string;
  deadline: string | null;
  notes: string | null;
  status: "active" | "completed" | "paused";
};

const EXPENSE_CATEGORIES = ["Food", "Rent", "Transport", "Subscriptions", "Shopping", "Health", "Entertainment", "Bills", "Other"];
const INCOME_CATEGORIES = ["Salary", "Freelance", "Client Project", "Investment", "Gift", "Other"];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

interface Props {
  adminPassword: string;
}

const FinanceTracker = ({ adminPassword }: Props) => {
  const [view, setView] = useState<"budget" | "goals">("budget");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  // Budget form
  const [showTxForm, setShowTxForm] = useState(false);
  const [txType, setTxType] = useState<"income" | "expense">("expense");
  const [txCategory, setTxCategory] = useState("Food");
  const [txAmount, setTxAmount] = useState("");
  const [txNote, setTxNote] = useState("");
  const [txDate, setTxDate] = useState(new Date().toISOString().split("T")[0]);

  // Goal form
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalSaved, setGoalSaved] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goalNotes, setGoalNotes] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const resp = await fetch(PERSONAL_URL, { headers: { "x-admin-password": adminPassword } });
      const data = await resp.json();
      setTransactions(data.transactions || []);
      setGoals(data.goals || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const addTransaction = async () => {
    if (!txAmount || Number(txAmount) <= 0) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "POST",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "budget_transactions",
        payload: {
          type: txType,
          category: txCategory,
          amount: Number(txAmount),
          note: txNote || null,
          transaction_date: txDate,
        },
      }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setTransactions([record, ...transactions]);
      setTxAmount(""); setTxNote(""); setShowTxForm(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({ table: "budget_transactions", id }),
    });
    if (resp.ok) setTransactions(transactions.filter((t) => t.id !== id));
  };

  const addGoal = async () => {
    if (!goalTitle || !goalTarget) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "POST",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "savings_goals",
        payload: {
          title: goalTitle,
          target_amount: Number(goalTarget),
          saved_amount: Number(goalSaved) || 0,
          deadline: goalDeadline || null,
          notes: goalNotes || null,
        },
      }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setGoals([record, ...goals]);
      setGoalTitle(""); setGoalTarget(""); setGoalSaved(""); setGoalDeadline(""); setGoalNotes("");
      setShowGoalForm(false);
    }
  };

  const updateGoalSaved = async (goal: Goal, newSaved: number) => {
    const status = newSaved >= goal.target_amount ? "completed" : "active";
    const resp = await fetch(PERSONAL_URL, {
      method: "PATCH",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({ table: "savings_goals", id: goal.id, payload: { saved_amount: newSaved, status } }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setGoals(goals.map((g) => (g.id === goal.id ? record : g)));
    }
  };

  const deleteGoal = async (id: string) => {
    if (!confirm("Delete this goal?")) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({ table: "savings_goals", id }),
    });
    if (resp.ok) setGoals(goals.filter((g) => g.id !== id));
  };

  // Current month stats
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthTx = transactions.filter((t) => new Date(t.transaction_date) >= monthStart);
  const monthIncome = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const monthExpense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const monthNet = monthIncome - monthExpense;
  const savingsRate = monthIncome > 0 ? ((monthNet / monthIncome) * 100).toFixed(0) : "0";

  // Category breakdown (current month, expenses)
  const catBreakdown: Record<string, number> = {};
  monthTx.filter((t) => t.type === "expense").forEach((t) => {
    catBreakdown[t.category] = (catBreakdown[t.category] || 0) + Number(t.amount);
  });
  const sortedCats = Object.entries(catBreakdown).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(1, ...Object.values(catBreakdown));

  const cardStyle = { background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` };
  const inputStyle = { background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: ADM.inputBg, border: `1px solid ${ADM.surfaceBorder}` }}>
        {(["budget", "goals"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            style={view === v ? { background: ADM.darkGreen, color: ADM.cream } : { color: ADM.mutedText }}
          >
            {v === "budget" ? <Wallet className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
            {v === "budget" ? "Budget" : "Savings Goals"}
          </button>
        ))}
      </div>

      {view === "budget" && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-700 to-emerald-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Income (Month)</span>
                <TrendingUp className="h-4 w-4 text-white/70" />
              </div>
              <p className="text-2xl font-bold text-white">{formatINR(monthIncome)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-rose-700 to-rose-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Expenses (Month)</span>
                <TrendingDown className="h-4 w-4 text-white/70" />
              </div>
              <p className="text-2xl font-bold text-white">{formatINR(monthExpense)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-[#2E5AA7] to-[#1a3a70]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Net</span>
                <Wallet className="h-4 w-4 text-white/70" />
              </div>
              <p className={`text-2xl font-bold ${monthNet >= 0 ? "text-white" : "text-rose-300"}`}>{formatINR(monthNet)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-[#FFA62B] to-[#c47a00]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Savings Rate</span>
                <PiggyBank className="h-4 w-4 text-white/70" />
              </div>
              <p className="text-2xl font-bold text-white">{savingsRate}%</p>
            </div>
          </div>

          {/* Category breakdown */}
          {sortedCats.length > 0 && (
            <div className="rounded-xl p-5" style={cardStyle}>
              <h3 className="text-sm font-bold mb-4" style={{ color: ADM.cream }}>Spending by Category — This Month</h3>
              <div className="space-y-3">
                {sortedCats.map(([cat, amt]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: ADM.cream }}>{cat}</span>
                      <span style={{ color: ADM.mutedText }}>{formatINR(amt)}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: ADM.inputBg }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${(amt / maxCat) * 100}%`, background: ADM.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add transaction */}
          <div className="rounded-xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: ADM.cream }}>Transactions</h3>
              <button
                onClick={() => setShowTxForm(!showTxForm)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: ADM.darkGreen, color: ADM.cream }}
              >
                <Plus className="h-3.5 w-3.5" />{showTxForm ? "Cancel" : "Add"}
              </button>
            </div>

            <AnimatePresence>
              {showTxForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 pb-4 mb-4 border-b" style={{ borderColor: ADM.surfaceBorder }}>
                    <select value={txType} onChange={(e) => { setTxType(e.target.value as "income" | "expense"); setTxCategory(e.target.value === "income" ? "Salary" : "Food"); }} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                    <select value={txCategory} onChange={(e) => setTxCategory(e.target.value)} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle}>
                      {(txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input type="number" value={txAmount} onChange={(e) => setTxAmount(e.target.value)} placeholder="Amount ₹" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <input type="date" value={txDate} onChange={(e) => setTxDate(e.target.value)} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <input type="text" value={txNote} onChange={(e) => setTxNote(e.target.value)} placeholder="Note (optional)" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                  </div>
                  <button onClick={addTransaction} className="w-full rounded-lg py-2 text-xs font-bold mb-4" style={{ background: ADM.accent, color: "hsl(220, 50%, 8%)" }}>Save Transaction</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            {loading ? (
              <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>Loading…</p>
            ) : transactions.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>No transactions yet</p>
            ) : (
              <div className="space-y-1.5 max-h-96 overflow-y-auto">
                {transactions.slice(0, 50).map((t) => (
                  <div key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${t.type === "income" ? "bg-emerald-500/20" : "bg-rose-500/20"}`}>
                      {t.type === "income" ? <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold" style={{ color: ADM.cream }}>{t.category}</span>
                        {t.note && <span className="truncate" style={{ color: ADM.mutedText }}>· {t.note}</span>}
                      </div>
                      <span className="text-[10px]" style={{ color: ADM.mutedText }}>{new Date(t.transaction_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                    <span className={`text-sm font-bold whitespace-nowrap ${t.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                      {t.type === "income" ? "+" : "−"}{formatINR(Number(t.amount))}
                    </span>
                    <button onClick={() => deleteTransaction(t.id)} className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-500/20" title="Delete">
                      <Trash2 className="h-3 w-3 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {view === "goals" && (
        <div className="rounded-xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: ADM.cream }}>Savings Goals</h3>
            <button onClick={() => setShowGoalForm(!showGoalForm)} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: ADM.darkGreen, color: ADM.cream }}>
              <Plus className="h-3.5 w-3.5" />{showGoalForm ? "Cancel" : "New Goal"}
            </button>
          </div>

          <AnimatePresence>
            {showGoalForm && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 mb-4 border-b" style={{ borderColor: ADM.surfaceBorder }}>
                  <input type="text" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} placeholder="Goal title (e.g., MacBook Pro)" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-2" style={inputStyle} />
                  <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="Target ₹" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                  <input type="number" value={goalSaved} onChange={(e) => setGoalSaved(e.target.value)} placeholder="Already saved ₹" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                  <input type="date" value={goalDeadline} onChange={(e) => setGoalDeadline(e.target.value)} placeholder="Deadline" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                  <input type="text" value={goalNotes} onChange={(e) => setGoalNotes(e.target.value)} placeholder="Notes (optional)" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                </div>
                <button onClick={addGoal} className="w-full rounded-lg py-2 text-xs font-bold mb-4" style={{ background: ADM.accent, color: "hsl(220, 50%, 8%)" }}>Create Goal</button>
              </motion.div>
            )}
          </AnimatePresence>

          {goals.length === 0 ? (
            <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>No goals yet — start by adding one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goals.map((g) => {
                const pct = Math.min(100, (Number(g.saved_amount) / Number(g.target_amount)) * 100);
                const isDone = g.status === "completed";
                return (
                  <div key={g.id} className="rounded-xl p-4" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate flex items-center gap-1.5" style={{ color: ADM.cream }}>
                          {isDone && <span className="text-emerald-400">✓</span>}
                          {g.title}
                        </h4>
                        {g.deadline && <p className="text-[10px]" style={{ color: ADM.mutedText }}>by {new Date(g.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>}
                      </div>
                      <button onClick={() => deleteGoal(g.id)} className="h-6 w-6 rounded-lg flex items-center justify-center hover:bg-red-500/20" title="Delete">
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: ADM.midGreen }}>{formatINR(Number(g.saved_amount))}</span>
                      <span style={{ color: ADM.mutedText }}>of {formatINR(Number(g.target_amount))}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: ADM.surface }}>
                      <div className={`h-full rounded-full ${isDone ? "bg-emerald-500" : ""}`} style={{ width: `${pct}%`, background: isDone ? undefined : `linear-gradient(90deg, ${ADM.darkGreen}, ${ADM.accent})` }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={g.saved_amount}
                        onBlur={(e) => {
                          const v = Number(e.target.value);
                          if (v !== Number(g.saved_amount)) updateGoalSaved(g, v);
                        }}
                        className="flex-1 rounded-md px-2 py-1 text-[11px] focus:outline-none"
                        style={inputStyle}
                      />
                      <span className="text-[10px] font-bold" style={{ color: ADM.accent }}>{pct.toFixed(0)}%</span>
                    </div>
                    {g.notes && <p className="text-[10px] mt-2 italic" style={{ color: ADM.mutedText }}>{g.notes}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default FinanceTracker;
