import { useState, useRef } from "react";
import { Plus, Trash2, FileDown, Printer } from "lucide-react";
import { motion } from "framer-motion";

type LineItem = {
  id: string;
  description: string;
  amount: number;
};

const generateId = () => Math.random().toString(36).slice(2, 9);

const OWNER = {
  name: "Sriram Parthiban",
  email: "sriramparthiban.work@gmail.com",
  phone: "+91 93445 XXXXX",
  address: "Chennai, Tamil Nadu, India",
};

const InvoiceGenerator = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // To (client) fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  // Invoice meta
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Date.now().toString().slice(-6)}`
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: generateId(), description: "", amount: 0 },
  ]);

  const addItem = () =>
    setItems([...items, { id: generateId(), description: "", amount: 0 }]);

  const removeItem = (id: string) =>
    setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const total = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
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
            <div><strong>${invoiceNumber}</strong></div>
            <div>Date: ${new Date(invoiceDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
            ${dueDate ? `<div>Due: ${new Date(dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>` : ""}
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
                  `<tr><td>${idx + 1}</td><td>${i.description}</td><td>₹${Number(i.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div class="total-row">
          <div class="total-box">
            <div class="total-label">Total Amount</div>
            <div class="total-amount">₹${total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        ${notes ? `<div class="notes"><div class="notes-label">Notes</div><div class="notes-text">${notes}</div></div>` : ""}

        <div class="signature">
          <div class="sig-line">
            <div class="sig-name">Sriram Parthiban</div>
          </div>
          <div class="sig-title">AI Automation & Data Analytics Specialist</div>
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
    "w-full bg-[hsl(270,15%,12%)] border border-[hsl(270,20%,20%)] rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors";
  const labelClass = "text-xs font-medium text-muted-foreground mb-1 block";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Invoice Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Invoice Number</label>
          <input className={inputClass} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Invoice Date</label>
          <input className={inputClass} type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input className={inputClass} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* FROM - readonly */}
        <div className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">From</p>
          <div className="space-y-1.5 text-sm">
            <p className="text-foreground font-semibold">{OWNER.name}</p>
            <p className="text-muted-foreground">{OWNER.email}</p>
            <p className="text-muted-foreground">{OWNER.phone}</p>
            <p className="text-muted-foreground">{OWNER.address}</p>
          </div>
        </div>

        {/* TO - editable */}
        <div className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Bill To</p>
          <div className="space-y-3">
            <input className={inputClass} placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            <input className={inputClass} placeholder="Email Address" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            <input className={inputClass} placeholder="Phone Number" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
            <input className={inputClass} placeholder="Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Services & Pricing</p>
        <div className="space-y-3">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[1fr_150px_40px] gap-3 text-xs text-muted-foreground font-medium px-1">
            <span>Description</span>
            <span>Amount (₹)</span>
            <span></span>
          </div>

          {items.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_40px] gap-3 items-center">
              <input
                className={inputClass}
                placeholder={`Service description ${idx + 1}`}
                value={item.description}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="0.00"
                min="0"
                value={item.amount || ""}
                onChange={(e) => updateItem(item.id, "amount", parseFloat(e.target.value) || 0)}
              />
              <button
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-[hsl(0,30%,25%)] text-red-400 hover:bg-red-400/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium mt-2 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Line Item
          </button>
        </div>

        {/* Total */}
        <div className="mt-6 pt-5 border-t border-[hsl(270,20%,15%)] flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">Total Amount</span>
          <span className="text-2xl font-extrabold text-white">
            ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes / Payment Terms (optional)</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          placeholder="Payment terms, bank details, or additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Signature Preview */}
      <div className="bg-[hsl(270,15%,8%)] border border-[hsl(270,20%,15%)] rounded-xl p-5 flex items-end justify-between">
        <div className="text-xs text-muted-foreground">E-Signature will appear on the generated invoice</div>
        <div className="text-right">
          <p className="text-xl font-bold italic text-primary" style={{ fontFamily: "Georgia, serif" }}>
            Sriram Parthiban
          </p>
          <div className="w-40 h-px bg-foreground/30 mt-1 ml-auto" />
          <p className="text-[11px] text-muted-foreground mt-1">AI Automation & Data Analytics Specialist</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handlePrint}
          disabled={!clientName.trim() || items.every((i) => !i.description.trim())}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:brightness-110 disabled:opacity-40 transition-all shadow-lg shadow-primary/20"
        >
          <FileDown className="h-4 w-4" />
          Generate Invoice PDF
        </button>
      </div>

      {/* Hidden print target */}
      <div ref={printRef} className="hidden" />
    </motion.div>
  );
};

export default InvoiceGenerator;
