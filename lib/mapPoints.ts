// Points of interest for the /map sandbox.
//
// PLACEHOLDER CONTENT. The descriptions below are brief factual notes
// written to exercise the map UI — they are NOT Greg's writing and are
// meant to be replaced with his own text (and verified coordinates)
// before this page is shown to anyone. When the content is settled,
// promote this list to a `poi` document type in Sanity using the
// built-in `geopoint` field so Greg can place pins himself.
//
// `rione` values must match the `name` property in
// public/map/rioni.geojson so filtering lines up with the boundaries.

export type MapPoint = {
  id: string;
  name: string;
  rione: string;
  lat: number;
  lng: number;
  blurb: string;
};

export const mapPoints: MapPoint[] = [
  {
    id: "san-pietro",
    name: "Basilica di San Pietro",
    rione: "Borgo",
    lat: 41.9022,
    lng: 12.4539,
    blurb:
      "The basilica stands in Vatican City, reached on foot through the rione of Borgo. The present church was begun in 1506 and consecrated in 1626; Michelangelo designed the dome, and Bernini the colonnade that encloses the piazza.",
  },
  {
    id: "santa-maria-del-popolo",
    name: "Santa Maria del Popolo",
    rione: "Campo Marzio",
    lat: 41.911,
    lng: 12.4763,
    blurb:
      "A parish church at the northern gate of the city, rebuilt in the fifteenth century and altered by Bernini. The Cerasi Chapel holds two Caravaggios flanking an Assumption by Annibale Carracci.",
  },
  {
    id: "trevi",
    name: "Fontana di Trevi",
    rione: "Trevi",
    lat: 41.9009,
    lng: 12.4833,
    blurb:
      "The terminus of the Acqua Vergine, the aqueduct that has carried water into the city since 19 BC. The present fountain was designed by Nicola Salvi and completed in 1762, after his death.",
  },
  {
    id: "san-carlino",
    name: "San Carlo alle Quattro Fontane",
    rione: "Trevi",
    lat: 41.9017,
    lng: 12.4903,
    blurb:
      "Borromini's first independent commission and, by his own account, the one he returned to across his life. The oval dome and the undulating façade compress an extraordinary amount of invention into a very small site.",
  },
  {
    id: "santa-maria-maggiore",
    name: "Santa Maria Maggiore",
    rione: "Monti",
    lat: 41.8976,
    lng: 12.4983,
    blurb:
      "One of the four papal basilicas, and the only one to retain its early Christian plan. The fifth-century mosaics along the nave and on the triumphal arch date from the reign of Sixtus III.",
  },
  {
    id: "san-clemente",
    name: "Basilica di San Clemente",
    rione: "Monti",
    lat: 41.8894,
    lng: 12.4977,
    blurb:
      "Three buildings stacked in one: a twelfth-century basilica with an apse mosaic of the Tree of Life, a fourth-century church beneath it, and below that a first-century house with a Mithraic sanctuary.",
  },
  {
    id: "pantheon",
    name: "Pantheon",
    rione: "Pigna",
    lat: 41.8986,
    lng: 12.4769,
    blurb:
      "Rebuilt under Hadrian around AD 126 and consecrated as a church in 609, which is why it survives. Its unreinforced concrete dome remains the largest ever built.",
  },
  {
    id: "sant-ivo",
    name: "Sant'Ivo alla Sapienza",
    rione: "Sant'Eustachio",
    lat: 41.8987,
    lng: 12.4749,
    blurb:
      "Borromini's chapel for the old university, built into the courtyard of the Palazzo della Sapienza. The plan is a six-pointed star and the lantern rises in a spiral.",
  },
  {
    id: "san-luigi",
    name: "San Luigi dei Francesi",
    rione: "Sant'Eustachio",
    lat: 41.8993,
    lng: 12.4746,
    blurb:
      "The French national church in Rome. The Contarelli Chapel holds Caravaggio's three canvases on the life of St Matthew, painted between 1599 and 1602.",
  },
  {
    id: "sant-agnese",
    name: "Sant'Agnese in Agone",
    rione: "Parione",
    lat: 41.8992,
    lng: 12.473,
    blurb:
      "The church on Piazza Navona, whose concave façade is largely Borromini's. The piazza itself preserves the shape of the stadium of Domitian, which lies beneath it.",
  },
  {
    id: "santa-maria-in-trastevere",
    name: "Santa Maria in Trastevere",
    rione: "Trastevere",
    lat: 41.8896,
    lng: 12.4695,
    blurb:
      "Among the oldest churches in the city dedicated to the Virgin. The apse carries twelfth-century mosaics, with a lower band of scenes from her life added by Pietro Cavallini around 1290.",
  },
  {
    id: "santa-sabina",
    name: "Santa Sabina all'Aventino",
    rione: "Ripa",
    lat: 41.8843,
    lng: 12.4794,
    blurb:
      "A fifth-century basilica on the Aventine, stripped back in the twentieth century to something close to its original state. The carved cypress doors include one of the earliest known depictions of the Crucifixion.",
  },
];

export const rioniWithPoints = Array.from(
  new Set(mapPoints.map((p) => p.rione)),
).sort();
