const contentService = require('../services/contentService');

const getDailyContent = async (req, res) => {
  try {
    const content = await contentService.getDailyContent();
    res.json(content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener contenido diario',
      message: error.message 
    });
  }
};

const getSaintOfToday = async (req, res) => {
  try {
    const saint = await contentService.getSaintOfToday();
    res.json(saint);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener el santo del día',
      message: error.message 
    });
  }
};

const getCuriosity = async (req, res) => {
  try {
    const curiosity = await contentService.getCuriosity();
    res.json(curiosity);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener curiosidad',
      message: error.message 
    });
  }
};

const getReflection = async (req, res) => {
  try {
    const reflection = await contentService.getReflection();
    res.json(reflection);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener reflexión',
      message: error.message 
    });
  }
};

const getVerse = async (req, res) => {
  try {
    const verse = await contentService.getVerse();
    res.json(verse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener versículo',
      message: error.message 
    });
  }
};

module.exports = {
  getDailyContent,
  getSaintOfToday,
  getCuriosity,
  getReflection,
  getVerse
};