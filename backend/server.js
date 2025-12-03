const express = require('express');
const cors = require('cors');
require('./db'); // initialise la base et les produits de test
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API e-commerce casquettes/maillots OK 🚀' });
});

// Routes produits sous /api
app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
