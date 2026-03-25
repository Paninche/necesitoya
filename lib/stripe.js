import Stripe from 'stripe';

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
}

export const COMMISSION_RATE = 0.08;

export function calculateSplit(totalCents) {
  const commission = Math.round(totalCents * COMMISSION_RATE);
  const providerAmount = totalCents - commission;
  return { commission, providerAmount };
}

export function formatUSD(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}