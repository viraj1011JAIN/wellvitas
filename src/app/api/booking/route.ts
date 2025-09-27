// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  enquiry: {
    name: string;
    email: string;
    phone: string;
    preferredContact: "email" | "phone" | "whatsapp";
    therapies: string[];
  };
  screening: {
    conditions: string[];
    notes: string;
  };
  taster: {
    date: string;
    time: string;
  };
  programme: {
    package: "taster" | "4" | "8" | "12";
    payment: "payg" | "plan";
  };
  meta: {
    submittedAt: string;
    ua?: string;
  };
  // honeypot
  website?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Payload;

    // Honeypot: if "website" has a value, likely a bot
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Minimal validation
    const errors: string[] = [];
    if (!data.enquiry?.name) errors.push("Name is required");
    if (!data.enquiry?.email || !isEmail(data.enquiry.email)) errors.push("Valid email is required");
    if (!data.enquiry?.phone) errors.push("Phone is required");
    if (!data.taster?.date) errors.push("Taster date is required");
    if (!data.taster?.time) errors.push("Taster time is required");

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // In a real app, send to your inbox/CRM here.
    // Example (commented) with Resend/Nodemailer/etc.
    // await sendEmailOrStoreSomewhere(data);

    // For now just log (visible in Vercel logs)
    console.log("[Booking] Received:", JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
