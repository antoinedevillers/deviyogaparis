import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { courseData } = await request.json();
    
    if (!courseData) {
      return NextResponse.json(
        { error: 'Course data is required' },
        { status: 400 }
      );
    }

    const { day, date, cours, horaire, lieu } = courseData;

    // Définir le prix selon le type de cours (vous pouvez ajuster ces prix)
    const getPriceAmount = (courseName: string) => {
      switch (courseName.toLowerCase()) {
        case 'hatha yoga':
          return 1500; // 15€ en centimes
        case 'yoga nidra':
          return 1500; // 15€ en centimes
        case 'cours individuel':
          return 6000; // 60€ en centimes
        default:
          return 1500; // Prix par défaut
      }
    };

    const priceAmount = getPriceAmount(cours);
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/#planning`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${cours} - ${day} ${date}`,
              description: `Cours de ${cours} le ${day} ${date} de ${horaire} à ${lieu}`,
              metadata: {
                course_type: cours,
                course_date: date,
                course_day: day,
                course_time: horaire,
                course_location: lieu,
              },
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        course_type: cours,
        course_date: date,
        course_day: day,
        course_time: horaire,
        course_location: lieu,
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      // Collecte explicite du nom et prénom
      custom_fields: [
        {
          key: "nom_complet",
          label: { type: "custom", custom: "Nom complet" },
          type: "text",
        },
      ],
      // Configuration pour un meilleur affichage du nom
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Réservation - ${cours} le ${day} ${date}`,
          metadata: {
            course_type: cours,
            course_date: date,
            course_day: day,
            course_time: horaire,
            course_location: lieu,
          },
        },
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}