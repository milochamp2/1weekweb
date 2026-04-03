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
              <img src="${SITE_URL}/logo/logo.png" width="36" height="36" alt="1LaunchLayer" style="display:block;" />
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

// ─── User confirmation ────────────────────────────────────────────────────────
function confirmationEmail(d: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header with fuchsia gradient -->
        <tr><td style="background:linear-gradient(135deg,#fdf4ff 0%,#ffffff 60%);border-radius:16px 16px 0 0;padding:40px 40px 32px;border:1px solid #e5e7eb;border-bottom:none;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <img src="${SITE_URL}/logo/logo.png" width="36" height="36" alt="1LaunchLayer" style="display:block;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:17px;font-weight:700;color:#111827;letter-spacing:-0.02em;">
                      1Launch<span style="color:#d946ef;">Layer</span>
                    </span>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr><td style="padding-top:28px;">
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#111827;letter-spacing:-0.025em;line-height:1.2;">
                We've got your message,<br/>${d.name.split(" ")[0]}! 🎉
              </h1>
              <p style="margin:12px 0 0;font-size:15px;color:#6b7280;line-height:1.6;">
                Thanks for reaching out to <strong style="color:#111827;">1LaunchLayer</strong>.
                We'll review your details and be in touch within <strong style="color:#111827;">1 business day</strong>.
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- What's next -->
        <tr><td style="background:#ffffff;padding:28px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
          <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;">
            What happens next
          </p>
          ${step("1", "We review your enquiry", "We look at your business, your goals, and what you've shared with us.")}
          ${step("2", "We reach out to schedule a call", "Expect an email or message from us within 1 business day to book your free discovery call.")}
          ${step("3", "Free 30-minute discovery call", "We map out your website strategy, answer your questions, and confirm scope — no commitment required.")}
        </td></tr>

        <!-- Summary box -->
        <tr><td style="background:#fafafa;padding:24px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-top:1px solid #f3f4f6;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;">
            Your enquiry summary
          </p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Business", d.businessName)}
            ${row("Needs help with", d.help)}
            ${d.packageInterest && d.packageInterest !== "" ? row("Package interest", d.packageInterest) : ""}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:#ffffff;padding:28px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
          <p style="margin:0 0 4px;font-size:14px;color:#6b7280;">
            Want to check out our packages in the meantime?
          </p>
          <a href="${SITE_URL}/#packages"
             style="display:inline-block;background:#d946ef;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:99px;margin-top:12px;">
            View Packages →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:24px 40px;border:1px solid #e5e7eb;border-top:1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} 1LaunchLayer · Australia
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:#d1d5db;">
                You're receiving this because you submitted an enquiry at <a href="${SITE_URL}" style="color:#d946ef;text-decoration:none;">1launchlayer.com.au</a>
              </p>
            </td>
          </tr></table>
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

function step(num: string, title: string, desc: string): string {
  return `
  <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;width:100%;">
    <tr>
      <td style="vertical-align:top;padding-right:14px;width:32px;">
        <div style="width:28px;height:28px;border-radius:8px;background:#fdf4ff;border:1px solid #e879f9;text-align:center;line-height:28px;">
          <span style="font-size:12px;font-weight:800;color:#d946ef;">${num}</span>
        </div>
      </td>
      <td style="vertical-align:top;padding-top:2px;">
        <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${title}</p>
        <p style="margin:3px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">${desc}</p>
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

    // 2. Confirm to the enquirer
    await transporter.sendMail({
      from: FROM,
      to: data.email,
      subject: `We received your enquiry — 1LaunchLayer`,
      html: confirmationEmail(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
