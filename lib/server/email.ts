import type { Enrollment } from "@/lib/types"

/**
 * Transactional email via the Resend REST API (no SDK needed).
 * Configure in .env.local:
 *   RESEND_API_KEY            - from resend.com/api-keys
 *   RESEND_FROM_EMAIL         - verified sender, e.g. "Carthage Academy <academy@carthage.de>"
 *   OWNER_NOTIFICATION_EMAIL  - where new-enrollment alerts go
 * Without RESEND_API_KEY sending is skipped silently so enrollment
 * still works in dev; the entry always lands in the admin dashboard.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails"

interface EmailPayload {
  to: string
  subject: string
  html: string
  replyTo?: string
}

async function sendEmail({ to, subject, html, replyTo }: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set - skipping email:", subject)
    return false
  }
  const from = process.env.RESEND_FROM_EMAIL || "Carthage Academy <onboarding@resend.dev>"
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html, reply_to: replyTo }),
    })
    if (!res.ok) {
      console.error("[email] Resend error:", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error("[email] Failed to reach Resend:", err)
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function emailShell(body: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f4f0;font-family:Helvetica,Arial,sans-serif;color:#1c1a17;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <div style="text-align:center;padding-bottom:20px;">
        <span style="font-size:20px;font-weight:700;letter-spacing:-0.02em;">carthage<span style="color:#c9a96e;">.</span></span>
        <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8378;margin-top:2px;">Academy</div>
      </div>
      <div style="background:#ffffff;border-radius:16px;padding:32px 28px;border:1px solid #eee;">
        ${body}
      </div>
      <p style="text-align:center;font-size:11px;color:#999;margin-top:20px;">
        Carthage Cosmetic &amp; Pigmentation &middot; Lietzenburger Str. 9a, 10789 Berlin, Germany
      </p>
    </div>
  </body>
</html>`
}

/** Confirmation to the student + notification to the site owner. */
export async function sendEnrollmentEmails(
  enrollment: Enrollment,
): Promise<{ studentEmailSent: boolean; ownerEmailSent: boolean }> {
  const name = escapeHtml(enrollment.name)
  const course = escapeHtml(enrollment.formationName)

  const studentHtml = emailShell(`
    <h1 style="font-size:20px;margin:0 0 16px;">Your application is in, ${name}.</h1>
    <p style="font-size:14px;line-height:1.7;color:#555;margin:0 0 12px;">
      Thank you for applying to <strong>${course}</strong> at the Carthage Academy in Berlin.
    </p>
    <p style="font-size:14px;line-height:1.7;color:#555;margin:0 0 12px;">
      Here is what happens next:
    </p>
    <ol style="font-size:14px;line-height:1.9;color:#555;margin:0 0 16px;padding-left:20px;">
      <li>Our team reviews your application &mdash; usually within one business day.</li>
      <li>We contact you personally to confirm dates, answer questions and reserve your seat.</li>
      <li>You receive your onboarding pack with everything to prepare for day one.</li>
    </ol>
    <p style="font-size:14px;line-height:1.7;color:#555;margin:0;">
      No payment is due until your seat is confirmed. If anything changes on your side,
      just reply to this email.
    </p>
  `)

  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL
  const ownerHtml = emailShell(`
    <h1 style="font-size:18px;margin:0 0 16px;">New academy enrollment</h1>
    <table style="font-size:14px;line-height:1.9;color:#333;border-collapse:collapse;width:100%;">
      <tr><td style="color:#999;padding-right:12px;white-space:nowrap;">Course</td><td><strong>${course}</strong></td></tr>
      <tr><td style="color:#999;padding-right:12px;">Name</td><td>${name}</td></tr>
      <tr><td style="color:#999;padding-right:12px;">Email</td><td>${escapeHtml(enrollment.email)}</td></tr>
      <tr><td style="color:#999;padding-right:12px;">Phone</td><td>${escapeHtml(enrollment.phone || "-")}</td></tr>
      <tr><td style="color:#999;padding-right:12px;">Country</td><td>${escapeHtml(enrollment.country || "-")}</td></tr>
      <tr><td style="color:#999;padding-right:12px;">Language</td><td>${enrollment.locale.toUpperCase()}</td></tr>
    </table>
    ${enrollment.message ? `<p style="font-size:14px;line-height:1.7;color:#555;margin:16px 0 0;padding-top:16px;border-top:1px solid #eee;">${escapeHtml(enrollment.message)}</p>` : ""}
    <p style="font-size:12px;color:#999;margin:20px 0 0;">Manage this enrollment in the admin dashboard under Enrollments.</p>
  `)

  const [studentEmailSent, ownerEmailSent] = await Promise.all([
    sendEmail({
      to: enrollment.email,
      subject: `Application received - ${enrollment.formationName}`,
      html: studentHtml,
    }),
    ownerEmail
      ? sendEmail({
          to: ownerEmail,
          subject: `New enrollment: ${enrollment.formationName} - ${enrollment.name}`,
          html: ownerHtml,
          replyTo: enrollment.email,
        })
      : Promise.resolve(false),
  ])

  return { studentEmailSent, ownerEmailSent }
}
