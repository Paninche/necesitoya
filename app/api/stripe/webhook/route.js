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
      .update({ status: 'succeeded', paid_at: new Date().toISOString() })
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

  return NextResponse.json({ received: true });
}