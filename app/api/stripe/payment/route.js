import { NextResponse } from 'next/server';
import { stripe, calculateSplit } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { jobId, amount, customerId, providerId } = await request.json();

    // Amount comes in dollars, convert to cents
    const totalCents = Math.round(amount * 100);
    const { commission, providerAmount } = calculateSplit(totalCents);

    // Get provider's Stripe account ID
    const { data: provider } = await supabase
      .from('users')
      .select('stripe_account_id')
      .eq('id', providerId)
      .single();

    if (!provider?.stripe_account_id) {
      return NextResponse.json(
        { error: 'Provider has not connected their bank account yet' },
        { status: 400 }
      );
    }

    // Create payment intent with automatic transfer to provider
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      transfer_data: {
        destination: provider.stripe_account_id,
        amount: providerAmount,
      },
      metadata: {
        jobId,
        customerId,
        providerId,
        commission,
        providerAmount,
      },
    });

    // Save payment record to Supabase
    await supabase.from('payments').insert({
      job_id: jobId,
      customer_id: customerId,
      provider_id: providerId,
      stripe_payment_intent_id: paymentIntent.id,
      amount_total: totalCents,
      amount_commission: commission,
      amount_provider: providerAmount,
      status: 'pending',
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      commission,
      providerAmount,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}