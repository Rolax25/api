const fs = require('fs');
const path = require('path');

const contentFilePath = path.join(__dirname, '../../data/dailyContent.json');

/**
 * Load daily content from JSON file
 */
function loadDailyContent() {
  try {
    const data = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading daily content:', error);
    return {};
  }
}

/**
 * Get today's verse
 */
function getTodayVerse() {
  const content = loadDailyContent();
  const today = getTodayDateString();
  
  if (content[today]) {
    return {
      success: true,
      data: content[today].verse,
      date: today
    };
  }
  
  // If no content for today, return the most recent one
  const dates = Object.keys(content).sort();
  const recentDate = dates.reduce((closest, date) => {
    if (new Date(date) <= new Date(today) && (!closest || new Date(date) > new Date(closest))) {
      return date;
    }
    return closest;
  }, null);
  
  if (recentDate) {
    return {
      success: true,
      data: content[recentDate].verse,
      date: recentDate
    };
  }
  
  return {
    success: false,
    message: 'Verse not found'
  };
}

/**
 * Get today's reflection
 */
function getTodayReflection() {
  const content = loadDailyContent();
  const today = getTodayDateString();
  
  if (content[today]) {
    return {
      success: true,
      data: content[today].reflection,
      date: today
    };
  }
  
  // If no content for today, return the most recent one
  const dates = Object.keys(content).sort();
  const recentDate = dates.reduce((closest, date) => {
    if (new Date(date) <= new Date(today) && (!closest || new Date(date) > new Date(closest))) {
      return date;
    }
    return closest;
  }, null);
  
  if (recentDate) {
    return {
      success: true,
      data: content[recentDate].reflection,
      date: recentDate
    };
  }
  
  return {
    success: false,
    message: 'Reflection not found'
  };
}

/**
 * Get today's liturgical color
 */
function getTodayLiturgicalColor() {
  const content = loadDailyContent();
  const today = getTodayDateString();
  
  if (content[today] && content[today].liturgicalColor) {
    return {
      success: true,
      data: content[today].liturgicalColor,
      date: today
    };
  }
  
  return {
    success: false,
    message: 'Liturgical color not found',
    data: 'Verde' // Default color
  };
}

/**
 * Get all daily content
 */
function getAllContent() {
  const content = loadDailyContent();
  const dates = Object.keys(content);
  
  return {
    success: true,
    count: dates.length,
    data: content
  };
}

/**
 * Get content by date
 */
function getContentByDate(dateStr) {
  const content = loadDailyContent();
  
  if (content[dateStr]) {
    return {
      success: true,
      data: content[dateStr],
      date: dateStr
    };
  }
  
  return {
    success: false,
    message: 'Content not found for this date'
  };
}

/**
 * Get today's date as string (YYYY-MM-DD)
 */
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

module.exports = {
  getTodayVerse,
  getTodayReflection,
  getTodayLiturgicalColor,
  getAllContent,
  getContentByDate,
  getTodayDateString
};
