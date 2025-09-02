# 🧘‍♀️ Devi Yoga Paris - Site Web

Site web professionnel pour Devi, professeure de yoga à Paris et ses alentours. Plateforme complète avec réservation et paiement en ligne, développée avec Next.js 15 et TypeScript.

## ✨ Fonctionnalités

- **🎨 Design moderne** : Interface élégante responsive (mobile-first)
- **💳 Paiements sécurisés** : Intégration Stripe avec checkout complet
- **📧 Emails automatiques** : Confirmations de réservation via Resend
- **🛡️ Anti-spam** : Protection reCAPTCHA sur formulaires
- **📅 Planning interactif** : Réservation en ligne avec paiement
- **🔍 SEO optimisé** : Meta tags, sitemap, robots.txt
- **⚡ Performance** : Next.js 15 avec optimisations production
- **🎯 TypeScript** : Code type-safe et maintenable

## 🏗️ Tech Stack

- **Framework** : Next.js 15 (App Router) + TypeScript
- **Styling** : Tailwind CSS v4
- **Paiements** : Stripe (checkout + webhooks)
- **Emails** : Resend (confirmations automatiques)
- **Sécurité** : Google reCAPTCHA + headers sécurisés
- **Typographie** : Google Fonts (Lato + Playfair Display)

## 🚀 Installation

1. **Clonez le projet**
   ```bash
   git clone <repository-url>
   cd deviyogaparis
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement**
   ```bash
   cp .env.example .env.local
   # Éditez .env.local avec vos clés API
   ```

4. **Lancez le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrez votre navigateur**
   Accédez à [http://localhost:3002](http://localhost:3002)

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/contact/        # API route pour le formulaire
│   ├── globals.css         # Styles globaux
│   ├── layout.tsx          # Layout principal avec SEO
│   └── page.tsx           # Page d'accueil
└── components/
    ├── Button.tsx          # Composant bouton réutilisable
    ├── Section.tsx         # Wrapper de section
    ├── Hero.tsx           # Section hero avec image
    ├── ParisSection.tsx    # Section cours Paris
    ├── VincennesSection.tsx # Section cours Vincennes
    ├── TeacherSection.tsx  # Présentation professeur
    ├── YogaStylesSection.tsx # Types de yoga
    ├── PlanningSection.tsx # Planning interactif
    ├── PrivateLessonsSection.tsx # Cours particuliers
    ├── TestimonialsSection.tsx # Témoignages
    ├── FAQSection.tsx      # Questions fréquentes
    ├── ContactSection.tsx  # Formulaire de contact
    └── Footer.tsx         # Pied de page
```

## 🎯 Sections du site

1. **Hero** - Image plein écran avec titre principal
2. **Cours Paris** - Contenu SEO optimisé pour Paris
3. **Cours Vincennes** - Contenu SEO optimisé pour Vincennes
4. **Professeur** - Présentation de Devi
5. **Styles de Yoga** - Types de yoga proposés
6. **Planning** - Tableau des cours avec réservation
7. **Cours particuliers** - Services personnalisés
8. **Témoignages** - Avis clients
9. **FAQ** - Questions/réponses SEO-friendly
10. **Contact** - Formulaire fonctionnel + informations

## 🔧 Configuration

### Variables d'environnement requises
```bash
# Stripe (paiements)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (emails)
RESEND_API_KEY=re_...

# reCAPTCHA (anti-spam)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# URL de l'application
NEXT_PUBLIC_URL=https://votre-domaine.com
```

Consultez les guides de configuration :
- [Configuration reCAPTCHA](./RECAPTCHA_SETUP.md)
- [Checklist Production](./PRODUCTION_CHECKLIST.md)

## 🚀 Déploiement

### Production
```bash
# Build de production
npm run build

# Lancer en production  
npm start
```

### Vercel
1. **Connectez votre repository GitHub à Vercel**
2. **Configurez les variables d'environnement** dans le dashboard Vercel
3. **Le site se déploie automatiquement**

Ou en ligne de commande :
```bash
npx vercel --prod
```

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `src/app/globals.css` :
```css
:root {
  --background: #fef9f3;    /* Beige clair */
  --foreground: #2d3748;    /* Gris foncé */
  --green-primary: #10b981; /* Vert principal */
  --beige: #f7f3f0;         /* Beige section */
}
```

### Typographie
Changez les polices Google Fonts dans `globals.css`

### Contenu
Adaptez le contenu dans chaque composant selon vos besoins.

## 📈 SEO Optimizations

- ✅ Meta title et description optimisés
- ✅ Balises H1, H2 structurées
- ✅ Alt text sur toutes les images  
- ✅ URL canonical
- ✅ Open Graph et Twitter Cards
- ✅ Contenu riche en mots-clés locaux
- ✅ FAQ avec questions SEO-friendly
- ✅ Structure JSON-LD (peut être ajoutée)

## 🤝 Support

Pour toute question sur le développement, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

---

**Développé avec ❤️ pour Devi Yoga Paris**