// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products -> retourne tous les produits
router.get('/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(rows);
  });
});

module.exports = router;
