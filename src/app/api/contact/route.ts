import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { contactSchema } from "@/lib/contact";

export const runtime = "nodejs";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    concern: "जनसमस्या / Public Concern",
    suggestion: "सुझाव / Suggestion",
    meeting: "मुलाकात / संपर्क / Meeting / Contact",
    support: "सहयोग / Support / Cooperation",
    other: "अन्य / Other",
  };

  return labels[category] ?? category;
}

export async function POST(request: Request) {
  try {
    /* =====================================================
       ENV CHECK
    ====================================================== */

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_APP_PASSWORD;
    const recipient = process.env.CONTACT_TO_EMAIL;

    if (!smtpUser || !smtpPassword || !recipient) {
      console.error("Contact email configuration is incomplete.");

      return NextResponse.json(
        {
          ok: false,
          error: "Email service unavailable",
        },
        {
          status: 503,
        },
      );
    }

    /* =====================================================
       REQUEST BODY
    ====================================================== */

    const body: unknown = await request.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid form submission",
        },
        {
          status: 400,
        },
      );
    }

    const {
      name,
      mobile,
      area,
      category,
      message,
      website,
      startedAt,
      locale,
    } = parsed.data;

    /* =====================================================
       HONEYPOT
    ====================================================== */

    if (website) {
      /*
        Bot ko successful response dete hain,
        lekin email actually send nahi hota.
      */
      return NextResponse.json({
        ok: true,
      });
    }

    /* =====================================================
       BASIC SPEED-BOT CHECK
    ====================================================== */

    if (typeof startedAt === "number" && Date.now() - startedAt < 2000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid submission",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       MAIL TRANSPORT
    ====================================================== */

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    /* =====================================================
       SAFE VALUES
    ====================================================== */

    const safeName = escapeHtml(name);
    const safeMobile = escapeHtml(mobile);
    const safeArea = escapeHtml(area || "Not provided");
    const safeCategory = escapeHtml(categoryLabel(category));
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const language = locale === "hi" ? "Hindi" : "English";

    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    /* =====================================================
       EMAIL
    ====================================================== */

    await transporter.sendMail({
      from: {
        name: process.env.CONTACT_FROM_NAME || "Shiwendra Kumar Shukla Website",

        address: smtpUser,
      },

      to: recipient,

      subject: `[Jan Samvad] ${categoryLabel(category)} — ${name}`,

      text: `
NEW JAN SAMVAD SUBMISSION

Name:
${name}

Mobile:
${mobile}

Village / Area:
${area || "Not provided"}

Category:
${categoryLabel(category)}

Language:
${language}

Message:
${message}

Submitted:
${submittedAt}
      `.trim(),

      html: `
<!doctype html>
<html>
  <body
    style="
      margin:0;
      padding:0;
      background:#f4f4f2;
      font-family:Arial,Helvetica,sans-serif;
      color:#18202a;
    "
  >
    <div
      style="
        max-width:680px;
        margin:30px auto;
        background:#ffffff;
        border:1px solid #e1e4e8;
      "
    >

      <div
        style="
          background:#071d39;
          padding:28px 32px;
          color:#ffffff;
        "
      >
        <div
          style="
            font-size:11px;
            letter-spacing:2px;
            color:#d4ad55;
            font-weight:bold;
            margin-bottom:10px;
          "
        >
          JAN SAMVAD
        </div>

        <div
          style="
            font-size:26px;
            font-weight:bold;
          "
        >
          नया जनसंवाद संदेश
        </div>

        <div
          style="
            margin-top:8px;
            color:#cbd4df;
            font-size:14px;
          "
        >
          Shiwendra Kumar Shukla Official Website
        </div>
      </div>


      <div
        style="
          padding:30px 32px;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse:collapse;
            font-size:15px;
          "
        >

          <tr>
            <td
              style="
                padding:12px 0;
                width:150px;
                color:#667085;
                border-bottom:1px solid #eeeeee;
              "
            >
              नाम / Name
            </td>

            <td
              style="
                padding:12px 0;
                font-weight:bold;
                border-bottom:1px solid #eeeeee;
              "
            >
              ${safeName}
            </td>
          </tr>


          <tr>
            <td
              style="
                padding:12px 0;
                color:#667085;
                border-bottom:1px solid #eeeeee;
              "
            >
              मोबाइल / Mobile
            </td>

            <td
              style="
                padding:12px 0;
                font-weight:bold;
                border-bottom:1px solid #eeeeee;
              "
            >
              <a
                href="tel:${safeMobile}"
                style="
                  color:#0b5eaa;
                  text-decoration:none;
                "
              >
                ${safeMobile}
              </a>
            </td>
          </tr>


          <tr>
            <td
              style="
                padding:12px 0;
                color:#667085;
                border-bottom:1px solid #eeeeee;
              "
            >
              गाँव / क्षेत्र
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #eeeeee;
              "
            >
              ${safeArea}
            </td>
          </tr>


          <tr>
            <td
              style="
                padding:12px 0;
                color:#667085;
                border-bottom:1px solid #eeeeee;
              "
            >
              श्रेणी / Category
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #eeeeee;
              "
            >
              ${safeCategory}
            </td>
          </tr>


          <tr>
            <td
              style="
                padding:12px 0;
                color:#667085;
                border-bottom:1px solid #eeeeee;
              "
            >
              भाषा / Language
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #eeeeee;
              "
            >
              ${language}
            </td>
          </tr>

        </table>


        <div
          style="
            margin-top:28px;
          "
        >
          <div
            style="
              color:#667085;
              font-size:13px;
              font-weight:bold;
              margin-bottom:10px;
            "
          >
            संदेश / Message
          </div>

          <div
            style="
              background:#f5f7fa;
              border-left:4px solid #d4ad55;
              padding:18px 20px;
              font-size:15px;
              line-height:1.75;
            "
          >
            ${safeMessage}
          </div>
        </div>


        <div
          style="
            margin-top:28px;
            padding-top:18px;
            border-top:1px solid #eeeeee;
            color:#8a929d;
            font-size:12px;
          "
        >
          Submitted: ${submittedAt}
        </div>

      </div>
    </div>
  </body>
</html>
      `.trim(),
    });

    /* =====================================================
       SUCCESS
    ====================================================== */

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Email could not be sent",
      },
      {
        status: 503,
      },
    );
  }
}
