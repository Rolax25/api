const express = require('express');
const router = express.Router();
const dailyContentService = require('../services/dailyContent');
const saintService = require('../services/saintService');
const curiosityService = require('../services/curiosityService');

// Ruta: GET /api/daily - Contenido del día
router.get('/daily', (req, res) => {
  const todayVerse = dailyContentService.getTodayVerse();
  const todayReflection = dailyContentService.getTodayReflection();
  const todayLiturgicalColor = dailyContentService.getTodayLiturgicalColor();

  if (!todayVerse.success) {
    return res.status(404).json({ error: 'Contenido diario no disponible' });
  }

  res.json({
    verse: todayVerse.data,
    reflection: todayReflection?.data,
    liturgicalColor: todayLiturgicalColor,
    date: todayVerse.date
  });
});

// Ruta: GET /api/verse - Versículo del día
router.get('/verse', (req, res) => {
  const todayVerse = dailyContentService.getTodayVerse();

  if (!todayVerse.success) {
    return res.status(404).json({ error: 'Versículo no disponible' });
  }

  res.json({
    verse: todayVerse.data
  });
});

// Ruta: GET /api/reflection - Reflexión del día
router.get('/reflection', (req, res) => {
  const todayReflection = dailyContentService.getTodayReflection();

  if (!todayReflection.success) {
    return res.status(404).json({ error: 'Reflexión no disponible' });
  }

  res.json({
    reflection: todayReflection.data
  });
});

// Ruta: GET /api/saint/today - Santo del día
router.get('/saint/today', (req, res) => {
  const todaySaint = saintService.getTodaySaint();

  if (!todaySaint.success) {
    return res.status(404).json({ error: 'Santo del día no disponible' });
  }

  res.json({
    saint: todaySaint.data
  });
});

// Ruta: GET /api/curiosity - Sabías que...
router.get('/curiosity', (req, res) => {
  const randomCuriosity = curiosityService.getRandomCuriosity();

  if (!randomCuriosity.success) {
    return res.status(404).json({ error: 'Curiosidad no disponible' });
  }

  res.json({
    curiosity: randomCuriosity.data
  });
});

module.exports = router;