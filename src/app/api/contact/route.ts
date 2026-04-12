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

// ─── Inline SVG icons (base64, Gmail-safe) ───────────────────────────────────
function svgIcon(paths: string, color = "#d946ef"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const ICONS = {
  user:    svgIcon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  biz:     svgIcon('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>'),
  email:   svgIcon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>'),
  globe:   svgIcon('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
  chat:    svgIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  package: svgIcon('<path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>'),
  bolt:    svgIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', "#f0e6ff"),
};

// ─── Detail row ───────────────────────────────────────────────────────────────
function detailRow(iconSrc: string, label: string, value: string): string {
  return `
  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
    <tr>
      <td style="vertical-align:middle;width:36px;">
        <div style="width:32px;height:32px;background:rgba(217,70,239,0.1);border:1px solid rgba(217,70,239,0.22);border-radius:8px;text-align:center;line-height:32px;">
          <img src="${iconSrc}" width="14" height="14" alt="" style="vertical-align:middle;margin-top:-1px;" />
        </div>
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
                  <table cellpadding="0" cellspacing="0"><tr><td>
                    <span style="display:inline-table;background:rgba(217,70,239,0.13);border:1px solid rgba(217,70,239,0.38);border-radius:99px;padding:5px 16px;">
                      <table cellpadding="0" cellspacing="0"><tr>
                        <td style="vertical-align:middle;padding-right:6px;">
                          <img src="${ICONS.bolt}" width="12" height="12" alt="" style="display:block;" />
                        </td>
                        <td style="vertical-align:middle;">
                          <span style="font-size:10.5px;font-weight:700;color:#e879f9;letter-spacing:0.12em;text-transform:uppercase;">New Lead</span>
                        </td>
                      </tr></table>
                    </span>
                  </td></tr></table>

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
                    ${detailRow(ICONS.user, "Name", d.name)}
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:10px;">
                    ${detailRow(ICONS.biz, "Business", d.businessName)}
                  </td>
                </tr>
              </table>

              <!-- Full-width rows -->
              ${detailRow(ICONS.email, "Email", `<a href="mailto:${d.email}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.email}</a>`)}
              ${d.website ? detailRow(ICONS.globe, "Website", `<a href="${d.website}" style="color:#d946ef;text-decoration:none;font-weight:600;">${d.website}</a>`) : ""}
              ${detailRow(ICONS.chat, "Needs help with", d.help || "—")}
              ${d.packageInterest ? detailRow(ICONS.package, "Package interest", `<span style="display:inline-block;background:rgba(217,70,239,0.14);border:1px solid rgba(217,70,239,0.32);color:#e879f9;padding:4px 13px;border-radius:6px;font-size:13px;font-weight:600;">${d.packageInterest}</span>`) : ""}

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
                    View site &nearr;
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
