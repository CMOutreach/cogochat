import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, phone, business, website, location, message } = body;

  if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await resend.emails.send({
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
  });

  return NextResponse.json({ ok: true });
}
