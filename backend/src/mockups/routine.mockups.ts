const routineMockups = [
  {
    name: 'Sprint Explosivo',
    description: 'Rutina para mejorar la velocidad en sprints cortos',
    segments: [
      {
        order: 1,
        distance: 1000,
        cadence: 90,
        pulseRate: 150,
        duration: 10,
        description: 'Aceleración inicial',
      },
      {
        order: 2,
        distance: 500,
        cadence: 100,
        pulseRate: 160,
        duration: 5,
        description: 'Sprint máximo',
      },
      {
        order: 3,
        distance: 200,
        cadence: 80,
        pulseRate: 140,
        duration: 3,
        description: 'Recuperación',
      },
    ],
  },
  {
    name: 'Subidas Desafiantes',
    description: 'Entrenamiento para mejorar la resistencia en pendientes',
    segments: [
      {
        order: 1,
        distance: 3000,
        cadence: 70,
        pulseRate: 140,
        duration: 20,
        description: 'Calentamiento',
      },
      {
        order: 2,
        distance: 8000,
        cadence: 60,
        pulseRate: 130,
        duration: 40,
        description: 'Subida constante',
      },
      {
        order: 3,
        distance: 1000,
        cadence: 80,
        pulseRate: 150,
        duration: 5,
        description: 'Sprint en la cima',
      },
      {
        order: 4,
        distance: 5000,
        cadence: 65,
        pulseRate: 135,
        duration: 25,
        description: 'Descenso activo',
      },
    ],
  },
  // Rutinas adicionales con nombres y segmentos creativos...
  {
    name: 'Fuerza en terrenos planos',
    description: 'Rutina para mejorar la potencia en terrenos llanos',
    segments: [
      {
        order: 1,
        distance: 5000,
        cadence: 75,
        pulseRate: 145,
        duration: 30,
        description: 'Calentamiento',
      },
      {
        order: 2,
        distance: 2000,
        cadence: 85,
        pulseRate: 155,
        duration: 10,
        description: 'Intervalo de alta potencia',
      },
      {
        order: 3,
        distance: 10000,
        cadence: 70,
        pulseRate: 140,
        duration: 45,
        description: 'Recuperación activa',
      },
    ],
  },
];

export default routineMockups;
