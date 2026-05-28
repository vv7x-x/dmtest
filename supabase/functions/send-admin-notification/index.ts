// dm bookstore — Admin Notification Email Sender
// Uses Resend (https://resend.com) to send emails.
// Deploy: supabase functions deploy send-admin-notification --no-verify-jwt
// Env vars: RESEND_API_KEY, ADMIN_EMAIL, STORE_URL

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface Payload {
  to: string;
  type: "order" | "contact";
  title: string;
  message: string;
  reference_id?: string;
}

serve(async (req) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
  const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "";
  const STORE_URL = Deno.env.get("STORE_URL") || "";
  const STORE_NAME = "dm bookstore";

  if (!RESEND_API_KEY || !ADMIN_EMAIL) {
    console.error("Missing RESEND_API_KEY or ADMIN_EMAIL env vars");
    return new Response("OK (skipped)", { status: 200 });
  }

  try {
    const payload: Payload = await req.json();
    const subject = payload.type === "order"
      ? `🛒 ${payload.title} - ${STORE_NAME}`
      : `💬 ${payload.title} - ${STORE_NAME}`;

    const adminLink = STORE_URL
      ? `<a href="${STORE_URL}/admin.html" style="display:inline-block;background:#C5A021;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:15px;">فتح لوحة التحكم</a>`
      : "";

    const html = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"></head>
<body style="font-family:Tahoma,sans-serif;background:#f5f1e6;margin:0;padding:24px;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <tr><td style="background:linear-gradient(135deg,#1B3022,#2a4a35);padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="color:#C5A021;margin:0;font-size:24px;">${STORE_NAME}</h1>
      <p style="color:rgba(245,241,230,0.7);margin:4px 0 0;font-size:14px;">إشعار أدمن</p>
    </td></tr>
    <tr><td style="padding:28px 24px;">
      <h2 style="color:#1B3022;font-size:20px;margin:0 0 16px;">${payload.title}</h2>
      <div style="background:#faf8f2;border-right:4px solid #C5A021;padding:16px;border-radius:8px;margin-bottom:20px;">
        <p style="margin:0;color:#2a2e32;font-size:15px;line-height:1.7;">${payload.message}</p>
      </div>
      ${adminLink ? `<table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">${adminLink}</td></tr></table>` : ""}
    </td></tr>
    <tr><td style="padding:16px 24px;border-top:1px solid #ebe5d6;text-align:center;">
      <p style="color:#8a9299;font-size:12px;margin:0;">رسالة آلية من ${STORE_NAME}</p>
    </td></tr>
  </table></td></tr></table>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${STORE_NAME} <onboarding@resend.dev>`,
        to: ADMIN_EMAIL,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return new Response("Failed", { status: 500 });
    }

    console.log(`Email sent to ${ADMIN_EMAIL} for ${payload.type}`);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Edge fn error:", err);
    return new Response("Error", { status: 500 });
  }
});
