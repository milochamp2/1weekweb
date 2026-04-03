import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const OWNER_EMAIL = "alananoaj@gmail.com";
const FROM = "1LaunchLayer <alananoaj@gmail.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1launchlayer.vercel.app";

function getLogoSrc(): string {
  try {
    const logoPath = path.join(process.cwd(), "public", "1launchlayer logo", "launch layer logo.png");
    const data = fs.readFileSync(logoPath).toString("base64");
    return `data:image/png;base64,${data}`;
  } catch {
    return `${SITE_URL}/1launchlayer%20logo/launch%20layer%20logo.png`;
  }
}

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
  const logoSrc = getLogoSrc();
  const now = new Date().toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0f0f11;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f11;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Top brand bar -->
        <tr><td style="padding-bottom:24px;">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td style="vertical-align:middle;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <img src="${logoSrc}" width="32" height="32" alt="1LaunchLayer" style="display:block;border-radius:6px;" />
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:15px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">1Launch<span style="color:#d946ef;">Layer</span></span>
                </td>
              </tr></table>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="font-size:12px;color:#6b7280;">${now}</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Hero card -->
        <tr><td style="background:linear-gradient(135deg,#1a0a1e 0%,#1c1028 50%,#0f1623 100%);border-radius:20px 20px 0 0;padding:40px 44px 36px;border:1px solid #2a1f35;border-bottom:none;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td>
              <span style="display:inline-block;background:rgba(217,70,239,0.15);border:1px solid rgba(217,70,239,0.4);color:#e879f9;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:99px;">
                ⚡ New Lead
              </span>
            </td></tr>
            <tr><td style="padding-top:20px;">
              <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;line-height:1.15;">
                ${d.name}<br/>
                <span style="color:#d946ef;">wants to talk.</span>
              </h1>
            </td></tr>
            <tr><td style="padding-top:12px;">
              <p style="margin:0;font-size:15px;color:#9ca3af;line-height:1.6;">
                A new enquiry just came through from <strong style="color:#e5e7eb;">${d.businessName}</strong>. Here's everything you need to follow up.
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Details card -->
        <tr><td style="background:#161620;border:1px solid #2a1f35;border-top:1px solid #3b2a45;border-bottom:none;padding:32px 44px;">

          ${detailRow("👤", "Name", d.name)}
          ${detailRow("🏢", "Business", d.businessName)}
          ${detailRow("✉️", "Email", `<a href="mailto:${d.email}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.email}</a>`)}
          ${d.website ? detailRow("🌐", "Website", `<a href="${d.website}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.website}</a>`) : ""}
          ${detailRow("💬", "Needs help with", d.help)}
          ${d.packageInterest ? detailRow("📦", "Package interest", `<span style="display:inline-block;background:rgba(217,70,239,0.15);border:1px solid rgba(217,70,239,0.35);color:#e879f9;padding:3px 10px;border-radius:6px;font-size:13px;font-weight:600;">${d.packageInterest}</span>`) : ""}

        </td></tr>

        <!-- CTA card -->
        <tr><td style="background:#161620;border:1px solid #2a1f35;border-top:1px solid #1f1f2e;border-radius:0 0 20px 20px;padding:28px 44px 36px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:12px;">
                <a href="mailto:${d.email}?subject=Re: Your enquiry to 1LaunchLayer"
                   style="display:inline-block;background:linear-gradient(135deg,#d946ef,#a855f7);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 28px;border-radius:10px;letter-spacing:-0.01em;">
                  Reply to ${d.name} →
                </a>
              </td>
              ${d.website ? `<td>
                <a href="${d.website}" target="_blank"
                   style="display:inline-block;background:transparent;color:#9ca3af;font-size:14px;font-weight:600;text-decoration:none;padding:13px 20px;border-radius:10px;border:1px solid #2d2d3a;">
                  View site ↗
                </a>
              </td>` : ""}
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:28px;">
          <p style="margin:0;font-size:12px;color:#4b5563;text-align:center;">
            Sent automatically by 1LaunchLayer's contact form · <a href="${SITE_URL}" style="color:#6b7280;text-decoration:none;">1launchlayer.com.au</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function detailRow(icon: string, label: string, value: string): string {
  return `
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:18px;">
    <tr>
      <td style="vertical-align:top;width:28px;padding-top:1px;">
        <span style="font-size:15px;">${icon}</span>
      </td>
      <td style="vertical-align:top;padding-left:10px;">
        <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.07em;">${label}</p>
        <p style="margin:0;font-size:14px;color:#e5e7eb;font-weight:500;line-height:1.5;">${value}</p>
      </td>
    </tr>
  </table>`;
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
