import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);

    const { data: providers, error } = await supabase
      .from('users')
      .select('id, email, full_name, language')
      .eq('type', 'provider')
      .eq('stripe_onboarding_complete', false)
      .is('stripe_reminder_sent_at', null)
      .lte('created_at', twentyFourHoursAgo.toISOString())
      .gte('created_at', seventyTwoHoursAgo.toISOString());

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!providers || providers.length === 0) {
      return NextResponse.json({ message: 'No providers need reminders', sent: 0 });
    }

    let sentCount = 0;
    const errors = [];

    for (const provider of providers) {
      try {
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'stripe_reminder',
            providerName: provider.full_name,
            providerEmail: provider.email,
            providerLanguage: provider.language || 'en',
          }),
        });

        if (!emailResponse.ok) {
          throw new Error(`Email API returned ${emailResponse.status}`);
        }

        await supabase
          .from('users')
          .update({ stripe_reminder_sent_at: now.toISOString() })
          .eq('id', provider.id);

        sentCount++;
      } catch (err) {
        console.error(`Failed to remind ${provider.email}:`, err);
        errors.push({ email: provider.email, error: err.message });
      }
    }

    return NextResponse.json({
      message: 'Reminder cron complete',
      found: providers.length,
      sent: sentCount,
      errors,
    });
  } catch (err) {
    console.error('Stripe reminder cron error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}