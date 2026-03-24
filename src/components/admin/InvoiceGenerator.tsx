import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, FileDown, CalendarIcon, History, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ADM = {
  bg: "hsl(220, 50%, 8%)",
  surface: "hsl(220, 35%, 12%)",
  surfaceBorder: "hsl(220, 25%, 20%)",
  accent: "#FFA62B",
  cream: "#F8E6A0",
  midGreen: "#86C5FF",
  darkGreen: "#2E5AA7",
  mutedText: "hsl(46, 40%, 60%)",
  inputBg: "hsl(220, 30%, 9%)",
  inputBorder: "hsl(220, 22%, 22%)",
};

type LineItem = {
  id: string;
  description: string;
  amount: number;
};

type Invoice = {
  id: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  currency: string;
  invoice_date: string;
  due_date: string | null;
  items: LineItem[];
  total: number;
  notes: string | null;
  custom_role: string | null;
  created_at: string;
};

const generateId = () => Math.random().toString(36).slice(2, 9);

const OWNER = {
  name: "Sriram Parthiban",
  email: "info@sriramparthiban.com",
  phone: "+91 93459 73779",
  address: "Plot No A2 F1, Ashraya Apartments, Brindavan Street, Secretariat Colony, Mapeedu, Chennai - 600126",
};

const LEADS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;

const InvoiceGenerator = ({ adminPassword }: { adminPassword: string }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // To (client) fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  // Invoice meta
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState<"INR" | "USD" | "CAD">("INR");
  const [customRole, setCustomRole] = useState("AI Automation Specialist");

  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "CA$";
  const currencyLocale = currency === "INR" ? "en-IN" : "en-US";

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: generateId(), description: "", amount: 0 },
  ]);

  // History
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchInvoices = async () => {
    try {
      const resp = await fetch(LEADS_URL, { headers: { "x-admin-password": adminPassword } });
      const data = await resp.json();
      if (data.invoices) setInvoices(data.invoices);
    } catch { /* silently fail */ }
  };

  useEffect(() => { fetchInvoices(); }, [adminPassword]);

  const addItem = () =>
    setItems([...items, { id: generateId(), description: "", amount: 0 }]);

  const removeItem = (id: string) =>
    setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const total = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const saveInvoice = async () => {
    setSaving(true);
    try {
      const resp = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_invoice",
          client_name: clientName,
          client_email: clientEmail || null,
          client_phone: clientPhone || null,
          client_address: clientAddress || null,
          currency,
          invoice_date: format(invoiceDate, "yyyy-MM-dd"),
          due_date: dueDate ? format(dueDate, "yyyy-MM-dd") : null,
          items,
          total,
          notes: notes || null,
          custom_role: customRole || null,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast({ title: "Invoice saved", description: `Invoice for ${clientName} saved to history.` });
        fetchInvoices();
      }
    } catch {
      toast({ title: "Error", description: "Failed to save invoice.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      await fetch(LEADS_URL, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
        body: JSON.stringify({ type: "invoice", id }),
      });
      toast({ title: "Deleted", description: "Invoice removed from history." });
      fetchInvoices();
    } catch {
      toast({ title: "Error", description: "Failed to delete invoice.", variant: "destructive" });
    }
  };

  const getCurrencySymbol = (c: string) => c === "INR" ? "₹" : c === "USD" ? "$" : "CA$";
  const getCurrencyLocale = (c: string) => c === "INR" ? "en-IN" : "en-US";

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    // Save to history on generate
    saveInvoice();

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; }
          .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #7C3AED; }
          .invoice-title { font-size: 32px; font-weight: 800; color: #7C3AED; }
          .invoice-meta { text-align: right; font-size: 13px; color: #555; line-height: 1.8; }
          .invoice-meta strong { color: #1a1a2e; }
          .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
          .party-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #7C3AED; margin-bottom: 8px; }
          .party-name { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
          .party-detail { font-size: 13px; color: #555; line-height: 1.7; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .items-table th { background: #7C3AED; color: white; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
          .items-table th:last-child { text-align: right; }
          .items-table td { padding: 14px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
          .items-table td:last-child { text-align: right; font-weight: 600; }
          .items-table tr:nth-child(even) { background: #faf8ff; }
          .total-row { display: flex; justify-content: flex-end; margin-bottom: 40px; }
          .total-box { background: #7C3AED; color: white; padding: 16px 32px; border-radius: 12px; text-align: right; }
          .total-label { font-size: 12px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
          .total-amount { font-size: 28px; font-weight: 800; margin-top: 4px; }
          .notes { background: #f8f7ff; border-left: 4px solid #7C3AED; padding: 16px 20px; margin-bottom: 40px; border-radius: 0 8px 8px 0; }
          .notes-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #7C3AED; margin-bottom: 6px; }
          .notes-text { font-size: 13px; color: #555; line-height: 1.6; }
          .signature { text-align: right; margin-top: 60px; }
          .sig-line { width: 200px; border-bottom: 2px solid #1a1a2e; margin-left: auto; margin-bottom: 8px; padding-bottom: 8px; }
          .sig-name { font-size: 20px; font-weight: 700; font-style: italic; font-family: 'Georgia', serif; color: #7C3AED; }
          .sig-title { font-size: 12px; color: #777; margin-top: 4px; }
          .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #999; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="invoice-meta">
            <div>Date: ${invoiceDate ? format(invoiceDate, "MMMM d, yyyy") : ""}</div>
            ${dueDate ? `<div>Due: ${format(dueDate, "MMMM d, yyyy")}</div>` : ""}
          </div>
        </div>

        <div class="parties">
          <div>
            <div class="party-label">From</div>
            <div class="party-name">${OWNER.name}</div>
            <div class="party-detail">${OWNER.email}<br/>${OWNER.phone}<br/>${OWNER.address}</div>
          </div>
          <div>
            <div class="party-label">Bill To</div>
            <div class="party-name">${clientName || "—"}</div>
            <div class="party-detail">${clientEmail || ""}${clientPhone ? "<br/>" + clientPhone : ""}${clientAddress ? "<br/>" + clientAddress : ""}</div>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr><th>#</th><th>Service / Description</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${items
              .filter((i) => i.description.trim())
              .map(
                (i, idx) =>
                  `<tr><td>${idx + 1}</td><td>${i.description}</td><td>${currencySymbol}${Number(i.amount).toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div class="total-row">
          <div class="total-box">
            <div class="total-label">Total Amount</div>
            <div class="total-amount">${currencySymbol}${total.toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        ${notes ? `<div class="notes"><div class="notes-label">Notes</div><div class="notes-text">${notes}</div></div>` : ""}

        <div class="signature">
          <div class="sig-line">
            <div class="sig-name">Sriram Parthiban</div>
          </div>
          <div class="sig-title">${customRole}</div>
        </div>

        <div class="footer">
          Thank you for your business! • ${OWNER.email}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  const inputClass =
    "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
    + ` bg-[${ADM.inputBg}] border border-[${ADM.inputBorder}] text-[${ADM.cream}] placeholder:text-[hsl(46,25%,40%)] focus:border-[${ADM.darkGreen}]`;

  const labelClass = `text-xs font-bold text-[${ADM.accent}] mb-1.5 block uppercase tracking-wider`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Invoice Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Currency</label>
          <Select value={currency} onValueChange={(v) => setCurrency(v as "INR" | "USD" | "CAD")}>
            <SelectTrigger className="w-full" style={{ background: ADM.inputBg, borderColor: ADM.inputBorder, color: ADM.cream }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">₹ INR — Indian Rupees</SelectItem>
              <SelectItem value="USD">$ USD — US Dollars</SelectItem>
              <SelectItem value="CAD">CA$ CAD — Canadian Dollars</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelClass}>Invoice Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !invoiceDate && "opacity-50")}
                style={{ background: ADM.inputBg, borderColor: ADM.inputBorder, color: ADM.cream }}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoiceDate ? format(invoiceDate, "dd-MM-yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={invoiceDate} onSelect={(d) => d && setInvoiceDate(d)} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dueDate && "opacity-50")}
                style={{ background: ADM.inputBg, borderColor: ADM.inputBorder, color: ADM.cream }}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "dd-MM-yyyy") : <span>dd-mm-yyyy</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl p-5" style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ADM.accent }}>From</p>
          <div className="space-y-1.5 text-sm">
            <p className="font-semibold" style={{ color: ADM.cream }}>{OWNER.name}</p>
            <p style={{ color: ADM.mutedText }}>{OWNER.email}</p>
            <p style={{ color: ADM.mutedText }}>{OWNER.phone}</p>
            <p style={{ color: ADM.mutedText }}>{OWNER.address}</p>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ADM.accent }}>Bill To</p>
          <div className="space-y-3">
            <input className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
              placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            <input className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
              placeholder="Email Address" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            <input className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
              placeholder="Phone Number" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
            <input className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
              placeholder="Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="rounded-xl p-5" style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ADM.accent }}>Services & Pricing</p>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ color: ADM.darkGreen, background: `${ADM.darkGreen}15`, border: `1px solid ${ADM.darkGreen}30` }}>
            Currency: {currencySymbol} {currency}
          </span>
        </div>
        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-[1fr_150px_40px] gap-3 text-xs font-bold px-1" style={{ color: ADM.mutedText }}>
            <span>Description</span>
            <span>Amount ({currencySymbol})</span>
            <span></span>
          </div>

          {items.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_40px] gap-3 items-center">
              <input
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
                placeholder={`Service description ${idx + 1}`}
                value={item.description}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
              />
              <input
                className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
                type="number"
                placeholder="0.00"
                min="0"
                value={item.amount || ""}
                onChange={(e) => updateItem(item.id, "amount", parseFloat(e.target.value) || 0)}
              />
              <button
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            className="flex items-center gap-2 text-sm font-bold mt-2 transition-colors"
            style={{ color: ADM.midGreen }}
          >
            <Plus className="h-4 w-4" /> Add Line Item
          </button>
        </div>

        <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${ADM.surfaceBorder}` }}>
          <span className="text-sm font-bold" style={{ color: ADM.mutedText }}>Total Amount</span>
          <span className="text-2xl font-extrabold" style={{ color: ADM.cream }}>
            {currencySymbol}{total.toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-bold mb-1.5 block uppercase tracking-wider" style={{ color: ADM.accent }}>Notes / Payment Terms (optional)</label>
        <textarea
          className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors min-h-[80px] resize-y"
          style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
          placeholder="Payment terms, bank details, or additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Signature Preview */}
      <div className="rounded-xl p-5" style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between">
          <div className="flex-1">
            <label className="text-xs font-bold mb-1.5 block uppercase tracking-wider" style={{ color: ADM.accent }}>Your Role / Title</label>
            <input className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}`, color: ADM.cream }}
              placeholder="e.g. AI Automation Specialist" value={customRole} onChange={(e) => setCustomRole(e.target.value)} />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold italic" style={{ fontFamily: "Georgia, serif", color: ADM.midGreen }}>
              Sriram Parthiban
            </p>
            <div className="w-40 h-px mt-1 ml-auto" style={{ background: `${ADM.accent}40` }} />
            <p className="text-[11px] mt-1" style={{ color: ADM.mutedText }}>{customRole || "Your Role"}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handlePrint}
          disabled={!clientName.trim() || items.every((i) => !i.description.trim()) || saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold hover:brightness-110 disabled:opacity-40 transition-all shadow-lg"
          style={{ background: ADM.darkGreen, color: ADM.cream, boxShadow: `0 4px 12px ${ADM.darkGreen}40` }}
        >
          <FileDown className="h-4 w-4" />
          {saving ? "Saving..." : "Generate Invoice PDF"}
        </button>
      </div>

      {/* Hidden print target */}
      <div ref={printRef} className="hidden" />

      {/* ─── Invoice History ──────────────────────────── */}
      <div className="rounded-xl overflow-hidden" style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:brightness-110"
          style={{ background: ADM.surface }}
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: `${ADM.darkGreen}30` }}>
              <History className="h-4 w-4" style={{ color: ADM.midGreen }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold" style={{ color: ADM.cream }}>Invoice History</p>
              <p className="text-xs" style={{ color: ADM.mutedText }}>{invoices.length} invoice{invoices.length !== 1 ? "s" : ""} generated</p>
            </div>
          </div>
          {showHistory ? <ChevronUp className="h-4 w-4" style={{ color: ADM.mutedText }} /> : <ChevronDown className="h-4 w-4" style={{ color: ADM.mutedText }} />}
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-3" style={{ borderTop: `1px solid ${ADM.surfaceBorder}` }}>
                {invoices.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: ADM.mutedText }}>
                    No invoices generated yet. Create your first invoice above.
                  </p>
                ) : (
                  invoices.map((inv) => {
                    const sym = getCurrencySymbol(inv.currency);
                    const loc = getCurrencyLocale(inv.currency);
                    const isExpanded = expandedInvoice === inv.id;

                    return (
                      <div key={inv.id} className="rounded-lg overflow-hidden" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                        {/* Row summary */}
                        <div
                          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:brightness-110 transition-colors"
                          onClick={() => setExpandedInvoice(isExpanded ? null : inv.id)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold truncate" style={{ color: ADM.cream }}>{inv.client_name}</p>
                              <p className="text-xs" style={{ color: ADM.mutedText }}>
                                {format(new Date(inv.invoice_date), "dd MMM yyyy")}
                                {inv.client_email && ` · ${inv.client_email}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-sm font-bold" style={{ color: ADM.accent }}>
                              {sym}{Number(inv.total).toLocaleString(loc, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${ADM.darkGreen}20`, color: ADM.midGreen }}>
                              {inv.currency}
                            </span>
                            {isExpanded ? <ChevronUp className="h-3 w-3" style={{ color: ADM.mutedText }} /> : <ChevronDown className="h-3 w-3" style={{ color: ADM.mutedText }} />}
                          </div>
                        </div>

                        {/* Expanded details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-3" style={{ borderTop: `1px solid ${ADM.inputBorder}` }}>
                                {/* Items table */}
                                <div className="pt-3">
                                  <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: ADM.accent }}>Line Items</p>
                                  <div className="space-y-1">
                                    {(inv.items as LineItem[]).filter(i => i.description?.trim()).map((item, idx) => (
                                      <div key={idx} className="flex justify-between text-xs py-1.5 px-2 rounded" style={{ background: `${ADM.surfaceBorder}30` }}>
                                        <span style={{ color: ADM.cream }}>{item.description}</span>
                                        <span className="font-bold" style={{ color: ADM.mutedText }}>
                                          {sym}{Number(item.amount).toLocaleString(loc, { minimumFractionDigits: 2 })}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Meta */}
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {inv.due_date && (
                                    <div>
                                      <span style={{ color: ADM.mutedText }}>Due: </span>
                                      <span style={{ color: ADM.cream }}>{format(new Date(inv.due_date), "dd MMM yyyy")}</span>
                                    </div>
                                  )}
                                  {inv.client_phone && (
                                    <div>
                                      <span style={{ color: ADM.mutedText }}>Phone: </span>
                                      <span style={{ color: ADM.cream }}>{inv.client_phone}</span>
                                    </div>
                                  )}
                                  {inv.notes && (
                                    <div className="col-span-2">
                                      <span style={{ color: ADM.mutedText }}>Notes: </span>
                                      <span style={{ color: ADM.cream }}>{inv.notes}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); deleteInvoice(inv.id); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:brightness-110"
                                    style={{ background: "hsl(0,60%,20%)", color: "hsl(0,80%,70%)", border: "1px solid hsl(0,50%,30%)" }}
                                  >
                                    <Trash2 className="h-3 w-3" /> Delete
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InvoiceGenerator;
