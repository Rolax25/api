const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const contentRoutes = require('../src/routes/contentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// REQUEST LOGGING MIDDLEWARE
// ============================================
app.use((req, res, next) => {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log('\n🔔 ============================================');
  console.log(`📥 REQUEST [${requestId}]`);
  console.log(`   Method: ${req.method}`);
  console.log(`   URL: ${req.originalUrl}`);
  console.log(`   IP: ${req.ip || req.connection.remoteAddress}`);
  console.log(`   User-Agent: ${req.get('User-Agent') || 'N/A'}`);
  console.log(`   Origin: ${req.get('Origin') || 'N/A'}`);
  console.log(`   Content-Type: ${req.get('Content-Type') || 'N/A'}`);
  
  // Log request body (limit size to avoid huge logs)
  if (Object.keys(req.body || {}).length > 0) {
    console.log(`   Body: ${JSON.stringify(req.body).substring(0, 500)}`);
  }
  console.log('-----------------------------------------------');
  
  // Capture response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log('\n🔔 ============================================');
    console.log(`📤 RESPONSE [${requestId}]`);
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Duration: ${duration}ms`);
    console.log(`   Content-Type: ${res.get('Content-Type') || 'N/A'}`);
    
    // Log response body (limit size)
    if (body) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      console.log(`   Body: ${bodyStr.substring(0, 500)}${bodyStr.length > 500 ? '...' : ''}`);
    }
    console.log('-----------------------------------------------\n');
    
    return originalSend.call(this, body);
  };
  
  next();
});

// ============================================
// CORS CONFIGURATION WITH DEBUGGING
// ============================================
const corsOptions = {
  origin: function(origin, callback) {
    console.log(`🌐 CORS Check - Origin: ${origin || 'undefined (no origin header)'}`);
    
    // Allow all origins in development, restrict in production
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8080',
      'https://apisiloe.vercel.app',
      'exp://localhost:19000',  // Expo development
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      console.log('   ✅ CORS: Allowing request with no origin header');
      callback(null, true);
      return;
    }
    
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
      console.log('   ✅ CORS: Origin explicitly allowed');
      callback(null, true);
    } else {
      // In development, allow all origins
      console.log('   ⚠️  CORS: Origin not in whitelist, allowing anyway (dev mode)');
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Type', 'Content-Length'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta principal API
app.use('/api', contentRoutes);

// ============================================
// HEALTH CHECK ENDPOINT (útil para Flutter)
// ============================================
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();
  
  console.log('🏥 Health check requested');
  
  res.json({
    status: 'ok',
    uptime: `${Math.floor(uptime)}s`,
    timestamp: new Date().toISOString(),
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
    },
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    message: 'API Siloe está funcionando correctamente'
  });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  console.log('👋 Welcome endpoint hit');
  res.json({
    name: 'API Siloe',
    version: '1.0.0',
    status: 'online',
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
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err, req, res, next) => {
  console.error('\n❌ ============================================');
  console.error(`❌ ERROR en ${req.method} ${req.originalUrl}`);
  console.error(`❌ Message: ${err.message}`);
  console.error(`❌ Stack: ${err.stack}`);
  console.error('============================================\n');
  
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for API routes
app.use((req, res) => {
  console.warn(`⚠️  404 - Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      '/health',
      '/api/daily',
      '/api/verse',
      '/api/reflection',
      '/api/saint/today',
      '/api/curiosity'
    ]
  });
});

app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log(`✅ API Siloe corriendo en http://localhost:${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Iniciado: ${new Date().toISOString()}`);
  console.log('📚 Endpoints disponibles:');
  console.log('   - GET  /health');
  console.log('   - GET  /api/daily');
  console.log('   - GET  /api/verse');
  console.log('   - GET  /api/reflection');
  console.log('   - GET  /api/saint/today');
  console.log('   - GET  /api/curiosity');
  console.log('============================================\n');
});

module.exports = app;
