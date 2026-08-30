const dailyData = require('../data/dailyContent.json');
const saintsData = require('../data/saints.json');
const curiositiesData = require('../data/curiosities.json');
const { getTodayKey } = require('../utils/dateUtils');

const getDailyContent = async () => {
  try {
    const todayKey = getTodayKey();
    const todayContent = dailyData[todayKey];
    
    if (!todayContent) {
      // Si no hay contenido para hoy, usar el primer día disponible
      const firstKey = Object.keys(dailyData)[0];
      return {
        ...dailyData[firstKey],
        date: todayKey,
        note: 'Contenido por defecto para hoy'
      };
    }
    
    // Agregar el santo del día
    const saint = await getSaintOfToday();
    const curiosity = await getCuriosity();
    
    return {
      date: todayKey,
      verse: todayContent.verse,
      reflection: todayContent.reflection,
      saint: saint,
      curiosity: curiosity,
      liturgicalColor: todayContent.liturgicalColor || 'Verde'
    };
  } catch (error) {
    console.error('Error en contentService:', error);
    throw error;
  }
};

const getSaintOfToday = async () => {
  try {
    const todayKey = getTodayKey();
    const month = parseInt(todayKey.split('-')[1]);
    const day = parseInt(todayKey.split('-')[2]);
    
    // Buscar santo por mes y día
    const saint = saintsData.find(s => s.month === month && s.day === day);
    
    if (saint) {
      return {
        name: saint.name,
        description: saint.description,
        image: saint.image || 'https://via.placeholder.com/300x400/800080/FFFFFF?text=Siloe',
        feastDay: `${saint.day} de ${getMonthName(saint.month)}`
      };
    }
    
    // Santo por defecto
    return {
      name: 'Santos de hoy',
      description: 'Hoy celebramos a todos los santos que han vivido en santidad.',
      image: 'https://via.placeholder.com/300x400/800080/FFFFFF?text=Siloe',
      feastDay: `${day} de ${getMonthName(month)}`
    };
  } catch (error) {
    console.error('Error al obtener santo:', error);
    throw error;
  }
};

const getCuriosity = async () => {
  try {
    // Seleccionar curiosidad aleatoria
    const randomIndex = Math.floor(Math.random() * curiositiesData.length);
    return curiositiesData[randomIndex];
  } catch (error) {
    console.error('Error al obtener curiosidad:', error);
    throw error;
  }
};

const getReflection = async () => {
  try {
    const todayKey = getTodayKey();
    const todayContent = dailyData[todayKey];
    
    if (todayContent && todayContent.reflection) {
      return todayContent.reflection;
    }
    
    // Reflexión por defecto
    return {
      text: 'La fe es la certeza de lo que se espera, la convicción de lo que no se ve.',
      author: 'San Pablo, Hebreos 11:1'
    };
  } catch (error) {
    console.error('Error al obtener reflexión:', error);
    throw error;
  }
};

const getVerse = async () => {
  try {
    const todayKey = getTodayKey();
    const todayContent = dailyData[todayKey];
    
    if (todayContent && todayContent.verse) {
      return todayContent.verse;
    }
    
    // Versículo por defecto
    return {
      text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.',
      reference: 'Isaías 41:10'
    };
  } catch (error) {
    console.error('Error al obtener versículo:', error);
    throw error;
  }
};

// Función auxiliar
const getMonthName = (month) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[month - 1];
};

module.exports = {
  getDailyContent,
  getSaintOfToday,
  getCuriosity,
  getReflection,
  getVerse
};