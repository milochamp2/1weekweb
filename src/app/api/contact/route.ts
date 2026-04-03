import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const OWNER_EMAIL = "alananoaj@gmail.com";
const FROM = "1LaunchLayer <alananoaj@gmail.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1launchlayer.vercel.app";

interface ContactPayload {
  name: string;
  businessName: string;
  email: string;
  website?: string;
  help: string;
  packageInterest?: string;
}

// ─── Owner notification ───────────────────────────────────────────────────────
function ownerEmail(d: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#ffffff;border-radius:16px 16px 0 0;padding:32px 40px 24px;border-bottom:1px solid #e5e7eb;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:12px;">
              <img src="${SITE_URL}/1weekweb%20logo.png" width="36" height="36" alt="1LaunchLayer" style="display:block;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="font-size:17px;font-weight:700;color:#111827;letter-spacing:-0.02em;">
                1Launch<span style="color:#d946ef;">Layer</span>
              </span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Alert badge -->
        <tr><td style="background:#ffffff;padding:24px 40px 0;">
          <span style="display:inline-block;background:#fdf4ff;border:1px solid #e879f9;color:#a21caf;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 12px;border-radius:99px;">
            ● New enquiry received
          </span>
        </td></tr>

        <!-- Heading -->
        <tr><td style="background:#ffffff;padding:16px 40px 8px;">
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#111827;letter-spacing:-0.02em;">
            ${d.name} wants to talk
          </h1>
          <p style="margin:6px 0 0;font-size:14px;color:#6b7280;">
            From <strong style="color:#111827;">${d.businessName}</strong>
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="background:#ffffff;padding:20px 40px 0;">
          <div style="height:1px;background:#f3f4f6;"></div>
        </td></tr>

        <!-- Details table -->
        <tr><td style="background:#ffffff;padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", d.name)}
            ${row("Business", d.businessName)}
            ${row("Email", `<a href="mailto:${d.email}" style="color:#d946ef;text-decoration:none;">${d.email}</a>`)}
            ${d.website ? row("Website", `<a href="${d.website}" style="color:#d946ef;text-decoration:none;">${d.website}</a>`) : ""}
            ${row("Needs help with", d.help)}
            ${d.packageInterest ? row("Package interest", d.packageInterest) : ""}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:#ffffff;padding:0 40px 32px;">
          <a href="mailto:${d.email}?subject=Re: Your enquiry to 1LaunchLayer"
             style="display:inline-block;background:#d946ef;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:99px;margin-top:8px;">
            Reply to ${d.name} →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
            This notification was sent automatically by 1LaunchLayer's contact form.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function row(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:7px 0;vertical-align:top;width:38%;">
      <span style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">${label}</span>
    </td>
    <td style="padding:7px 0;vertical-align:top;">
      <span style="font-size:14px;color:#111827;font-weight:500;">${value}</span>
    </td>
  </tr>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const data: ContactPayload = await request.json();

    if (!data.name || !data.email || !data.businessName || !data.help) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1. Notify the owner
    await transporter.sendMail({
      from: FROM,
      to: OWNER_EMAIL,
      subject: `New enquiry from ${data.name} — ${data.businessName}`,
      html: ownerEmail(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
