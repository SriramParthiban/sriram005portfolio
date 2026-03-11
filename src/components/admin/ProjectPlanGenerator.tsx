import { useState } from "react";
import { Plus, Trash2, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const generateId = () => Math.random().toString(36).slice(2, 9);

const OWNER = {
  name: "Sriram Parthiban",
  email: "info@sriramparthiban.com",
  phone: "+91 93459 73779",
};

type Deliverable = { id: string; item: string };
type PricingItem = { id: string; description: string; amount: number };

const ProjectPlanGenerator = () => {
  // Client info
  const [clientName, setClientName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  // Optional sections - toggled
  const [showRequirements, setShowRequirements] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(true);
  const [showPricing, setShowPricing] = useState(true);
  const [showTechStack, setShowTechStack] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Content
  const [requirements, setRequirements] = useState("");
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: generateId(), item: "" },
  ]);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([
    { id: generateId(), description: "", amount: 0 },
  ]);
  const [currency, setCurrency] = useState<"INR" | "USD" | "CAD">("INR");
  const [techStack, setTechStack] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "CA$";
  const currencyLocale = currency === "INR" ? "en-IN" : "en-US";
  const total = pricingItems.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const addDeliverable = () => setDeliverables([...deliverables, { id: generateId(), item: "" }]);
  const removeDeliverable = (id: string) => setDeliverables(deliverables.filter((d) => d.id !== id));
  const updateDeliverable = (id: string, value: string) =>
    setDeliverables(deliverables.map((d) => (d.id === id ? { ...d, item: value } : d)));

  const addPricingItem = () => setPricingItems([...pricingItems, { id: generateId(), description: "", amount: 0 }]);
  const removePricingItem = (id: string) => setPricingItems(pricingItems.filter((p) => p.id !== id));
  const updatePricingItem = (id: string, field: keyof PricingItem, value: string | number) =>
    setPricingItems(pricingItems.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const handleGeneratePDF = () => {
    const filteredDeliverables = deliverables.filter((d) => d.item.trim());
    const filteredPricing = pricingItems.filter((p) => p.description.trim());

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Project Plan - ${projectTitle || "Untitled"}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a2e; padding: 50px; max-width: 850px; margin: 0 auto; line-height: 1.6; }
          
          .header { text-align: center; margin-bottom: 50px; padding-bottom: 30px; border-bottom: 3px solid #7C3AED; }
          .header-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #7C3AED; margin-bottom: 12px; }
          .header-title { font-size: 28px; font-weight: 800; color: #1a1a2e; margin-bottom: 6px; }
          .header-project { font-size: 18px; font-weight: 600; color: #555; }
          .header-date { font-size: 13px; color: #888; margin-top: 12px; }
          
          .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
          .party-box { background: #faf8ff; border-radius: 10px; padding: 20px; border: 1px solid #ede9fe; }
          .party-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #7C3AED; margin-bottom: 10px; }
          .party-name { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
          .party-detail { font-size: 13px; color: #555; line-height: 1.8; }
          
          .section { margin-bottom: 35px; }
          .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #7C3AED; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #ede9fe; }
          
          .requirements-text { font-size: 14px; color: #333; line-height: 1.8; white-space: pre-wrap; background: #faf8ff; padding: 16px 20px; border-radius: 8px; border: 1px solid #ede9fe; }
          
          .deliverables-list { list-style: none; }
          .deliverables-list li { font-size: 14px; color: #333; padding: 10px 16px; border-bottom: 1px solid #f0edf5; display: flex; align-items: flex-start; gap: 10px; }
          .deliverables-list li:last-child { border-bottom: none; }
          .check-icon { color: #7C3AED; font-weight: 700; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
          
          .pricing-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .pricing-table th { background: #7C3AED; color: white; padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
          .pricing-table th:last-child { text-align: right; }
          .pricing-table td { padding: 14px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
          .pricing-table td:last-child { text-align: right; font-weight: 600; }
          .pricing-table tr:nth-child(even) { background: #faf8ff; }
          
          .total-row { display: flex; justify-content: flex-end; margin-bottom: 30px; }
          .total-box { background: #7C3AED; color: white; padding: 16px 32px; border-radius: 12px; text-align: right; }
          .total-label { font-size: 12px; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px; }
          .total-amount { font-size: 26px; font-weight: 800; margin-top: 4px; }
          
          .tech-stack-text, .timeline-text, .notes-text { font-size: 14px; color: #333; line-height: 1.8; white-space: pre-wrap; background: #faf8ff; padding: 16px 20px; border-radius: 8px; border: 1px solid #ede9fe; }
          
          .footer { margin-top: 60px; padding-top: 20px; border-top: 2px solid #ede9fe; text-align: center; }
          .footer-name { font-size: 18px; font-weight: 700; color: #7C3AED; font-style: italic; font-family: Georgia, serif; }
          .footer-contact { font-size: 12px; color: #888; margin-top: 8px; }
          
          @media print { body { padding: 30px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-label">Project Plan</div>
          <div class="header-title">${projectTitle || "Untitled Project"}</div>
          ${clientName ? `<div class="header-project">Prepared for ${clientName}</div>` : ""}
          <div class="header-date">${format(date, "MMMM d, yyyy")}</div>
        </div>

        <div class="parties">
          <div class="party-box">
            <div class="party-label">From</div>
            <div class="party-name">${OWNER.name}</div>
            <div class="party-detail">${OWNER.email}<br/>${OWNER.phone}</div>
          </div>
          <div class="party-box">
            <div class="party-label">Client</div>
            <div class="party-name">${clientName || "—"}</div>
          </div>
        </div>

        ${showRequirements && requirements.trim() ? `
        <div class="section">
          <div class="section-title">Client Requirements</div>
          <div class="requirements-text">${requirements.replace(/\n/g, "<br/>")}</div>
        </div>
        ` : ""}

        ${showDeliverables && filteredDeliverables.length > 0 ? `
        <div class="section">
          <div class="section-title">Deliverables</div>
          <ul class="deliverables-list">
            ${filteredDeliverables.map((d) => `<li><span class="check-icon">✓</span> ${d.item}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${showTechStack && techStack.trim() ? `
        <div class="section">
          <div class="section-title">Tech Stack & Tools</div>
          <div class="tech-stack-text">${techStack.replace(/\n/g, "<br/>")}</div>
        </div>
        ` : ""}

        ${showTimeline && timeline.trim() ? `
        <div class="section">
          <div class="section-title">Timeline</div>
          <div class="timeline-text">${timeline.replace(/\n/g, "<br/>")}</div>
        </div>
        ` : ""}

        ${showPricing && filteredPricing.length > 0 ? `
        <div class="section">
          <div class="section-title">Cost & Pricing</div>
          <table class="pricing-table">
            <thead>
              <tr><th>#</th><th>Service / Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              ${filteredPricing.map((p, idx) => `<tr><td>${idx + 1}</td><td>${p.description}</td><td>${currencySymbol}${Number(p.amount).toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}</td></tr>`).join("")}
            </tbody>
          </table>
          <div class="total-row">
            <div class="total-box">
              <div class="total-label">Total</div>
              <div class="total-amount">${currencySymbol}${total.toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
        ` : ""}

        ${showNotes && notes.trim() ? `
        <div class="section">
          <div class="section-title">Additional Notes</div>
          <div class="notes-text">${notes.replace(/\n/g, "<br/>")}</div>
        </div>
        ` : ""}

        <div class="footer">
          <div class="footer-name">${OWNER.name}</div>
          <div class="footer-contact">${OWNER.email} • ${OWNER.phone}</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  const inputClass =
    "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
    + " bg-[hsl(121,20%,7%)] border border-[hsl(121,18%,18%)] text-[#f2e3bb] placeholder:text-[hsl(53,25%,40%)] focus:border-[#427a43]";
  const labelClass = "text-xs font-bold text-[#c0b87a] mb-1.5 block uppercase tracking-wider";
  const sectionCardClass = "bg-[hsl(121,25%,8%)] border border-[hsl(121,20%,16%)] rounded-xl p-5";

  const toggleSections = [
    { key: "requirements", label: "Requirements", state: showRequirements, toggle: setShowRequirements },
    { key: "deliverables", label: "Deliverables", state: showDeliverables, toggle: setShowDeliverables },
    { key: "pricing", label: "Cost & Pricing", state: showPricing, toggle: setShowPricing },
    { key: "techStack", label: "Tech Stack & Tools", state: showTechStack, toggle: setShowTechStack },
    { key: "timeline", label: "Timeline", state: showTimeline, toggle: setShowTimeline },
    { key: "notes", label: "Additional Notes", state: showNotes, toggle: setShowNotes },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Project basics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Project Title *</label>
          <input className={inputClass} placeholder="e.g. CRM Automation Setup" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Client Name *</label>
          <input className={inputClass} placeholder="Client's name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-[hsl(121,20%,7%)] border-[hsl(121,18%,18%)] hover:bg-[hsl(121,20%,10%)] text-[#f2e3bb]", !date && "text-[hsl(53,25%,40%)]")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Section toggles */}
      <div className={sectionCardClass}>
        <p className="text-xs font-bold text-[#c0b87a] uppercase tracking-widest mb-3">Include Sections</p>
        <p className="text-xs text-[hsl(53,25%,50%)] mb-4">Toggle which sections appear in the final PDF. Only filled sections will be included.</p>
        <div className="flex flex-wrap gap-2">
          {toggleSections.map((s) => (
            <button
              key={s.key}
              onClick={() => s.toggle(!s.state)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                s.state
                  ? "bg-[#005f02]/25 text-[#c0b87a] border-[#005f02]/50"
                  : "bg-[hsl(121,10%,10%)] text-[hsl(53,15%,35%)] border-[hsl(121,15%,16%)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requirements */}
      {showRequirements && (
        <div className={sectionCardClass}>
          <p className="text-xs font-bold text-[#c0b87a] uppercase tracking-widest mb-3">Client Requirements</p>
          <textarea
            className={`${inputClass} min-h-[100px] resize-y`}
            placeholder="Describe what the client needs..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
      )}

      {/* Deliverables */}
      {showDeliverables && (
        <div className={sectionCardClass}>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Deliverables</p>
          <div className="space-y-3">
            {deliverables.map((d, idx) => (
              <div key={d.id} className="flex gap-3 items-center">
                <span className="text-xs font-bold text-[hsl(270,40%,60%)] w-6 text-center flex-shrink-0">{idx + 1}</span>
                <input
                  className={inputClass}
                  placeholder={`Deliverable ${idx + 1}`}
                  value={d.item}
                  onChange={(e) => updateDeliverable(d.id, e.target.value)}
                />
                <button
                  onClick={() => removeDeliverable(d.id)}
                  disabled={deliverables.length === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button onClick={addDeliverable} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-bold mt-1 transition-colors">
              <Plus className="h-4 w-4" /> Add Deliverable
            </button>
          </div>
        </div>
      )}

      {/* Pricing */}
      {showPricing && (
        <div className={sectionCardClass}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Cost & Pricing</p>
            <div className="w-40">
              <Select value={currency} onValueChange={(v) => setCurrency(v as "INR" | "USD" | "CAD")}>
                <SelectTrigger className="w-full bg-[hsl(270,12%,10%)] border-[hsl(270,20%,22%)] text-white text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ INR</SelectItem>
                  <SelectItem value="USD">$ USD</SelectItem>
                  <SelectItem value="CAD">CA$ CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <div className="hidden sm:grid grid-cols-[1fr_150px_40px] gap-3 text-xs text-[hsl(270,30%,55%)] font-bold px-1">
              <span>Description</span>
              <span>Amount ({currencySymbol})</span>
              <span></span>
            </div>
            {pricingItems.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_40px] gap-3 items-center">
                <input className={inputClass} placeholder={`Service ${idx + 1}`} value={item.description} onChange={(e) => updatePricingItem(item.id, "description", e.target.value)} />
                <input className={inputClass} type="number" placeholder="0.00" min="0" value={item.amount || ""} onChange={(e) => updatePricingItem(item.id, "amount", parseFloat(e.target.value) || 0)} />
                <button onClick={() => removePricingItem(item.id)} disabled={pricingItems.length === 1} className="h-10 w-10 flex items-center justify-center rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button onClick={addPricingItem} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-bold mt-1 transition-colors">
              <Plus className="h-4 w-4" /> Add Line Item
            </button>
          </div>
          <div className="mt-6 pt-5 border-t border-[hsl(270,20%,18%)] flex items-center justify-between">
            <span className="text-sm text-[hsl(270,30%,60%)] font-bold">Total Amount</span>
            <span className="text-2xl font-extrabold text-white">
              {currencySymbol}{total.toLocaleString(currencyLocale, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {showTechStack && (
        <div className={sectionCardClass}>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Tech Stack & Tools</p>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="e.g. React, Python, GoHighLevel, Make.com, PostgreSQL..."
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>
      )}

      {/* Timeline */}
      {showTimeline && (
        <div className={sectionCardClass}>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Timeline</p>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="e.g. Phase 1: Discovery (1 week)&#10;Phase 2: Development (2 weeks)..."
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />
        </div>
      )}

      {/* Notes */}
      {showNotes && (
        <div className={sectionCardClass}>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Additional Notes</p>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Payment terms, special conditions, assumptions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleGeneratePDF}
          disabled={!clientName.trim() || !projectTitle.trim()}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-bold hover:brightness-110 disabled:opacity-40 transition-all shadow-lg shadow-primary/20"
        >
          <FileDown className="h-4 w-4" />
          Submit & Finalize PDF
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectPlanGenerator;
