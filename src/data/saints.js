const saints = [
  {
    id: 1,
    name: "Beato Marcelo",
    slug: "beato-marcelo",
    feastDay: "July 30",
    description: "Beato Marcelo de Cesarea, mártir.",
    image: "images/saints/beato-marcelo.png"
  },
  {
    id: 2,
    name: "Nuestra Señora de la Merced",
    slug: "nuestra-senora-merced",
    feastDay: "September 24",
    description: "Virgen María, patrona de la Merced.",
    image: "images/saints/nuestra-senora-merced.png"
  },
  {
    id: 3,
    name: "San Andrés Kim",
    slug: "san-andres-kim",
    feastDay: "September 20",
    description: "San Andrés Kim Taegon, primer sacerdote coreano y mártir.",
    image: "images/saints/san-andres-kim.png"
  },
  {
    id: 4,
    name: "San Cipriano",
    slug: "san-cipriano",
    feastDay: "September 16",
    description: "San Cipriano de Cartago, mártir y obispo.",
    image: "images/saints/san-cipriano.png"
  },
  {
    id: 5,
    name: "San Cleofás",
    slug: "san-cleofas",
    feastDay: "November 25",
    description: "San Cleofás, hermano de San José.",
    image: "images/saints/san-cleofas.png"
  },
  {
    id: 6,
    name: "San Cornelio",
    slug: "san-cornelio",
    feastDay: "September 16",
    description: "San Cornelio el Centurión, primer gentil convertido al cristianismo.",
    image: "images/saints/san-cornelio.png"
  },
  {
    id: 7,
    name: "San Cosme",
    slug: "san-cosme",
    feastDay: "September 27",
    description: "San Cosme, médico y mártir.",
    image: "images/saints/san-cosme.png"
  },
  {
    id: 8,
    name: "San Damián",
    slug: "san-damian",
    feastDay: "September 27",
    description: "San Damián, médico y mártir.",
    image: "images/saints/san-damian.png"
  },
  {
    id: 9,
    name: "San Eleuterio",
    slug: "san-eleuterio",
    feastDay: "May 26",
    description: "San Eleuterio, Papa y mártir.",
    image: "images/saints/san-eleuterio.png"
  },
  {
    id: 10,
    name: "San Gabriel Arcángel",
    slug: "san-gabriel-arcangel",
    feastDay: "March 24",
    description: "San Gabriel Arcángel, mensajero de Dios.",
    image: "images/saints/san-gabriel-arcangel.png"
  },
  {
    id: 11,
    name: "San Genaro",
    slug: "san-genaro",
    feastDay: "September 19",
    description: "San Genaro, mártir de Benevento.",
    image: "images/saints/san-genaro.png"
  },
  {
    id: 12,
    name: "San Gil",
    slug: "san-gil",
    feastDay: "September 1",
    description: "San Gil, eremita irlandés.",
    image: "images/saints/san-gil.png"
  },
  {
    id: 13,
    name: "San Jerónimo",
    slug: "san-jeronimo",
    feastDay: "September 30",
    description: "San Jerónimo, traductor de la Biblia (Vulgata).",
    image: "images/saints/san-jeronimo.png"
  },
  {
    id: 14,
    name: "San José Cupertino",
    slug: "san-jose-cupertino",
    feastDay: "September 21",
    description: "San José Cupertino, religioso capuchino y patrono de los pilotos.",
    image: "images/saints/san-jose-cupertino.png"
  },
  {
    id: 15,
    name: "San Juan Crisóstomo",
    slug: "san-juan-crisostomo",
    feastDay: "November 13",
    description: "San Juan Crisóstomo, Doctor de la Iglesia.",
    image: "images/saints/san-juan-crisostomo.png"
  },
  {
    id: 16,
    name: "San Marino",
    slug: "san-marino",
    feastDay: "September 3",
    description: "San Marino, fundador de la República de San Marino.",
    image: "images/saints/san-marino.png"
  },
  {
    id: 17,
    name: "San Mateo",
    slug: "san-mateo",
    feastDay: "September 21",
    description: "San Mateo, apóstol y evangelista.",
    image: "images/saints/san-mateo.png"
  },
  {
    id: 18,
    name: "San Mauricio",
    slug: "san-mauricio",
    feastDay: "September 22",
    description: "San Mauricio, mártir de la Legión Tebana.",
    image: "images/saints/san-mauricio.png"
  },
  {
    id: 19,
    name: "San Miguel Arcángel",
    slug: "san-miguel-arcangel",
    feastDay: "October 2",
    description: "San Miguel Arcángel, príncipe de los ángeles.",
    image: "images/saints/san-miguel-arcangel.png"
  },
  {
    id: 20,
    name: "San Nicolás Tolentino",
    slug: "san-nicolas-tolentino",
    feastDay: "September 10",
    description: "San Nicolás Tolentino, religioso franciscano.",
    image: "images/saints/san-nicolas-tolentino.png"
  },
  {
    id: 21,
    name: "San Paciente",
    slug: "san-paciente",
    feastDay: "August 22",
    description: "San Paciente, obispo de Roma y mártir.",
    image: "images/saints/san-paciente.png"
  },
  {
    id: 22,
    name: "San Pedro Claver",
    slug: "san-pedro-claver",
    feastDay: "September 9",
    description: "San Pedro Claver, misionero de los esclavos en Colombia.",
    image: "images/saints/san-pedro-claver.png"
  },
  {
    id: 23,
    name: "San Pío Padre Pío",
    slug: "san-pio-padre-pio",
    feastDay: "September 23",
    description: "San Pío de Pietrelcina, estigmatita y confesor.",
    image: "images/saints/san-pio-padre-pio.png"
  },
  {
    id: 24,
    name: "San Rafael Arcángel",
    slug: "san-rafael-arcangel",
    feastDay: "October 24",
    description: "San Rafael Arcángel, sanador y guía.",
    image: "images/saints/san-rafael-arcangel.png"
  },
  {
    id: 25,
    name: "San Roberto Belarmino",
    slug: "san-roberto-belarmino",
    feastDay: "September 29",
    description: "San Roberto Belarmino, Doctor de la Iglesia.",
    image: "images/saints/san-roberto-belarmino.png"
  },
  {
    id: 26,
    name: "San Wenceslao",
    slug: "san-wenceslao",
    feastDay: "September 28",
    description: "San Wenceslao, duque de Bohemia y mártir.",
    image: "images/saints/san-wenceslao.png"
  },
  {
    id: 27,
    name: "Santa Cruz",
    slug: "santa-cruz",
    feastDay: "September 14",
    description: "Exaltación de la Santa Cruz.",
    image: "images/saints/santa-cruz.png"
  },
  {
    id: 28,
    name: "Santa Regina",
    slug: "santa-regina",
    feastDay: "November 22",
    description: "Santa Regina, mártir joven.",
    image: "images/saints/santa-regina.png"
  },
  {
    id: 29,
    name: "Santa Teresa de Calcuta",
    slug: "santa-teresa-calcuta",
    feastDay: "September 5",
    description: "Santa Teresa de Calcuta, fundadora de las Misioneras de la Caridad.",
    image: "images/saints/santa-teresa-calcuta.png"
  },
  {
    id: 30,
    name: "Virgen de los Dolores",
    slug: "virgen-dolores",
    feastDay: "September 15",
    description: "Virgen María, Madre de Dolores.",
    image: "images/saints/virgen-dolores.png"
  },
  {
    id: 31,
    name: "Virgen María Natividad",
    slug: "virgen-maria-natividad",
    feastDay: "September 8",
    description: "Natividad de Nuestra Señora.",
    image: "images/saints/virgen-maria-natividad.png"
  },
  {
    id: 32,
    name: "Virgen María Santísimo Nombre",
    slug: "virgen-maria-santisimo-nombre",
    feastDay: "September 12",
    description: "Santísimo Nombre de María.",
    image: "images/saints/virgen-maria-santisimo-nombre.png"
  }
];

module.exports = saints;
