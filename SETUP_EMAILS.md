# 📧 Configuration des emails de confirmation

## 🔧 Étapes de configuration

### 1. **Configuration Resend**
1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine `deviyogaparis.fr` dans Resend
3. Récupérez votre clé API
4. Ajoutez dans `.env.local` :
```
RESEND_API_KEY=re_votre_cle_api_resend
```

### 2. **Configuration Webhook Stripe**
1. Allez dans votre Dashboard Stripe
2. **Developers** → **Webhooks** → **Add endpoint**
3. URL : `https://votre-domaine.com/api/webhook/stripe`
4. Événements à écouter : `checkout.session.completed`
5. Copiez le signing secret
6. Ajoutez dans `.env.local` :
```
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
```

### 3. **Mise à jour de l'email d'expédition**
Dans `/api/webhook/stripe/route.ts`, ligne 67, remplacez :
```javascript
from: 'Devi Yoga <noreply@deviyogaparis.fr>'
```
Par votre domaine vérifié dans Resend.

## ✅ Ce que vous obtenez maintenant

### **Dans Stripe Dashboard :**
- ✅ **Nom complet** visible dans chaque transaction
- ✅ **Champ personnalisé** "nom_complet" collecté
- ✅ **Factures automatiques** générées avec détails
- ✅ **Métadonnées complètes** du cours

### **Emails automatiques :**
- ✅ **Envoi instantané** après paiement réussi
- ✅ **Design professionnel** responsive
- ✅ **Tous les détails** du cours inclus
- ✅ **Conseils pratiques** pour le participant
- ✅ **Informations de contact** facilement accessibles

## 🎯 Informations collectées pour chaque réservation

1. **Nom complet** (champ personnalisé Stripe)
2. **Email** (obligatoire Stripe)
3. **Téléphone** (collecté automatiquement)
4. **Adresse complète** (facturation)
5. **Détails du cours** (type, date, horaire, lieu)
6. **Montant payé**
7. **ID de transaction** Stripe

## 🚀 Test de fonctionnement

1. Faire une réservation test sur votre site
2. Vérifier dans Stripe : **Paiements** → voir le nom dans la transaction
3. Vérifier l'email de confirmation reçu
4. Contrôler les logs de webhook dans Stripe

## 💡 Bonus : Notifications pour vous

Si vous voulez recevoir un email à chaque réservation, ajoutez ceci dans le webhook après l'envoi client :

```javascript
// Email pour vous informer de la nouvelle réservation
await resend.emails.send({
  from: 'Devi Yoga <noreply@deviyogaparis.fr>',
  to: 'votre-email@gmail.com',
  subject: `🔔 Nouvelle réservation - ${courseInfo.type}`,
  html: `<h2>Nouvelle réservation !</h2>
         <p><strong>Client :</strong> ${name}</p>
         <p><strong>Email :</strong> ${customerEmail}</p>
         <p><strong>Cours :</strong> ${courseInfo.type}</p>
         <p><strong>Date :</strong> ${courseInfo.day} ${courseInfo.date}</p>`
});
```