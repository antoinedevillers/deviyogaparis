# 🚀 CHECKLIST PRODUCTION - DEVIYOGAPARIS.FR

## ✅ **SÉCURITÉ**
- [x] Variables d'environnement sécurisées (.env.example créé)
- [x] Headers de sécurité configurés (next.config.mjs)
- [x] Logs de production nettoyés (pas de données sensibles)
- [ ] **À FAIRE:** Configurer clés PRODUCTION Stripe & Resend
- [ ] **À FAIRE:** Supprimer logs de debug en production

## ⚡ **PERFORMANCES**
- [x] Next.js 15 + Turbopack configuré
- [x] Images AVIF optimisées
- [x] Fonts preconnect configuré
- [x] Compression activée
- [x] Headers cache configurés

## 🔍 **SEO & ACCESSIBILITÉ**
- [x] Métadonnées complètes (title, description, OG)
- [x] Structure sémantique HTML
- [x] Robots.txt créé
- [x] Sitemap.xml créé
- [x] Lang="fr" configuré
- [ ] **À FAIRE:** Favicon personnalisé
- [ ] **À FAIRE:** Schema.org (LocalBusiness)

## 📱 **RESPONSIVE**
- [x] Design mobile-first
- [x] Viewport meta configuré
- [x] Classes Tailwind responsive (md:, lg:)
- [x] Images adaptatives

## 🔧 **CONFIGURATION PRODUCTION**

### 1. **Variables d'environnement**
```env
STRIPE_SECRET_KEY=sk_live_... (PRODUCTION)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (PRODUCTION)
NEXT_PUBLIC_URL=https://deviyogaparis.fr
RESEND_API_KEY=re_... (avec domaine vérifié)
STRIPE_WEBHOOK_SECRET=whsec_... (webhook production)
```

### 2. **Webhook Stripe Production**
- Dashboard Stripe → Webhooks
- Endpoint: https://deviyogaparis.fr/api/webhook/stripe
- Events: checkout.session.completed

### 3. **Domaine Resend**
- Vérifier deviyogaparis.fr dans Resend
- Configurer DNS (SPF, DKIM, DMARC)

### 4. **Build & Deploy**
```bash
npm run build
npm start
```

## 🚨 **ACTIONS CRITIQUES AVANT DÉPLOIEMENT**

1. **Remplacer toutes les URLs de test:**
   - localhost → deviyogaparis.fr
   - URLs canoniques dans layout.tsx

2. **Nettoyer les logs de développement:**
   - Supprimer console.log sensibles
   - Garder uniquement les logs d'erreur

3. **Tester le paiement en mode LIVE:**
   - Petite transaction test
   - Vérifier réception email

4. **Configurer le monitoring:**
   - Logs d'erreur
   - Alertes Stripe
   - Monitoring Resend

## 📊 **MÉTRIQUES À SURVEILLER**
- Core Web Vitals (LCP, FID, CLS)
- Taux de conversion paiement
- Délivrabilité emails
- Erreurs 4xx/5xx

## 🎯 **OPTIMISATIONS FUTURES**
- [ ] Analytics (GA4 ou Plausible)
- [ ] Cache Redis pour sessions
- [ ] CDN pour images statiques
- [ ] Lazy loading composants lourds