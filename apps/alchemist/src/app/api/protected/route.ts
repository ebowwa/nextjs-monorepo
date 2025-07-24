// app/api/protected/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { ensureUserHasSubscription } from '@/utils/auth-helpers/server';

export async function GET(req: Request) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, redirect to the pricing page
  if (!session) {
    return NextResponse.redirect(new URL('/pricing', req.url));
  }

  const userId = session.user.id;

  // Ensure the user has an active subscription
  const hasSubscription = await ensureUserHasSubscription(userId);

  // If the user does not have an active subscription, redirect to the pricing page
  if (!hasSubscription) {
    return NextResponse.redirect(new URL('/pricing', req.url));
  }

  // User has an active subscription, allow access
  return new Response('Access granted');
}
