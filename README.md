🚀 Cap Jersey Store

Site e-commerce de casquettes & maillots (foot & basket), parfois signés

Projet réalisé dans le cadre du module Coder avec l’IA Générative
Développé par Christiana Bassouaka & son binôme.

📌 Présentation

Cap Jersey Store est une application e-commerce permettant :

d’afficher des produits (casquettes, maillots foot/basket),

de filtrer par type, sport et articles signés,

de consulter les détails d’un produit,

d’ajouter/retirer du panier,

de mettre à jour le stock automatiquement,

de remplir un formulaire de commande,

de valider une commande avec récapitulatif.

Le projet utilise une architecture Backend + Frontend moderne, entièrement développée par nos soins.

🛠️ Technologies utilisées
Frontend

React.js (Create-React-App)

CSS (custom design)

Fetch API (communication avec le backend)

Backend

Node.js

Express.js

SQLite3 (base de données locale)

REST API

Outils

Git & GitHub

VS Code

PowerShell / Terminal

📁 Structure du projet
Cap_jersey_store/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │    └── productRoutes.js
│   └── ecommerce.db (auto-généré)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │    ├── App.js
│   │    ├── App.css
│   │    ├── index.js
│   │    └── index.css
│   └── package.json
│
└── README.md

⚙️ Installation & lancement du projet
1️⃣ Cloner le projet
git clone https://github.com/Belvinabmc/cap_jersey_store.git
cd cap_jersey_store

🔧 Backend (Node.js + SQLite)
cd backend
npm install
node server.js


➡️ Le backend démarre sur :
http://localhost:5000

🎨 Frontend (React)

Dans un autre terminal :

cd frontend
npm install
npm start


➡️ Le frontend démarre sur :
http://localhost:3000

🚀 Fonctionnalités principales
🛍️ Produits

Affichage des casquettes & maillots

Images, équipes, sports, prix, tailles

Détails du joueur (si signé ou non)

🔎 Filtres

Par type : Casquette / Maillot

Par sport : Foot / Basket

Par signature : Signé / Non signé

🛒 Panier

Ajouter un produit

Retirer un produit

Mise à jour du stock en temps réel

Calcul automatique du total

Nombre total d’articles

🧾 Commande

Formulaire client :

Nom

Email

Adresse

CP + Ville

Mode de paiement

Validation de commande

Message récapitulatif complet

🧠 Architecture API (Backend)
Endpoint principal :
✔ GET — /api/products

Retourne tous les produits :

[
  {
    "id": 1,
    "name": "Casquette Lakers Jaune",
    "price": 29.99,
    "stock": 15
  }
]

📝 Améliorations possibles (Roadmap)

Page Admin (CRUD produits)

Authentification client (register/login)

Paiement simulé sécurisé

Stock synchronisé dans la base (pas seulement côté frontend)

Interface plus design (header, slider, animations)

👩🏽‍💻 Auteurs

Christiana Bassouaka
Développeuse Full-Stack Junior
(EPSI Paris)

Et binôme de projet 🎓

🏁 Conclusion

Ce projet nous a permis de :

manipuler une API REST

gérer un backend Node/Express

créer une interface React dynamique

intégrer Git/GitHub pour travailler en équipe

simuler les fonctionnalités essentielles d’un site e-commerce moderne
