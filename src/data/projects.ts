export interface ProjectItem {
  id: string;
  type: 'project' | 'collaboration';
  images: string[];
  externalUrl?: string;
}

export const projectsList: ProjectItem[] = [
  {
    id: 'valldares',
    type: 'project',
    images: [
      'projects/valldares/1.jpg',
      'projects/valldares/2.jpg',
    ],
    externalUrl: 'https://www.instagram.com/xarxa.alimenta/',
  },
  {
    id: 'fifla',
    type: 'collaboration',
    images: [
      'projects/fifla/1.jpg',
    ],
    externalUrl: 'https://www.instagram.com/xarxa.alimenta/',
  },
  {
    id: 'huerta-ikigai',
    type: 'project',
    images: [
      'projects/huerta-ikigai/1.jpg',
    ],
    externalUrl: 'https://www.instagram.com/xarxa.alimenta/',
  },
  {
    id: 'abike-encuentro',
    type: 'collaboration',
    images: [
      'projects/abike-encuentro/1.jpg',
    ],
    externalUrl: 'https://www.instagram.com/xarxa.alimenta/',
  },
];
