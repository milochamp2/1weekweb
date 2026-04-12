import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

const OWNER_EMAIL = "alananoaj@gmail.com";
const FROM = "1LaunchLayer <alananoaj@gmail.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1launchlayer.com.au";
const LOGO_PATH = path.join(process.cwd(), "public", "logo", "logo_polished.png");
const LOGO_CID = "logo@1launchlayer";

// ─── Allowed origins ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://1launchlayer.com.au",
  "https://www.1launchlayer.com.au",
  "https://1launchlayer.vercel.app",
  // Allow localhost in dev
  "http://localhost:3000",
  "http://localhost:3001",
];

// ─── Simple in-memory rate limiter (max 3 requests per IP per 10 minutes) ────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ─── Input sanitisation ───────────────────────────────────────────────────────
/** Escape HTML special characters to prevent injection in email body */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip newlines and carriage returns to prevent email header injection */
function stripNewlines(str: string): string {
  return str.replace(/[\r\n]/g, " ").trim();
}

/** Validate email format */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate URL — must be http or https only */
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// ─── Detail row ───────────────────────────────────────────────────────────────
function detailRow(icon: string, label: string, value: string): string {
  return `
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="vertical-align:middle;width:36px;">
        <div style="width:32px;height:32px;background:rgba(217,70,239,0.1);border:1px solid rgba(217,70,239,0.22);border-radius:8px;text-align:center;line-height:30px;font-size:15px;">${icon}</div>
      </td>
      <td style="vertical-align:middle;padding-left:12px;">
        <span style="display:block;font-size:10px;font-weight:700;color:#6b5e8e;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px;">${label}</span>
        <span style="display:block;font-size:14px;color:#ddd0f5;font-weight:500;line-height:1.4;">${value}</span>
      </td>
    </tr>
  </table>`;
}

// ─── Owner notification ───────────────────────────────────────────────────────
function ownerEmail(d: {
  name: string;
  businessName: string;
  email: string;
  website?: string;
  help: string;
  packageInterest?: string;
}): string {
  const now = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // All values are pre-escaped before being used in HTML
  const name     = esc(d.name);
  const biz      = esc(d.businessName);
  const email    = esc(d.email);
  const help     = esc(d.help);
  const pkg      = d.packageInterest ? esc(d.packageInterest) : "";
  // Website: only render if it passed isSafeUrl validation
  const website  = d.website ? esc(d.website) : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Enquiry — 1LaunchLayer</title>
</head>
<body style="margin:0;padding:0;background:#0f0825;font-family:'Inter',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#140a30 0%,#0a051a 100%);padding:36px 16px 48px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Brand bar -->
        <tr><td style="padding-bottom:22px;">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td style="vertical-align:middle;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <img src="cid:${LOGO_CID}" width="38" height="38" alt="1LaunchLayer" style="display:block;" />
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:16px;font-weight:700;color:#f0e6ff;letter-spacing:-0.02em;">1Launch<span style="color:#d946ef;">Layer</span></span>
                </td>
              </tr></table>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="font-size:11.5px;color:#4a3d6a;">${now}</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Main card -->
        <tr><td style="border-radius:20px;overflow:hidden;border:1px solid rgba(217,70,239,0.22);background:#1a1042;" bgcolor="#1a1042">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Top gradient stripe -->
            <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,#c026d3 30%,#a855f7 70%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td></tr>

            <!-- Hero -->
            <tr><td style="background:linear-gradient(140deg,#2e1965 0%,#1e1150 55%,#180e48 100%);padding:0;border-bottom:1px solid rgba(255,255,255,0.07);">
              <table cellpadding="0" cellspacing="0" width="100%"><tr>
                <td style="padding:38px 44px 34px;vertical-align:top;">
                  <span style="display:inline-block;background:rgba(217,70,239,0.13);border:1px solid rgba(217,70,239,0.38);border-radius:99px;padding:5px 16px;font-size:10.5px;font-weight:700;color:#e879f9;letter-spacing:0.12em;text-transform:uppercase;">
                    &#9889; New Lead
                  </span>
                  <h1 style="margin:20px 0 0;font-size:33px;font-weight:800;color:#f0e6ff;letter-spacing:-0.03em;line-height:1.2;">
                    ${name}<br/>
                    <span style="color:#d946ef;">wants to talk.</span>
                  </h1>
                  <p style="margin:14px 0 0;font-size:14.5px;color:#8b7aaa;line-height:1.65;">
                    New enquiry from&nbsp;<strong style="color:#c4b5e8;font-weight:600;">${biz}</strong>. Here&apos;s everything you need to follow up.
                  </p>
                </td>
                <td style="width:110px;vertical-align:bottom;padding:0 28px 18px 0;text-align:right;">
                  <img src="cid:${LOGO_CID}" width="88" height="88" alt="" style="display:block;margin-left:auto;opacity:0.07;" />
                </td>
              </tr></table>
            </td></tr>

            <!-- Details -->
            <tr><td style="padding:30px 44px 24px;background:#16103e;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:4px;">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:10px;">
                    ${detailRow("👤", "Name", name)}
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:10px;">
                    ${detailRow("🏢", "Business", biz)}
                  </td>
                </tr>
              </table>
              ${detailRow("✉️", "Email", `<a href="mailto:${email}" style="color:#d946ef;text-decoration:none;font-weight:600;">${email}</a>`)}
              ${website ? detailRow("🌐", "Website", `<a href="${website}" style="color:#d946ef;text-decoration:none;font-weight:600;">${website}</a>`) : ""}
              ${detailRow("💬", "Needs help with", help)}
              ${pkg ? detailRow("📦", "Package interest", `<span style="display:inline-block;background:rgba(217,70,239,0.14);border:1px solid rgba(217,70,239,0.32);color:#e879f9;padding:4px 13px;border-radius:6px;font-size:13px;font-weight:600;">${pkg}</span>`) : ""}
            </td></tr>

            <!-- CTA -->
            <tr><td style="padding:28px 44px 34px;background:#1a1042;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="padding-right:12px;">
                  <a href="mailto:${email}?subject=Re: Your enquiry to 1LaunchLayer"
                     style="display:inline-block;background:linear-gradient(135deg,#d946ef 0%,#a855f7 100%);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 30px;border-radius:10px;letter-spacing:-0.01em;">
                    Reply to ${name} &rarr;
                  </a>
                </td>
                ${website ? `<td>
                  <a href="${website}" target="_blank"
                     style="display:inline-block;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#8b7aaa;font-size:14px;font-weight:600;text-decoration:none;padding:14px 22px;border-radius:10px;">
                    View site &#8599;
                  </a>
                </td>` : ""}
              </tr></table>
            </td></tr>

          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:26px;text-align:center;">
          <p style="margin:0;font-size:11.5px;color:#2e2250;">
            Sent by 1LaunchLayer contact form &middot;
            <a href="${SITE_URL}" style="color:#3d3070;text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // 1. Origin check — reject cross-origin requests
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Content-Type check
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    // 3. Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 4. Parse body
    let data: Record<string, unknown>;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const name           = typeof data.name === "string" ? stripNewlines(data.name).slice(0, 200) : "";
    const businessName   = typeof data.businessName === "string" ? stripNewlines(data.businessName).slice(0, 200) : "";
    const email          = typeof data.email === "string" ? stripNewlines(data.email).slice(0, 200) : "";
    const rawWebsite     = typeof data.website === "string" ? data.website.trim().slice(0, 500) : "";
    const help           = typeof data.help === "string" ? stripNewlines(data.help).slice(0, 500) : "";
    const packageInterest = typeof data.packageInterest === "string" ? stripNewlines(data.packageInterest).slice(0, 200) : "";
    const honeypot       = typeof data._honeypot === "string" ? data._honeypot : "";

    // 5. Honeypot — bots fill hidden fields
    if (honeypot) {
      return NextResponse.json({ success: true }); // silently discard
    }

    // 6. Required field validation
    if (!name || !email || !businessName || !help) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 7. Email format validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // 8. URL validation — only allow http/https, reject javascript: data: etc.
    const website = rawWebsite && isSafeUrl(rawWebsite) ? rawWebsite : "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: FROM,
      to: OWNER_EMAIL,
      // stripNewlines already applied — CRLF injection prevented
      subject: `⚡ New enquiry from ${name} — ${businessName}`,
      html: ownerEmail({ name, businessName, email, website, help, packageInterest }),
      attachments: [
        {
          filename: "logo_polished.png",
          path: LOGO_PATH,
          cid: LOGO_CID,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
