import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

const SHEET_ID = "1dM0JB6WBgQ4AQxhbmCAa6u4oPSkTHPB0MFk0_xGRk6Y";

async function logToCRM(data: {
      name: string;
      email: string;
      phone: string;
      business: string;
      website: string;
      location: string;
      message: string;
}) {
      try {
              const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}");
              const auth = new google.auth.GoogleAuth({
                        credentials,
                        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
              });
              const sheets = google.sheets({ version: "v4", auth });
              const date = new Date().toLocaleDateString("en-GB");
              await sheets.spreadsheets.values.append({
                        spreadsheetId: SHEET_ID,
                        range: "CogoChat CRM!A:P",
                        valueInputOption: "USER_ENTERED",
                        requestBody: {
                                    values: [[
                                                  date,
                                                  data.business || "",
                                                  data.name,
                                                  data.phone || "",
                                                  data.email,
                                                  data.location || "",
                                                  "Owner Found",
                                                  "New",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  data.message,
                                                  "",
                                                  "",
                                                ]],
                        },
              });
      } catch (err) {
              console.error("CRM log failed:", err);
      }
}

export async function POST(req: NextRequest) {
      const body = await req.json();
      const { name, email, phone, business, website, location, message } = body;

  if (!name || !email || !message) {
          return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await Promise.all([
          resend.emails.send({
                    from: "CogoChat <hello@cogochat.com>",
                    to: "hello@cogochat.com",
                    subject: `New enquiry from ${name} — ${business || "no business given"}`,
                    html: `
                            <p><b>Name:</b> ${name}</p>
                                    <p><b>Email:</b> ${email}</p>
                                            <p><b>Phone:</b> ${phone || "not provided"}</p>
                                                    <p><b>Business:</b> ${business || "not provided"}</p>
                                                            <p><b>Website:</b> ${website || "not provided"}</p>
                                                                    <p><b>Location:</b> ${location || "not provided"}</p>
                                                                            <p><b>Message:</b> ${message}</p>
                                                                                  `,
          }),
          logToCRM({ name, email, phone, business, website, location, message }),
        ]);

  return NextResponse.json({ ok: true });
}
