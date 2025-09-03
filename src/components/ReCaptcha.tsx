'use client';

import { useEffect, useRef, useCallback } from 'react';

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
    grecaptcha?: {
      render?: (container: string | Element, options: ReCaptchaOptions) => number;
      reset?: (widgetId: number) => void;
      getResponse?: (widgetId: number) => string;
      execute?: (widgetId: number) => void;
      ready?: (callback: () => void) => void;
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
  const initializedRef = useRef(false);

  const initRecaptcha = useCallback(() => {
    if (
      window.grecaptcha?.render && 
      containerRef.current && 
      !widgetIdRef.current && 
      siteKey &&
      !initializedRef.current
    ) {
      try {
        initializedRef.current = true;
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': onExpired,
          theme,
          size,
        });
        console.log('✅ reCAPTCHA initialized successfully');
      } catch (error) {
        console.error('❌ reCAPTCHA initialization error:', error);
        initializedRef.current = false;
        if (onError) onError();
      }
    }
  }, [siteKey, onVerify, onError, onExpired, theme, size]);

  useEffect(() => {
    if (!containerRef.current || !siteKey || initializedRef.current) return;

    // Si le script est déjà chargé
    if (window.grecaptcha?.render) {
      initRecaptcha();
    } else {
      // Attendre que le script soit chargé
      const interval = setInterval(() => {
        if (window.grecaptcha?.render) {
          clearInterval(interval);
          initRecaptcha();
        }
      }, 100);

      return () => clearInterval(interval);
    }

    // Cleanup function
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
          widgetIdRef.current = null;
          initializedRef.current = false;
        } catch (error) {
          console.error('Erreur reset reCAPTCHA:', error);
        }
      }
    };
  }, [initRecaptcha]);

  return <div ref={containerRef} className="recaptcha-container" />;
}