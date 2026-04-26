import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Circle, Clock, ListTodo, Timer, Play } from "lucide-react";

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

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  due_date: string | null;
  completed_at: string | null;
};

type TimeEntry = {
  id: string;
  project: string;
  client: string | null;
  description: string | null;
  duration_minutes: number;
  entry_date: string;
  billable: boolean;
  hourly_rate: number | null;
};

const PRIORITY_COLORS = {
  high: "text-rose-400 bg-rose-500/15",
  medium: "text-amber-400 bg-amber-500/15",
  low: "text-sky-400 bg-sky-500/15",
};

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const formatDuration = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

interface Props {
  adminPassword: string;
}

const ProductivityTracker = ({ adminPassword }: Props) => {
  const [view, setView] = useState<"tasks" | "time">("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Task form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskDue, setTaskDue] = useState("");

  // Time form
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [timeProject, setTimeProject] = useState("");
  const [timeClient, setTimeClient] = useState("");
  const [timeDesc, setTimeDesc] = useState("");
  const [timeHours, setTimeHours] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [timeDate, setTimeDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeBillable, setTimeBillable] = useState(true);
  const [timeRate, setTimeRate] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const resp = await fetch(PERSONAL_URL, { headers: { "x-admin-password": adminPassword } });
      const data = await resp.json();
      setTasks(data.tasks || []);
      setTimeEntries(data.timeEntries || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const addTask = async () => {
    if (!taskTitle) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "POST",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "personal_tasks",
        payload: {
          title: taskTitle,
          description: taskDesc || null,
          priority: taskPriority,
          due_date: taskDue || null,
        },
      }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setTasks([record, ...tasks]);
      setTaskTitle(""); setTaskDesc(""); setTaskDue(""); setTaskPriority("medium");
      setShowTaskForm(false);
    }
  };

  const cycleTaskStatus = async (task: Task) => {
    const next = task.status === "todo" ? "in_progress" : task.status === "in_progress" ? "done" : "todo";
    const resp = await fetch(PERSONAL_URL, {
      method: "PATCH",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "personal_tasks",
        id: task.id,
        payload: { status: next, completed_at: next === "done" ? new Date().toISOString() : null },
      }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setTasks(tasks.map((t) => (t.id === task.id ? record : t)));
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({ table: "personal_tasks", id }),
    });
    if (resp.ok) setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTimeEntry = async () => {
    const totalMins = (Number(timeHours) || 0) * 60 + (Number(timeMinutes) || 0);
    if (!timeProject || totalMins <= 0) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "POST",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "time_entries",
        payload: {
          project: timeProject,
          client: timeClient || null,
          description: timeDesc || null,
          duration_minutes: totalMins,
          entry_date: timeDate,
          billable: timeBillable,
          hourly_rate: timeRate ? Number(timeRate) : null,
        },
      }),
    });
    if (resp.ok) {
      const { record } = await resp.json();
      setTimeEntries([record, ...timeEntries]);
      setTimeProject(""); setTimeClient(""); setTimeDesc(""); setTimeHours(""); setTimeMinutes(""); setTimeRate("");
      setShowTimeForm(false);
    }
  };

  const deleteTimeEntry = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    const resp = await fetch(PERSONAL_URL, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
      body: JSON.stringify({ table: "time_entries", id }),
    });
    if (resp.ok) setTimeEntries(timeEntries.filter((t) => t.id !== id));
  };

  // Stats
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  // Week stats for time
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const weekEntries = timeEntries.filter((e) => new Date(e.entry_date) >= weekStart);
  const weekMins = weekEntries.reduce((s, e) => s + e.duration_minutes, 0);
  const weekBillable = weekEntries.filter((e) => e.billable && e.hourly_rate).reduce((s, e) => s + (e.duration_minutes / 60) * Number(e.hourly_rate), 0);

  const cardStyle = { background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` };
  const inputStyle = { background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: ADM.inputBg, border: `1px solid ${ADM.surfaceBorder}` }}>
        {(["tasks", "time"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            style={view === v ? { background: ADM.darkGreen, color: ADM.cream } : { color: ADM.mutedText }}
          >
            {v === "tasks" ? <ListTodo className="h-3.5 w-3.5" /> : <Timer className="h-3.5 w-3.5" />}
            {v === "tasks" ? "Tasks" : "Time"}
          </button>
        ))}
      </div>

      {view === "tasks" && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-gradient-to-br from-sky-700 to-sky-900">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">To Do</span>
              <p className="text-2xl font-bold text-white mt-1">{todoCount}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-amber-600 to-amber-800">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">In Progress</span>
              <p className="text-2xl font-bold text-white mt-1">{inProgressCount}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-700 to-emerald-900">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">Done</span>
              <p className="text-2xl font-bold text-white mt-1">{doneCount}</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: ADM.cream }}>Tasks</h3>
              <button onClick={() => setShowTaskForm(!showTaskForm)} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: ADM.darkGreen, color: ADM.cream }}>
                <Plus className="h-3.5 w-3.5" />{showTaskForm ? "Cancel" : "Add Task"}
              </button>
            </div>

            <AnimatePresence>
              {showTaskForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 mb-4 border-b" style={{ borderColor: ADM.surfaceBorder }}>
                    <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-2" style={inputStyle} />
                    <input value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} placeholder="Description (optional)" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-2" style={inputStyle} />
                    <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value as any)} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <input type="date" value={taskDue} onChange={(e) => setTaskDue(e.target.value)} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                  </div>
                  <button onClick={addTask} className="w-full rounded-lg py-2 text-xs font-bold mb-4" style={{ background: ADM.accent, color: "hsl(220, 50%, 8%)" }}>Save Task</button>
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>Loading…</p>
            ) : tasks.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>No tasks yet</p>
            ) : (
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
                {tasks.map((t) => {
                  const isDone = t.status === "done";
                  return (
                    <div key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                      <button onClick={() => cycleTaskStatus(t)} title="Cycle status">
                        {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : t.status === "in_progress" ? <Clock className="h-4 w-4 text-amber-400" /> : <Circle className="h-4 w-4" style={{ color: ADM.mutedText }} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${isDone ? "line-through opacity-50" : ""}`} style={{ color: ADM.cream }}>{t.title}</span>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          {t.description && <span className="text-[10px] truncate" style={{ color: ADM.mutedText }}>{t.description}</span>}
                          {t.due_date && <span className="text-[10px]" style={{ color: ADM.midGreen }}>📅 {new Date(t.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                        </div>
                      </div>
                      <button onClick={() => deleteTask(t.id)} className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-500/20" title="Delete">
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {view === "time" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-gradient-to-br from-[#2E5AA7] to-[#1a3a70]">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">This Week</span>
              <p className="text-2xl font-bold text-white mt-1">{formatDuration(weekMins)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-700 to-emerald-900">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">Billable (Week)</span>
              <p className="text-2xl font-bold text-white mt-1">{formatINR(weekBillable)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-[#FFA62B] to-[#c47a00]">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wide">Total Entries</span>
              <p className="text-2xl font-bold text-white mt-1">{timeEntries.length}</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: ADM.cream }}>Time Entries</h3>
              <button onClick={() => setShowTimeForm(!showTimeForm)} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: ADM.darkGreen, color: ADM.cream }}>
                <Play className="h-3.5 w-3.5" />{showTimeForm ? "Cancel" : "Log Time"}
              </button>
            </div>

            <AnimatePresence>
              {showTimeForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pb-4 mb-4 border-b" style={{ borderColor: ADM.surfaceBorder }}>
                    <input value={timeProject} onChange={(e) => setTimeProject(e.target.value)} placeholder="Project *" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-2" style={inputStyle} />
                    <input value={timeClient} onChange={(e) => setTimeClient(e.target.value)} placeholder="Client (optional)" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-2" style={inputStyle} />
                    <input value={timeDesc} onChange={(e) => setTimeDesc(e.target.value)} placeholder="What did you do?" className="rounded-lg px-3 py-2 text-xs focus:outline-none md:col-span-4" style={inputStyle} />
                    <input type="number" value={timeHours} onChange={(e) => setTimeHours(e.target.value)} placeholder="Hours" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <input type="number" value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} placeholder="Minutes" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <input type="date" value={timeDate} onChange={(e) => setTimeDate(e.target.value)} className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <input type="number" value={timeRate} onChange={(e) => setTimeRate(e.target.value)} placeholder="Rate ₹/hr" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} />
                    <label className="flex items-center gap-2 text-xs md:col-span-4" style={{ color: ADM.cream }}>
                      <input type="checkbox" checked={timeBillable} onChange={(e) => setTimeBillable(e.target.checked)} />
                      Billable
                    </label>
                  </div>
                  <button onClick={addTimeEntry} className="w-full rounded-lg py-2 text-xs font-bold mb-4" style={{ background: ADM.accent, color: "hsl(220, 50%, 8%)" }}>Save Entry</button>
                </motion.div>
              )}
            </AnimatePresence>

            {timeEntries.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: ADM.mutedText }}>No time entries yet</p>
            ) : (
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
                {timeEntries.slice(0, 50).map((e) => (
                  <div key={e.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 bg-sky-500/20">
                      <Timer className="h-3.5 w-3.5 text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold" style={{ color: ADM.cream }}>{e.project}</span>
                        {e.client && <span style={{ color: ADM.midGreen }}>· {e.client}</span>}
                        {e.billable && e.hourly_rate && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">BILLABLE</span>}
                      </div>
                      {e.description && <span className="text-[10px] truncate block" style={{ color: ADM.mutedText }}>{e.description}</span>}
                      <span className="text-[10px]" style={{ color: ADM.mutedText }}>{new Date(e.entry_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: ADM.cream }}>{formatDuration(e.duration_minutes)}</div>
                      {e.billable && e.hourly_rate && (
                        <div className="text-[10px] text-emerald-400 font-semibold">{formatINR((e.duration_minutes / 60) * Number(e.hourly_rate))}</div>
                      )}
                    </div>
                    <button onClick={() => deleteTimeEntry(e.id)} className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-500/20" title="Delete">
                      <Trash2 className="h-3 w-3 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProductivityTracker;
