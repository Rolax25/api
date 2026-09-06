const express = require('express');
const router = express.Router();
const dailyContentService = require('../services/dailyContent');
const saintService = require('../services/saintService');
const curiosityService = require('../services/curiosityService');

// Helper para logging
function logRequest(endpoint, data = null) {
  console.log(`\n📡 [${endpoint}]`);
  console.log(`   Query params: ${JSON.stringify(data || {})}`);
  console.log(`   Time: ${new Date().toISOString()}`);
}

// ============================================
// Ruta: GET /api/daily - Contenido del día
// ============================================
router.get('/daily', (req, res) => {
  logRequest('/api/daily', req.query);
  
  try {
    const todayVerse = dailyContentService.getTodayVerse();
    const todayReflection = dailyContentService.getTodayReflection();
    const todayLiturgicalColor = dailyContentService.getTodayLiturgicalColor();
    const todaySaint = saintService.getTodaySaint();
    const randomCuriosity = curiosityService.getRandomCuriosity();

    console.log('📊 Daily content result:', {
      hasVerse: todayVerse.success,
      hasReflection: todayReflection?.success,
      hasLiturgicalColor: todayLiturgicalColor.success,
      hasSaint: todaySaint.success,
      hasCuriosity: randomCuriosity.success
    });

    if (!todayVerse.success) {
      console.log('❌ /api/daily - Verse not found');
      return res.status(404).json({ error: 'Contenido diario no disponible' });
    }

    const response = {
      verse: todayVerse.data,
      reflection: todayReflection?.data,
      saint: todaySaint.success ? todaySaint.data : null,
      curiosity: randomCuriosity.success ? randomCuriosity.data : null,
      liturgicalColor: todayLiturgicalColor,
      date: todayVerse.date
    };
    
    console.log('✅ /api/daily - Success');
    res.json(response);
  } catch (error) {
    console.error('❌ /api/daily - Error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Error interno al obtener contenido diario' });
  }
});

// ============================================
// Ruta: GET /api/verse - Versículo del día
// ============================================
router.get('/verse', (req, res) => {
  logRequest('/api/verse', req.query);
  
  try {
    const todayVerse = dailyContentService.getTodayVerse();

    console.log('📊 Verse result:', {
      success: todayVerse.success,
      date: todayVerse.date,
      hasText: !!todayVerse.data
    });

    if (!todayVerse.success) {
      console.log('❌ /api/verse - Verse not found');
      return res.status(404).json({ error: 'Versículo no disponible' });
    }

    const response = {
      verse: todayVerse.data
    };
    
    console.log('✅ /api/verse - Success');
    res.json(response);
  } catch (error) {
    console.error('❌ /api/verse - Error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Error interno al obtener versículo' });
  }
});

// ============================================
// Ruta: GET /api/reflection - Reflexión del día
// ============================================
router.get('/reflection', (req, res) => {
  logRequest('/api/reflection', req.query);
  
  try {
    const todayReflection = dailyContentService.getTodayReflection();

    console.log('📊 Reflection result:', {
      success: todayReflection.success,
      date: todayReflection.date
    });

    if (!todayReflection.success) {
      console.log('❌ /api/reflection - Reflection not found');
      return res.status(404).json({ error: 'Reflexión no disponible' });
    }

    const response = {
      reflection: todayReflection.data
    };
    
    console.log('✅ /api/reflection - Success');
    res.json(response);
  } catch (error) {
    console.error('❌ /api/reflection - Error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Error interno al obtener reflexión' });
  }
});

// ============================================
// Ruta: GET /api/saint/today - Santo del día
// ============================================
router.get('/saint/today', (req, res) => {
  logRequest('/api/saint/today', req.query);
  
  try {
    const todaySaint = saintService.getTodaySaint();

    console.log('📊 Saint result:', {
      success: todaySaint.success,
      saintName: todaySaint.data?.name,
      date: todaySaint.date
    });

    if (!todaySaint.success) {
      console.log('❌ /api/saint/today - Saint not found');
      return res.status(404).json({ error: 'Santo del día no disponible' });
    }

    const response = {
      saint: todaySaint.data
    };
    
    console.log('✅ /api/saint/today - Success');
    res.json(response);
  } catch (error) {
    console.error('❌ /api/saint/today - Error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Error interno al obtener santo' });
  }
});

// ============================================
// Ruta: GET /api/curiosity - Sabías que...
// ============================================
router.get('/curiosity', (req, res) => {
  logRequest('/api/curiosity', req.query);
  
  try {
    const randomCuriosity = curiosityService.getRandomCuriosity();

    console.log('📊 Curiosity result:', {
      success: randomCuriosity.success,
      hasText: !!randomCuriosity.data?.text
    });

    if (!randomCuriosity.success) {
      console.log('❌ /api/curiosity - Curiosity not found');
      return res.status(404).json({ error: 'Curiosidad no disponible' });
    }

    const response = {
      curiosity: randomCuriosity.data
    };
    
    console.log('✅ /api/curiosity - Success');
    res.json(response);
  } catch (error) {
    console.error('❌ /api/curiosity - Error:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Error interno al obtener curiosidad' });
  }
});

module.exports = router;