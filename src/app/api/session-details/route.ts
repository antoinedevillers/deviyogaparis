import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { ApiError } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'session_id required' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'line_items', 'line_items.data.price.product']
    });
    
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        status: session.status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        metadata: session.metadata
      }
    });
    
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error('❌ Erreur session:', apiError.message);
    return NextResponse.json(
      { error: 'Session not found', details: apiError.message }, 
      { status: 404 }
    );
  }
}