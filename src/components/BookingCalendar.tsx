import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Clock, ChevronRight, ChevronLeft, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isBefore, startOfDay } from "date-fns";

const MEET_LINK = "https://calendly.com/sriramparthiban1970/30min";

const TIME_SLOTS_30 = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

const TIME_SLOTS_60 = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

type Step = "date" | "time" | "details" | "confirmed";

const BookingCalendar = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState<30 | 60>(30);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ time: string; duration: number }[]>([]);

  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    supabase
      .from("bookings")
      .select("booking_time, duration")
      .eq("booking_date", dateStr)
      .eq("status", "confirmed")
      .then(({ data }) => {
        if (data) {
          setBookedSlots(
            data.map((b: any) => ({
              time: (b.booking_time as string).slice(0, 5),
              duration: b.duration as number,
            }))
          );
        }
      });
  }, [selectedDate]);

  const isSlotBooked = (slot: string) => {
    const slotMinutes = parseInt(slot.split(":")[0]) * 60 + parseInt(slot.split(":")[1]);
    const slotEnd = slotMinutes + duration;
    return bookedSlots.some((b) => {
      const bMin = parseInt(b.time.split(":")[0]) * 60 + parseInt(b.time.split(":")[1]);
      const bEnd = bMin + b.duration;
      return slotMinutes < bEnd && slotEnd > bMin;
    });
  };

  const timeSlots = duration === 30 ? TIME_SLOTS_30 : TIME_SLOTS_60;

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !name.trim() || !email.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const { error: dbError } = await supabase.from("bookings").insert({
        name: name.trim(),
        email: email.trim(),
        booking_date: format(selectedDate, "yyyy-MM-dd"),
        booking_time: selectedTime,
        duration,
        message: message.trim() || null,
      });
      if (dbError) throw dbError;

      await supabase.functions.invoke("send-booking-email", {
        body: {
          name: name.trim(),
          email: email.trim(),
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          duration,
          message: message.trim(),
          meetLink: MEET_LINK,
        },
      });

      setStep("confirmed");
      toast({ title: "🎉 Appointment booked!", description: "Check your email for confirmation." });
    } catch {
      toast({ title: "Booking failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const resetBooking = () => {
    setStep("date");
    setSelectedDate(undefined);
    setSelectedTime("");
    setName("");
    setEmail("");
    setMessage("");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary to-accent" />
        <span className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-primary">Schedule</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
        Book an <span className="gradient-text">Appointment</span>
      </h3>
      <div className="inline-flex items-center gap-2 mb-5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2">
        <Clock className="h-4 w-4 text-primary shrink-0" />
        <p className="text-sm sm:text-base font-semibold text-foreground">
          Available every day, <span className="text-primary">9 AM – 8 PM IST</span>
        </p>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-2 mb-5">
        {(["date", "time", "details"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                step === s
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                  : step === "confirmed" || (["date", "time", "details"].indexOf(step) > i)
                  ? "bg-primary/20 text-primary"
                  : "bg-white/5 text-muted-foreground border border-white/10"
              }`}
            >
              {step === "confirmed" || (["date", "time", "details"].indexOf(step) > i) ? (
                <Check className="h-3 w-3" />
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div className={`h-px w-6 sm:w-8 transition-colors duration-300 ${
                (["date", "time", "details"].indexOf(step) > i) || step === "confirmed"
                  ? "bg-primary/40" : "bg-white/10"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Wizard content */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {step === "date" && (
            <motion.div key="date" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h4 className="text-base font-display font-bold text-foreground">Select a Date</h4>
              </div>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => setSelectedDate(d)}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  className="p-2 pointer-events-auto rounded-xl border border-white/10 bg-white/[0.02]
                    [&_.rdp-day]:text-foreground [&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected]:text-primary-foreground
                    [&_.rdp-day_today]:bg-accent/20 [&_.rdp-day_today]:text-accent
                    [&_.rdp-head_cell]:text-muted-foreground [&_.rdp-caption_label]:text-foreground [&_.rdp-caption_label]:font-display
                    [&_.rdp-nav_button]:text-muted-foreground [&_.rdp-nav_button:hover]:text-foreground
                    [&_.rdp-day:hover]:bg-primary/20 [&_.rdp-day_outside]:text-muted-foreground/30"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => selectedDate && setStep("time")} disabled={!selectedDate} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                  Continue <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "time" && (
            <motion.div key="time" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h4 className="text-base font-display font-bold text-foreground">Pick a Time</h4>
              </div>
              <div className="flex gap-2 mb-4">
                {([30, 60] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDuration(d); setSelectedTime(""); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      duration === d
                        ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                        : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {d} min
                  </button>
                ))}
              </div>
              {selectedDate && (
                <p className="text-xs font-semibold text-muted-foreground mb-3">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")} • IST
                </p>
              )}
              <div className="grid grid-cols-3 gap-1.5 max-h-[220px] overflow-y-auto scrollbar-themed pr-1">
                {timeSlots.map((slot) => {
                  const booked = isSlotBooked(slot);
                  const selected = selectedTime === slot;
                  const hour = parseInt(slot.split(":")[0]);
                  const displayTime = hour >= 12
                    ? `${hour === 12 ? 12 : hour - 12}:${slot.split(":")[1]} PM`
                    : `${hour}:${slot.split(":")[1]} AM`;
                  return (
                    <button
                      key={slot}
                      disabled={booked}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        booked
                          ? "bg-white/[0.02] text-muted-foreground/30 cursor-not-allowed line-through"
                          : selected
                          ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                          : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-primary/10 hover:text-foreground hover:border-primary/20"
                      }`}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep("date")} className="text-muted-foreground gap-1.5">
                  <ChevronLeft className="h-3.5 w-3.5" /> Back
                </Button>
                <Button onClick={() => selectedTime && setStep("details")} disabled={!selectedTime} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                  Continue <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div key="details" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
              <h4 className="text-base font-display font-bold text-foreground mb-4">Your Details</h4>
              <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex flex-wrap gap-2 text-sm font-semibold">
                  <span className="flex items-center gap-1 text-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {selectedDate && format(selectedDate, "MMM d")}
                  </span>
                  <span className="flex items-center gap-1 text-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {selectedTime} IST
                  </span>
                  <span className="text-muted-foreground">• {duration}m</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">Name *</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={100}
                    className="h-9 text-sm bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">Email *</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" maxLength={255}
                    className="h-9 text-sm bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">Note (optional)</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What to discuss?" maxLength={500} rows={2}
                    className="w-full rounded-md bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring px-3 py-2 text-sm resize-none" />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep("time")} className="text-muted-foreground gap-1.5">
                  <ChevronLeft className="h-3.5 w-3.5" /> Back
                </Button>
                <Button onClick={handleBook} disabled={sending || !name.trim() || !email.trim()} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                  {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  {sending ? "Booking..." : "Confirm"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "confirmed" && (
            <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="text-center py-6">
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="h-7 w-7 text-accent" />
              </div>
              <h4 className="text-lg font-display font-bold text-foreground mb-1">You're Booked! 🎉</h4>
              <p className="text-sm text-muted-foreground mb-1">
                {selectedDate && format(selectedDate, "MMM d, yyyy")} at {selectedTime} IST
              </p>
              <p className="text-xs text-muted-foreground/70 mb-4">{duration}m • Confirmation sent to your email</p>
              <a href={MEET_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors mb-4">
                <CalendarDays className="h-3.5 w-3.5" /> Open Calendly
              </a>
              <div>
                <Button variant="ghost" size="sm" onClick={resetBooking} className="text-muted-foreground">Book Another</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingCalendar;
