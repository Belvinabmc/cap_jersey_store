// db.js - Gestion de la base SQLite

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Création / ouverture de la base
const dbPath = path.resolve(__dirname, 'ecommerce.db');
const db = new sqlite3.Database(dbPath);

// Création de la table products si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,        
      sport TEXT,                
      team TEXT,
      player TEXT,
      signed INTEGER DEFAULT 0,  
      description TEXT,
      price REAL NOT NULL,
      sizes TEXT,                
      stock INTEGER DEFAULT 0,
      imageUrl TEXT
    )
  `);

  // Vérifier si des produits existent déjà
  db.get('SELECT COUNT(*) AS count FROM products', (err, row) => {
    if (err) {
      console.error('Erreur lors de la vérification des produits :', err);
      return;
    }

    if (row.count === 0) {
      console.log('Insertion de produits de test...');

      const insert = db.prepare(`
        INSERT INTO products
        (name, type, sport, team, player, signed, description, price, sizes, stock, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      // Casquette
      insert.run(
        'Casquette Lakers Jaune',
        'casquette',
        'basket',
        'Los Angeles Lakers',
        null,
        0,
        'Casquette officielle Lakers couleur jaune.',
        29.99,
        null,
        15,
        'https://example.com/casquette-lakers.jpg'
      );

      // Maillot PSG
      insert.run(
        'Maillot PSG Domicile 2024',
        'maillot',
        'foot',
        'Paris Saint-Germain',
        null,
        0,
        'Maillot PSG saison 2024 domicile.',
        89.99,
        'S,M,L,XL',
        20,
        'https://example.com/maillot-psg.jpg'
      );

      // Maillot LeBron signé
      insert.run(
        'Maillot LeBron James signé',
        'maillot',
        'basket',
        'Los Angeles Lakers',
        'LeBron James',
        1,
        'Maillot signé par LeBron James (édition limitée).',
        249.99,
        'M,L',
        5,
        'https://example.com/lebron-signe.jpg'
      );

      insert.finalize();
    }
  });
});

module.exports = db;
