import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesToCreate = [
  // Home hero
  {
    path: 'src/assets/images/home/hero-1.jpg',
    title: 'Huertos Comunitarios',
    subtitle: 'Cultivo agroecológico y suelo vivo',
    bg: '#2d6a4f',
    accent: '#52b788',
    icon: '🌱',
  },
  {
    path: 'src/assets/images/home/hero-2.jpg',
    title: 'Jardín Forestal',
    subtitle: 'Bosque de alimentos y biodiversidad',
    bg: '#1b4332',
    accent: '#74c69d',
    icon: '🌳',
  },
  {
    path: 'src/assets/images/home/hero-3.jpg',
    title: 'Encuentros y Vecindad',
    subtitle: 'Música, comida y comunidad compartida',
    bg: '#7f4f24',
    accent: '#ddb892',
    icon: '🤝',
  },
  {
    path: 'src/assets/images/home/hero-4.jpg',
    title: 'Apoyo Mutuo y Solidaridad',
    subtitle: 'Red comunitaria de soberanía alimentaria',
    bg: '#081c15',
    accent: '#40916c',
    icon: '🧺',
  },

  // Services
  {
    path: 'src/assets/images/services/reparto.jpg',
    title: 'Reparto de Alimentos',
    subtitle: 'Cestas frescas y de proximidad',
    bg: '#386641',
    accent: '#6a994e',
    icon: '🥬',
  },
  {
    path: 'src/assets/images/services/huertos.jpg',
    title: 'Huertos Comunitarios',
    subtitle: 'Bancales compartidos de cultivo biológico',
    bg: '#283618',
    accent: '#606c38',
    icon: '🥕',
  },
  {
    path: 'src/assets/images/services/talleres.jpg',
    title: 'Talleres y Formación',
    subtitle: 'Compostaje, poda y cocina estacional',
    bg: '#bc6c25',
    accent: '#dda15e',
    icon: '🛠️',
  },
  {
    path: 'src/assets/images/services/eventos.jpg',
    title: 'Eventos y Encuentros',
    subtitle: 'Puertas abiertas y comidas populares',
    bg: '#9e2a2b',
    accent: '#ff9b54',
    icon: '🎉',
  },
  {
    path: 'src/assets/images/services/voluntariado.jpg',
    title: 'Voluntariado y Cuidados',
    subtitle: 'Turnos de riego y bioconstrucción',
    bg: '#22577a',
    accent: '#38a3a5',
    icon: '🤲',
  },

  // Projects
  {
    path: 'src/assets/images/projects/valldares/1.jpg',
    title: 'Valldares',
    subtitle: 'Recuperación agroforestal',
    bg: '#2d6a4f',
    accent: '#95d5b2',
    icon: '🌿',
  },
  {
    path: 'src/assets/images/projects/valldares/2.jpg',
    title: 'Valldares - Bancales',
    subtitle: 'Tierra fértil comunitaria',
    bg: '#1b4332',
    accent: '#52b788',
    icon: '🌾',
  },
  {
    path: 'src/assets/images/projects/fifla/1.jpg',
    title: 'FiFla',
    subtitle: 'Festival itinerante comunitario',
    bg: '#d4a373',
    accent: '#faedcd',
    icon: '🎶',
  },
  {
    path: 'src/assets/images/projects/huerta-ikigai/1.jpg',
    title: 'Huerta Ikigai',
    subtitle: 'Cultivo para el bienestar',
    bg: '#588157',
    accent: '#a3b18a',
    icon: '🌻',
  },
  {
    path: 'src/assets/images/projects/abike-encuentro/1.jpg',
    title: 'abike encuentro',
    subtitle: 'Movilidad en bici y rutas verdes',
    bg: '#3a5a40',
    accent: '#588157',
    icon: '🚲',
  },

  // History
  {
    path: 'src/assets/images/history/1.jpg',
    title: 'El Origen (2020)',
    subtitle: 'Primeros bancales y asamblea vecinal',
    bg: '#415a77',
    accent: '#778da9',
    icon: '📜',
  },
  {
    path: 'src/assets/images/history/2.jpg',
    title: 'Creciendo Juntas (2022)',
    subtitle: 'Semillas y sistema de riego',
    bg: '#2b2d42',
    accent: '#8d99ae',
    icon: '💧',
  },
  {
    path: 'src/assets/images/history/3.jpg',
    title: 'Jardín Forestal (2024)',
    subtitle: 'Plantación de árboles y aromáticas',
    bg: '#132a13',
    accent: '#31572c',
    icon: '🌲',
  },
  {
    path: 'src/assets/images/history/4.jpg',
    title: 'Red Comunitaria Hoy',
    subtitle: 'Alimentación digna y autogestión',
    bg: '#344e41',
    accent: '#a3b18a',
    icon: '✨',
  },

  // Brand & OG
  {
    path: 'src/assets/images/brand/logo.png',
    title: 'Xarxa Alimenta',
    subtitle: 'Red Comunitaria Agroecológica',
    bg: '#ffffff',
    accent: '#216928',
    icon: '🌿',
    isPng: true,
  },
  {
    path: 'src/assets/images/og-image.jpg',
    title: 'Xarxa Alimenta',
    subtitle: 'Cultivando comunidad y soberanía alimentaria',
    bg: '#216928',
    accent: '#e8a838',
    icon: '🌱',
  },
];

async function generate() {
  for (const img of imagesToCreate) {
    const dir = path.dirname(img.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const width = 1280;
    const height = 800;

    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${img.bg}" />
            <stop offset="100%" stop-color="${img.accent}" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- Curved landscape horizon -->
        <path d="M 0 620 Q 350 540, 700 600 T 1280 580 L 1280 800 L 0 800 Z" fill="rgba(0,0,0,0.15)" />
        <path d="M 0 670 Q 450 610, 900 660 T 1280 640 L 1280 800 L 0 800 Z" fill="rgba(0,0,0,0.25)" />

        <g transform="translate(100, 260)">
          <circle cx="60" cy="60" r="50" fill="rgba(255,255,255,0.2)" />
          <text x="60" y="78" font-size="48" text-anchor="middle">${img.icon}</text>
          
          <text x="140" y="52" font-family="system-ui, sans-serif" font-size="44" font-weight="bold" fill="#ffffff">
            ${img.title}
          </text>
          <text x="140" y="94" font-family="system-ui, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)">
            ${img.subtitle}
          </text>
        </g>
      </svg>
    `;

    if (img.isPng) {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(img.path);
    } else {
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 85 })
        .toFile(img.path);
    }
  }
  console.log('All image assets generated successfully.');
}

generate().catch(console.error);
