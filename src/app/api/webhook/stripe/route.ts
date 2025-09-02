import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';
import type { CourseInfo, ApiError, StripeError } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

  } catch (err: unknown) {
    const error = err as Error;
    console.error('❌ Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Traiter les événements de paiement réussi
  if (event.type === 'checkout.session.completed') {

    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Récupérer les détails complets de la session avec customer et line_items
      let fullSession;
      try {
        fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['customer', 'line_items', 'line_items.data.price.product', 'custom_fields']
        });
      } catch (stripeError: unknown) {
        const error = stripeError as StripeError;
        console.error('❌ Session Stripe introuvable:', error.message);

        
        // Pour les sessions test générées par stripe trigger, on simule l'envoi d'email
        const testEmail = 'test@example.com';
        const testName = 'Client Test';
        const testCourse = {
          type: 'Test Yoga',
          day: 'Test',
          date: new Date().toLocaleDateString('fr-FR'),
          time: '10h00-11h30',
          location: 'Studio Test',
          amount: 15
        };
        

        await sendConfirmationEmail(testEmail, testName, testCourse, session.id);

        return NextResponse.json({ received: true, test: true });
      }

      // Extraire les informations client
      const customer = fullSession.customer as Stripe.Customer;
      const customerEmail = customer?.email || session.customer_details?.email;
      const customerName = fullSession.custom_fields?.find(field => field.key === 'nom_complet')?.text?.value 
                          || customer?.name 
                          || session.customer_details?.name 
                          || 'Client';

      // Extraire les informations du cours depuis les métadonnées
      const metadata = session.metadata || {};
      const courseInfo = {
        type: metadata.course_type || 'Cours de Yoga',
        day: metadata.course_day || '',
        date: metadata.course_date || new Date().toLocaleDateString('fr-FR'),
        time: metadata.course_time || '',
        location: metadata.course_location || '',
        amount: session.amount_total ? (session.amount_total / 100) : 15,
      };

      if (!customerEmail) {
        console.error('❌ Aucun email client trouvé');
        return NextResponse.json({ error: 'Email client manquant' }, { status: 400 });
      }
      
      try {
        await sendConfirmationEmail(customerEmail, customerName, courseInfo, session.id);
      } catch (emailError) {
        console.error('❌ Erreur envoi email:', emailError);
        // Ne pas faire échouer le webhook pour une erreur d'email
      }

    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error);
      return NextResponse.json({ error: 'Erreur lors du traitement' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

// Fonction pour envoyer l'email de confirmation
async function sendConfirmationEmail(
  email: string, 
  name: string, 
  courseInfo: CourseInfo, 
  sessionId: string
) {
  try {
    const emailResult = await resend.emails.send({
      from: 'Devi Yoga Paris <contact@deviyogaparis.fr>', // Même adresse que le formulaire
      to: email,
      subject: `✅ Confirmation de réservation - ${courseInfo.type}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de réservation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f9fc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
            
            <!-- Header avec logo/nom -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #10b981; font-size: 28px; margin: 0;">🧘‍♀️ Devi Yoga Paris</h1>
            </div>

            <!-- Message principal -->
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 30px;">
              <h2 style="color: #065f46; font-size: 24px; margin: 0 0 10px 0;">✅ Réservation confirmée !</h2>
              <p style="color: #047857; font-size: 16px; margin: 0;">Bonjour, votre paiement a été traité avec succès.</p>
            </div>

            <!-- Détails du cours -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #374151; font-size: 20px; margin: 0 0 20px 0;">📅 Détails de votre cours</h3>
              
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #6b7280; width: 120px; display: inline-block;">Cours :</span>
                <span style="color: #111827; font-weight: 600;">${courseInfo.type}</span>
              </div>
              
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #6b7280; width: 120px; display: inline-block;">Date :</span>
                <span style="color: #111827; font-weight: 600;">${courseInfo.day} ${courseInfo.date}</span>
              </div>
              
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #6b7280; width: 120px; display: inline-block;">Horaire :</span>
                <span style="color: #111827; font-weight: 600;">${courseInfo.time}</span>
              </div>
              
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #6b7280; width: 120px; display: inline-block;">Lieu :</span>
                <span style="color: #111827; font-weight: 600;">${courseInfo.location} - Studio Maison Née</span>
              </div>
              
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #6b7280; width: 120px; display: inline-block;">Montant :</span>
                <span style="color: #059669; font-weight: 700; font-size: 18px;">${courseInfo.amount}€</span>
              </div>
            </div>

            <!-- Conseils pratiques -->
            <div style="background-color: #fffbeb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h4 style="color: #92400e; font-size: 16px; margin: 0 0 15px 0;">💡 Conseils pour votre cours</h4>
              <ul style="color: #78350f; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Arrivez 5-10 minutes avant le début</li>
                <li style="margin-bottom: 5px;">Portez des vêtements confortables</li>
                <li style="margin-bottom: 5px;">Le matériel est fourni (tapis, coussins)</li>
              </ul>
            </div>

            <!-- Informations de contact -->
            <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; text-align: center;">
              <h4 style="color: #374151; font-size: 16px; margin: 0 0 15px 0;">Questions ? Contactez-moi</h4>
              <p style="color: #6b7280; margin: 5px 0;">
                📧 <a href="mailto:devi@yogaparis.com" style="color: #10b981; text-decoration: none;">contact@deviyogaparis.fr</a>
              </p>

              <p style="color: #6b7280; margin: 15px 0 0 0;">
                📍 <a href="https://instagram.com/devi_yoga_paris" style="color: #10b981; text-decoration: none;">@devi_yoga_paris</a>
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Numéro de transaction : ${sessionId}
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                © ${new Date().getFullYear()} Devi Yoga Paris 
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    });
    
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error('❌ Erreur envoi email confirmation:', apiError.message);
    throw error;
  }
}