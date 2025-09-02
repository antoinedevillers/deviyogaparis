'use client';

import { useState } from 'react';
import ReCaptcha from './ReCaptcha';

export default function ContactForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  console.log('siteKey:', siteKey);
  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        
        if (!recaptchaToken) {
          alert('Veuillez valider le captcha de sécurité.');
          return;
        }

        setIsSubmitting(true);
        const form = e.currentTarget as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form));
        
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...data,
              recaptchaToken
            }),
          });
          
          const result = await response.json();
          
          if (response.ok) {
            alert('Merci ! Votre message a été envoyé.');
            form.reset();
            setRecaptchaToken(null);
          } else {
            alert(result.error || 'Une erreur est survenue.');
          }
        } catch {
          alert('Une erreur est survenue. Réessayez plus tard.');
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-gray-700">
          Nom
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        />
      </div>
      <div className="md:col-span-2 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        />
      </div>
      
      {/* Google reCAPTCHA */}
      <div className="md:col-span-2 flex justify-center">
        {siteKey && (
          <ReCaptcha
            siteKey={siteKey}
            onVerify={(token) => setRecaptchaToken(token)}
            onError={() => setRecaptchaToken(null)}
            onExpired={() => setRecaptchaToken(null)}
            theme="light"
            size="normal"
          />
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting || (!recaptchaToken && !!siteKey)}
          className={`w-full md:w-auto inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm md:text-base font-medium transition-colors
            ${isSubmitting || (!recaptchaToken && !!siteKey)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-emerald-300 text-gray-900 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400'
            }`}
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </form>
  );
}