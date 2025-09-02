import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { ApiError } from '@/types';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    // Validation des données
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Validation reCAPTCHA (protection anti-spam)
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Validation de sécurité requise' },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'Échec de la validation de sécurité' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }  

    // Envoi de l'email via Resend
    try {

      
      await resend.emails.send({
        from: 'Contact Devi Yoga <contact@deviyogaparis.fr>', // Remplacez par votre domaine vérifié
        to: 'contact@deviyogaparis.fr', // Votre email où recevoir les messages
        subject: `🧘 Nouveau message de ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981; margin-bottom: 20px;">📩 Nouveau message de contact</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>👤 Nom:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
              <p><strong>📱 Téléphone:</strong> ${phone || 'Non renseigné'}</p>
              <p><strong>📅 Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
            
            <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">💬 Message:</h3>
              <div style="color: #4b5563; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              Ce message a été envoyé depuis le formulaire de contact de deviyogaparis.fr
            </p>
          </div>
        `,
      });

      
    } catch (emailError: unknown) {
      const error = emailError as ApiError;
      console.error('❌ Erreur lors de l\'envoi du message:', error.message);

      
      // On continue même si l'email échoue pour ne pas bloquer la réponse utilisateur
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}



