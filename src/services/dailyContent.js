const fs = require('fs');
const path = require('path');

const contentFilePath = path.join(__dirname, '../../data/dailyContent.json');

/**
 * Load daily content from JSON file
 */
function loadDailyContent() {
  console.log('📂 [dailyContent] Loading content from file...');
  console.log(`   Path: ${contentFilePath}`);
  
  try {
    // Check if file exists
    if (!fs.existsSync(contentFilePath)) {
      console.error('❌ [dailyContent] File does not exist!');
      return {};
    }
    
    const data = fs.readFileSync(contentFilePath, 'utf8');
    const parsed = JSON.parse(data);
    
    console.log('✅ [dailyContent] File loaded successfully');
    console.log(`   Available dates: ${Object.keys(parsed).length}`);
    console.log(`   Dates: ${Object.keys(parsed).slice(0, 5).join(', ')}${Object.keys(parsed).length > 5 ? '...' : ''}`);
    
    return parsed;
  } catch (error) {
    console.error('❌ [dailyContent] Error loading content:', error.message);
    console.error('   Stack:', error.stack);
    return {};
  }
}

/**
 * Get today's verse
 */
function getTodayVerse() {
  const content = loadDailyContent();
  const today = getTodayDateString();
  
  console.log(`📅 [getTodayVerse] Looking for date: "${today}"`);
  console.log(`   Available dates: ${Object.keys(content)}`);

  if (content[today]) {
    console.log(`✅ [getTodayVerse] Found exact match for "${today}"`);
    return {
      success: true,
      data: content[today].verse,
      date: today
    };
  }

  // If no content for today, return the most recent one
  console.log(`⚠️ [getTodayVerse] No exact match, finding closest...`);
  const dates = Object.keys(content).sort();
  const recentDate = dates.reduce((closest, date) => {
    if (new Date(date) <= new Date(today) && (!closest || new Date(date) > new Date(closest))) {
      return date;
    }
    return closest;
  }, null);

  if (recentDate) {
    console.log(`✅ [getTodayVerse] Using fallback date: "${recentDate}"`);
    return {
      success: true,
      data: content[recentDate].verse,
      date: recentDate
    };
  }

  console.log('❌ [getTodayVerse] No verse found');
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
 * Get today's date as string (MM-DD)
 */
function getTodayDateString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${month}-${day}`;
}

module.exports = {
  getTodayVerse,
  getTodayReflection,
  getTodayLiturgicalColor,
  getAllContent,
  getContentByDate,
  getTodayDateString
};
