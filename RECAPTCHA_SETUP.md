# 🔒 CONFIGURATION GOOGLE reCAPTCHA

## ⚡ **ÉTAPES D'INSTALLATION**

### **1. Créer une clé reCAPTCHA**
1. Allez sur [www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"+"** pour créer un nouveau site

### **2. Configurer le site**
1. **Nom du site** : `Devi Yoga Paris`
2. **Type de reCAPTCHA** : 
   - **reCAPTCHA v2** → `"Je ne suis pas un robot"` (recommandé)
   - **reCAPTCHA v3** → Score-based (plus avancé)
3. **Domaines** : 
   - `localhost` (développement)
   - `deviyogaparis.fr` (production)
4. **Propriétaires** : Votre email
5. ✅ **Accepter les conditions**

### **3. Récupérer les clés**
Après création, vous obtiendrez :
- **Site Key** (publique) : `6Lc...AAAA`
- **Secret Key** (privée) : `6Lc...AAAA` 

### **4. Mettre à jour .env.local**
```bash
# Remplacez les clés test par vos vraies clés
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_VOTRE_SITE_KEY_AAAA
RECAPTCHA_SECRET_KEY=6Lc_VOTRE_SECRET_KEY_AAAA
```

### **5. En production (.env sur serveur)**
```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_PRODUCTION_SITE_KEY_AAAA
RECAPTCHA_SECRET_KEY=6Lc_PRODUCTION_SECRET_KEY_AAAA
```

## ✅ **CONFIGURATION ACTUELLE**

### **Clés de test utilisées :**
- ✅ Site Key : `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- ✅ Secret Key : `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`
- ✅ **Ces clés passent TOUJOURS** (pour les tests)

### **Fonctionnalités implémentées :**
- ✅ **Composant reCAPTCHA** réutilisable (v2)
- ✅ **Validation côté client** (token requis)
- ✅ **Validation côté serveur** (vérification Google)
- ✅ **État de chargement** et feedback utilisateur
- ✅ **Gestion d'erreurs** et expiration
- ✅ **Reset automatique** après soumission

## 🚀 **FONCTIONNEMENT**

### **Processus de validation :**
1. L'utilisateur remplit le formulaire
2. reCAPTCHA affiche "Je ne suis pas un robot"
3. L'utilisateur coche la case (+ éventuel défi)
4. reCAPTCHA génère un token de validation
5. Le bouton s'active uniquement si token valide
6. Côté serveur : vérification auprès de Google
7. Email envoyé seulement si validation réussie

### **Protection contre :**
- 🚫 **Bots automatisés**
- 🚫 **Spam massif** 
- 🚫 **Attaques par force brute**
- 🚫 **Soumissions malveillantes**
- 🚫 **Scraping de formulaires**

## 🎯 **AVANTAGES reCAPTCHA**

- ✅ **Gratuit** (limite élevée)
- ✅ **Fiable** et reconnu mondialement
- ✅ **Facile à implémenter**
- ✅ **Support multi-langues**
- ✅ **Analytics** dans Google Admin
- ✅ **Protection robuste** contre les bots

## 🔧 **TYPES DE DÉFIS**

### **reCAPTCHA v2 (implémenté)**
- ☑️ **Checkbox** : "Je ne suis pas un robot"
- 🖼️ **Image challenges** : Sélectionner voitures, feux, etc.
- 🔊 **Audio challenges** : Pour accessibilité

### **reCAPTCHA v3 (alternative)**
- 📊 **Score-based** : 0.0 (bot) à 1.0 (humain)
- 👻 **Invisible** : Aucune interaction utilisateur
- 🤖 **IA avancée** : Analyse comportementale

## 🎯 **PRÊT À L'EMPLOI**

Le formulaire fonctionne **immédiatement** avec les clés de test Google.

**Pour activer en production** :
1. Créer compte Google reCAPTCHA
2. Configurer domaine `deviyogaparis.fr`
3. Remplacer les clés dans `.env`

**Temps d'installation** : 3 minutes maximum !

## 📊 **MONITORING**

Une fois en production, vous pourrez voir :
- **Statistiques d'usage** sur Google Admin
- **Tentatives bloquées** par jour/semaine  
- **Score de protection** de votre site