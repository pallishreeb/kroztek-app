// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, message } = body;

    const data = await resend.emails.send({
      from: "Kroztek <onboarding@resend.dev>", // replace with your verified sender later
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
