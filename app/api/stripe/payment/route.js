import { NextResponse } from 'next/server';
import { getStripe, calculateSplit } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  const stripe = getStripe();
  try {
    const { jobId, amount, customerId, providerId } = await request.json();

    const totalCents = Math.round(amount * 100);
    const { commission, providerAmount } = calculateSplit(totalCents);

    // Look up provider by UUID or email
    const isEmail = providerId && providerId.includes('@');
    const query = isEmail
      ? supabase.from('users').select('id, stripe_account_id').eq('email', providerId).single()
      : supabase.from('users').select('id, stripe_account_id').eq('id', providerId).single();

    const { data: provider } = await query;

    // Build payment intent — with or without provider stripe account
    const paymentIntentData = {
      amount: totalCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { jobId, customerId, providerId, commission, providerAmount },
    };

    // Only add transfer if provider has stripe account
    if (provider?.stripe_account_id) {
      paymentIntentData.transfer_data = {
        destination: provider.stripe_account_id,
        amount: providerAmount,
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    await supabase.from('payments').insert({
      job_id: jobId,
      customer_id: customerId || null,
      provider_id: provider?.id || providerId || null,
      stripe_payment_intent_id: paymentIntent.id,
      amount_total: totalCents,
      amount_commission: commission,
      amount_provider: providerAmount,
      status: 'pending',
      provider_has_stripe: provider?.stripe_account_id ? true : false,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      commission,
      providerAmount,
      providerHasStripe: !!provider?.stripe_account_id,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}