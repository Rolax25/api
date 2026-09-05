const curiosities = [
  {
    id: 1,
    text: "La Biblia fue escrita por más de 40 autores diferentes a lo largo de 1,500 años, y sin embargo tiene un tema central uniforme: el amor de Dios.",
    category: "Biblia"
  },
  {
    id: 2,
    text: "El Rosario fue promovido por la Virgen María a San Domingo de Guzmán en el siglo XIII.",
    category: "Tradición"
  },
  {
    id: 3,
    text: "La palabra 'Eucaristía' viene del griego 'eucharistein' que significa 'dar gracias'.",
    category: "Fe"
  },
  {
    id: 4,
    text: "El Vaticano es el país más pequeño del mundo con solo 0.44 km² de superficie.",
    category: "Iglesia"
  },
  {
    id: 5,
    text: "San Francisco de Asís es conocido como el patrono de los animales y la ecología.",
    category: "Santos"
  },
  {
    id: 6,
    text: "La Divina Misericordia se basa en las revelaciones de Santa Faustina Kowalska en el siglo XX.",
    category: "Devoción"
  },
  {
    id: 7,
    text: "El Catecismo de la Iglesia Católica fue publicado por el Papa Juan Pablo II en 1992.",
    category: "Iglesia"
  },
  {
    id: 8,
    text: "Santa Teresa de Jesús reformó la Orden del Carmen y es Doctora de la Iglesia.",
    category: "Santos"
  },
  {
    id: 9,
    text: "El año litúrgico comienza con el Tiempo de Adviento, preparando la Navidad.",
    category: "Liturgia"
  },
  {
    id: 10,
    text: "San Ignacio de Loyola fundó la Compañía de Jesús (Jesuitas) en el siglo XVI.",
    category: "Santos"
  },
  {
    id: 11,
    text: "La Transfiguración de Jesús es mencionada en los tres Evangelios sinópticos.",
    category: "Biblia"
  },
  {
    id: 12,
    text: "El Papa Francisco es el primer papa jesuita de la historia de la Iglesia.",
    category: "Iglesia"
  },
  {
    id: 13,
    text: "Los Beatos Josemaría Escrivá y Irenevo de Murialdo fueron canonizados en el 2009.",
    category: "Santos"
  },
  {
    id: 14,
    text: "La Sagrada Familia de Nazaret vivió una vida oculta durante casi 30 años.",
    category: "Fe"
  },
  {
    id: 15,
    text: "El nombre 'Israel' significa 'el que lucha con Dios', dado a Jacob después de su batalla angélica.",
    category: "Biblia"
  }
];

/**
 * Get a random curiosity
 */
function getRandomCuriosity() {
  const randomIndex = Math.floor(Math.random() * curiosities.length);
  return {
    success: true,
    data: curiosities[randomIndex]
  };
}

/**
 * Get curiosity by ID
 */
function getCuriosityById(id) {
  const curiosity = curiosities.find(c => c.id === parseInt(id));
  
  if (curiosity) {
    return {
      success: true,
      data: curiosity
    };
  }
  
  return {
    success: false,
    message: 'Curiosity not found'
  };
}

/**
 * Get all curiosities
 */
function getAllCuriosities() {
  return {
    success: true,
    count: curiosities.length,
    data: curiosities
  };
}

/**
 * Get curiosities by category
 */
function getCuriositiesByCategory(category) {
  const results = curiosities.filter(c => 
    c.category.toLowerCase() === category.toLowerCase()
  );
  
  return {
    success: true,
    count: results.length,
    data: results
  };
}

module.exports = {
  getRandomCuriosity,
  getCuriosityById,
  getAllCuriosities,
  getCuriositiesByCategory
};
