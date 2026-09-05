const saints = require('../data/saints');

/**
 * Get today's saint based on day of year
 */
function getTodaySaint() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const saintIndex = dayOfYear % saints.length;
  
  return {
    success: true,
    data: saints[saintIndex],
    date: formatDate(today)
  };
}

/**
 * Get a saint by ID
 */
function getSaintById(id) {
  const saint = saints.find(s => s.id === parseInt(id));
  
  if (saint) {
    return {
      success: true,
      data: saint
    };
  }
  
  return {
    success: false,
    message: 'Saint not found'
  };
}

/**
 * Get a saint by slug
 */
function getSaintBySlug(slug) {
  const saint = saints.find(s => s.slug === slug);
  
  if (saint) {
    return {
      success: true,
      data: saint
    };
  }
  
  return {
    success: false,
    message: 'Saint not found'
  };
}

/**
 * Get all saints
 */
function getAllSaints() {
  return {
    success: true,
    count: saints.length,
    data: saints
  };
}

/**
 * Search saints by name
 */
function searchSaints(query) {
  const results = saints.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    success: true,
    count: results.length,
    data: results
  };
}

/**
 * Get saints by feast day month
 */
function getSaintsByMonth(month) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const results = saints.filter(s => 
    s.feastDay.includes(monthNames[parseInt(month) - 1])
  );
  
  return {
    success: true,
    count: results.length,
    data: results
  };
}

/**
 * Get day of year (1-365/366)
 */
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

module.exports = {
  getTodaySaint,
  getSaintById,
  getSaintBySlug,
  getAllSaints,
  searchSaints,
  getSaintsByMonth
};
