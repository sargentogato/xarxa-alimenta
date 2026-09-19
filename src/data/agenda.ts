export type ActivityType = 'workshop' | 'open-day' | 'assembly' | 'ride';
export type ActivityAudience = 'all' | 'families' | 'volunteers';

export interface AgendaActivity {
  id: string;
  type: ActivityType;
  audience: ActivityAudience;
  titleKey: string;
  descKey?: string;         // Opcional: el v-if discrimina si existe o no
  date: string;            // ISO 8601
  endDate: string;         // ISO 8601
  location: string;
  address: string;
  image: string;
  isFree?: boolean;
  infoUrl: string;         // Enlace externo "Más información" / "Toda la información aquí"
  registrationUrl?: string; // Enlace opcional a Google Forms u otra plataforma externa
}

export const agendaActivities: AgendaActivity[] = [
  {
    id: 'compostaje',
    type: 'workshop',
    audience: 'all',
    titleKey: 'agenda.events.compostaje.title',
    descKey: 'agenda.events.compostaje.desc',
    date: '2026-10-03T10:30:00',
    endDate: '2026-10-03T13:00:00',
    location: 'Huerta Ikigai',
    address: 'Camí de la Huerta, s/n',
    image: 'services/talleres.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-compostaje-ejemplo/viewform',
  },
  {
    id: 'puertas-abiertas-valldares',
    type: 'open-day',
    audience: 'families',
    titleKey: 'agenda.events.puertasAbiertasValldares.title',
    descKey: 'agenda.events.puertasAbiertasValldares.desc',
    date: '2026-10-10T11:00:00',
    endDate: '2026-10-10T17:00:00',
    location: 'Finca Agroforestal Valldares',
    address: 'Paraje Valldares, Parcela 4',
    image: 'projects/valldares/1.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
    // Sin formulario: jornada abierta sin inscripción previa requerida
  },
  {
    id: 'asamblea-reparto',
    type: 'assembly',
    audience: 'all',
    titleKey: 'agenda.events.asambleaReparto.title',
    // Nota: Actividad sin descKey para verificar que el bucle discrimina perfectamente actividades sin texto descriptivo
    date: '2026-10-17T18:00:00',
    endDate: '2026-10-17T20:30:00',
    location: 'Espacio Comunitario La Red',
    address: 'Plaza del Pueblo, 8',
    image: 'services/reparto.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
  },
  {
    id: 'jardin-forestal-siembra',
    type: 'workshop',
    audience: 'volunteers',
    titleKey: 'agenda.events.jardinForestalSiembra.title',
    descKey: 'agenda.events.jardinForestalSiembra.desc',
    date: '2026-10-24T09:30:00',
    endDate: '2026-10-24T13:30:00',
    location: 'Jardín Forestal Comunitario',
    address: 'Entorno Natural de la Ribera',
    image: 'home/hero-2.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-siembra-voluntariado/viewform',
  },
  {
    id: 'ruta-abike',
    type: 'ride',
    audience: 'all',
    titleKey: 'agenda.events.rutaAbike.title',
    descKey: 'agenda.events.rutaAbike.desc',
    date: '2026-10-31T10:00:00',
    endDate: '2026-10-31T14:00:00',
    location: 'Huerta Ikigai (Punto de salida)',
    address: 'Camí de la Huerta (itinerario verde)',
    image: 'projects/abike-encuentro/1.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-ruta-abike/viewform',
  },
  {
    id: 'taller-conservas',
    type: 'workshop',
    audience: 'families',
    titleKey: 'agenda.events.tallerConservas.title',
    descKey: 'agenda.events.tallerConservas.desc',
    date: '2026-11-07T11:00:00',
    endDate: '2026-11-07T13:30:00',
    location: 'Cocina Comunitaria',
    address: 'Calle Mayor, 14',
    image: 'home/hero-4.jpg',
    isFree: true,
    infoUrl: 'https://instagram.com/xarxalimenta',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-conservas-otono/viewform',
  },
];
