import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature error:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { jobId } = paymentIntent.metadata;

    await supabase
      .from('payments')
      .update({ status: 'succeeded' })
      .eq('stripe_payment_intent_id', paymentIntent.id);

    await supabase
      .from('jobs')
      .update({ status: 'paid' })
      .eq('id', jobId);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;

    await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('stripe_payment_intent_id', paymentIntent.id);
  }

  // Flip stripe_onboarding_complete ONLY when Stripe confirms the account
  // is fully ready to charge and receive payouts. This fires when providers
  // finish the Stripe Express onboarding flow (bank info submitted + verified).
  if (event.type === 'account.updated') {
    const account = event.data.object;
    const isFullyOnboarded = account.charges_enabled && account.payouts_enabled;

    await supabase
      .from('users')
      .update({ stripe_onboarding_complete: isFullyOnboarded })
      .eq('stripe_account_id', account.id);
  }

  return NextResponse.json({ received: true });
}