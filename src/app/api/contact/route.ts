
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      email,
      phone,
      companyName,
      foundBy,
      message,
      captchaToken,
      website,
    } = data;

    // Honeypot check
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ success: true });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const webhookSecret = process.env.KROZTEK_WEBHOOK_SECRET;
    const scriptUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (!secret || !webhookSecret || !scriptUrl) {
      throw new Error("Missing server environment variables");
    }

    // Basic validation
    if (
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !phone.trim() ||
      !message.trim() ||
      name.length > 100 ||
      phone.length > 30 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    if (typeof captchaToken !== "string" || !captchaToken) {
      return NextResponse.json(
        { success: false, error: "Please complete CAPTCHA" },
        { status: 400 }
      );
    }

    // Verify Google reCAPTCHA
    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret,
          response: captchaToken,
        }),
        cache: "no-store",
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResponse.ok || captchaResult.success !== true) {
      return NextResponse.json(
        { success: false, error: "CAPTCHA verification failed" },
        { status: 403 }
      );
    }

    // Forward to existing Google Apps Script
    const sheetResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: typeof email === "string" ? email.trim() : "",
        phone: phone.trim(),
        companyName:
          typeof companyName === "string" ? companyName.trim() : "",
        foundBy:
          typeof foundBy === "string" ? foundBy.trim() : "",
        message: message.trim(),
        secret: webhookSecret,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    if (!sheetResponse.ok) {
      throw new Error("Google Sheets request failed");
    }

    const sheetResult = await sheetResponse.json();

    if (sheetResult.success !== true) {
      throw new Error("Google Apps Script rejected request");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to submit enquiry" },
      { status: 500 }
    );
  }
}
