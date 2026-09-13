// Contenido de la app — mismo material que probaste en el artifact

const APP_TITLE = "Encuentra tu Lugar";
const APP_SUBTITLE = "Constelaciones familiares para el amor y el dinero";

const PARTS = [
  {
    id: "p1",
    num: "I",
    title: "Encuentra tu Lugar en el Amor",
    tone: "moss",
    chapters: [
      {
        id: "c1",
        heading: "El mapa invisible: los órdenes del amor",
        paragraphs: [
          "¿Alguna vez sentiste que, sin importar cuánto te esfuerces, algo en el amor simplemente no te sale? No es casualidad ni mala suerte. Bert Hellinger, después de acompañar a miles de familias, se dio cuenta de que todas seguimos unas reglas invisibles que aprendimos en casa mucho antes de tener nuestra primera pareja. Él las llamó los \"órdenes del amor\".",
          "Son tres ideas sencillas, aunque no siempre fáciles de ver: todos merecemos tener un lugar en la familia —incluso quienes fueron dejados de lado o de quienes ya nadie habla—; quien llegó primero a la familia tiene un lugar distinto al de quien llegó después; y en toda relación sana, dar y recibir se van equilibrando con el tiempo.",
          "Cuando alguna de estas tres cosas se rompió en tu familia, algo curioso pasa: quienes vienen después —a veces tú misma, sin saberlo— terminan cargando con ese desequilibrio, como si el corazón intentara arreglar algo que ni siquiera te tocó vivir a ti."
        ]
      },
      {
        id: "c2",
        heading: "Los vínculos que compiten con el amor de pareja",
        paragraphs: [
          "¿Te ha pasado que justo cuando una relación empieza a ponerse seria, algo dentro de ti se echa para atrás? O que sigues, una y otra vez, enamorándote de personas que no terminan de estar ahí del todo. No es que no sepas amar: puede que una parte de tu corazón esté ocupada cuidando de otra historia, una que no es tuya.",
          "A veces esa historia tiene nombre y apellido, aunque tú no lo sepas todavía: un hermano o hermana que no llegó a nacer, un hijo dado en adopción, una expareja de tus padres de la que en casa nunca se habló. Cuando alguien de la familia queda \"afuera\" del relato, sin querer le guardamos un huequito en el corazón — y a veces ese huequito ocupa el lugar que le tocaría a tu propio amor."
        ],
        prompts: [
          "¿Hay alguna historia de amor silenciada en mi familia (de mi madre, mi padre, una abuela)?",
          "¿Sé, o intuyo, algo sobre una persona excluida de mi historia familiar?"
        ]
      },
      {
        id: "c3",
        heading: "El lugar que no ocupo",
        paragraphs: [
          "Hay una frase que se usa en constelaciones: \"no hay lugar para mí\". Esta sensación aparece en personas que sienten que, aunque hagan todo bien, el amor de pareja parece reservado para otras.",
          "El lugar en el amor de pareja se construye primero como un lugar interno: la certeza silenciosa de \"yo pertenezco, tengo derecho a estar aquí\"."
        ],
        prompts: ["¿Cómo fue recibida tu llegada al mundo, según lo que sabes de tu historia familiar?"]
      },
      {
        id: "c4",
        heading: "Patrones que se repiten",
        paragraphs: [
          "Si una figura significativa del linaje vivió una historia de amor no correspondido o de soledad, es posible que ese patrón busque \"continuarse\" en quienes vienen después, como una forma inconsciente de decir: \"yo también llevo tu historia\".",
          "Mientras el patrón permanece invisible, tiene más fuerza. Cuando se nombra y se honra el lugar de quien lo vivió antes, deja de necesitar repetirse a través de ti."
        ],
        prompts: ["¿Hay una edad en la que las mujeres (o los hombres) de tu familia \"se quedaron solas\"? ¿Coincide con algo tuyo?"]
      },
      {
        id: "c5",
        heading: "Del enredo a la libertad",
        paragraphs: [
          "En el trabajo de constelaciones se usan frases sanadoras: palabras que, dichas con presencia, ayudan a reconocer lo negado y soltar lealtades que ya no corresponden.",
          "Hacia una persona excluida: \"Te doy un lugar en mi corazón. Ahora yo sigo mi camino, y tú el tuyo\". Hacia el propio sistema: \"Tengo derecho a estar aquí, y a amar y ser amada plenamente\"."
        ]
      },
      {
        id: "c6",
        heading: "Ejercicio guiado: mi propia constelación en papel",
        paragraphs: [
          "Coloca un objeto que te represente en el centro de un espacio. Añade objetos para tu madre y tu padre donde \"sientas\" que van. Si sabes de alguien excluido, dale también un lugar, aunque sea en un extremo.",
          "Quédate en silencio observando el conjunto. Nota qué sientes. Cierra agradeciendo a cada objeto representado."
        ],
        prompts: ["¿Qué imagen, sensación o pensamiento surgió al hacer este ejercicio?"]
      },
      {
        id: "c7",
        heading: "Autoevaluación: señales de un posible enredo",
        paragraphs: ["Marca las que reconozcas en tu historia. No es un diagnóstico: es una herramienta de observación."],
        checklist: [
          "Aunque haga todo \"bien\", la relación se enfría sin razón clara.",
          "Me atraen personas emocionalmente no disponibles.",
          "Hay una historia de amor silenciada en mi familia.",
          "Siento culpa difusa cuando el amor me va bien.",
          "Repito el mismo patrón de abandono con distintas parejas.",
          "En mi familia hay alguien de quien casi no se habla."
        ]
      }
    ]
  },
  {
    id: "p2",
    num: "II",
    title: "Aprende a Recibir",
    tone: "ochre",
    epigraph: "El dinero que recibimos es, en el fondo, una forma de \u201cbuen dar\u201d que aprendimos primero con nuestros padres. Cuando no logramos recibir plenamente de ellos, ese mismo bloqueo para recibir se traslada después a otras áreas de la vida \u2014 incluido el dinero.",
    epigraphNote: "Idea inspirada en la obra de Bert Hellinger sobre el dinero y el buen dar (no es una cita textual).",
    chapters: [
      {
        id: "c8",
        heading: "El dinero como energía del sistema familiar",
        paragraphs: [
          "El dinero no es solo un recurso material: es también símbolo de intercambio y pertenencia. La forma en que tu familia se relacionó con la abundancia, la escasez o la deuda se transmite de generación en generación.",
          "Por eso, cuando una pareja piensa \"si tuviéramos más dinero esto se solucionaría\", el malestar de fondo suele permanecer incluso si el dinero llega."
        ],
        prompts: ["Para mí, el dinero en mi relación representa sobre todo…"]
      },
      {
        id: "c9",
        heading: "Dar y recibir: el equilibrio que sostiene toda relación",
        paragraphs: [
          "Toda relación sana necesita un flujo continuo entre dar y recibir. Cuando el dinero se vuelve el único canal de este intercambio, el vínculo puede desequilibrarse incluso en medio de la abundancia material.",
          "Quien solo da dinero, sin dar o recibir en otros planos, tiende a sentirse solo. Quien solo recibe dinero, sin poder corresponder de otras formas, tiende a sentir culpa."
        ],
        prompts: ["¿En qué formas, más allá del dinero, doy y recibo en mi relación?"]
      },
      {
        id: "c10",
        heading: "La herencia invisible",
        paragraphs: [
          "Antes de tu primera cuenta bancaria ya habías aprendido, observando en casa, creencias sobre el dinero que probablemente sigues repitiendo sin cuestionar."
        ],
        prompts: [
          "¿Qué frase sobre el dinero escuchabas repetir en tu casa de niña?",
          "¿Cómo te sientes hoy cuando ganas más que tu pareja? ¿Y cuándo ganas menos?"
        ]
      },
      {
        id: "c11",
        heading: "Cuando el dinero sustituye al amor",
        paragraphs: [
          "En algunos sistemas familiares, el dinero se convirtió en la principal forma de expresar amor o disculpa: un regalo en lugar de una conversación pendiente, pagar una salida en lugar de estar presente.",
          "Reconocer esta dinámica, sin culpa, es el primer paso para abrir otros canales de intercambio: la palabra, el tiempo, la vulnerabilidad compartida."
        ]
      },
      {
        id: "c12",
        heading: "Autoevaluación: ¿el dinero sustituye al amor?",
        paragraphs: ["Como antes, esta lista es solo una herramienta de observación personal."],
        checklist: [
          "Resuelvo los conflictos con un regalo o una compra, en vez de conversar.",
          "Mi valor en la relación depende de cuánto aporto económicamente.",
          "Me cuesta pedir ayuda económica sin sentir que pierdo valor.",
          "El dinero era un tema tenso en mi familia de origen.",
          "\"Proveer\" es mi principal forma de mostrar amor.",
          "Rara vez hablamos abiertamente de dinero en pareja."
        ]
      },
      {
        id: "c13",
        heading: "Ejercicio guiado: reescribiendo mi relación con el dinero",
        paragraphs: [
          "Identifica una forma de \"dar\" que no involucre dinero (tiempo de calidad, una carta, ayuda concreta, escucha sin distracciones) y practícala esta semana."
        ],
        prompts: ["Reconozco lo que mi pareja (o yo misma) aporta más allá del dinero:"]
      }
    ]
  },
  {
    id: "p3",
    num: "III",
    title: "Suelta lo que No Es Tuyo",
    tone: "rose",
    chapters: [
      {
        id: "c14",
        heading: "¿Por qué repito lo que no quiero repetir?",
        paragraphs: [
          "Un patrón no siempre es evidente. Muchas veces lo reconocemos solo después de haberlo repetido varias veces, y pensamos: \"¿cómo he vuelto a terminar aquí?\".",
          "La familia es uno de los primeros lugares donde aprendemos sobre el amor, la pertenencia, los límites y el conflicto. Esto no determina tu futuro: forma parte de cómo interpretas el mundo."
        ],
        prompts: [
          "En mis relaciones de pareja suelo repetir…",
          "Cuando intento poner límites, siento…",
          "Un patrón que me gustaría comprender mejor es…"
        ]
      },
      {
        id: "c15",
        heading: "Tu familia también forma parte de tu historia",
        paragraphs: [
          "Antes de tomar tus propias decisiones, viviste dentro de una familia con reglas y formas de relacionarse. Algunas se dijeron en voz alta; otras se aprendieron solo observando.",
          "Pertenecer es una necesidad humana profunda. A veces existe tensión entre \"quiero ser yo misma\" y \"quiero seguir perteneciendo\"."
        ],
        prompts: [
          "¿Hay historias que se repiten en mi familia?",
          "¿Hay personas de las que apenas se habla?"
        ]
      },
      {
        id: "c16",
        heading: "Lealtades familiares",
        paragraphs: [
          "Ser leal significa querer y respetar. Pero conviene preguntarse: ¿estoy eligiendo esto libremente, o siento que tengo que hacerlo para pertenecer?",
          "Una regla familiar no dicha puede seguir operando en ti aunque ya no te represente."
        ],
        prompts: [
          "En mi familia era importante…",
          "¿Existe alguna regla familiar que sigo cumpliendo aunque ya no me represente?"
        ]
      },
      {
        id: "c17",
        heading: "Ocupar tu propio lugar",
        paragraphs: [
          "En muchas familias aparecen roles: quien cuida, quien organiza, quien media. El problema aparece cuando permanecemos atrapadas en ellos incluso cuando ya no son necesarios."
        ],
        prompts: [
          "Lo que suelo intentar solucionar aunque no me corresponda es…",
          "Cuando alguien de mi familia está mal, yo siento que debo…"
        ]
      },
      {
        id: "c18",
        heading: "Culpa, límites y libertad",
        paragraphs: [
          "Sentir culpa al poner un límite no significa que estés haciendo algo incorrecto: a veces significa, simplemente, que estás haciendo algo nuevo."
        ],
        prompts: [
          "Hay una persona con la que necesito establecer un límite:",
          "Un límite saludable que podría empezar a construir es:"
        ]
      },
      {
        id: "c19",
        heading: "Mirar tu historia sin quedarte atrapada en ella",
        paragraphs: [
          "Puedes decir \"esto ocurrió en mi familia\" sin tener que decir \"por eso yo siempre seré así\". La historia familiar es una parte de tu vida, no toda tu vida."
        ],
        prompts: [
          "De mi historia familiar quiero conservar:",
          "Algo que quiero dejar de repetir:"
        ]
      },
      {
        id: "c20",
        heading: "Tu nueva mirada",
        paragraphs: [
          "En lugar de \"¿qué me pasa?\", puedes preguntarte \"¿qué estoy repitiendo?\". Y quizá la pregunta más importante: \"¿qué quiero elegir yo?\"."
        ],
        prompts: [
          "Agradezco haber recibido…",
          "A partir de ahora quiero elegir…",
          "La persona que quiero ser es…"
        ]
      }
    ]
  }
];

const AFFIRMATIONS = {
  love: [
    "Tengo un lugar en el amor, tal y como soy.",
    "Honro la historia de mi familia y sigo mi propio camino.",
    "Puedo amar y ser amada plenamente sin traicionar a nadie de mi linaje.",
    "Suelto lo que no me pertenece y tomo lo que sí es mío.",
    "Merezco una relación presente, recíproca y real.",
    "Mi corazón está disponible para un amor que me elige."
  ],
  money: [
    "El dinero y el amor son dos formas distintas de intercambio.",
    "Puedo dar y recibir en muchas formas, no solo en dinero.",
    "Mi valor no depende de cuánto aporto económicamente.",
    "Elijo qué conservar y qué dejar ir de lo que aprendí sobre el dinero.",
    "Puedo hablar de dinero con calma, no desde el miedo.",
    "La abundancia material y la conexión emocional pueden crecer juntas."
  ]
};

const BONUS_QUESTIONS = [
  "¿Qué patrón se repite en mi vida?", "¿Qué historias familiares conozco?",
  "¿Qué historias familiares desconozco?", "¿Qué era importante en mi familia?",
  "¿Qué estaba mal visto?", "¿Cómo se expresaba el amor?",
  "¿Cómo se expresaba el enfado?", "¿Cómo se resolvían los conflictos?",
  "¿Qué aprendí sobre el dinero?", "¿Qué aprendí sobre el éxito?",
  "¿Qué aprendí sobre el fracaso?", "¿Qué aprendí sobre el sacrificio?",
  "¿Qué aprendí sobre el amor?", "¿Qué significa para mí pertenecer?",
  "¿Qué temo perder si cambio?", "¿Dónde siento más culpa?",
  "¿Dónde me cuesta poner límites?", "¿Qué papel suelo desempeñar en mi familia?",
  "¿Qué responsabilidades tiendo a asumir?", "¿Qué intento solucionar que quizá no me corresponde?",
  "¿Qué patrón aparece en mis relaciones?", "¿Qué personas tiendo a elegir?",
  "¿Qué necesito recibir y me cuesta pedir?", "¿Qué necesito aprender a darme?",
  "¿Qué parte de mi historia quiero comprender mejor?", "¿Qué quiero conservar de mi familia?",
  "¿Qué quiero hacer diferente?", "¿Qué significa para mí vivir mi propia vida?",
  "¿Qué elegiría si no tuviera miedo de decepcionar a nadie?",
  "¿Cómo quiero escribir mi propia historia a partir de ahora?"
];

const ENCOURAGEMENTS = [
  "Estás dedicando tiempo a mirar tu propia historia. Eso, por sencillo que parezca, ya es un acto de valentía.",
  "No hace falta que resuelvas todo hoy. Cada vez que vuelves aquí, algo se acomoda un poco, aunque no lo notes de inmediato.",
  "Lo que acabas de leer puede sentarse contigo unos días. No hay prisa: tu proceso no se mide en capítulos por semana.",
  "Si esto removió algo incómodo, es una buena señal: significa que tocaste algo real, no que hiciste algo mal.",
  "Volver a este espacio, aunque sea cinco minutos, ya cuenta. La constancia pequeña sostiene más que el esfuerzo intenso y esporádico.",
  "Estás construyendo una relación distinta con tu propia historia, una lectura a la vez. Eso no se deshace fácilmente.",
  "Puedes cerrar la app ahora mismo y sentirte orgullosa de haber llegado hasta aquí hoy.",
  "Nadie más está viendo esto. Es tuyo, a tu ritmo, sin nadie esperando que 'ya deberías haber avanzado más'.",
  "Cada palabra que escribiste hoy es un paso que tu yo de hace un año no sabía que podía dar.",
  "Esto no es una carrera hacia una versión 'arreglada' de ti. Es un acompañamiento mientras te conoces mejor."
];

const CLOSING = {
  heading: "Has llegado hasta aquí",
  paragraphs: [
    "No fue poca cosa. Leíste, escribiste, te detuviste en preguntas que muchas personas evitan toda su vida. Eso ya cambió algo, aunque los resultados no se vean de inmediato.",
    "Este cuaderno no se termina hoy: puedes volver cuando quieras, releer un capítulo que te movió algo, completar una pregunta que dejaste a medias, o simplemente escribir en tus notas libres cuando algo de tu día se conecte con algo de aquí.",
    "Las 30 preguntas te esperan para los días en que quieras seguir mirando hacia adentro sin necesidad de releer todo. Y las afirmaciones, para los días en que solo necesites un recordatorio amable.",
    "Gracias por confiar en este proceso y en ti misma para sostenerlo. Eso es, quizás, el primer paso que ya nadie te puede quitar."
  ]
};

export { APP_TITLE, APP_SUBTITLE, PARTS, AFFIRMATIONS, BONUS_QUESTIONS, ENCOURAGEMENTS, CLOSING };
