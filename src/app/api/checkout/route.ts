import { NextResponse } from "next/server";

/**
 * Future Payment Endpoint (/api/checkout)
 * 
 * Ready to connect with Stripe Checkout, Lemon Squeezy, or Barion/SimplePay.
 * To activate live Stripe checkout on your self-hosted server:
 * 1. npm install stripe
 * 2. Set STRIPE_SECRET_KEY in your .env.local
 * 3. Uncomment the Stripe session creator below.
 */

export async function POST(request: Request) {
  try {
    const { packageId, email } = await request.json();

    const prices: Record<string, { name: string; amount: number }> = {
      naming: { name: "Orbital Identity (Naming & Slogans)", amount: 49000 }, // $490.00
      "full-orbit": { name: "Full-Orbit Launch (Naming + Next.js Platform)", amount: 185000 }, // $1,850.00
      "web-dev": { name: "Deep-Space Engine (Next.js Application)", amount: 145000 }, // $1,450.00
    };

    const selectedPkg = prices[packageId];
    if (!selectedPkg) {
      return NextResponse.json({ error: "Invalid mission payload package ID." }, { status: 400 });
    }

    // Check if live Stripe key is configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      // Graceful sandbox response with simulation details
      return NextResponse.json({
        simulation: true,
        message: "Payment subsystem operational in sandbox mode. Add STRIPE_SECRET_KEY to .env to enable direct live card charges.",
        orderSummary: {
          package: selectedPkg.name,
          amountFormatted: `$${(selectedPkg.amount / 100).toLocaleString()}`,
          clientEmail: email || "Not provided",
          status: "READY_FOR_ORBIT",
        },
      });
    }

    /*
    // Example Stripe integration:
    // const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [{
    //     price_data: {
    //       currency: "usd",
    //       product_data: { name: selectedPkg.name },
    //       unit_amount: selectedPkg.amount,
    //     },
    //     quantity: 1,
    //   }],
    //   mode: "payment",
    //   success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${request.headers.get("origin")}/#services`,
    // });
    // return NextResponse.json({ url: session.url });
    */

    return NextResponse.json({ error: "Stripe key present but session awaiting configuration." }, { status: 501 });
  } catch (err) {
    console.error("[CHECKOUT ERROR]", err);
    return NextResponse.json({ error: "Checkout sequence aborted." }, { status: 500 });
  }
}
