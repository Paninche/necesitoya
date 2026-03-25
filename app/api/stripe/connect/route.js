import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { userId, email } = await request.json();

    // Create a Stripe Connect Express account for the provider
    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
      capabilities: {
        transfers: { requested: true },
      },
    });

    // Save the Stripe account ID to Supabase
    await supabase
      .from('users')
      .update({ stripe_account_id: account.id })
      .eq('id', userId);

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/provider-dashboard?stripe=refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/provider-dashboard?stripe=success`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe connect error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}