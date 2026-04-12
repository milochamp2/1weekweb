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

// ─── Detail row (emoji icons — universally supported in Gmail) ───────────────
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
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Enquiry — 1LaunchLayer</title>
</head>
<body style="margin:0;padding:0;background:#0f0825;font-family:'Inter',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#140a30 0%,#0a051a 100%);padding:36px 16px 48px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- ── Brand bar ── -->
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

        <!-- ── Main card ── -->
        <tr><td style="border-radius:20px;overflow:hidden;border:1px solid rgba(217,70,239,0.22);background:#1a1042;"
                bgcolor="#1a1042">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Top gradient stripe -->
            <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,#c026d3 30%,#a855f7 70%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td></tr>

            <!-- ── Hero ── -->
            <tr><td style="background:linear-gradient(140deg,#2e1965 0%,#1e1150 55%,#180e48 100%);padding:0;border-bottom:1px solid rgba(255,255,255,0.07);">
              <table cellpadding="0" cellspacing="0" width="100%"><tr>

                <!-- Hero text -->
                <td style="padding:38px 44px 34px;vertical-align:top;">

                  <!-- Badge -->
                  <span style="display:inline-block;background:rgba(217,70,239,0.13);border:1px solid rgba(217,70,239,0.38);border-radius:99px;padding:5px 16px;font-size:10.5px;font-weight:700;color:#e879f9;letter-spacing:0.12em;text-transform:uppercase;">
                    &#9889; New Lead
                  </span>

                  <!-- Headline -->
                  <h1 style="margin:20px 0 0;font-size:33px;font-weight:800;color:#f0e6ff;letter-spacing:-0.03em;line-height:1.2;">
                    ${d.name}<br/>
                    <span style="color:#d946ef;">wants to talk.</span>
                  </h1>

                  <!-- Sub -->
                  <p style="margin:14px 0 0;font-size:14.5px;color:#8b7aaa;line-height:1.65;">
                    New enquiry from&nbsp;<strong style="color:#c4b5e8;font-weight:600;">${d.businessName}</strong>. Here&apos;s everything you need to follow up.
                  </p>
                </td>

                <!-- Hero logo watermark -->
                <td style="width:110px;vertical-align:bottom;padding:0 28px 18px 0;text-align:right;">
                  <img src="cid:${LOGO_CID}" width="88" height="88" alt="" style="display:block;margin-left:auto;opacity:0.07;filter:blur(0px);" />
                </td>

              </tr></table>
            </td></tr>

            <!-- ── Details ── -->
            <tr><td style="padding:30px 44px 24px;background:#16103e;border-bottom:1px solid rgba(255,255,255,0.06);">

              <!-- 2-col mini grid for name + business -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:4px;">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:10px;">
                    ${detailRow("👤", "Name", d.name)}
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:10px;">
                    ${detailRow("🏢", "Business", d.businessName)}
                  </td>
                </tr>
              </table>

              <!-- Full-width rows -->
              ${detailRow("✉️", "Email", `<a href="mailto:${d.email}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.email}</a>`)}
              ${d.website ? detailRow("🌐", "Website", `<a href="${d.website}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.website}</a>`) : ""}
              ${detailRow("💬", "Needs help with", d.help || "—")}
              ${d.packageInterest ? detailRow("📦", "Package interest", `<span style="display:inline-block;background:rgba(217,70,239,0.14);border:1px solid rgba(217,70,239,0.32);color:#e879f9;padding:4px 13px;border-radius:6px;font-size:13px;font-weight:600;">${d.packageInterest}</span>`) : ""}

            </td></tr>

            <!-- ── CTA ── -->
            <tr><td style="padding:28px 44px 34px;background:#1a1042;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="padding-right:12px;">
                  <a href="mailto:${d.email}?subject=Re: Your enquiry to 1LaunchLayer"
                     style="display:inline-block;background:linear-gradient(135deg,#d946ef 0%,#a855f7 100%);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 30px;border-radius:10px;letter-spacing:-0.01em;">
                    Reply to ${d.name} &rarr;
                  </a>
                </td>
                ${d.website ? `<td>
                  <a href="${d.website}" target="_blank"
                     style="display:inline-block;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#8b7aaa;font-size:14px;font-weight:600;text-decoration:none;padding:14px 22px;border-radius:10px;">
                    View site &#8599;
                  </a>
                </td>` : ""}
              </tr></table>
            </td></tr>

          </table>
        </td></tr>

        <!-- ── Footer ── -->
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
      subject: `⚡ New enquiry from ${data.name} — ${data.businessName}`,
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
