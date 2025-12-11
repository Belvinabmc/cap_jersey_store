# 🧢 Cap Jersey Store

Cap Jersey Store est une application e-commerce permettant d’acheter des casquettes et des maillots de sport (football & basketball).  
Elle inclut un catalogue de produits, un système de filtres, un panier dynamique, un formulaire de commande et un design moderne.

Ce projet est réalisé dans le cadre du module :  
**« Coder avec l’IA Générative » — EPSI Paris**

---

## 🎯 Objectifs du projet

- Développer une application web full-stack complète  
- Apprendre à structurer un backend API REST  
- Connecter un frontend React à une base SQLite  
- Gérer un panier dynamique sans rafraîchissement  
- Créer une interface moderne : slider, filtres, produits, modal  
- Utiliser une IA pour accélérer et structurer le développement  

---

## 🛠️ Stack technique

| Côté | Technologie | Rôle |
|------|-------------|------|
| Frontend | **React.js** | Interface dynamique (produits, filtres, panier) |
| Style | **CSS** | Design moderne |
| Backend | **Node.js + Express** | API REST /products |
| Base | **SQLite3** | Stockage local des produits |
| Versioning | **Git & GitHub** | Collaboration & suivi |

---

## 📐 Architecture du projet



cap_jersey_store/
├── backend/
│ ├── server.js
│ ├── db.js
│ └── routes/productRoutes.js
└── frontend/
├── src/App.js
├── src/App.css
└── src/index.js


---

## ▶️ Installation & Exécution

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/Belvinabmc/cap_jersey_store.git
cd cap_jersey_store

2️⃣ Lancer le backend (API)
cd backend
npm install
node server.js


➡️ Serveur API sur : http://localhost:5000/api/products

3️⃣ Lancer le frontend (React)
cd ../frontend
npm install
npm start


➡️ Interface visible sur : http://localhost:3000

✨ Fonctionnalités
🎞️ Slider dynamique

3 images NBA

Transition automatique et manuelle

Texte + tag intégrés

📍 Catalogue produits

Affichage dynamique depuis l’API

Maillots + casquettes

Stock en temps réel

Badge “Signé” pour les produits premium

🎯 Filtrage intelligent

Type : casquette / maillot

Sport : foot / basket

Signature : signé / non signé

🛒 Panier (header)

Ajouter / retirer un produit

Stock réduit / augmenté automatiquement

Total mis à jour en direct

Panier ouvert depuis le header

📝 Formulaire de commande

Nom, Email, Adresse, Ville, Code Postal, Paiement

Récapitulatif final généré automatiquement

Panier vidé après validation

🔮 Améliorations futures

Authentification client

Espace admin avec gestion des produits

Paiement sécurisé (Stripe)

Stock géré en base + multi-utilisateurs

Sauvegarde du panier dans le navigateur

👤 Équipe

Projet développé par :

Christiana Bassouaka
Selma Hadj Khelifa

EPSI Paris — Promotion 2025
Module : Coder avec l’IA Générative

🤖 PROMPT IA — POUR RECRÉER L’APPLICATION AVEC UNE IA

Voici le prompt à utiliser tel quel pour permettre à quelqu’un d’autre de refaire exactement la même application grâce à l’IA.

📌 PROMPT À COPIER :
Tu es une IA experte en développement web full-stack (Node.js / Express / SQLite / React).

Je veux que tu m’aides à recréer exactement l’application "Cap Jersey Store".

Elle doit permettre :
- d’afficher un catalogue de maillots et casquettes,
- de filtrer les produits (type, sport, signature),
- d’ajouter/retirer des articles du panier,
- de décrémenter le stock à chaque ajout,
- d’afficher un slider NBA sur la page d’accueil,
- d’ouvrir une modal avec les détails d’un produit,
- de valider une commande avec un formulaire complet,
- d’afficher un récapitulatif détaillé,
- d’avoir un bouton Panier dans le header.

Tu dois produire :

1️⃣ Structure complète du projet :
cap_jersey_store/
 ├── backend/
 │    ├── server.js
 │    ├── db.js
 │    └── routes/productRoutes.js
 └── frontend/
      ├── src/App.js
      ├── src/App.css
      └── src/index.js

2️⃣ Backend Express :
- route GET /api/products
- base SQLite avec champs :
  id, name, type, sport, team, player, price, stock, signed, imageUrl
- insertion automatique de données de test (PSG, Lakers, Curry, LeBron…)

3️⃣ Frontend React :
- Header avec logo CJS + bouton Panier (badge de quantité)
- Filtres intégrés dans le header
- Slider de 3 images NBA (défilement auto + boutons)
- Catalogue produits en cartes
- Modal détails
- Panier avec quantités dynamiques
- Formulaire de finalisation de commande
- Gestion du stock en direct

4️⃣ Design :
- Thème beige / gris clair
- Cartes modernes
- Boutons arrondis
- Slider responsive
- Panier en overlay

5️⃣ Donne-moi aussi :
- Les commandes pour lancer backend et frontend
- La base SQLite complète
- Le code final prêt à coller dans un projet réel
- Des explications étape par étape

Le code doit être complet, clair, commenté et totalement fonctionnel.
