const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contentRoutes = require('./src/routes/contentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.use('/api', contentRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    name: 'API Siloe',
    version: '1.0.0',
    endpoints: {
      'Contenido del día': '/api/daily',
      'Santo del día': '/api/saint/today',
      'Sabías que...': '/api/curiosity',
      'Reflexión del día': '/api/reflection',
      'Versículo del día': '/api/verse'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ API Siloe corriendo en http://localhost:${PORT}`);
});