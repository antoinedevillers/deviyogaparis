'use client';

import { useEffect, useRef } from 'react';

interface ReCaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
}

interface ReCaptchaOptions {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: string | Element, options: ReCaptchaOptions) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
      execute: (widgetId: number) => void;
    };
  }
}

export default function ReCaptcha({
  siteKey,
  onVerify,
  onError,
  onExpired,
  theme = 'light',
  size = 'normal'
}: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fonction pour initialiser reCAPTCHA
    const initRecaptcha = () => {
      if (window.grecaptcha && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': onExpired,
          theme,
          size,
        });
      }
    };

    // Si le script est déjà chargé
    if (window.grecaptcha) {
      initRecaptcha();
    } else {
      // Attendre que le script soit chargé
      const interval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(interval);
          initRecaptcha();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [siteKey, onVerify, onError, onExpired, theme, size]);

  return <div ref={containerRef} className="g-recaptcha" />;
}