import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, emailHtml } from "@/lib/contact";
import { allowSubmission } from "@/server/rate-limit";
export const runtime = "nodejs";
const fail = (status: number, code: string) =>
  NextResponse.json(
    { ok: false, code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(req: NextRequest) {
  const allowed = new Set([
    new URL(req.url).origin,
    ...(
      process.env.CONTACT_ALLOWED_ORIGINS ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      ""
    )
      .split(",")
      .filter(Boolean),
  ]);
  if (!req.headers.get("origin") || !allowed.has(req.headers.get("origin")!))
    return fail(403, "origin");
  if (!req.headers.get("content-type")?.includes("application/json"))
    return fail(415, "content_type");
  if (Number(req.headers.get("content-length") || 0) > 20000)
    return fail(413, "too_large");
  let body: string;
  try {
    const reader = req.body?.getReader();
    if (!reader) return fail(400, "invalid");
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 20000) {
        await reader.cancel();
        return fail(413, "too_large");
      }
      chunks.push(value);
    }
    body = Buffer.concat(chunks).toString("utf8");
  } catch {
    return fail(400, "invalid");
  }
  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return fail(400, "invalid");
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return fail(400, "validation");
  const data = parsed.data;
  const elapsed = Date.now() - data.startedAt;
  if (data.website || elapsed < 3000 || elapsed > 86400000)
    return fail(400, "verification");
  const identity = process.env.CONTACT_TRUSTED_IP_HEADER
    ? req.headers.get(process.env.CONTACT_TRUSTED_IP_HEADER) || "unknown"
    : "local-fallback";
  if (!(await allowSubmission(identity))) return fail(429, "rate_limit");
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASSWORD,
    MAIL_FROM,
    CONTACT_RECIPIENT,
  } = process.env;
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASSWORD ||
    !MAIL_FROM ||
    !CONTACT_RECIPIENT
  )
    return fail(503, "unavailable");
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === "true",
      requireTLS: SMTP_SECURE !== "true",
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
    });
    const result = await transport.sendMail({
      from: MAIL_FROM,
      to: CONTACT_RECIPIENT,
      subject: `Jan Samvad • ${data.category}`,
      text: `Name: ${data.name}\nMobile: ${data.mobile}\nVillage / Area: ${data.area}\nCategory: ${data.category}\nLanguage: ${data.locale}\n\n${data.message}`,
      html: emailHtml(data),
    });
    if (!result.accepted?.length || result.rejected?.length)
      return fail(502, "email_failed");
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return fail(502, "email_failed");
  }
}
