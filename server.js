const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const contentRoutes = require('./src/routes/contentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal API
app.use('/api', contentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    name: 'API Siloe',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      daily: '/api/daily',
      verse: '/api/verse',
      reflection: '/api/reflection',
      saint: '/api/saint/today',
      curiosity: '/api/curiosity'
    }
  });
});

// Ruta para servir el frontend HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Solo iniciar el servidor si se ejecuta directamente (no en Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ API Siloe corriendo en http://localhost:${PORT}`);
  });
}

// Exportar la app para Vercel
module.exports = app;