# 🧘‍♀️ Devi Yoga Paris - Site Web

Site web moderne et responsive pour Devi, professeure de yoga à Paris et Vincennes. Une landing page SEO-optimisée développée avec Next.js 14 et Tailwind CSS.

## ✨ Fonctionnalités

- **🎨 Design moderne** : Interface élégante avec couleurs douces et typographie soignée
- **📱 Responsive** : Optimisé pour tous les appareils (mobile-first)
- **⚡ Performance** : Next.js 14 avec App Router pour des performances optimales
- **🔍 SEO-friendly** : Optimisé pour les moteurs de recherche avec meta tags complets
- **📅 Planning interactif** : Système de réservation en ligne
- **✉️ Formulaire de contact** : API route fonctionnelle pour les messages
- **🎯 One-page** : Navigation fluide avec ancres
- **🌐 Déployable sur Vercel** : Configuration prête pour la production

## 🏗️ Tech Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **Typographie** : Google Fonts (Lato + Playfair Display)
- **Déploiement** : Vercel
- **Language** : TypeScript

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

3. **Lancez le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrez votre navigateur**
   Accédez à [http://localhost:3000](http://localhost:3000)

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

### Formulaire de contact
Le formulaire utilise une API route Next.js (`/api/contact`). Pour la production, intégrez votre service d'email préféré :
- Resend
- SendGrid  
- Nodemailer
- Mailgun

### Images
Remplacez les images Unsplash par vos propres photos dans le dossier `public/images/`

### SEO
Modifiez les meta tags dans `src/app/layout.tsx` selon vos besoins.

## 🚀 Déploiement sur Vercel

1. **Connectez votre repository GitHub à Vercel**
2. **Les variables d'environnement sont optionnelles** (pour la démo)
3. **Le site se déploie automatiquement** grâce à la configuration `vercel.json`

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