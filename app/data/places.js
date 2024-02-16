const placesData = [
    //parkings
    { name: 'parking 1', coordinates: { latitude: 33.225696897660285,longitude: -8.488772979709983} },
    { name: 'parking 2', coordinates: { latitude: 33.225844495176, longitude: -8.485705494962309 } },
    { name: 'parking 3', coordinates: { latitude: 33.22457713382194, longitude: -8.485868898895305  } },
    { name: 'parking 4', coordinates: { latitude: 33.226620591053766,longitude: -8.487388202295444  } },
    
    //entrées
    { name: 'Entre principale', coordinates: { latitude: 33.22619865341992, longitude: -8.486003073553688} },
    
    //WC
    { name: 'WC 1', coordinates: { latitude: 33.22516910421146,longitude: -8.48566087985752  } },
    { name: 'WC 2', coordinates: { latitude: 33.22521347943625,longitude: -8.487250674650292 } },
    
    //cafeteria 
    { name: 'CAFETERIA des etudiants', coordinates: { latitude: 33.22514031305489,longitude: -8.485770390458677  } },
    { name: 'CAFETERIA des enseignants', coordinates: { latitude: 33.22619293008559,longitude: -8.48753411718062  } },

    //administration
    { name: 'Administration', coordinates: { latitude: 33.22637398943767,longitude: -8.486844377818285  } },

    //Biblio
    { name: 'Bibliotheque 1', coordinates: { latitude: 33.2263240507663,longitude: -8.486984602946038  } },
    { name: 'Bibliotheque 2', coordinates: { latitude: 33.22507920320292,longitude: -8.488428468486196   } },
    
    //mosque
    { name: 'Mosquée', coordinates: { latitude: 33.224741106263565,longitude: -8.488097434266992  } },

    //halls
    { name: 'Hall', coordinates: { latitude: 33.22606934240605,longitude: -8.4861910909656 } },
    { name: 'La Cour', coordinates: { latitude: 33.22581399061205,longitude: -8.486741311709402 } },

    //departments
    { name: 'Departement de biologie', coordinates: { latitude: 33.224867686753335, longitude: -8.486307020156227 } },
    { name: 'Departement Mathématique (Entrée 1)', coordinates: { latitude: 33.225225942481444,longitude: -8.48832502656288   } },
    { name: 'Departement Mathématique (Entrée 2)', coordinates: { latitude: 33.225187072298176,longitude: -8.487999762128629   } },
    { name: 'Departement Biologie', coordinates: { latitude: 33.22548069665761,longitude: -8.48767734033214  } },
    { name: 'Departement Physique', coordinates: { latitude: 33.22574805137646,longitude: -8.487586590075955  } },
    { name: 'Departement Informatique', coordinates: { latitude: 33.22500553672531,longitude: -8.487580947449048  } },

    //Blocs
    { name: 'Bloc A (salle 1-16)', coordinates: { latitude: 33.22542474413679,longitude: -8.486174403672608  } },
    { name: 'Bloc B (salle 17-31)', coordinates: { latitude: 33.22536983812756,longitude: -8.485721202021413  } },
    { name: 'Bloc C (salle 32-39)', coordinates: { latitude: 33.226100204148935,longitude: -8.487921173142025  } },
    { name: 'Bloc D (salle 40-56)', coordinates: { latitude: 33.22579043098013,longitude: -8.488222240929424   } },
    { name: "Bloc d'affichage", coordinates: { latitude: 33.2256448729632,longitude: -8.485728533650411  } },
    { name: 'Building', coordinates: { latitude: 33.22464125066534,longitude: -8.487552274239441  } },

    //Labo
    { name: 'Laboratoire de Technologie', coordinates: { latitude: 33.22502133617695,longitude: -8.48803605471344  } },
    { name: 'Laboratoire de bitechnologie', coordinates: { latitude: 33.22553182191327,longitude: -8.488139517713519  } },
    { name: 'Laboratoire de Biologie', coordinates: { latitude: 33.224432796664125,longitude: -8.486210222184923  } },

    //amphis
    { name: 'Nouvel Amphi', coordinates: { latitude: 33.22473119797966,longitude: -8.48712934439884  } },
    { name: 'Ibn Al-Haitam', coordinates: { latitude: 33.225594818492624,longitude: -8.487016236567834  } },
    { name: 'Al Bayrouni', coordinates: { latitude: 33.22582989156181,longitude: -8.487022481313314  } },
    { name: 'Al Farabi', coordinates: { latitude: 33.226040570516915,longitude: -8.486665083312069  } },
    { name: 'Ibn Younes', coordinates: { latitude: 33.2257228047284,longitude: -8.486132209036118  } },
    { name: 'Ibn Nafiss', coordinates: { latitude: 33.22511883878932,longitude: -8.486232225952243  } },

    //atelier
    { name: 'Atelier de sérigraphie', coordinates: { latitude: 33.22623620177543,longitude: -8.487936226531499  } },
    { name: 'Atelier', coordinates: { latitude: 33.22652671912384,longitude: -8.486487555045608  } },

    { name: "Centre d'etudes doctorales", coordinates: { latitude: 33.22541096316545,longitude: -8.488461696157033   } },
    { name: 'Anapec Universitaire Chouaib Doukkali ELJADIDA', coordinates: { latitude: 33.22547187205059, longitude: -8.488407435159264  } },

    //terain
    { name: 'Terrain de sports', coordinates: { latitude: 33.22447934526081,longitude: -8.487514640652929  } },
    
  ];
  
  export default placesData;
  