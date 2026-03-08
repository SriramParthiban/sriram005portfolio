const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, date, time, duration, message, meetLink } = await req.json();

    if (!name || !email || !date || !time || !duration) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });

    const meetSection = meetLink
      ? `<p><strong>📹 Google Meet:</strong> <a href="${meetLink}" style="color:#7c3aed;">${meetLink}</a></p>`
      : '';

    // Email to Sriram
    const ownerEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Booking <onboarding@resend.dev>',
        to: ['sriramparthiban1970@gmail.com'],
        reply_to: email,
        subject: `📅 New Booking: ${name} — ${formattedDate} at ${time}`,
        html: `
          <div style="font-family:system-ui;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#7c3aed;">New Appointment Booking</h2>
            <hr style="border:1px solid #e5e7eb;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${time} IST</p>
            <p><strong>Duration:</strong> ${duration} minutes</p>
            ${message ? `<p><strong>Note:</strong> ${message.replace(/\n/g, '<br />')}</p>` : ''}
            ${meetSection}
          </div>
        `,
      }),
    });

    const ownerData = await ownerEmail.json();
    if (!ownerEmail.ok) {
      console.error('Failed to send owner email:', ownerData);
    }

    // Confirmation email to visitor
    const visitorEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Sriram Parthiban <onboarding@resend.dev>',
        to: [email],
        subject: `✅ Appointment Confirmed — ${formattedDate} at ${time}`,
        html: `
          <div style="font-family:system-ui;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#7c3aed;">Appointment Confirmed! 🎉</h2>
            <hr style="border:1px solid #e5e7eb;" />
            <p>Hi ${name},</p>
            <p>Your appointment with <strong>Sriram Parthiban</strong> has been confirmed.</p>
            <br />
            <p><strong>📅 Date:</strong> ${formattedDate}</p>
            <p><strong>🕐 Time:</strong> ${time} IST</p>
            <p><strong>⏱ Duration:</strong> ${duration} minutes</p>
            ${meetSection}
            <br />
            <p>Looking forward to connecting with you!</p>
            <p style="color:#6b7280;">— Sriram Parthiban</p>
          </div>
        `,
      }),
    });

    const visitorData = await visitorEmail.json();
    if (!visitorEmail.ok) {
      console.error('Failed to send visitor email:', visitorData);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
