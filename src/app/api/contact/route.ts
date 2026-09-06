import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, missionType, timeline, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required telemetry fields missing: name, email, or message." },
        { status: 400 }
      );
    }

    // In a production setup, dispatch via Resend, Nodemailer, or a Telegram/Discord webhook:
    // e.g., await resend.emails.send({ ... });

    console.log("[INCOMING TRANSMISSION]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      missionType: missionType || "General Inquiry",
      timeline: timeline || "Standard",
      messageLength: message.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Signal received and verified. Mission team will establish uplink within 24 hours.",
        telemetryId: `TX-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[TRANSMISSION ERROR]", err);
    return NextResponse.json(
      { error: "Signal interference detected. Please retry or contact directly via email." },
      { status: 500 }
    );
  }
}
