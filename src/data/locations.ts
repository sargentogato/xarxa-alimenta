export interface CommunityLocation {
  id: string;
  nameKey: string;
  typeKey: string;
  descKey: string;
  address: string;
  city: string;
  accessInfoKey: string;
  scheduleKey: string;
  mapsQuery: string;
  image: string;
  isMain?: boolean;
}

export const communityLocations: CommunityLocation[] = [
  {
    id: 'huerta-ikigai',
    nameKey: 'contact.locations.ikigai.name',
    typeKey: 'contact.locations.ikigai.type',
    descKey: 'contact.locations.ikigai.desc',
    address: 'Camí de la Huerta, s/n',
    city: 'Valencia',
    accessInfoKey: 'contact.locations.ikigai.access',
    scheduleKey: 'contact.locations.ikigai.schedule',
    mapsQuery: 'Valencia, Camí de la Huerta',
    image: 'projects/huerta-ikigai/1.jpg',
    isMain: true,
  },
  {
    id: 'finca-valldares',
    nameKey: 'contact.locations.valldares.name',
    typeKey: 'contact.locations.valldares.type',
    descKey: 'contact.locations.valldares.desc',
    address: 'Paraje Valldares, Parcela 4',
    city: 'Valencia',
    accessInfoKey: 'contact.locations.valldares.access',
    scheduleKey: 'contact.locations.valldares.schedule',
    mapsQuery: 'Valldares, Valencia',
    image: 'projects/valldares/1.jpg',
  },
  {
    id: 'espacio-la-red',
    nameKey: 'contact.locations.lared.name',
    typeKey: 'contact.locations.lared.type',
    descKey: 'contact.locations.lared.desc',
    address: 'Plaza del Pueblo, 8',
    city: 'Valencia',
    accessInfoKey: 'contact.locations.lared.access',
    scheduleKey: 'contact.locations.lared.schedule',
    mapsQuery: 'Plaza del Pueblo 8, Valencia',
    image: 'services/reparto.jpg',
  },
];
