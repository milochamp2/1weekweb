import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

const OWNER_EMAIL = "alananoaj@gmail.com";
const FROM = "1LaunchLayer <alananoaj@gmail.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1launchlayer.com.au";
const LOGO_PATH = path.join(process.cwd(), "public", "logo", "logo_polished.png");
const LOGO_CID = "logo@1launchlayer";

interface ContactPayload {
  name: string;
  businessName: string;
  email: string;
  website?: string;
  help: string;
  packageInterest?: string;
}

// ─── Detail row ───────────────────────────────────────────────────────────────
function detailRow(icon: string, label: string, value: string): string {
  return `
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
    <tr>
      <td style="vertical-align:top;width:32px;padding-top:2px;">
        <div style="width:28px;height:28px;background:rgba(217,70,239,0.12);border:1px solid rgba(217,70,239,0.25);border-radius:7px;text-align:center;line-height:28px;font-size:13px;">${icon}</div>
      </td>
      <td style="vertical-align:top;padding-left:12px;">
        <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#7c6d9e;text-transform:uppercase;letter-spacing:0.1em;">${label}</p>
        <p style="margin:0;font-size:14px;color:#e2d9f3;font-weight:500;line-height:1.5;">${value}</p>
      </td>
    </tr>
  </table>`;
}

// ─── Owner notification ───────────────────────────────────────────────────────
function ownerEmail(d: ContactPayload): string {
  const now = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Enquiry — 1LaunchLayer</title>
</head>
<body style="margin:0;padding:0;background:#0d0618;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0618;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Brand bar -->
        <tr><td style="padding-bottom:20px;">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td style="vertical-align:middle;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <img src="cid:${LOGO_CID}" width="36" height="36" alt="1LaunchLayer" style="display:block;border-radius:6px;" />
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:15px;font-weight:700;color:#f0e6ff;letter-spacing:-0.02em;">
                    1Launch<span style="color:#d946ef;">Layer</span>
                  </span>
                </td>
              </tr></table>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="font-size:12px;color:#5c4d7a;">${now}</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#160d2e;border-radius:20px;border:1px solid rgba(217,70,239,0.2);overflow:hidden;box-shadow:0 0 60px rgba(139,92,246,0.15);">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Accent top line -->
            <tr><td style="height:3px;background:linear-gradient(90deg,transparent,#d946ef,#a855f7,transparent);"></td></tr>

            <!-- Hero -->
            <tr><td style="background:linear-gradient(150deg,rgba(217,70,239,0.08) 0%,rgba(139,92,246,0.06) 50%,transparent 100%);padding:40px 44px 36px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr><td>
                  <span style="display:inline-block;background:rgba(217,70,239,0.12);border:1px solid rgba(217,70,239,0.35);color:#e879f9;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:5px 16px;border-radius:99px;">
                    ⚡ New Lead
                  </span>
                </td></tr>
                <tr><td style="padding-top:22px;">
                  <h1 style="margin:0;font-size:32px;font-weight:800;color:#f0e6ff;letter-spacing:-0.03em;line-height:1.2;">
                    ${d.name}<br/>
                    <span style="color:#d946ef;">wants to talk.</span>
                  </h1>
                </td></tr>
                <tr><td style="padding-top:14px;">
                  <p style="margin:0;font-size:15px;color:#9580b8;line-height:1.65;">
                    A new enquiry just came through from
                    <strong style="color:#c4b5e8;">${d.businessName}</strong>.
                    Here&apos;s everything you need to follow up.
                  </p>
                </td></tr>
              </table>
            </td></tr>

            <!-- Details -->
            <tr><td style="padding:36px 44px;border-bottom:1px solid rgba(255,255,255,0.06);">
              ${detailRow("👤", "Name", d.name)}
              ${detailRow("🏢", "Business", d.businessName)}
              ${detailRow("✉️", "Email", `<a href="mailto:${d.email}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.email}</a>`)}
              ${d.website ? detailRow("🌐", "Website", `<a href="${d.website}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.website}</a>`) : ""}
              ${detailRow("💬", "Needs help with", d.help || "—")}
              ${d.packageInterest ? detailRow("📦", "Package interest", `<span style="display:inline-block;background:rgba(217,70,239,0.15);border:1px solid rgba(217,70,239,0.35);color:#e879f9;padding:4px 12px;border-radius:6px;font-size:13px;font-weight:600;">${d.packageInterest}</span>`) : ""}
            </td></tr>

            <!-- CTA -->
            <tr><td style="padding:28px 44px 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${d.email}?subject=Re: Your enquiry to 1LaunchLayer"
                       style="display:inline-block;background:linear-gradient(135deg,#d946ef,#a855f7);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;letter-spacing:-0.01em;">
                      Reply to ${d.name} →
                    </a>
                  </td>
                  ${d.website ? `<td>
                    <a href="${d.website}" target="_blank"
                       style="display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#9580b8;font-size:14px;font-weight:600;text-decoration:none;padding:14px 22px;border-radius:10px;">
                      View site ↗
                    </a>
                  </td>` : ""}
                </tr>
              </table>
            </td></tr>

          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#3d2f5c;text-align:center;">
            Sent automatically by 1LaunchLayer&apos;s contact form ·
            <a href="${SITE_URL}" style="color:#5c4d7a;text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
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

    await transporter.sendMail({
      from: FROM,
      to: OWNER_EMAIL,
      subject: `New enquiry from ${data.name} — ${data.businessName}`,
      html: ownerEmail(data),
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
