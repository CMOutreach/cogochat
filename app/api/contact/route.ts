import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, business, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: Replace with your email provider (Resend, Nodemailer, etc.)
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'hello@cogochat.co.uk',
  //   to: 'hello@cogochat.co.uk',
  //   subject: `New enquiry from ${name} — ${business || 'no business given'}`,
  //   html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Message:</b> ${message}</p>`,
  // });

  console.log("New lead:", { name, email, phone, business, message });

  return NextResponse.json({ ok: true });
}
